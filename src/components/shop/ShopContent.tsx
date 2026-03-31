"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

export function ShopContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-10 justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                activeCategory === cat.id
                  ? "bg-lavender text-white shadow-sm"
                  : "bg-white text-charcoal-light hover:bg-lavender/10 border border-lavender/15"
              )}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-charcoal-lighter py-12">
            Keine Produkte in dieser Kategorie gefunden.
          </p>
        )}
      </div>
    </section>
  );
}
