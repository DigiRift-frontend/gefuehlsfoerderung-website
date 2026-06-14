"use client";

import { motion } from "framer-motion";
import { Mail, Check, Sparkles } from "lucide-react";
import { useNewsletterForm } from "@/lib/useNewsletterForm";
import { NewsletterCoreOffer } from "@/components/sections/NewsletterCoreOffer";

// Squeeze-/Opt-in-Page (Funnel-Einstieg, /impulse).
// Lead-Magnet: kostenloser Mini-Guide „5 Sätze, die jedes Kind beruhigen",
// der nach der Double-Opt-in-Bestätigung auf /newsletter/bestaetigt
// ausgeliefert wird.
export function SqueezeOptIn() {
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

  return (
    <section className="bg-gradient-to-b from-lavender/10 via-rose/5 to-cream py-16 md:py-24 min-h-[80vh]">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-[2rem] border border-lavender/15 shadow-sm p-8 md:p-12 overflow-hidden"
        >
          <div className="watercolor-blob w-56 h-56 bg-lavender -top-12 -right-12" />
          <div className="watercolor-blob w-40 h-40 bg-rose bottom-0 left-0" />

          <div className="relative text-center">
            {success || alreadySubscribed ? (
              <div>
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage/15">
                  <Check className="h-7 w-7 text-sage" />
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">
                  {success ? "Fast geschafft!" : "Du bist schon dabei!"}
                </h1>
                <p className="mt-4 text-charcoal-light text-lg leading-relaxed">
                  {success
                    ? "Schau in dein Postfach und bestätige deine E-Mail-Adresse — dann schicke ich dir direkt deinen Mini-Guide „5 Sätze, die jedes Kind beruhigen“."
                    : "Schön, dass du da bist. Deinen Mini-Guide findest du nach der Bestätigung in deinem Postfach."}
                </p>
                <NewsletterCoreOffer />
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 bg-gold/20 text-gold-dark px-4 py-2 rounded-full border border-gold/20 mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    Kostenloser Mini-Guide
                  </span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold leading-tight">
                  Du musst nicht alle Antworten haben, um deinem Kind durch
                  seine Gefühle zu helfen.
                </h1>
                <p className="mt-5 text-charcoal-light text-lg leading-relaxed">
                  Hol dir alle 1–2 Wochen eine warme E-Mail von mir, Ewelina —
                  Kindheitspädagogin und selbst Mama. Kleine Sätze, ehrliche
                  Impulse und Wege, wie du mit deinem Kind über Wut, Tränen und
                  das große Gefühlschaos sprechen kannst. Ganz ohne erhobenen
                  Zeigefinger.
                </p>

                <ul className="mt-6 space-y-3 text-left max-w-md mx-auto">
                  <li className="flex gap-3 text-charcoal-light">
                    <span aria-hidden>💛</span>
                    <span>
                      <strong className="text-charcoal">
                        Sätze, die wirklich helfen:
                      </strong>{" "}
                      konkrete Formulierungen für die Momente, in denen dir
                      selbst die Worte fehlen.
                    </span>
                  </li>
                  <li className="flex gap-3 text-charcoal-light">
                    <span aria-hidden>🌿</span>
                    <span>
                      <strong className="text-charcoal">
                        Ruhe statt Ratgeber-Stress:
                      </strong>{" "}
                      kurze Impulse aus der Kindheitspädagogik. In 2 Minuten
                      gelesen, am selben Abend anwendbar.
                    </span>
                  </li>
                  <li className="flex gap-3 text-charcoal-light">
                    <span aria-hidden>✨</span>
                    <span>
                      <strong className="text-charcoal">
                        Als Willkommen für dich:
                      </strong>{" "}
                      mein Mini-Guide „5 Sätze, die jedes Kind beruhigen“ —
                      kostenlos, direkt nach deiner Bestätigung.
                    </span>
                  </li>
                </ul>

                <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Dein Vorname"
                      value={vorname}
                      onChange={(e) => setVorname(e.target.value)}
                      className="flex-1 px-5 py-3.5 rounded-2xl border border-lavender/20 bg-white focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal placeholder:text-charcoal-lighter"
                    />
                    <input
                      type="email"
                      placeholder="Deine E-Mail-Adresse"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-5 py-3.5 rounded-2xl border border-lavender/20 bg-white focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal placeholder:text-charcoal-lighter"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-lavender hover:bg-lavender-dark text-white font-semibold px-6 py-4 rounded-2xl transition-colors shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed text-lg"
                  >
                    <Mail className="h-5 w-5" />
                    {loading ? "Wird gesendet…" : "Ja, schick mir die Impulse"}
                  </button>
                  {error && (
                    <p className="mt-3 text-sm text-rose-dark" role="alert">
                      {error}
                    </p>
                  )}
                </form>

                <p className="mt-4 text-xs text-charcoal-lighter max-w-md mx-auto">
                  Du bekommst gleich eine E-Mail mit einem Bestätigungslink
                  (Double-Opt-in) — bitte einmal klicken. Kein Spam, jederzeit
                  abbestellbar. Versand über DigiLetter. Mehr in der{" "}
                  <a
                    href="/datenschutz"
                    className="underline hover:text-lavender-dark"
                  >
                    Datenschutzerklärung
                  </a>
                  .
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
