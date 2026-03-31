"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const products = [
  {
    title: 'Kinderbuch "Was fühlst du?"',
    description:
      "Ein wundervoll illustriertes Kinderbuch, das deinem Kind hilft, seine Gefühle zu benennen und zu verstehen. Mit gezielten Fragen zu jeder Geschichte.",
    price: "17,90 €",
    originalPrice: "22,90 €",
    image: "/images/products/book-front.webp",
    color: "from-lavender/15 to-rose/10",
    badge: "Bestseller",
    badgeVariant: "handmade" as const,
    href: "/shop/was-fuehlst-du",
  },
  {
    title: "Emotions-Memory",
    description:
      "Spielerisch Gefühle erkennen und zuordnen. 24 handgemalte Karten mit liebevollen Illustrationen. Verfügbar in Teil 1 und Teil 2.",
    price: "ab 14,99 €",
    image: "/images/products/memory-1.jpg",
    color: "from-rose/15 to-gold/10",
    badge: "Handgemalt",
    badgeVariant: "handmade" as const,
    href: "/shop/emotions-memory-teil-1",
  },
  {
    title: "E-Book Leitfäden",
    description:
      "Praxisnahe Leitfäden zu Themen wie Kinderwut, Kommunikation und emotionale Entwicklung. Sofort als PDF verfügbar.",
    price: "ab 10,99 €",
    image: "/images/products/leitfaden-emotionale-entwicklung.jpg",
    color: "from-gold/15 to-sage/10",
    badge: "Digital",
    badgeVariant: "new" as const,
    href: "/shop",
  },
  {
    title: "Gefühlskompass Bundle",
    description:
      "Das komplette Set: Kinderbuch + beide Memory-Spiele + Leitfaden. Alles was du für die Gefühlsförderung brauchst, zum Sparpreis.",
    price: "45,99 €",
    originalPrice: "72,88 €",
    image: "/images/products/bundle-kompass.jpg",
    color: "from-sage/15 to-lavender/10",
    badge: "Spare 37%",
    badgeVariant: "sale" as const,
    href: "/shop/gefuehlskompass-bundle",
  },
];

export function Products() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
            Ewelinas Werkzeuge
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">
            Alles für die <span className="text-lavender-dark">Gefühlsförderung</span> deines Kindes
          </h2>
          <p className="mt-4 text-charcoal-light">
            Von einer Kindheitspädagogin entwickelt &mdash; wissenschaftlich fundiert.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-cream rounded-3xl overflow-hidden border border-lavender/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div
                className={`aspect-square bg-gradient-to-br ${product.color} relative overflow-hidden`}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badgeVariant}>
                    {product.badge}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-charcoal text-lg leading-snug">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal-light leading-relaxed line-clamp-3">
                  {product.description}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-bold text-lg text-sage-dark">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-charcoal-lighter line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <Button
                  href={product.href}
                  variant="secondary"
                  size="sm"
                  className="w-full mt-4"
                >
                  Ansehen
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/shop" variant="outline" size="lg">
            Alle Produkte entdecken
          </Button>
        </div>
      </div>
    </section>
  );
}
