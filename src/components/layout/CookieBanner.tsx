"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const categories = [
  {
    key: "necessary" as const,
    label: "Notwendig",
    description:
      "Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.",
    locked: true,
  },
  {
    key: "analytics" as const,
    label: "Statistik & Analyse",
    description:
      "Helfen uns zu verstehen, wie Besucher unsere Website nutzen, um sie stetig zu verbessern.",
    locked: false,
  },
  {
    key: "marketing" as const,
    label: "Marketing",
    description:
      "Werden verwendet, um Besuchern relevante Inhalte und Angebote anzuzeigen.",
    locked: false,
  },
];

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function saveConsent(prefs: CookiePreferences) {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setVisible(false);
  }

  function acceptAll() {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  }

  function saveSelection() {
    saveConsent(preferences);
  }

  function toggle(key: keyof CookiePreferences) {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop overlay when details are open */}
      {showDetails && (
        <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-[2px]" />
      )}

      <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/95 backdrop-blur-sm border border-lavender-light/30 shadow-lg">
          {/* Main banner */}
          <div className="p-5 sm:p-6">
            <h3 className="font-heading text-2xl text-charcoal font-bold">
              Wir nutzen Cookies
            </h3>
            <p className="mt-2 text-sm text-charcoal-light leading-relaxed">
              Wir verwenden Cookies und ähnliche Technologien, um dir die
              bestmögliche Erfahrung auf unserer Website zu bieten. Einige sind
              notwendig, andere helfen uns, die Website zu verbessern. Mehr dazu
              in unserer{" "}
              <Link
                href="/datenschutz"
                className="text-lavender-dark underline underline-offset-2 hover:text-lavender"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-2xl bg-lavender px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-lavender-dark shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:ring-offset-2 focus:ring-offset-cream"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm text-charcoal-lighter underline underline-offset-2 hover:text-lavender-dark transition-colors duration-200"
              >
                {showDetails ? "Weniger anzeigen" : "Einstellungen anpassen"}
              </button>
            </div>
          </div>

          {/* Detail panel */}
          {showDetails && (
            <div className="border-t border-lavender-light/20 p-5 sm:p-6">
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div
                    key={cat.key}
                    className="flex items-start justify-between gap-4 rounded-xl bg-cream/60 p-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-charcoal">
                        {cat.label}
                        {cat.locked && (
                          <span className="ml-2 text-xs font-normal text-charcoal-lighter">
                            (immer aktiv)
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-xs text-charcoal-lighter leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                    <button
                      onClick={() => !cat.locked && toggle(cat.key)}
                      disabled={cat.locked}
                      aria-label={`${cat.label} ${preferences[cat.key] ? "deaktivieren" : "aktivieren"}`}
                      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:ring-offset-2 focus:ring-offset-cream ${
                        preferences[cat.key]
                          ? "bg-lavender"
                          : "bg-charcoal-lighter/30"
                      } ${cat.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                          preferences[cat.key]
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={saveSelection}
                  className="inline-flex items-center justify-center rounded-2xl border-2 border-lavender px-5 py-2 text-sm font-semibold text-lavender-dark transition-all duration-200 hover:bg-lavender/10 focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:ring-offset-2 focus:ring-offset-cream"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center rounded-2xl bg-lavender px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-lavender-dark shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:ring-offset-2 focus:ring-offset-cream"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
