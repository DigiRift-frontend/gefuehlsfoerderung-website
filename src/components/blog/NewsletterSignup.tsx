"use client";

import { Mail, Check } from "lucide-react";
import { useNewsletterForm } from "@/lib/useNewsletterForm";

export function NewsletterSignup() {
  const {
    vorname,
    setVorname,
    email,
    setEmail,
    success,
    alreadySubscribed,
    handleSubmit,
  } = useNewsletterForm();

  if (alreadySubscribed && !success) {
    return (
      <div className="my-10 rounded-2xl bg-sage/10 border border-sage/20 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
          <Check className="h-6 w-6 text-sage" />
        </div>
        <p className="text-sm font-semibold text-charcoal">
          Du bist bereits für den Newsletter angemeldet!
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-2xl bg-lavender/10 border border-lavender/20 p-8 text-center">
      {success ? (
        <>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
            <Check className="h-6 w-6 text-sage" />
          </div>
          <h3 className="text-lg font-bold text-charcoal">
            Wunderbar, du bist dabei!
          </h3>
          <p className="mt-2 text-sm text-charcoal-light">
            Schau in dein Postfach — dein 10% Rabattcode ist auf dem Weg zu dir.
          </p>
        </>
      ) : (
        <>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lavender/20">
            <Mail className="h-6 w-6 text-lavender-dark" />
          </div>
          <h3 className="text-lg font-bold text-charcoal">
            Mehr Tipps für den Familienalltag
          </h3>
          <p className="mt-2 text-sm text-charcoal-light max-w-md mx-auto">
            Melde dich zum kostenlosen Newsletter an und erhalte regelmäßig
            praktische Tipps zur Gefühlsförderung — plus{" "}
            <strong className="text-lavender-dark">10% Rabatt</strong> auf
            deinen ersten Einkauf.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Vorname"
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-lavender/20 bg-white focus:outline-none focus:ring-2 focus:ring-lavender/50 text-sm text-charcoal placeholder:text-charcoal-lighter"
            />
            <input
              type="email"
              placeholder="E-Mail Adresse"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-lavender/20 bg-white focus:outline-none focus:ring-2 focus:ring-lavender/50 text-sm text-charcoal placeholder:text-charcoal-lighter"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-lavender px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-lavender-dark transition-colors"
            >
              <Mail className="h-4 w-4" />
              Anmelden
            </button>
          </form>
          <p className="mt-3 text-xs text-charcoal-lighter">
            Jederzeit abbestellbar.{" "}
            <a
              href="/datenschutz"
              className="underline hover:text-lavender-dark"
            >
              Datenschutz
            </a>
          </p>
        </>
      )}
    </div>
  );
}
