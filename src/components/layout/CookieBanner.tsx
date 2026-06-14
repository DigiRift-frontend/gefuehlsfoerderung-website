"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Diese Website setzt AUSSCHLIESSLICH technisch notwendige/funktionale
// Speicherung ein (localStorage: Warenkorb, dieser Hinweis-Status,
// Theme, Popup-Merker) — KEIN Analytics, KEIN Marketing, KEIN Tracking.
// Für solche Speicherung ist nach § 25 Abs. 2 TDDDG keine Einwilligung
// erforderlich. Daher ist dies ein reiner Hinweis (keine Wahlschalter),
// der zugleich den Merker setzt, auf den das Newsletter-Popup wartet.
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  function acknowledge() {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, acknowledged: true })
    );
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white/95 backdrop-blur-sm border border-lavender-light/30 shadow-lg p-5 sm:p-6">
        <h3 className="font-heading text-2xl text-charcoal font-bold">
          Hinweis zu Cookies
        </h3>
        <p className="mt-2 text-sm text-charcoal-light leading-relaxed">
          Wir verwenden ausschließlich{" "}
          <strong className="text-charcoal">technisch notwendige</strong> bzw.
          funktionale Speicherung (z.&nbsp;B. für deinen Warenkorb) – ganz ohne
          Tracking, Statistik- oder Marketing-Dienste. Eine Einwilligung ist
          dafür nicht erforderlich. Mehr dazu in unserer{" "}
          <Link
            href="/datenschutz"
            className="text-lavender-dark underline underline-offset-2 hover:text-lavender"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>

        <div className="mt-4">
          <button
            onClick={acknowledge}
            className="inline-flex items-center justify-center rounded-2xl bg-lavender px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-lavender-dark shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:ring-offset-2 focus:ring-offset-cream"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
