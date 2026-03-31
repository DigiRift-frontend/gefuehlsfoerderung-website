"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marion Sander",
    date: "Juni 2021",
    text: "Greifbare Geschichten in Kombination mit den richtigen Fragen. Wundervolle Illustrationen.",
    rating: 5,
    accent: "border-l-lavender",
    bg: "bg-lavender/5",
  },
  {
    name: "Julia Siebert",
    date: "Juli 2022",
    text: "Dieses Buch öffnete die Türen zu den Gefühlswelten meiner Sandmänchengruppe. Tolles Buch!",
    rating: 5,
    accent: "border-l-rose",
    bg: "bg-rose/5",
  },
  {
    name: "Lena Schneider",
    date: "Februar 2023",
    text: "Ein durchweg informatives und nützliches Werkzeug. Es hat mir eine ganz neue Perspektive auf die Gefühlswelt meines Kindes gegeben.",
    rating: 5,
    accent: "border-l-gold",
    bg: "bg-gold/5",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="watercolor-blob w-96 h-96 bg-rose -top-20 right-0" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
            Bewertungen
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">
            Was Eltern sagen
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${t.bg} rounded-3xl p-8 border border-lavender/10 border-l-4 ${t.accent} relative`}
            >
              <Quote className="h-8 w-8 text-lavender/15 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="text-charcoal leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-lavender/10">
                <p className="font-semibold text-charcoal text-sm">
                  {t.name}
                </p>
                <p className="text-xs text-charcoal-lighter">{t.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
