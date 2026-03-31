"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import Link from "next/link";

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    localStorage.setItem("quiz-popup-dismissed", "true");
    setVisible(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    // Don't show if already dismissed or completed the quiz
    if (localStorage.getItem("quiz-popup-dismissed")) return;
    if (localStorage.getItem("quiz-completed")) return;

    // Don't show on the quiz page itself
    if (window.location.pathname === "/quiz") return;

    // Wait for cookie consent before showing
    function tryShow() {
      if (!localStorage.getItem("cookie-consent")) return false;
      setTimeout(() => {
        setVisible(true);
        document.body.style.overflow = "hidden";
      }, 8000);
      return true;
    }

    if (tryShow()) return;

    // Poll for cookie consent
    const interval = setInterval(() => {
      if (tryShow()) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Escape key
  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-[2px]"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label="Gefühls-Quiz"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-[2rem] bg-white border border-lavender/10 shadow-xl p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Watercolor blobs */}
            <div className="watercolor-blob w-48 h-48 bg-lavender -top-10 -right-10" />
            <div className="watercolor-blob w-32 h-32 bg-rose bottom-0 left-0" />

            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 z-10 text-charcoal-lighter hover:text-charcoal transition-colors p-1"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-lavender/15 text-lavender-dark px-4 py-2 rounded-full border border-lavender/15 mb-5">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  Kostenloser Selbsttest
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold leading-tight">
                Welche Gefühls-Herausforderung beschäftigt euch?
              </h2>

              {/* Body */}
              <p className="mt-3 text-charcoal-light text-sm leading-relaxed">
                5 ehrliche Fragen, 2 Minuten — und du erhältst eine
                persönliche Empfehlung von Kindheitspädagogin Ewelina.
              </p>

              {/* CTA */}
              <Link
                href="/quiz"
                onClick={dismiss}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-lavender hover:bg-lavender-dark text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-sm hover:shadow-md"
              >
                <Sparkles className="h-4 w-4" />
                Jetzt Test starten
              </Link>

              {/* GDPR */}
              <p className="mt-4 text-xs text-charcoal-lighter">
                Kostenlos. Ohne Anmeldung. Ergebnis sofort.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
