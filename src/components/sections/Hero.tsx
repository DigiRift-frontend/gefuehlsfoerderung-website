"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Aquarell Background */}
      <div className="absolute inset-0 watercolor-bg" />
      <div className="watercolor-blob w-96 h-96 bg-lavender top-10 -left-20" />
      <div className="watercolor-blob w-80 h-80 bg-rose top-40 right-10" />
      <div className="watercolor-blob w-64 h-64 bg-gold bottom-20 left-1/3" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-4">
              Kindheitspädagogin &amp; Autorin
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-tight font-bold">
              Hilf deinem Kind, seine{" "}
              <span className="text-lavender-dark">Gefühle</span> zu verstehen
            </h1>
            <p className="mt-6 text-lg text-charcoal leading-relaxed max-w-lg">
              Handgemalte Kinderbücher, Memory-Spiele und Leitfäden von Ewelina
              Gawlik &mdash; wissenschaftlich fundiert und mit Herz gestaltet.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button href="/shop" size="lg">
                Zum Shop
              </Button>
              <Button href="/ueber-ewelina" variant="outline" size="lg">
                Mehr erfahren
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-10">
              <div className="flex items-center gap-2 text-sm text-charcoal-lighter">
                <span className="text-lg">🎓</span>
                <span>Von Pädagogin entwickelt</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal-lighter">
                <span className="text-lg">📚</span>
                <span>Wissenschaftlich fundiert</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal-lighter">
                <span className="text-lg">💜</span>
                <span>Mit Herz gestaltet</span>
              </div>
            </div>
          </motion.div>

          {/* Image with Product Teaser */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-lavender/20 via-rose/20 to-gold/20 border border-lavender/10">
              <Image
                src="/images/author/ewelina-ueber-mich.jpeg"
                alt="Ewelina Gawlik - Kindheitspädagogin und Autorin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-lavender/10">
              <p className="text-sm font-semibold text-charcoal">
                Autorin &amp; Illustratorin
              </p>
              <p className="text-xs text-charcoal-lighter">
                Alles handgemalt mit Liebe
              </p>
            </div>

            {/* Floating Product Preview - animated to catch attention */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: -12 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{
                duration: 0.7,
                delay: 0.8,
                type: "spring",
                stiffness: 120,
                damping: 12,
              }}
              className="absolute -right-4 top-8 hidden md:block"
            >
              <Link href="/shop/was-fuehlst-du">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white rounded-2xl shadow-xl border border-lavender/10 p-2 w-28 cursor-pointer hover:shadow-2xl transition-shadow"
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                    <Image
                      src="/images/products/book-front.webp"
                      alt="Was fühlst du? Kinderbuch"
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <p className="text-[10px] text-charcoal font-semibold mt-1.5 text-center leading-tight">
                    Bestseller
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
