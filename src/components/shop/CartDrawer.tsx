"use client";

import { useCart } from "@/context/CartContext";
import { getProduct } from "@/lib/cart";
import { getBundleUpgrade, getBumpOffer } from "@/lib/order-bump";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartDrawer() {
  const {
    items,
    addToCart,
    removeFromCart,
    setQuantity,
    swapToBundle,
    cartTotal,
    cartCount,
    isCartOpen,
    setCartOpen,
    mounted,
  } = useCart();
  const router = useRouter();
  const [digitalConsent, setDigitalConsent] = useState(false);

  // §356 Abs. 5 BGB: digitale Inhalte im Warenkorb?
  const hasDigital = items.some((i) => {
    const type = getProduct(i.productId)?.type;
    return type === "digital" || type === "mixed";
  });

  // Bundle-bewusste Empfehlung: bevorzugt ein Bundle-Upgrade (größte echte
  // Paket-Ersparnis), sonst die passende Einzel-Ergänzung. Echte Preise,
  // kein Doppelverkauf.
  const upgrade = getBundleUpgrade(items);
  const bump = !upgrade ? getBumpOffer(items) : null;
  const upgradeImage = upgrade ? getProduct(upgrade.bundleId)?.images[0] : null;
  const bumpImage = bump ? getProduct(bump.productId)?.images[0] : null;

  if (!mounted) return null;

  function handleCheckout() {
    setCartOpen(false);
    router.push("/checkout");
  }

  function handlePayPal() {
    // PayPal redirect flow
    setCartOpen(false);
    fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.approveUrl) {
          window.location.href = data.approveUrl;
        }
      })
      .catch((err) => console.error("PayPal error:", err));
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-lavender/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-lavender-dark" />
                <h2 className="font-heading text-2xl text-charcoal font-bold">
                  Warenkorb
                </h2>
                {cartCount > 0 && (
                  <span className="bg-lavender/15 text-lavender-dark text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-charcoal-lighter hover:text-charcoal rounded-full hover:bg-lavender/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-lavender/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-8 w-8 text-lavender-light" />
                  </div>
                  <p className="text-charcoal-light font-medium">
                    Dein Warenkorb ist leer
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-4 text-sm text-lavender-dark font-semibold hover:underline"
                  >
                    Weiter einkaufen
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    return (
                      <div
                        key={item.productId}
                        className="flex gap-4 bg-white rounded-2xl p-3 border border-lavender/10"
                      >
                        <div className="w-20 h-20 rounded-xl bg-lavender/5 overflow-hidden relative flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-charcoal truncate">
                            {product.title}
                          </h3>
                          <p className="text-xs text-charcoal-lighter mt-0.5">
                            {product.type === "digital"
                              ? "Digitaler Download"
                              : product.type === "physical"
                                ? "Physisches Produkt"
                                : "Physisch + Digital"}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            {product.type === "digital" ? (
                              <span className="text-xs text-charcoal-lighter">1x</span>
                            ) : (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => setQuantity(item.productId, item.quantity - 1)}
                                  className="p-1 rounded-lg hover:bg-lavender/10 text-charcoal-lighter hover:text-charcoal transition-colors"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="text-sm font-semibold w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => setQuantity(item.productId, item.quantity + 1)}
                                  className="p-1 rounded-lg hover:bg-lavender/10 text-charcoal-lighter hover:text-charcoal transition-colors"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-charcoal">
                                {formatPrice(product.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.productId)}
                                className="p-1 rounded-lg text-charcoal-lighter hover:text-rose-dark hover:bg-rose/10 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bundle-Upgrade oder passende Ergänzung (bundle-bewusst) */}
            {items.length > 0 && upgrade && (
              <div className="border-t border-lavender/10 px-6 pt-4">
                <div className="rounded-2xl bg-sage/10 border border-sage/25 p-3">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold text-sage-dark uppercase tracking-wide">
                    <Sparkles className="h-3.5 w-3.5" />
                    Lieber das ganze Set?
                  </p>
                  <div className="mt-2 flex gap-3 items-center">
                    {upgradeImage && (
                      <div className="w-14 h-14 rounded-xl bg-white overflow-hidden relative flex-shrink-0 border border-sage/15">
                        <Image
                          src={upgradeImage}
                          alt={upgrade.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-charcoal leading-snug">
                        {upgrade.title}
                      </p>
                      <p className="text-xs text-charcoal-light mt-0.5">
                        einzeln {formatPrice(upgrade.singleSumCents / 100)} · im
                        Bundle{" "}
                        <strong className="text-charcoal">
                          {formatPrice(upgrade.bundlePriceCents / 100)}
                        </strong>{" "}
                        ·{" "}
                        <strong className="text-sage-dark">
                          du sparst {formatPrice(upgrade.savingsCents / 100)}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => swapToBundle(upgrade.bundleId, upgrade.replaceIds)}
                    className="mt-3 w-full text-sm font-semibold bg-sage text-white py-2.5 rounded-xl hover:bg-sage-dark transition-colors"
                  >
                    Auf Bundle upgraden
                  </button>
                  <p className="mt-1.5 text-[10px] text-charcoal-lighter text-center">
                    Von Ewelina persönlich zusammengestellt.
                  </p>
                </div>
              </div>
            )}

            {/* Einzel-Ergänzung, falls kein Bundle-Upgrade greift */}
            {items.length > 0 && bump && (
              <div className="border-t border-lavender/10 px-6 pt-4">
                <div className="rounded-2xl bg-gold/5 border border-gold/30 p-3">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold text-gold-dark uppercase tracking-wide">
                    <Sparkles className="h-3.5 w-3.5" />
                    Das passt dazu
                  </p>
                  <div className="mt-2 flex gap-3 items-center">
                    {bumpImage && (
                      <div className="w-14 h-14 rounded-xl bg-white overflow-hidden relative flex-shrink-0 border border-gold/20">
                        <Image
                          src={bumpImage}
                          alt={bump.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-charcoal leading-snug">
                        {bump.title}
                      </p>
                      <p className="text-xs text-charcoal-light mt-0.5">
                        {bump.isDigital ? "Sofort als PDF" : "Passende Ergänzung"}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-charcoal whitespace-nowrap">
                      +{formatPrice(bump.priceCents / 100)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(bump.productId)}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 text-sm font-semibold bg-gold-dark text-white py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <Plus className="h-4 w-4" />
                    Dazulegen
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-lavender/10 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-light font-medium">Zwischensumme</span>
                  <span className="text-xl font-bold text-charcoal">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <p className="text-xs text-charcoal-lighter">
                  Kein MwSt-Ausweis, Kleinunternehmer gem. §19 UStG.
                  Versandkosten werden an der Kasse berechnet.
                </p>

                {/* Digital-Consent (§356 Abs. 5 BGB) */}
                {hasDigital && (
                  <label className="flex items-start gap-2.5 bg-lavender/5 border border-lavender/15 rounded-xl p-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={digitalConsent}
                      onChange={(e) => setDigitalConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-lavender flex-shrink-0"
                    />
                    <span className="text-[11px] text-charcoal-light leading-relaxed">
                      Ich verlange, dass mit der Bereitstellung der digitalen
                      Inhalte sofort begonnen wird, und bestätige meine
                      Kenntnis, dass ich dadurch mein Widerrufsrecht für diese
                      Inhalte verliere.
                    </span>
                  </label>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-sage text-white font-semibold py-3.5 rounded-2xl hover:bg-sage-dark transition-colors shadow-sm hover:shadow-md"
                >
                  <CreditCard className="h-4 w-4" />
                  Zur Kasse (Klarna)
                </button>

                <button
                  onClick={handlePayPal}
                  disabled={hasDigital && !digitalConsent}
                  className="w-full flex items-center justify-center gap-2 bg-[#0070ba] text-white font-semibold py-3.5 rounded-2xl hover:bg-[#005ea6] transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Mit PayPal bezahlen
                </button>

                <p className="text-[11px] text-charcoal-lighter text-center">
                  Es gelten unsere{" "}
                  <Link
                    href="/agb"
                    className="text-lavender-dark underline"
                    onClick={() => setCartOpen(false)}
                  >
                    AGB (inkl. Widerrufsbelehrung)
                  </Link>
                  .
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
