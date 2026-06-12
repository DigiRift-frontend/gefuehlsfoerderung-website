"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";

const TOPICS = [
  "Allgemeine Frage",
  "Zahlungsprobleme",
  "Lieferschwierigkeiten",
  "Beschädigte Bestellung",
  "Kooperation",
  "Kritik und Anregung",
];

export default function KontaktPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, name, email, message, website }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus("success");
      } else {
        setStatus("idle");
        setError(
          data?.error ||
            "Deine Nachricht konnte nicht gesendet werden. Bitte versuche es erneut."
        );
      }
    } catch {
      setStatus("idle");
      setError(
        "Deine Nachricht konnte nicht gesendet werden. Bitte versuche es erneut."
      );
    }
  }

  return (
    <>
      <section className="bg-gradient-to-b from-sage/10 to-cream py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="font-heading text-5xl sm:text-6xl text-charcoal font-bold">
            Kontakt
          </h1>
          <p className="mt-4 text-lg text-charcoal-light max-w-2xl mx-auto">
            Hast du Fragen, Anregungen oder möchtest eine Kooperation
            besprechen? Schreib mir gerne!
          </p>
        </motion.div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-charcoal">
                Ewelina Gawlik
              </h2>
              <p className="mt-1 text-lavender-dark font-medium">
                Kindheitspädagogin B.A.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lavender/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-lavender-dark" />
                  </div>
                  <a
                    href="mailto:mail@ewelinagawlik.de"
                    className="text-charcoal hover:text-lavender-dark transition-colors"
                  >
                    mail@ewelinagawlik.de
                  </a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10 bg-gold/10 rounded-2xl p-6 border border-gold/20"
              >
                <h3 className="font-semibold text-charcoal">
                  Hilfe bei Bestellungen
                </h3>
                <p className="mt-2 text-sm text-charcoal-light">
                  Bei Fragen zu Zahlungen, Lieferungen oder beschädigten
                  Bestellungen nutze bitte das Kontaktformular mit dem
                  entsprechenden Anliegen.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-lavender/10"
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-sage/10 border border-sage/30 rounded-2xl p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-7 w-7 text-sage-dark" strokeWidth={3} />
                  </div>
                  <p className="font-semibold text-sage-dark text-lg">
                    Deine Nachricht ist unterwegs!
                  </p>
                  <p className="mt-2 text-charcoal-light">
                    Ich melde mich so schnell wie möglich.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-charcoal mb-6">
                    Schreib mir eine Nachricht
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Anliegen
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-lavender/20 bg-cream focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal"
                      >
                        {TOPICS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dein Name"
                        className="w-full px-4 py-3 rounded-2xl border border-lavender/20 bg-cream focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal placeholder:text-charcoal-lighter"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="deine@email.de"
                        className="w-full px-4 py-3 rounded-2xl border border-lavender/20 bg-cream focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal placeholder:text-charcoal-lighter"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Nachricht
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Beschreibe dein Anliegen..."
                        className="w-full px-4 py-3 rounded-2xl border border-lavender/20 bg-cream focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal placeholder:text-charcoal-lighter resize-none"
                      />
                    </div>
                    {/* Honeypot — bleibt für Menschen unsichtbar */}
                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-lavender hover:bg-lavender-dark text-white font-semibold py-3.5 rounded-2xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading"
                        ? "Wird gesendet…"
                        : "Nachricht senden"}
                    </button>
                    {error && (
                      <p className="text-sm text-rose-dark" role="alert">
                        {error}
                      </p>
                    )}
                    <p className="text-xs text-charcoal-lighter">
                      Deine Angaben aus diesem Formular nutzen wir
                      ausschließlich zur Bearbeitung deiner Anfrage. Details:{" "}
                      <a
                        href="/datenschutz"
                        className="underline hover:text-lavender-dark"
                      >
                        Datenschutzerklärung
                      </a>
                      .
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
