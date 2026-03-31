"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

type QuizBannerVariant = "homepage" | "blog" | "shop";

const variants: Record<
  QuizBannerVariant,
  { badge: string; headline: string; text: string; cta: string }
> = {
  homepage: {
    badge: "Kostenloser Selbsttest",
    headline: "Finde heraus, wo ihr als Familie gerade steht",
    text: "5 ehrliche Fragen, 2 Minuten, ein persönliches Ergebnis — mit einer konkreten Empfehlung von Kindheitspädagogin Ewelina.",
    cta: "Jetzt Test starten",
  },
  blog: {
    badge: "Dieser Artikel hat dich berührt?",
    headline: "Finde heraus, welche Herausforderung euch gerade am meisten beschäftigt",
    text: "Ein kurzer Selbsttest mit persönlicher Empfehlung von Kindheitspädagogin Ewelina.",
    cta: "Zum kostenlosen Gefühls-Test",
  },
  shop: {
    badge: "Nicht sicher, was das Richtige ist?",
    headline: "Mach den kostenlosen Test und erhalte eine persönliche Empfehlung",
    text: "5 kurze Fragen — und du weißt, welches Produkt am besten zu eurer Situation passt.",
    cta: "Test starten",
  },
};

export function QuizBanner({ variant = "homepage" }: { variant?: QuizBannerVariant }) {
  const v = variants[variant];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/10 via-rose/10 to-gold/5 border border-lavender/15 p-8 sm:p-12 text-center"
        >
          {/* Decorative blobs */}
          <div className="watercolor-blob w-64 h-64 bg-lavender -top-20 -right-20" />
          <div className="watercolor-blob w-48 h-48 bg-rose -bottom-16 -left-16" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/80 text-lavender-dark px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <Sparkles className="h-4 w-4" />
              {v.badge}
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold max-w-2xl mx-auto leading-tight">
              {v.headline}
            </h2>

            <p className="mt-4 text-charcoal-light max-w-xl mx-auto leading-relaxed">
              {v.text}
            </p>

            <div className="mt-8">
              <Button href="/quiz" size="lg">
                {v.cta}
              </Button>
            </div>

            <p className="mt-3 text-xs text-charcoal-lighter">
              Kostenlos. Ohne Anmeldung. Ergebnis sofort.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
