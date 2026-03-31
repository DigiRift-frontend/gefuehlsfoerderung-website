"use client";

import { motion } from "framer-motion";
import { Moon, Heart, Sparkles, Music } from "lucide-react";

export function AppTeaser() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-charcoal to-charcoal/95 text-cream relative overflow-hidden">
      <div className="watercolor-blob w-96 h-96 bg-lavender top-0 right-0 opacity-10" />
      <div className="watercolor-blob w-64 h-64 bg-gold bottom-0 left-0 opacity-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-lavender/20 text-lavender-light px-4 py-2 rounded-full border border-lavender/20 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Bald verfügbar</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl text-cream">
              Die <span className="text-lavender-light">KinderApp</span> kommt
            </h2>
            <p className="mt-4 text-cream-dark/70 text-lg leading-relaxed">
              Achtsamkeit, Schlafgeschichten und Meditationen für Kinder von 2
              bis 12 Jahren. Entwickelt von einer Kindheitspädagogin, liebevoll
              vertont und mit magischen Maskottchen.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Moon, label: "Schlafgeschichten", count: "65+" },
                { icon: Heart, label: "Meditationen", count: "42+" },
                { icon: Sparkles, label: "Achtsamkeit", count: "34+" },
                { icon: Music, label: "Klangwelten", count: "20+" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="bg-cream/5 rounded-2xl p-4 border border-cream/10"
                >
                  <feature.icon className="h-5 w-5 text-lavender-light mb-2" />
                  <p className="font-heading text-2xl text-gold">
                    {feature.count}
                  </p>
                  <p className="text-xs text-cream-dark/60">{feature.label}</p>
                </div>
              ))}
            </div>

            <form className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Deine E-Mail für die Warteliste"
                className="flex-1 px-5 py-3.5 rounded-2xl border border-cream/10 bg-cream/5 focus:outline-none focus:ring-2 focus:ring-lavender/50 text-cream placeholder:text-cream/40"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-lavender text-white font-semibold rounded-2xl hover:bg-lavender-dark transition-colors whitespace-nowrap"
              >
                Auf die Warteliste
              </button>
            </form>
          </motion.div>

          {/* App Mockup Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-[500px] bg-gradient-to-b from-lavender/10 to-charcoal/50 rounded-[3rem] border-2 border-cream/10 flex flex-col items-center justify-center p-8">
              <div className="text-6xl mb-4">🦉</div>
              <p className="font-heading text-2xl text-lavender-light text-center">
                Luna sagt:
              </p>
              <p className="text-cream-dark/60 text-sm text-center mt-2 italic">
                &ldquo;Gute Nacht, kleiner Träumer&rdquo;
              </p>
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                {["🐻", "🦊", "🦁", "🐝", "🐨"].map((emoji, i) => (
                  <span key={i} className="text-lg opacity-40">
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
