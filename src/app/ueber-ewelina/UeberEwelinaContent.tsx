"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const timeline = [
  {
    year: "Kindheit",
    title: "Der Anfang",
    text: "Schon als junges Mädchen beobachtete Ewelina die Erwachsenen und ihre Offenheit gegenüber den Gefühlen kleiner Menschen.",
  },
  {
    year: "Studium",
    title: "Kindheitspädagogik B.A.",
    text: "Mit der Wahl ihres Lebensweges verstand sie, dass ihr Herz für die Arbeit mit Kindern und deren emotionaler Entwicklung schlägt.",
  },
  {
    year: "Erkenntnis",
    title: "Psychische Gesundheit",
    text: "Im Freundes- und Familienkreis litten immer mehr Personen an Depressionen und Panikattacken. Die Wurzeln lagen oft in der Kindheit.",
  },
  {
    year: "Abschluss",
    title: "Wissenschaftliche Grundlage",
    text: "Ihre Abschlussarbeit an der Hochschule widmete sie der Gefühlsförderung im Kindesalter — die Basis für alles Weitere.",
  },
  {
    year: "Heute",
    title: "Mission Gefühlsförderung",
    text: "Mit wissenschaftlichem Wissen, persönlicher Erfahrung als Mutter und kreativem Talent schafft Ewelina Werkzeuge, die Kindern helfen, ihre Gefühle zu verstehen.",
  },
];

export function UeberEwelinaContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-lavender/10 to-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
                Über mich
              </p>
              <h1 className="font-heading text-5xl sm:text-6xl text-charcoal font-bold">
                Hallo, ich bin Ewelina!
              </h1>
              <p className="mt-6 text-lg text-charcoal leading-relaxed">
                Als Kindheitspädagogin ist es mein Job und Herzensanliegen, dich
                in der Erziehung zu unterstützen und deinem Kind zu helfen,
                seine Gefühle zu verstehen und auszudrücken.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <span className="bg-lavender/10 text-lavender-dark px-4 py-2 rounded-full text-sm font-medium">
                  Kindheitspädagogin B.A.
                </span>
                <span className="bg-rose/10 text-rose-dark px-4 py-2 rounded-full text-sm font-medium">
                  Mutter von 2 Kindern
                </span>
                <span className="bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-medium">
                  Autorin &amp; Illustratorin
                </span>
              </motion.div>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-sm mx-auto w-full"
            >
              <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-lavender/15 to-rose/15 overflow-hidden border border-lavender/10 relative">
                <Image
                  src="/images/author/ewelina-ueber-mich.jpeg"
                  alt="Ewelina Gawlik - Kindheitspädagogin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Animated scroll arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <motion.a
              href="#mein-weg"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-lavender-dark/50 hover:text-lavender-dark transition-colors"
              aria-label="Weiter scrollen"
            >
              <ChevronDown className="h-8 w-8" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section id="mein-weg" className="py-20 md:py-28 scroll-mt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl text-charcoal font-bold text-center mb-16"
          >
            Mein Weg
          </motion.h2>

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex gap-6 md:gap-10"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-lavender/15 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-lavender-dark">
                      {i + 1}
                    </span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-lavender/15 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-semibold text-lavender-dark uppercase tracking-wider">
                    {item.year}
                  </p>
                  <h3 className="text-xl font-bold text-charcoal mt-1">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-charcoal-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="font-heading text-3xl text-charcoal font-bold">
            Entdecke meine Werkzeuge zur Gefühlsförderung
          </h2>
          <p className="mt-4 text-charcoal-light">
            Alles was du brauchst, um deinem Kind bei seiner emotionalen
            Entwicklung zu helfen — handgemalt, wissenschaftlich fundiert und
            mit Liebe gestaltet.
          </p>
          <Button href="/shop" size="lg" className="mt-8">
            Zum Shop
          </Button>
        </motion.div>
      </section>

    </>
  );
}
