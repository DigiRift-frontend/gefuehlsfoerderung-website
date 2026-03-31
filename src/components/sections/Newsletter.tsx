"use client";

import { motion } from "framer-motion";
import { Mail, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNewsletterForm } from "@/lib/useNewsletterForm";

export function Newsletter() {
  const {
    vorname,
    setVorname,
    email,
    setEmail,
    success,
    alreadySubscribed,
    handleSubmit,
  } = useNewsletterForm();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-lavender/10 via-rose/10 to-gold/10 rounded-[2rem] p-8 md:p-16 border border-lavender/10 overflow-hidden"
        >
          <div className="watercolor-blob w-64 h-64 bg-lavender -top-10 -right-10" />
          <div className="watercolor-blob w-48 h-48 bg-rose bottom-0 left-0" />

          <div className="relative max-w-2xl mx-auto text-center">
            {success || alreadySubscribed ? (
              <div className="py-8">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage/15">
                  <Check className="h-7 w-7 text-sage" />
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">
                  {success
                    ? "Wunderbar, du bist dabei!"
                    : "Du bist bereits angemeldet!"}
                </h2>
                <p className="mt-4 text-charcoal-light text-lg">
                  {success
                    ? "Schau in dein Postfach — dein 10% Rabattcode ist auf dem Weg zu dir."
                    : "Danke, dass du Teil unserer Gemeinschaft bist. Wir freuen uns, dich auf dem Weg der Gefühlsförderung zu begleiten."}
                </p>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 bg-gold/20 text-gold-dark px-4 py-2 rounded-full border border-gold/20 mb-6">
                  <Gift className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    10% Willkommensrabatt
                  </span>
                </div>

                <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">
                  Erziehungstipps direkt in dein Postfach
                </h2>
                <p className="mt-4 text-charcoal-light text-lg">
                  Melde dich zum Newsletter an und erhalte Tipps zur
                  Gefühlsförderung, exklusive Angebote und einen{" "}
                  <strong className="text-lavender-dark">
                    10% Rabattcode
                  </strong>{" "}
                  für deinen ersten Einkauf.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 max-w-lg mx-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Vorname"
                      value={vorname}
                      onChange={(e) => setVorname(e.target.value)}
                      className="flex-1 px-5 py-3.5 rounded-2xl border border-lavender/20 bg-white focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal placeholder:text-charcoal-lighter"
                    />
                    <input
                      type="email"
                      placeholder="Deine E-Mail Adresse"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-5 py-3.5 rounded-2xl border border-lavender/20 bg-white focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal placeholder:text-charcoal-lighter"
                    />
                  </div>
                  <Button type="submit" className="mt-3 w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Anmelden
                  </Button>
                </form>

                <p className="mt-4 text-xs text-charcoal-lighter">
                  Du kannst den Newsletter jederzeit abbestellen.{" "}
                  <a
                    href="/datenschutz"
                    className="underline hover:text-lavender-dark"
                  >
                    Datenschutzerklärung
                  </a>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
