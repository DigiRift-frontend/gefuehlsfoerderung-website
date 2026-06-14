"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import { useNewsletterForm } from "@/lib/useNewsletterForm";
import { NewsletterCoreOffer } from "@/components/sections/NewsletterCoreOffer";

const variants = {
  default: {
    heading: "Erziehungstipps direkt in dein Postfach",
    body: "Melde dich zum kostenlosen Newsletter an und erhalte praktische Tipps zur Gefühlsförderung, neue Blogartikel und exklusive Inhalte — direkt in dein Postfach.",
  },
  shop: {
    heading: "Nicht verpassen!",
    body: "Abonniere den Newsletter und erhalte regelmäßig Tipps, wie du die emotionale Entwicklung deines Kindes im Alltag fördern kannst — plus neue Blogartikel und exklusive Inhalte.",
  },
  about: {
    heading: "Bleib mit mir in Kontakt",
    body: "In meinem Newsletter teile ich regelmäßig mein Wissen aus der Kindheitspädagogik, persönliche Einblicke und exklusive Inhalte. Außerdem erfährst du als Erste, wenn neue Blogartikel erscheinen.",
  },
};

export function NewsletterCompact({
  variant = "default",
}: {
  variant?: keyof typeof variants;
}) {
  const {
    vorname,
    setVorname,
    email,
    setEmail,
    success,
    alreadySubscribed,
    loading,
    error,
    handleSubmit,
  } = useNewsletterForm();

  const copy = variants[variant];

  return (
    <section className="py-16 bg-gradient-to-r from-lavender/5 via-rose/5 to-gold/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
      >
        {success || alreadySubscribed ? (
          <div className="py-4">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/15">
              <Check className="h-6 w-6 text-sage" />
            </div>
            <h2 className="font-heading text-3xl text-charcoal font-bold">
              {success
                ? "Fast geschafft!"
                : "Du bist bereits angemeldet!"}
            </h2>
            <p className="mt-2 text-charcoal-light">
              {success
                ? "Schau in dein Postfach und bestätige deine E-Mail-Adresse."
                : "Danke, dass du Teil unserer Gemeinschaft bist."}
            </p>
            <div className="max-w-xl mx-auto">
              <NewsletterCoreOffer />
            </div>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold-dark px-4 py-2 rounded-full border border-gold/20 mb-5">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Kostenloser Newsletter
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
              {copy.heading}
            </h2>
            <p className="mt-3 text-charcoal-light max-w-xl mx-auto">
              {copy.body}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 max-w-lg mx-auto"
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
              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-lavender hover:bg-lavender-dark text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Mail className="h-4 w-4" />
                {loading ? "Wird gesendet…" : "Anmelden"}
              </button>
              {error && (
                <p className="mt-3 text-sm text-rose-dark" role="alert">
                  {error}
                </p>
              )}
            </form>

            <p className="mt-4 text-xs text-charcoal-lighter">
              Versand über unseren Dienstleister DigiLetter — du kannst den
              Newsletter jederzeit abbestellen.{" "}
              <Link
                href="/datenschutz"
                className="underline hover:text-lavender-dark"
              >
                Datenschutzerklärung
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </section>
  );
}
