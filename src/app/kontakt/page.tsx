"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function KontaktPage() {
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
              <h3 className="text-lg font-semibold text-charcoal mb-6">
                Schreib mir eine Nachricht
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Anliegen
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl border border-lavender/20 bg-cream focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal">
                    <option>Allgemeine Frage</option>
                    <option>Zahlungsprobleme</option>
                    <option>Lieferschwierigkeiten</option>
                    <option>Beschädigte Bestellung</option>
                    <option>Kooperation</option>
                    <option>Kritik und Anregung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
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
                    placeholder="Beschreibe dein Anliegen..."
                    className="w-full px-4 py-3 rounded-2xl border border-lavender/20 bg-cream focus:outline-none focus:ring-2 focus:ring-lavender/50 text-charcoal placeholder:text-charcoal-lighter resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-lavender hover:bg-lavender-dark text-white font-semibold py-3.5 rounded-2xl transition-colors"
                >
                  Nachricht senden
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
