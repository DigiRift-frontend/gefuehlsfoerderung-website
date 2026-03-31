import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Gefühlsförderung — Informationen zur Verarbeitung personenbezogener Daten.",
  alternates: { canonical: "https://gefühlsförderung.de/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-charcoal font-bold">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 space-y-8 text-charcoal-light leading-relaxed">
          {/* 1. Verantwortlicher */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              1. Verantwortlicher
            </h2>
            <p className="mt-2">
              Ewelina Gawlik
              <br />
              Gefühlsförderung für Kinder – Ewelina Gawlik Verlag
              <br />
              Liegnitzerstr. 23
              <br />
              57290 Neunkirchen
              <br />
              E-Mail:{" "}
              <a
                href="mailto:mail@ewelinagawlik.de"
                className="text-lavender-dark hover:underline"
              >
                mail@ewelinagawlik.de
              </a>
              <br />
              Telefon: +49 176 81700389
            </p>
          </div>

          {/* 2. Übersicht */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              2. Übersicht der Verarbeitungen
            </h2>
            <p className="mt-2">
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten
              und die Zwecke ihrer Verarbeitung zusammen und verweist auf die
              betroffenen Personen.
            </p>
          </div>

          {/* 3. Rechtsgrundlagen */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              3. Maßgebliche Rechtsgrundlagen
            </h2>
            <p className="mt-2">
              Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der
              DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten.
              Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO
              nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder
              Sitzland gelten können.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO)</strong>{" "}
                – Die betroffene Person hat ihre Einwilligung in die
                Verarbeitung der sie betreffenden personenbezogenen Daten für
                einen spezifischen Zweck gegeben.
              </li>
              <li>
                <strong>
                  Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1
                  S. 1 lit. b DSGVO)
                </strong>{" "}
                – Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen
                Vertragspartei die betroffene Person ist, oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich.
              </li>
              <li>
                <strong>
                  Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)
                </strong>{" "}
                – Die Verarbeitung ist zur Wahrung der berechtigten Interessen
                des Verantwortlichen oder eines Dritten erforderlich.
              </li>
            </ul>
          </div>

          {/* 4. Hosting */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              4. Bereitstellung des Onlineangebots und Webhosting
            </h2>
            <p className="mt-2">
              Wir verarbeiten die Daten der Nutzer, um ihnen unsere
              Online-Dienste zur Verfügung stellen zu können. Zu diesem Zweck
              verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um
              die Inhalte und Funktionen unserer Online-Dienste an den Browser
              bzw. das Endgerät der Nutzer zu übermitteln.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten,
                Meta-/Kommunikationsdaten, Protokolldaten.
              </li>
              <li>
                <strong>Betroffene Personen:</strong> Nutzer unseres
                Onlineangebotes.
              </li>
              <li>
                <strong>Rechtsgrundlage:</strong> Berechtigte Interessen (Art. 6
                Abs. 1 S. 1 lit. f DSGVO).
              </li>
            </ul>
          </div>

          {/* 5. Kontakt */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              5. Kontaktaufnahme
            </h2>
            <p className="mt-2">
              Bei der Kontaktaufnahme mit uns (z.&nbsp;B. per E-Mail oder
              Kontaktformular) werden die Angaben der anfragenden Person
              verarbeitet, soweit dies zur Beantwortung der Kontaktanfragen und
              etwaiger angefragter Maßnahmen erforderlich ist.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Verarbeitete Datenarten:</strong> Kontaktdaten, Inhalte
                der Anfrage.
              </li>
              <li>
                <strong>Rechtsgrundlage:</strong> Vertragserfüllung und
                vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b DSGVO),
                Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO).
              </li>
            </ul>
          </div>

          {/* 6. Newsletter */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              6. Newsletter und elektronische Benachrichtigungen
            </h2>
            <p className="mt-2">
              Wir versenden Newsletter nur mit der Einwilligung der Empfänger
              oder einer gesetzlichen Erlaubnis. Die Anmeldung zu unserem
              Newsletter erfolgt in einem sogenannten Double-Opt-In-Verfahren.
              D.&nbsp;h., Sie erhalten nach der Anmeldung eine E-Mail, in der
              Sie um die Bestätigung Ihrer Anmeldung gebeten werden.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Verarbeitete Datenarten:</strong> Bestandsdaten, Kontaktdaten,
                Meta-/Kommunikationsdaten, Nutzungsdaten.
              </li>
              <li>
                <strong>Rechtsgrundlage:</strong> Einwilligung (Art. 6 Abs. 1 S.
                1 lit. a DSGVO).
              </li>
              <li>
                <strong>Widerruf:</strong> Sie können den Empfang unseres
                Newsletters jederzeit kündigen, z.&nbsp;B. über den
                Abmeldelink am Ende jedes Newsletters.
              </li>
            </ul>
          </div>

          {/* 7. Shop / E-Commerce */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              7. E-Commerce und Geschäftsprozesse
            </h2>
            <p className="mt-2">
              Wir verarbeiten die Daten unserer Kunden, um ihnen die Auswahl,
              den Erwerb bzw. die Bestellung der gewählten Produkte,
              Waren sowie verbundener Leistungen und deren Bezahlung und
              Zustellung bzw. Ausführung zu ermöglichen.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Verarbeitete Datenarten:</strong> Bestandsdaten,
                Zahlungsdaten, Kontaktdaten, Vertragsdaten.
              </li>
              <li>
                <strong>Rechtsgrundlage:</strong> Vertragserfüllung (Art. 6 Abs.
                1 S. 1 lit. b DSGVO).
              </li>
            </ul>
          </div>

          {/* 8. Cookies */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              8. Einsatz von Cookies
            </h2>
            <p className="mt-2">
              Cookies sind kleine Textdateien bzw. sonstige Speichervermerke,
              die Informationen auf Endgeräten speichern und aus ihnen auslesen.
              Wir verwenden technisch notwendige Cookies, um die Funktionalität
              unserer Website sicherzustellen. Weitere Cookies werden nur mit
              Ihrer Einwilligung gesetzt.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Rechtsgrundlage:</strong> Einwilligung (Art. 6 Abs. 1 S.
                1 lit. a DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1
                lit. f DSGVO).
              </li>
            </ul>
          </div>

          {/* 9. Betroffenenrechte */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              9. Rechte der betroffenen Personen
            </h2>
            <p className="mt-2">
              Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu,
              die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus
                Gründen, die sich aus Ihrer besonderen Situation ergeben,
                jederzeit gegen die Verarbeitung der Sie betreffenden
                personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e
                oder f DSGVO erfolgt, Widerspruch einzulegen.
              </li>
              <li>
                <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das
                Recht, erteilte Einwilligungen jederzeit zu widerrufen.
              </li>
              <li>
                <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine
                Bestätigung darüber zu verlangen, ob betreffende Daten
                verarbeitet werden, und auf Auskunft über diese Daten.
              </li>
              <li>
                <strong>Berichtigungsrecht:</strong> Sie haben das Recht, die
                Vervollständigung oder Berichtigung unrichtiger Daten zu
                verlangen.
              </li>
              <li>
                <strong>Recht auf Löschung:</strong> Sie haben das Recht zu
                verlangen, dass betreffende Daten unverzüglich gelöscht werden.
              </li>
              <li>
                <strong>Recht auf Einschränkung:</strong> Sie haben das Recht,
                die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.
              </li>
              <li>
                <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das
                Recht, die Sie betreffenden Daten in einem strukturierten,
                gängigen und maschinenlesbaren Format zu erhalten.
              </li>
              <li>
                <strong>Beschwerderecht bei Aufsichtsbehörde:</strong> Sie haben
                das Recht, sich bei einer Aufsichtsbehörde zu beschweren, wenn
                Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden
                personenbezogenen Daten gegen die DSGVO verstößt.
              </li>
            </ul>
          </div>

          {/* 10. Änderungen */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              10. Änderung und Aktualisierung der Datenschutzerklärung
            </h2>
            <p className="mt-2">
              Wir bitten Sie, sich regelmäßig über den Inhalt unserer
              Datenschutzerklärung zu informieren. Wir passen die
              Datenschutzerklärung an, sobald die Änderungen der von uns
              durchgeführten Datenverarbeitungen dies erforderlich machen.
            </p>
            <p className="mt-2">Stand: März 2025</p>
          </div>

          <p className="text-sm text-charcoal-lighter">
            Erstellt mit Hilfe von{" "}
            <a
              href="https://datenschutz-generator.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              datenschutz-generator.de
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
