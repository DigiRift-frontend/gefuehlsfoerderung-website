import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Angaben gemäß § 5 TMG für Gefühlsförderung von Ewelina Gawlik.",
  alternates: { canonical: "https://gefühlsförderung.de/impressum" },
};

export default function ImpressumPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-charcoal font-bold">
          Impressum
        </h1>

        <div className="mt-10 space-y-8 text-charcoal-light leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="mt-2">
              Ewelina Gawlik
              <br />
              Gefühlsförderung für Kinder – Ewelina Gawlik Verlag
              <br />
              Liegnitzerstr. 23
              <br />
              57290 Neunkirchen
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-charcoal">Kontakt</h2>
            <p className="mt-2">
              Telefon: +49 176 81700389
              <br />
              E-Mail:{" "}
              <a
                href="mailto:mail@ewelinagawlik.de"
                className="text-lavender-dark hover:underline"
              >
                mail@ewelinagawlik.de
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Redaktionell verantwortlich
            </h2>
            <p className="mt-2">Ewelina Gawlik</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              EU-Streitschlichtung
            </h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lavender-dark hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <p className="text-sm text-charcoal-lighter">
            Quelle:{" "}
            <a
              href="https://www.e-recht24.de/impressum-generator.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              e-recht24.de
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
