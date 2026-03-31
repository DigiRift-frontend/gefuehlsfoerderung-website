"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, BookOpen, Puzzle, FileText, Package, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
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

export function ProductCard({ product }: { product: Product }) {
  const Icon = categoryIcons[product.category];
  const color = categoryColors[product.category];
  const hasImage = product.images.length > 0;
  const { addToCart, setCartOpen } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!product.inStock) return;
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setCartOpen(true);
    }, 800);
  }

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-lavender/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image Area */}
      <Link href={`/shop/${product.slug}`} className="block">
        <div
          className={`aspect-square bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}
        >
          {hasImage ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <Icon className="h-16 w-16 text-charcoal/15" />
          )}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge
                variant={
                  product.badge.includes("Spare") || product.badge.includes("Limitiert")
                    ? "sale"
                    : product.badge === "Bestseller"
                    ? "handmade"
                    : "new"
                }
              >
                {product.badge}
              </Badge>
            </div>
          )}
          {product.type === "digital" && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-charcoal/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                PDF
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-charcoal hover:text-lavender-dark transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-charcoal-light leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {product.ageRange && (
          <p className="mt-2 text-xs text-lavender-dark font-medium">
            {product.ageRange}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-sage-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal-lighter line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`mt-3 w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-2xl transition-colors text-sm ${
            added
              ? "bg-sage-dark text-white"
              : product.inStock
                ? "bg-sage hover:bg-sage-dark text-white"
                : "bg-charcoal/10 text-charcoal-lighter cursor-not-allowed"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Hinzugefügt!
            </>
          ) : product.inStock ? (
            <>
              <ShoppingBag className="h-4 w-4" />
              In den Warenkorb
            </>
          ) : (
            "Ausverkauft"
          )}
        </button>
      </div>

      <p className="px-5 pb-4 text-[10px] text-charcoal-lighter">
        Kein MwSt-Ausweis, Kleinunternehmer nach &sect;19 UStG.
        {product.type === "physical" && " zzgl. Versandkosten."}
      </p>
    </div>
  );
}
