"use client";

import { useCart } from "@/context/CartContext";
import { getProduct } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    setQuantity,
    cartTotal,
    cartCount,
    isCartOpen,
    setCartOpen,
    mounted,
  } = useCart();
  const router = useRouter();

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

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-sage text-white font-semibold py-3.5 rounded-2xl hover:bg-sage-dark transition-colors shadow-sm hover:shadow-md"
                >
                  <CreditCard className="h-4 w-4" />
                  Zur Kasse (Klarna)
                </button>

                <button
                  onClick={handlePayPal}
                  className="w-full flex items-center justify-center gap-2 bg-[#0070ba] text-white font-semibold py-3.5 rounded-2xl hover:bg-[#005ea6] transition-colors shadow-sm hover:shadow-md"
                >
                  Mit PayPal bezahlen
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
