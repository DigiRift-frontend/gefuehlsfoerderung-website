"use client";

import { useCart } from "@/context/CartContext";
import { getProduct } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Klarna?: {
      Payments: {
        init: (config: { client_token: string }) => void;
        load: (
          config: { container: string; payment_method_category: string },
          callback: (res: { show_form: boolean }) => void
        ) => void;
        authorize: (
          config: { payment_method_category: string },
          data: Record<string, unknown>,
          callback: (res: {
            approved: boolean;
            authorization_token?: string;
            show_form?: boolean;
          }) => void
        ) => void;
      };
    };
  }
}

export default function CheckoutPage() {
  const { items, cartTotal, cartCount, mounted, clearCart } = useCart();
  const [phase, setPhase] = useState<"loading" | "ready" | "paying" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [sessionData, setSessionData] = useState<{
    clientToken: string;
    sessionId: string;
    paymentMethods: { identifier: string; name: string }[];
    orderAmount: number;
    orderLines: unknown[];
  } | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const router = useRouter();

  // 1. Create Klarna session once cart is available
  useEffect(() => {
    if (!mounted || items.length === 0) return;

    let cancelled = false;

    async function createSession() {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.productId,
              quantity: i.quantity,
            })),
          }),
        });

        const data = await res.json();
        if (cancelled) return;

        if (data.error) {
          setError(data.error);
          setPhase("error");
          return;
        }

        setSessionData(data);
        setSelectedMethod(data.paymentMethods?.[0]?.identifier ?? null);
      } catch {
        if (!cancelled) {
          setError("Verbindung zum Zahlungsanbieter fehlgeschlagen.");
          setPhase("error");
        }
      }
    }

    createSession();
    return () => { cancelled = true; };
  }, [mounted, items]);

  // 2. When both SDK + session are ready, init Klarna widget
  const loadWidget = useCallback(
    (method: string) => {
      if (!sessionData || !window.Klarna) return;

      window.Klarna.Payments.init({ client_token: sessionData.clientToken });

      // Small delay to ensure container is in DOM
      setTimeout(() => {
        window.Klarna!.Payments.load(
          {
            container: "#klarna-payments-container",
            payment_method_category: method,
          },
          (res) => {
            if (res.show_form) {
              setPhase("ready");
            } else {
              setError("Klarna-Formular konnte nicht geladen werden. Bitte versuche es erneut.");
              setPhase("error");
            }
          }
        );
      }, 100);
    },
    [sessionData]
  );

  useEffect(() => {
    if (sdkReady && sessionData && selectedMethod) {
      loadWidget(selectedMethod);
    }
  }, [sdkReady, sessionData, selectedMethod, loadWidget]);

  // Switch payment method
  function handleMethodSwitch(method: string) {
    setSelectedMethod(method);
    setPhase("loading");
    // loadWidget will be triggered by useEffect
  }

  // 3. Handle payment
  async function handlePay() {
    if (!window.Klarna || !selectedMethod || !sessionData) return;
    setPhase("paying");
    setError(null);

    window.Klarna.Payments.authorize(
      { payment_method_category: selectedMethod },
      {},
      async (res) => {
        if (res.approved && res.authorization_token) {
          try {
            const orderRes = await fetch("/api/checkout/authorize", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                authorizationToken: res.authorization_token,
                items: items.map((i) => ({
                  productId: i.productId,
                  quantity: i.quantity,
                })),
                orderAmount: sessionData.orderAmount,
                orderLines: sessionData.orderLines,
              }),
            });

            const orderData = await orderRes.json();
            if (orderData.success) {
              clearCart();
              router.push(
                orderData.redirectUrl ??
                  `/bestellung/erfolgreich?order_id=${orderData.orderId}`
              );
              return;
            } else {
              setError(orderData.error ?? "Bestellung konnte nicht abgeschlossen werden.");
            }
          } catch {
            setError("Fehler beim Abschließen der Bestellung.");
          }
        } else {
          // User cancelled in Klarna popup or not approved
          setError(null); // Don't show error, user just cancelled
        }
        setPhase("ready");
      }
    );
  }

  // Handle PayPal from checkout page
  async function handlePayPal() {
    setPhase("paying");
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (data.approveUrl) {
        window.location.href = data.approveUrl;
      } else {
        setError("PayPal konnte nicht gestartet werden.");
        setPhase("ready");
      }
    } catch {
      setError("Verbindung zu PayPal fehlgeschlagen.");
      setPhase("ready");
    }
  }

  if (!mounted) return null;

  // Empty cart state
  if (mounted && items.length === 0 && phase !== "paying") {
    return (
      <section className="py-20 text-center">
        <div className="mx-auto max-w-md px-4">
          <div className="w-20 h-20 bg-lavender/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-8 w-8 text-lavender-light" />
          </div>
          <h1 className="font-heading text-3xl text-charcoal font-bold">
            Dein Warenkorb ist leer
          </h1>
          <p className="mt-3 text-charcoal-light">
            Füge Produkte hinzu, um zur Kasse zu gehen.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 bg-lavender text-white font-semibold px-6 py-3 rounded-2xl hover:bg-lavender-dark transition-colors"
          >
            Zum Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Load Klarna SDK via Next.js Script (handles re-renders correctly) */}
      <Script
        src="https://x.klarnacdn.net/kp/lib/v1/api.js"
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
      />

      <section className="bg-gradient-to-b from-lavender/5 to-cream py-10 md:py-16 min-h-[80vh]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-lavender-dark font-medium hover:gap-2.5 transition-all mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Weiter einkaufen
          </Link>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Payment */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-lavender/10 p-6">
                <h1 className="font-heading text-3xl text-charcoal font-bold mb-6">
                  Kasse
                </h1>

                {error && (
                  <div className="bg-rose/10 border border-rose/20 rounded-2xl p-4 text-rose-dark text-sm mb-4">
                    {error}
                    <button
                      onClick={() => {
                        setError(null);
                        if (selectedMethod) loadWidget(selectedMethod);
                      }}
                      className="ml-2 underline font-semibold"
                    >
                      Erneut versuchen
                    </button>
                  </div>
                )}

                {/* Payment method tabs */}
                {sessionData && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sessionData.paymentMethods.map((m) => (
                      <button
                        key={m.identifier}
                        onClick={() => handleMethodSwitch(m.identifier)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                          selectedMethod === m.identifier
                            ? "bg-lavender text-white"
                            : "bg-lavender/10 text-lavender-dark hover:bg-lavender/20"
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                    <button
                      onClick={handlePayPal}
                      disabled={phase === "paying"}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#0070ba]/10 text-[#003087] hover:bg-[#0070ba]/20 transition-colors"
                    >
                      PayPal
                    </button>
                  </div>
                )}

                {/* Loading state */}
                {phase === "loading" && (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 text-lavender animate-spin" />
                    <span className="ml-3 text-charcoal-light">
                      Zahlungsoptionen werden geladen...
                    </span>
                  </div>
                )}

                {/* Klarna widget */}
                <div
                  id="klarna-payments-container"
                  className={phase === "loading" ? "hidden" : "min-h-[200px]"}
                />

                {/* Pay button */}
                {(phase === "ready" || phase === "paying") && (
                  <button
                    onClick={handlePay}
                    disabled={phase === "paying"}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-sage text-white font-semibold py-4 rounded-2xl hover:bg-sage-dark transition-colors text-lg disabled:opacity-50"
                  >
                    {phase === "paying" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Wird verarbeitet...
                      </>
                    ) : (
                      `Jetzt bezahlen — ${formatPrice(sessionData?.orderAmount ? sessionData.orderAmount / 100 : cartTotal)}`
                    )}
                  </button>
                )}

                <p className="mt-4 text-xs text-charcoal-lighter text-center">
                  Kein MwSt-Ausweis, Kleinunternehmer gem. §19 UStG.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-lavender/10 p-6 sticky top-28">
                <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                  Bestellübersicht
                </h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    return (
                      <div key={item.productId} className="flex gap-3">
                        <div className="w-14 h-14 rounded-xl bg-lavender/5 overflow-hidden relative flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-charcoal truncate">
                            {product.title}
                          </h3>
                          <p className="text-xs text-charcoal-lighter">
                            {item.quantity}x {formatPrice(product.price)}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-charcoal">
                          {formatPrice(product.price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-lavender/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-light">
                      Zwischensumme ({cartCount} Artikel)
                    </span>
                    <span className="font-semibold">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-lavender/10 mt-4 pt-4 flex justify-between">
                  <span className="font-bold text-charcoal">Gesamt</span>
                  <span className="text-xl font-bold text-charcoal">
                    {formatPrice(
                      sessionData?.orderAmount
                        ? sessionData.orderAmount / 100
                        : cartTotal
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
