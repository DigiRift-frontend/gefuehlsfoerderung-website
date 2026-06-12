"use client";

import { useState, useEffect } from "react";

// Newsletter-Anmeldung über /api/newsletter (DigiLetter Double-Opt-in).
// success = DOI-Mail wurde verschickt ("Bitte bestätige deine E-Mail").
export function useNewsletterForm() {
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Merker, damit wiederkehrende Besucher nicht erneut genervt werden
    const stored = localStorage.getItem("newsletter-subscribed");
    if (stored) {
      setAlreadySubscribed(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          vorname: vorname.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data?.error ?? "Das hat leider nicht geklappt. Bitte versuche es erneut."
        );
        return;
      }

      localStorage.setItem(
        "newsletter-subscribed",
        JSON.stringify({
          vorname: vorname.trim(),
          email: email.trim(),
          subscribedAt: new Date().toISOString(),
        })
      );
      setSuccess(true);
      setAlreadySubscribed(true);
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return {
    vorname,
    setVorname,
    email,
    setEmail,
    success,
    alreadySubscribed,
    loading,
    error,
    handleSubmit,
  };
}
