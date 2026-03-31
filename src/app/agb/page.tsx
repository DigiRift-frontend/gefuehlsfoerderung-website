import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen für den Online-Shop von Gefühlsförderung.",
  alternates: { canonical: "https://gefühlsförderung.de/agb" },
};

export default function AGBPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-charcoal font-bold">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="mt-2 text-charcoal-light">
          der Firma Ewelina Gawlik Verlag
        </p>

        <div className="mt-10 space-y-8 text-charcoal-light leading-relaxed">
          {/* §1 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;1 Geltung gegenüber Unternehmern und Begriffsdefinitionen
            </h2>
            <p className="mt-2">
              (1) Die nachfolgenden Allgemeinen Geschäftsbedingungen gelten für
              alle Lieferungen zwischen uns und einem Verbraucher in ihrer zum
              Zeitpunkt der Bestellung gültigen Fassung.
            </p>
            <p className="mt-2">
              Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu
              Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch
              ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können
              (&sect; 13 BGB).
            </p>
          </div>

          {/* §2 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;2 Zustandekommen eines Vertrages, Speicherung des
              Vertragstextes
            </h2>
            <p className="mt-2">
              (1) Die folgenden Regelungen über den Vertragsabschluss gelten für
              Bestellungen über unseren Internetshop.
            </p>
            <p className="mt-2">(2) Im Falle des Vertragsschlusses kommt der Vertrag mit</p>
            <p className="mt-2 pl-4">
              Ewelina Gawlik Verlag
              <br />
              Ewelina Gawlik
              <br />
              Liegnitzerstr. 23
              <br />
              D-57290 Neunkirchen
            </p>
            <p className="mt-2">zustande.</p>
            <p className="mt-2">
              (3) Die Präsentation der Waren in unserem Internetshop stellen
              kein rechtlich bindendes Vertragsangebot unsererseits dar, sondern
              sind nur eine unverbindliche Aufforderung an den Verbraucher, Waren
              zu bestellen. Mit der Bestellung der gewünschten Ware gibt der
              Verbraucher ein für ihn verbindliches Angebot auf Abschluss eines
              Kaufvertrages ab.
            </p>
            <p className="mt-2">
              (4) Bei Eingang einer Bestellung in unserem Internetshop gelten
              folgende Regelungen: Der Verbraucher gibt ein bindendes
              Vertragsangebot ab, indem er die in unserem Internetshop
              vorgesehene Bestellprozedur erfolgreich durchläuft.
            </p>
            <p className="mt-2">Die Bestellung erfolgt in folgenden Schritten:</p>
            <ol className="mt-2 list-decimal pl-6 space-y-1">
              <li>Auswahl der gewünschten Ware</li>
              <li>
                Bestätigen durch Anklicken der Buttons &bdquo;in den
                Warenkorb&ldquo;
              </li>
              <li>Prüfung der Angaben im Warenkorb</li>
              <li>
                Betätigung des Buttons &bdquo;Weiter zur Kasse&ldquo;
              </li>
              <li>Eingabe von Kundendaten und Lieferadresse</li>
              <li>
                Nochmalige Prüfung bzw. Berichtigung der jeweiligen
                eingegebenen Daten
              </li>
              <li>
                Verbindliche Absendung der Bestellung durch Anklicken des
                Buttons &bdquo;kostenpflichtig bestellen&ldquo; bzw.
                &bdquo;kaufen&ldquo;
              </li>
            </ol>
            <p className="mt-2">
              Der Verbraucher kann vor dem verbindlichen Absenden der Bestellung
              durch Betätigen der in dem von ihm verwendeten Internet-Browser
              enthaltenen &bdquo;Zurück&ldquo;-Taste nach Kontrolle seiner
              Angaben wieder zu der Internetseite gelangen, auf der die Angaben
              des Kunden erfasst werden und Eingabefehler berichtigen bzw. durch
              Schließen des Internetbrowsers den Bestellvorgang abbrechen. Wir
              bestätigen den Eingang der Bestellung unmittelbar durch eine
              automatisch generierte E-Mail
              (&bdquo;Auftragsbestätigung&ldquo;). Mit dieser nehmen wir Ihr
              Angebot an.
            </p>
            <p className="mt-2">
              (5) Speicherung des Vertragstextes bei Bestellungen über unseren
              Internetshop: Wir senden Ihnen die Bestelldaten und unsere AGB per
              E-Mail zu. Die AGB können Sie jederzeit auch unter{" "}
              <a href="/agb" className="text-lavender-dark hover:underline">
                unserer AGB-Seite
              </a>{" "}
              einsehen. Ihre Bestelldaten sind aus Sicherheitsgründen nicht mehr
              über das Internet zugänglich.
            </p>
          </div>

          {/* §3 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;3 Preise, Versandkosten, Zahlung, Fälligkeit
            </h2>
            <p className="mt-2">
              (1) Die angegebenen Preise sind Endpreise zzgl. Versandkosten.
              Gemäß &sect; 19 UStG erheben wir keine Umsatzsteuer und weisen
              diese folglich auch nicht aus (Kleinunternehmerstatus).
            </p>
            <p className="mt-2">
              (2) Der Verbraucher hat die Möglichkeit der Zahlung per Vorkasse,
              PayPal, Kreditkarte (Visa, Mastercard).
            </p>
            <p className="mt-2">
              (3) Hat der Verbraucher die Zahlung per Vorkasse gewählt, so
              verpflichtet er sich, den Kaufpreis unverzüglich nach
              Vertragsschluss zu zahlen.
            </p>
          </div>

          {/* §4 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;4 Lieferung
            </h2>
            <p className="mt-2">
              (1) Sofern wir dies in der Produktbeschreibung nicht deutlich
              anders angegeben haben, sind alle von uns angebotenen Artikel
              sofort versandfertig. Die Lieferung erfolgt hier spätestens
              innerhalb von 5 Werktagen. Dabei beginnt die Frist für die
              Lieferung im Falle der Zahlung per Vorkasse am Tag nach
              Zahlungsauftrag an die mit der Überweisung beauftragte Bank und
              bei allen anderen Zahlungsarten am Tag nach Vertragsschluss zu
              laufen. Fällt das Fristende auf einen Samstag, Sonntag oder
              gesetzlichen Feiertag am Lieferort, so endet die Frist am
              nächsten Werktag.
            </p>
            <p className="mt-2">
              (2) Die Gefahr des zufälligen Untergangs und der zufälligen
              Verschlechterung der verkauften Sache geht auch beim
              Versendungskauf erst mit der Übergabe der Sache an den Käufer auf
              diesen über.
            </p>
          </div>

          {/* §5 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;5 Eigentumsvorbehalt
            </h2>
            <p className="mt-2">
              Wir behalten uns das Eigentum an der Ware bis zur vollständigen
              Bezahlung des Kaufpreises vor.
            </p>
          </div>

          {/* §6 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;6 Widerrufsrecht des Kunden als Verbraucher
            </h2>
            <p className="mt-4 font-semibold text-charcoal">
              Widerrufsrecht für Verbraucher
            </p>
            <p className="mt-2">
              Verbrauchern steht ein Widerrufsrecht nach folgender Maßgabe zu,
              wobei Verbraucher jede natürliche Person ist, die ein
              Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer
              gewerblichen noch ihrer selbständigen beruflichen Tätigkeit
              zugerechnet werden können:
            </p>
            <p className="mt-4 font-semibold text-charcoal">
              Widerrufsbelehrung
            </p>
            <p className="mt-2 font-medium text-charcoal">Widerrufsrecht</p>
            <p className="mt-2">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
              diesen Vertrag zu widerrufen.
            </p>
            <p className="mt-2">
              Die Widerrufsfrist beträgt vierzehn Tage, ab dem Tag, an dem Sie
              oder ein von Ihnen benannter Dritter, der nicht der Beförderer
              ist, die Waren in Besitz genommen haben bzw. hat.
            </p>
            <p className="mt-2">
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
            </p>
            <p className="mt-2 pl-4">
              Ewelina Gawlik Verlag
              <br />
              Ewelina Gawlik
              <br />
              Liegnitzerstr. 23
              <br />
              D-57290 Neunkirchen
              <br />
              E-Mail{" "}
              <a
                href="mailto:mail@ewelinagawlik.de"
                className="text-lavender-dark hover:underline"
              >
                mail@ewelinagawlik.de
              </a>
            </p>
            <p className="mt-2">
              mittels einer eindeutigen Erklärung (z.B. ein mit der Post
              versandter Brief, Telefax oder E-Mail) über Ihren Entschluss,
              diesen Vertrag zu widerrufen, informieren. Sie können dafür das
              beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht
              vorgeschrieben ist.
            </p>
            <p className="mt-4 font-medium text-charcoal">Widerrufsfolgen</p>
            <p className="mt-2">
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
              Zahlungen, die wir von Ihnen erhalten haben, einschließlich der
              Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich
              daraus ergeben, dass Sie eine andere Art der Lieferung als die von
              uns angebotene, günstigste Standardlieferung gewählt haben),
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
              zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses
              Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden
              wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
              Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
              ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen
              wegen dieser Rückzahlung Entgelte berechnet.
            </p>
            <p className="mt-2">
              Wir können die Rückzahlung verweigern, bis wir die Waren wieder
              zurückerhalten haben oder bis Sie den Nachweis erbracht haben,
              dass Sie die Waren zurückgesandt haben, je nachdem, welches der
              frühere Zeitpunkt ist.
            </p>
            <p className="mt-2">
              Sie haben die Waren unverzüglich und in jedem Fall spätestens
              binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf
              dieses Vertrages unterrichten, an uns zurückzusenden oder zu
              übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf
              der Frist von vierzehn Tagen absenden.
            </p>
            <p className="mt-2">
              Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
            </p>
            <p className="mt-2 text-sm text-charcoal-lighter italic">
              Ende der Widerrufsbelehrung
            </p>
          </div>

          {/* §7 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;7 Widerrufsformular
            </h2>
            <p className="mt-2 font-medium text-charcoal">
              Muster-Widerrufsformular
            </p>
            <p className="mt-2 italic">
              (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte
              dieses Formular aus und senden Sie es zurück.)
            </p>
            <div className="mt-4 bg-cream/50 rounded-xl p-6 border border-lavender/10 space-y-3">
              <p>An:</p>
              <p className="pl-4">
                Ewelina Gawlik Verlag
                <br />
                Ewelina Gawlik
                <br />
                Liegnitzerstr. 23
                <br />
                D-57290 Neunkirchen
                <br />
                E-Mail{" "}
                <a
                  href="mailto:mail@ewelinagawlik.de"
                  className="text-lavender-dark hover:underline"
                >
                  mail@ewelinagawlik.de
                </a>
              </p>
              <p>
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
                abgeschlossenen Vertrag über den Kauf der folgenden Waren
                (*)/die Erbringung der folgenden Dienstleistung (*)
              </p>
              <p className="border-b border-charcoal/20 pb-1">
                &nbsp;
              </p>
              <p>Bestellt am (*)/erhalten am (*)</p>
              <p className="border-b border-charcoal/20 pb-1 max-w-xs">
                &nbsp;
              </p>
              <p>Name des/der Verbraucher(s)</p>
              <p className="border-b border-charcoal/20 pb-1">
                &nbsp;
              </p>
              <p>Anschrift des/der Verbraucher(s)</p>
              <p className="border-b border-charcoal/20 pb-1">
                &nbsp;
              </p>
              <p>
                Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf
                Papier)
              </p>
              <p className="border-b border-charcoal/20 pb-1 max-w-xs">
                &nbsp;
              </p>
              <p>Datum</p>
              <p className="border-b border-charcoal/20 pb-1 max-w-xs">
                &nbsp;
              </p>
              <p className="text-sm text-charcoal-lighter">
                (*) Unzutreffendes streichen.
              </p>
            </div>
          </div>

          {/* §8 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;8 Gewährleistung
            </h2>
            <p className="mt-2">
              Es gelten die gesetzlichen Gewährleistungsregelungen.
            </p>
          </div>

          {/* §9 */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              &sect;9 Vertragssprache
            </h2>
            <p className="mt-2">
              Als Vertragssprache steht ausschließlich Deutsch zur Verfügung.
            </p>
          </div>

          <p className="text-sm text-charcoal-lighter">
            Stand der AGB: Jun. 2022
          </p>
        </div>
      </div>
    </section>
  );
}
