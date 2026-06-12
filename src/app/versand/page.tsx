import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versand",
  description:
    "Alle Infos zu Versandkosten, Lieferzeiten und digitalen Downloads im Shop von Gefühlsförderung.",
  alternates: { canonical: "https://gefühlsförderung.de/versand" },
};

export default function VersandPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-charcoal font-bold">
          Versand
        </h1>
        <p className="mt-2 text-charcoal-light">
          Hier findest du alle Infos rund um Versandkosten und Lieferzeiten.
        </p>

        <div className="mt-10 space-y-8 text-charcoal-light leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Versandkosten
            </h2>
            <p className="mt-2">
              Der Standardversand kostet pauschal 4,99&nbsp;&euro; pro
              Bestellung &ndash; egal, wie viele Produkte du bestellst.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Lieferzeit und Versanddienstleister
            </h2>
            <p className="mt-2">
              Wir versenden mit DHL. Deine Bestellung ist in der Regel
              innerhalb von 2&ndash;5 Werktagen bei dir.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Liefergebiet
            </h2>
            <p className="mt-2">
              Aktuell versenden wir ausschließlich innerhalb Deutschlands.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Digitale Produkte
            </h2>
            <p className="mt-2">
              Digitale Produkte (z.&nbsp;B. unsere PDF-Leitfäden) sind
              versandkostenfrei. Du erhältst deinen Download-Link sofort nach
              Zahlungseingang bequem per E-Mail.
            </p>
          </div>

          <p className="text-sm text-charcoal-lighter">
            Hinweis: Gemäß &sect;&nbsp;19 UStG erheben wir keine Umsatzsteuer
            und weisen diese folglich auch nicht aus (Kleinunternehmerstatus).
          </p>
        </div>
      </div>
    </section>
  );
}
