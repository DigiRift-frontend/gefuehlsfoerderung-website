"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  BookOpen,
  Puzzle,
  FileText,
  Package,
  X,
  ZoomIn,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/shop/ProductCard";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

const categoryIcons = {
  buch: BookOpen,
  memory: Puzzle,
  ebook: FileText,
  bundle: Package,
};

const categoryColors = {
  buch: "from-lavender/20 to-rose/15",
  memory: "from-rose/20 to-gold/15",
  ebook: "from-gold/15 to-sage/15",
  bundle: "from-sage/15 to-lavender/20",
};

export function ProductDetail({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const Icon = categoryIcons[product.category];
  const color = categoryColors[product.category];
  const { addToCart, setCartOpen } = useCart();

  function handleAddToCart() {
    if (!product.inStock) return;
    addToCart(product.id);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setCartOpen(true);
    }, 800);
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-lavender/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-charcoal-light hover:text-lavender-dark transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück zum Shop
          </Link>
        </div>
      </div>

      {/* Product */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="space-y-4">
              <div
                className={`aspect-square bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center relative border border-lavender/10 overflow-hidden group`}
              >
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.title}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <Icon className="h-24 w-24 text-charcoal/10" />
                )}
                {product.badge && (
                  <div className="absolute top-6 left-6 z-10">
                    <Badge
                      variant={
                        product.badge.includes("Spare") ? "sale" : "handmade"
                      }
                      className="text-sm px-4 py-1.5"
                    >
                      {product.badge}
                    </Badge>
                  </div>
                )}

                {/* Zoom button */}
                {product.images.length > 0 && (
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute bottom-4 right-4 z-10 bg-white/80 hover:bg-white text-charcoal p-2 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Bild vergrößern"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>
                )}

                {/* Prev / Next arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-charcoal p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Vorheriges Bild"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-charcoal p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Nächstes Bild"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl bg-gradient-to-br ${color} overflow-hidden relative transition-all duration-200 ${
                        selectedImage === i
                          ? "ring-2 ring-lavender ring-offset-2 ring-offset-cream border-transparent"
                          : "border border-lavender/10 hover:border-lavender/30"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} - Bild ${i + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="expert">
                  Von Kindheitspädagogin entwickelt
                </Badge>
                {product.type === "digital" && (
                  <Badge variant="new">Sofort-Download</Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-charcoal">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="mt-1 text-lg text-charcoal-light italic">
                  {product.subtitle}
                </p>
              )}

              {product.ageRange && (
                <p className="mt-2 text-sm text-lavender-dark font-medium">
                  Empfohlenes Alter: {product.ageRange}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <span className="text-sm text-charcoal-lighter">
                  5.0 (3 Bewertungen)
                </span>
              </div>

              <p className="mt-6 text-charcoal leading-relaxed text-lg">
                {product.longDescription}
              </p>

              {/* Price */}
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-sage-dark">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-charcoal-lighter line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="sale">
                      -
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      %
                    </Badge>
                  </>
                )}
              </div>

              <p className="mt-1 text-xs text-charcoal-lighter">
                Kein MwSt-Ausweis, Kleinunternehmer nach &sect;19 UStG.
                {product.type === "physical" && " zzgl. Versandkosten."}
              </p>

              {/* Add to Cart */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 font-semibold py-4 rounded-2xl transition-colors text-lg ${
                    addedToCart
                      ? "bg-sage-dark text-white"
                      : product.inStock
                        ? "bg-sage hover:bg-sage-dark text-white"
                        : "bg-charcoal/10 text-charcoal-lighter cursor-not-allowed"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5" />
                      Hinzugefügt!
                    </>
                  ) : product.inStock ? (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      In den Warenkorb
                    </>
                  ) : (
                    "Ausverkauft"
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 space-y-3">
                {product.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-sage shrink-0 mt-0.5" />
                    <span className="text-charcoal">{f}</span>
                  </div>
                ))}
              </div>

              {/* Specs */}
              {product.specs && product.specs.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-cream/50 rounded-xl px-4 py-3 border border-lavender/10"
                    >
                      <p className="text-xs text-charcoal-lighter font-medium uppercase tracking-wide">
                        {spec.label}
                      </p>
                      <p className="mt-0.5 text-sm text-charcoal font-medium">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Emotions */}
              {product.emotions && product.emotions.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-charcoal mb-2">
                    Enthaltene Gefühle:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.emotions.map((emotion) => (
                      <span
                        key={emotion}
                        className="inline-block bg-lavender/10 text-charcoal-light text-xs font-medium px-3 py-1.5 rounded-full border border-lavender/15"
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Handmade Badge - nur bei Buch und Memory */}
              {(product.category === "buch" || product.category === "memory") && (
                <div className="mt-8 bg-gold/10 rounded-2xl p-5 border border-gold/20">
                  <p className="font-semibold text-charcoal flex items-center gap-2">
                    <span className="text-lg">🎨</span>
                    100% handgemalt &amp; handgeschrieben
                  </p>
                  <p className="mt-1 text-sm text-charcoal-light">
                    Alle Illustrationen wurden von Ewelina Gawlik persönlich
                    mit der Hand gemalt und geschrieben. Keine KI-generierten Inhalte.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Sell */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl text-charcoal font-bold mb-8">
              Passt perfekt dazu
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upsell Banner */}
      <section className="py-12 bg-lavender/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading text-2xl text-charcoal font-bold">
            Hol dir das komplette Gefühlskompass Bundle!
          </h3>
          <p className="mt-2 text-charcoal-light">
            Kinderbuch + beide Memory-Spiele + Leitfaden &mdash;{" "}
            <strong className="text-sage-dark">spare über 37%</strong>
          </p>
          <Button
            href="/shop/gefuehlskompass-bundle"
            variant="primary"
            className="mt-6"
          >
            Zum Bundle (45,99 &euro;)
          </Button>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && product.images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full mx-4 aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-contain"
              sizes="90vw"
            />

            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 transition-colors"
              aria-label="Schließen"
            >
              <X className="h-7 w-7" />
            </button>

            {/* Prev / Next */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Dots */}
            {product.images.length > 1 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      selectedImage === i
                        ? "bg-white"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Bild ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
