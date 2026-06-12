import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zahlungsarten",
  description:
    "Bezahle im Shop von Gefühlsförderung bequem mit Klarna oder PayPal.",
  alternates: { canonical: "https://gefühlsförderung.de/zahlungsarten" },
};

export default function ZahlungsartenPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-charcoal font-bold">
          Zahlungsarten
        </h1>
        <p className="mt-2 text-charcoal-light">
          In unserem Shop kannst du bequem und sicher bezahlen &ndash; so, wie
          es für dich am besten passt.
        </p>

        <div className="mt-10 space-y-8 text-charcoal-light leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-charcoal">Klarna</h2>
            <p className="mt-2">
              Mit Klarna hast du die Wahl zwischen mehreren Möglichkeiten:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium text-charcoal">Rechnung:</span>{" "}
                Erst ansehen, dann in bis zu 30 Tagen bezahlen.
              </li>
              <li>
                <span className="font-medium text-charcoal">
                  Sofortüberweisung:
                </span>{" "}
                Direkt mit deinem Online-Banking bezahlen.
              </li>
              <li>
                <span className="font-medium text-charcoal">Ratenkauf:</span>{" "}
                Den Betrag in mehreren Raten begleichen.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-charcoal">PayPal</h2>
            <p className="mt-2">
              Bezahle schnell und sicher über dein PayPal-Konto &ndash; ohne
              Eingabe deiner Bankdaten in unserem Shop.
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
