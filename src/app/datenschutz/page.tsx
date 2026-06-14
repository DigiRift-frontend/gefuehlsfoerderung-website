import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von Gefühlsförderung — Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  alternates: { canonical: "https://gefühlsförderung.de/datenschutz" },
};

// Hinweis: Quelle/kanonische Fassung dieses Texts liegt unter
// docs/datenschutzerklaerung.md. Bei Änderungen beide synchron halten.
// Mit „[bitte ergänzen …]" markierte Stellen muss die Betreiberin vor
// Veröffentlichung ausfüllen/bestätigen.

function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 rounded bg-gold/25 px-1.5 py-0.5 text-sm text-charcoal">
      {children}
    </span>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl border border-gold/25 bg-gold/10 p-4 text-sm text-charcoal-light">
      {children}
    </div>
  );
}

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-2xl border border-lavender/15 bg-lavender/5 p-4 text-charcoal">
      {children}
    </div>
  );
}

const extLink = "text-lavender-dark hover:underline";

export default function DatenschutzPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-charcoal font-bold">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 space-y-8 text-charcoal-light leading-relaxed">
          <p>
            Diese Datenschutzerklärung informiert Sie über die Art, den Umfang
            und die Zwecke der Verarbeitung personenbezogener Daten im Rahmen
            unseres Online-Angebots unter der Domain gefühlsförderung.de sowie
            der damit verbundenen Funktionen (Onlineshop, Newsletter, Quiz,
            Kontaktformular). Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend den gesetzlichen
            Datenschutzvorschriften, insbesondere der
            Datenschutz-Grundverordnung (DSGVO) und dem
            Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG).
          </p>

          {/* 1 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              1. Verantwortlicher und Kontakt
            </h2>
            <p className="mt-2">
              Verantwortlich für die Datenverarbeitung auf dieser Website im
              Sinne von Art. 4 Nr. 7 DSGVO ist:
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">Ewelina Gawlik</strong>
              <br />
              Gefühlsförderung für Kinder – Ewelina Gawlik Verlag
              <br />
              Liegnitzerstr. 23
              <br />
              57290 Neunkirchen (Siegerland), Nordrhein-Westfalen
              <br />
              Deutschland
            </p>
            <p className="mt-3">
              E-Mail:{" "}
              <a href="mailto:mail@ewelinagawlik.de" className={extLink}>
                mail@ewelinagawlik.de
              </a>
              <br />
              Telefon: +49 176 81700389
            </p>
            <p className="mt-3">
              Bei allen Fragen zum Datenschutz sowie zur Wahrnehmung Ihrer
              Betroffenenrechte wenden Sie sich bitte direkt an die oben
              genannte verantwortliche Person.
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">
                Datenschutzbeauftragter:
              </strong>{" "}
              Wir sind gesetzlich nicht verpflichtet, einen
              Datenschutzbeauftragten zu benennen, da kein Kerngeschäft in der
              umfangreichen Verarbeitung besonders sensibler Daten oder in einer
              umfangreichen regelmäßigen Beobachtung von Personen besteht.
              Ansprechpartnerin in Datenschutzfragen ist daher die oben
              genannte Verantwortliche.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              2. Allgemeines zur Datenverarbeitung
            </h2>
            <p className="mt-2">
              <strong className="text-charcoal">Geltungsbereich.</strong> Diese
              Erklärung gilt für die Datenverarbeitung auf unserer Website und
              den darüber angebotenen Funktionen. Für externe Angebote (z.&nbsp;B.
              die Websites verlinkter Dritter oder der nachfolgend genannten
              Zahlungsdienstleister) gelten deren eigene
              Datenschutzbestimmungen.
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">Begriffe.</strong> Wir verwenden
              die Begriffe der DSGVO. „Personenbezogene Daten" sind alle
              Informationen, die sich auf eine identifizierte oder
              identifizierbare natürliche Person beziehen (z.&nbsp;B. Name,
              E-Mail-Adresse, IP-Adresse). „Verarbeitung" ist jeder Vorgang im
              Zusammenhang mit solchen Daten (z.&nbsp;B. Erheben, Speichern,
              Nutzen, Übermitteln, Löschen).
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">
                Maßgebliche Rechtsgrundlagen.
              </strong>{" "}
              Soweit wir nachfolgend keine spezifische Rechtsgrundlage nennen,
              gilt Folgendes:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Art. 6 Abs. 1 lit. a DSGVO
                </strong>{" "}
                (Einwilligung) – wenn Sie uns Ihre Einwilligung erteilt haben
                (z.&nbsp;B. Newsletter, Quiz-Lead).
              </li>
              <li>
                <strong className="text-charcoal">
                  Art. 6 Abs. 1 lit. b DSGVO
                </strong>{" "}
                (Vertrag / vorvertragliche Maßnahmen) – wenn die Verarbeitung
                zur Erfüllung eines Vertrags mit Ihnen oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist (z.&nbsp;B.
                Bestellabwicklung, vertragsbezogene Anfragen).
              </li>
              <li>
                <strong className="text-charcoal">
                  Art. 6 Abs. 1 lit. c DSGVO
                </strong>{" "}
                (rechtliche Verpflichtung) – wenn wir gesetzliche Pflichten
                erfüllen müssen (z.&nbsp;B. handels- und steuerrechtliche
                Aufbewahrung).
              </li>
              <li>
                <strong className="text-charcoal">
                  Art. 6 Abs. 1 lit. f DSGVO
                </strong>{" "}
                (berechtigtes Interesse) – wenn die Verarbeitung zur Wahrung
                unserer berechtigten Interessen erforderlich ist und Ihre
                Interessen nicht überwiegen (z.&nbsp;B. sichere und stabile
                Bereitstellung der Website, Missbrauchsschutz).
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-charcoal">
                Pflicht zur Bereitstellung der Daten.
              </strong>{" "}
              Soweit nachfolgend nicht anders angegeben, ist die Bereitstellung
              Ihrer Daten weder gesetzlich noch vertraglich vorgeschrieben und
              erfolgt freiwillig. Bestimmte Daten sind jedoch für die jeweilige
              Funktion erforderlich: Ohne Angabe der als Pflichtfeld
              gekennzeichneten Daten können wir die betreffende Leistung nicht
              erbringen – etwa Ihre Bestellung oder Anfrage nicht bearbeiten
              bzw. Ihnen den Newsletter nicht zusenden. Die jeweiligen Hinweise
              finden Sie bei den einzelnen Verarbeitungen (Ziffern 6 bis 9).
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">Ansprache.</strong> Aus Gründen
              der Lesbarkeit verwenden wir in diesem Rechtstext die Sie-Form.
              Die Angaben gelten für alle Geschlechter gleichermaßen.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              3. Bereitstellung der Website, Webhosting und Server-Logfiles
            </h2>
            <p className="mt-2">
              Beim Aufruf unserer Website werden technisch erforderliche Daten
              verarbeitet, um die Seite an Ihren Browser auszuliefern und den
              sicheren, stabilen Betrieb zu gewährleisten.
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">Hosting.</strong> Unsere Website
              (eine Next.js-Anwendung) wird auf Servern der{" "}
              <strong className="text-charcoal">Hetzner Online GmbH</strong>,
              Industriestr. 25, 91710 Gunzenhausen, Deutschland, gehostet. Die
              Server befinden sich in Deutschland bzw. innerhalb der EU. Hetzner
              verarbeitet die im Rahmen des Hostings anfallenden Daten in
              unserem Auftrag als Auftragsverarbeiter (Art. 28 DSGVO).{" "}
              <Todo>
                [bitte ergänzen/bestätigen: konkreter Hosting-Anbieter und
                Serverstandort durch den Betreiber bestätigen lassen]
              </Todo>
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">Server-Logfiles.</strong> Bei
              jedem Abruf erhebt das System automatisiert technische
              Zugriffsdaten, die Ihr Browser übermittelt:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Verarbeitete Datenarten:
                </strong>{" "}
                IP-Adresse, Datum und Uhrzeit des Abrufs, die konkret abgerufene
                Ressource/Seite, übertragene Datenmenge, Browsertyp und -version
                sowie Betriebssystem (User-Agent) und – sofern übermittelt – die
                zuvor besuchte Seite (Referrer).
              </li>
              <li>
                <strong className="text-charcoal">Zweck:</strong> Auslieferung
                der Inhalte, Gewährleistung der Funktionsfähigkeit, Stabilität
                und Sicherheit der IT-Systeme sowie Erkennung und Abwehr von
                Angriffen und Missbrauch.
              </li>
              <li>
                <strong className="text-charcoal">Rechtsgrundlage:</strong> Art.
                6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem technisch
                fehlerfreien und sicheren Betrieb des Online-Angebots).
              </li>
              <li>
                <strong className="text-charcoal">Empfänger:</strong> Hetzner
                Online GmbH als Auftragsverarbeiter.
              </li>
              <li>
                <strong className="text-charcoal">Speicherdauer:</strong>{" "}
                Server-Logfiles werden spätestens nach{" "}
                <Todo>
                  [bitte ergänzen: konkrete Regelfrist, z.&nbsp;B. 7 oder 14 Tage
                  – beim Hosting-Anbieter erfragen]
                </Todo>{" "}
                gelöscht oder so gekürzt, dass kein Personenbezug mehr besteht.
                Eine Zusammenführung dieser Daten mit anderen Datenquellen zu
                Ihrer Identifizierung erfolgt durch uns nicht.
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-charcoal">
                Rate-Limiting / Missbrauchsschutz der Formulare.
              </strong>{" "}
              Um automatisierten Missbrauch unserer Formular-Endpunkte (z.&nbsp;B.
              Kontakt, Newsletter, Quiz) zu verhindern, zählen wir Anfragen pro
              Client-IP-Adresse. Die IP-Adresse wird dabei{" "}
              <strong className="text-charcoal">
                ausschließlich flüchtig im Arbeitsspeicher
              </strong>{" "}
              verarbeitet und nicht dauerhaft gespeichert.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">Zweck:</strong> Schutz vor
                Spam und Überlastung (Missbrauchsschutz).
              </li>
              <li>
                <strong className="text-charcoal">Rechtsgrundlage:</strong> Art.
                6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Abwehr von
                Missbrauch).
              </li>
              <li>
                <strong className="text-charcoal">Speicherdauer:</strong> keine
                dauerhafte Speicherung; die flüchtigen Zählwerte werden nach
                kurzer Zeit automatisch verworfen.
              </li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              4. Cookies und lokale Speicherung im Browser
            </h2>
            <p className="mt-2">
              <strong className="text-charcoal">
                Wir setzen keine Tracking-Cookies ein.
              </strong>{" "}
              Unsere Website verwendet <strong>kein</strong> Webanalyse-Tool,{" "}
              <strong>kein</strong> Google Analytics oder Google Tag Manager,{" "}
              <strong>keinen</strong> Meta-/Facebook-Pixel und keine
              vergleichbaren Statistik-, Reichweiten- oder Marketing-Dienste. Es
              findet kein nutzerbezogenes Tracking statt.
            </p>
            <p className="mt-3">
              Genutzt wird ausschließlich eine{" "}
              <strong className="text-charcoal">
                technisch notwendige bzw. funktionale Speicherung
              </strong>{" "}
              im sogenannten <code className="text-sm">localStorage</code> Ihres
              Browsers. Diese Einträge verbleiben auf Ihrem Endgerät und werden{" "}
              <strong className="text-charcoal">
                nicht an uns und nicht an Dritte übertragen
              </strong>
              . Im Einzelnen handelt es sich um:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                den <strong className="text-charcoal">Inhalt Ihres Warenkorbs</strong>{" "}
                (Schlüssel <code className="text-sm">gefuehlsfoerderung-cart</code>),
              </li>
              <li>
                den{" "}
                <strong className="text-charcoal">
                  Status Ihrer Cookie-/Speicher-Auswahl
                </strong>{" "}
                (Consent-Status, Schlüssel{" "}
                <code className="text-sm">cookie-consent</code>),
              </li>
              <li>
                einen{" "}
                <strong className="text-charcoal">
                  lokalen Merker zur Newsletter-Anmeldung
                </strong>{" "}
                (Schlüssel{" "}
                <code className="text-sm">newsletter-subscribed</code>); dieser
                enthält die von Ihnen eingegebene{" "}
                <strong className="text-charcoal">E-Mail-Adresse</strong>, den{" "}
                <strong className="text-charcoal">Vornamen</strong> und den
                Anmeldezeitpunkt, verbleibt jedoch ausschließlich in Ihrem
                Browser und wird nicht an uns oder Dritte übertragen,
              </li>
              <li>
                einen{" "}
                <strong className="text-charcoal">
                  Merker, ob ein Hinweis-/Popup (Newsletter) bereits
                  ausgeblendet wurde
                </strong>{" "}
                (Schlüssel{" "}
                <code className="text-sm">quiz-popup-dismissed</code>).
              </li>
            </ul>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">Zweck:</strong> Bereitstellung
                grundlegender Website-Funktionen, die Sie ausdrücklich
                angefordert haben (z.&nbsp;B. Warenkorb), sowie Komfortfunktionen
                (z.&nbsp;B. wiederholte Hinweise nicht erneut anzuzeigen).
              </li>
              <li>
                <strong className="text-charcoal">
                  Rechtsgrundlage / Erlaubnis der Speicherung:
                </strong>{" "}
                Die Speicherung von Informationen in Ihrem Endgerät bzw. der
                Zugriff darauf ist nach{" "}
                <strong className="text-charcoal">§ 25 Abs. 2 TDDDG</strong> ohne
                Einwilligung zulässig, da sie unbedingt erforderlich ist, um den
                von Ihnen ausdrücklich gewünschten Dienst zur Verfügung zu
                stellen. Eine Einwilligung ist hierfür nicht erforderlich.
                Soweit damit zugleich personenbezogene Daten verarbeitet werden,
                stützt sich dies auf Art. 6 Abs. 1 lit. f DSGVO
                (Funktionsfähigkeit und Nutzerfreundlichkeit der Website).
              </li>
              <li>
                <strong className="text-charcoal">Speicherdauer:</strong> Die
                Einträge verbleiben im{" "}
                <code className="text-sm">localStorage</code>, bis Sie diese in
                Ihren Browser-Einstellungen löschen. Sie können die lokale
                Speicherung jederzeit über Ihren Browser zurücksetzen; dadurch
                kann allerdings die Funktionsfähigkeit einzelner Bereiche
                (z.&nbsp;B. Warenkorb) eingeschränkt werden.
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-charcoal">
                Hinweis zu Drittinhalten auf der Kassenseite.
              </strong>{" "}
              Die vorstehende Aussage, dass keine Übertragung an Dritte erfolgt,
              bezieht sich auf unsere <strong>eigene</strong> lokale Speicherung.
              Hiervon zu unterscheiden ist die Kassenseite („/checkout"): Dort
              wird zur Zahlungsabwicklung ein{" "}
              <strong className="text-charcoal">Drittdienst (Klarna-SDK)</strong>{" "}
              geladen, der eigene Speichertechnologien einsetzen und Daten an
              Klarna übermitteln kann. Einzelheiten hierzu finden Sie in Ziffer
              10.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              5. Schriftarten (lokale Einbindung)
            </h2>
            <p className="mt-2">
              Zur einheitlichen Darstellung unserer Inhalte verwenden wir die
              Schriftarten „Caveat" und „Nunito". Diese werden über die Funktion{" "}
              <code className="text-sm">next/font</code>{" "}
              <strong className="text-charcoal">
                bereits zur Erstellungszeit (Build) der Website heruntergeladen
                und anschließend lokal von unserem eigenen Server ausgeliefert
              </strong>
              .
            </p>
            <p className="mt-3">
              Beim Aufruf unserer Seiten wird daher{" "}
              <strong className="text-charcoal">
                keine Verbindung zu Servern von Google oder anderen Dritten
              </strong>{" "}
              hergestellt; es findet insoweit auch keine Übermittlung Ihrer
              IP-Adresse an Google statt.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">Zweck:</strong> einheitliche
                und ansprechende Darstellung der Website.
              </li>
              <li>
                <strong className="text-charcoal">Rechtsgrundlage:</strong> Art.
                6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
                ansprechenden, ausfallsicheren und datenschutzfreundlichen
                Darstellung).
              </li>
            </ul>
            <p className="mt-3">
              Auch alle auf der Website verwendeten Bilder werden von unserem
              eigenen Server ausgeliefert. Ein externes Bild-CDN wird nicht
              eingesetzt.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              6. Kontaktaufnahme und Kontaktformular
            </h2>
            <p className="mt-2">
              Auf unserer Seite „/kontakt" können Sie uns über ein
              Kontaktformular erreichen. Alternativ können Sie uns per E-Mail
              oder Telefon kontaktieren.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Verarbeitete Datenarten:
                </strong>{" "}
                Art Ihres Anliegens (Auswahl), Name, E-Mail-Adresse, Inhalt
                Ihrer Nachricht sowie ggf. weitere von Ihnen freiwillig gemachte
                Angaben. Zum Schutz vor automatisierten Spam-Nachrichten setzen
                wir ein nicht sichtbares Honeypot-Feld ein.
              </li>
              <li>
                <strong className="text-charcoal">Zweck:</strong> Bearbeitung
                und Beantwortung Ihrer Anfrage und damit verbundene
                Anschlusskommunikation.
              </li>
              <li>
                <strong className="text-charcoal">Rechtsgrundlage:</strong> bei
                Anfragen mit Bezug zu einem Vertrag oder einer Bestellung Art. 6
                Abs. 1 lit. b DSGVO; bei sonstigen, allgemeinen Anfragen Art. 6
                Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
                von Anliegen).
              </li>
              <li>
                <strong className="text-charcoal">Empfänger:</strong> Ihre
                Nachricht wird als E-Mail an{" "}
                <code className="text-sm">mail@ewelinagawlik.de</code> zugestellt
                (mit Ihrer Adresse als Antwortadresse/Reply-To). Für den
                technischen Versand setzen wir unseren Auftragsverarbeiter für
                Transaktions- und Versandmails ein (siehe Ziffer 12).
              </li>
              <li>
                <strong className="text-charcoal">
                  Pflicht zur Bereitstellung:
                </strong>{" "}
                Die Angabe der als Pflichtfeld gekennzeichneten Daten
                (insbesondere E-Mail-Adresse und Nachricht) ist erforderlich,
                damit wir Ihre Anfrage bearbeiten und beantworten können. Ohne
                diese Angaben ist eine Bearbeitung nicht möglich.
              </li>
              <li>
                <strong className="text-charcoal">Speicherdauer:</strong> Wir
                speichern Ihre Anfrage, bis sie abschließend bearbeitet ist und
                keine Anhaltspunkte mehr dafür bestehen, dass eine weitere
                Aufbewahrung erforderlich ist. Soweit Anfragen vertrags- oder
                geschäftsbezogen sind, gelten die gesetzlichen
                Aufbewahrungsfristen (siehe Ziffer 9 und 15).
              </li>
            </ul>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              7. Newsletter
            </h2>
            <p className="mt-2">
              Sie können auf unserer Website unseren kostenlosen Newsletter
              abonnieren. Hierfür verwenden wir das{" "}
              <strong className="text-charcoal">Double-Opt-in-Verfahren</strong>:
              Nach Ihrer Anmeldung erhalten Sie eine E-Mail mit einem
              Bestätigungslink. Erst nach Klick auf diesen Link (Bestätigung
              über die Seite „/newsletter/bestaetigt") wird Ihre E-Mail-Adresse
              in den Verteiler aufgenommen. So stellen wir sicher, dass die
              Anmeldung tatsächlich von Ihnen stammt.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Verarbeitete Datenarten:
                </strong>{" "}
                E-Mail-Adresse und Vorname; zum Nachweis der Einwilligung zudem
                die Anmelde- und Bestätigungszeitpunkte sowie ggf. die
                verwendete IP-Adresse (Protokollierung des Double-Opt-in durch
                unseren E-Mail-Dienstleister).{" "}
                <Todo>
                  [bitte prüfen: ob DigiLetter die IP-Adresse tatsächlich
                  protokolliert; falls nein, die IP-Angabe streichen]
                </Todo>
              </li>
              <li>
                <strong className="text-charcoal">Zweck:</strong> regelmäßige
                Information über unsere Angebote, Inhalte und Aktionen per
                E-Mail.
              </li>
              <li>
                <strong className="text-charcoal">Rechtsgrundlage:</strong> Ihre
                Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Die Protokollierung
                der Anmeldedaten zum Nachweis der ordnungsgemäß erteilten
                Einwilligung stützt sich auf Art. 6 Abs. 1 lit. f DSGVO i.&nbsp;V.&nbsp;m.
                der Nachweis- und Rechenschaftspflicht aus Art. 7 Abs. 1 und
                Art. 5 Abs. 2 DSGVO.
              </li>
              <li>
                <strong className="text-charcoal">Willkommensgeschenk:</strong>{" "}
                Nach erfolgreicher Bestätigung erhalten Sie als Dankeschön einen
                kostenlosen PDF-Mini-Guide.
              </li>
              <li>
                <strong className="text-charcoal">Empfänger:</strong> Versand und
                Verwaltung erfolgen über unseren Auftragsverarbeiter für
                E-Mail-Versand (Liste „newsletter", siehe Ziffer 12).
              </li>
              <li>
                <strong className="text-charcoal">
                  Pflicht zur Bereitstellung:
                </strong>{" "}
                Die Angabe Ihrer E-Mail-Adresse ist erforderlich, um Ihnen den
                Newsletter zusenden zu können; ohne sie ist ein Versand nicht
                möglich. Die Angabe des Vornamens dient der persönlichen
                Ansprache und ist freiwillig, sofern nicht als Pflichtfeld
                gekennzeichnet.
              </li>
              <li>
                <strong className="text-charcoal">Widerruf / Abmeldung:</strong>{" "}
                Sie können Ihre Einwilligung jederzeit mit Wirkung für die
                Zukunft widerrufen und den Newsletter abbestellen – über den
                Abmeldelink in jeder Newsletter-E-Mail oder durch Nachricht an
                uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
                Verarbeitung bleibt unberührt.
              </li>
              <li>
                <strong className="text-charcoal">Speicherdauer:</strong> Wir
                verarbeiten Ihre Daten für den Newsletter, bis Sie sich
                abmelden. Die Nachweisdaten zur Einwilligung werden für die Dauer
                möglicher Nachweispflichten aufbewahrt.
              </li>
            </ul>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              8. Quiz / Lead-Generierung
            </h2>
            <p className="mt-2">
              Auf unserer Seite „/quiz" bieten wir ein interaktives Quiz an. Die
              Auswertung des Quiz erfolgt{" "}
              <strong className="text-charcoal">
                clientseitig in Ihrem Browser
              </strong>
              .
            </p>
            <p className="mt-3">
              Sie können das Quiz{" "}
              <strong className="text-charcoal">
                ohne Angabe einer E-Mail-Adresse
              </strong>{" "}
              nutzen und das Ergebnis über die Option „Ohne E-Mail fortfahren"
              ansehen. In diesem Fall werden{" "}
              <strong className="text-charcoal">
                keine personenbezogenen Daten an uns übermittelt
              </strong>
              .
            </p>
            <p className="mt-3">
              Nur wenn Sie Ihre E-Mail-Adresse{" "}
              <strong className="text-charcoal">freiwillig</strong> angeben, um
              Ihr Ergebnis bzw. weiterführende Inhalte per E-Mail zu erhalten,
              verarbeiten wir folgende Daten:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Verarbeitete Datenarten:
                </strong>{" "}
                E-Mail-Adresse, Vorname sowie Ihr Quiz-Ergebnis in Form einer
                Kategorie-Kennung (Tag A–E).
              </li>
              <li>
                <strong className="text-charcoal">Zweck:</strong> Zusendung Ihres
                Quiz-Ergebnisses und passender Folgeinformationen per E-Mail.
              </li>
              <li>
                <strong className="text-charcoal">
                  Verfahren / Rechtsgrundlage:
                </strong>{" "}
                Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Auch hier
                kommt das Double-Opt-in-Verfahren zum Einsatz; ein Widerruf ist
                jederzeit über den Abmeldelink möglich.
              </li>
              <li>
                <strong className="text-charcoal">Empfänger:</strong> unser
                Auftragsverarbeiter für E-Mail-Versand (Liste „quiz", siehe
                Ziffer 12).
              </li>
              <li>
                <strong className="text-charcoal">
                  Pflicht zur Bereitstellung:
                </strong>{" "}
                Die Angabe einer E-Mail-Adresse ist vollständig freiwillig. Das
                Quiz lässt sich ohne E-Mail-Angabe nutzen; ohne Ihre
                E-Mail-Adresse können wir Ihnen das Ergebnis allerdings nicht per
                E-Mail zusenden.
              </li>
              <li>
                <strong className="text-charcoal">Speicherdauer:</strong> bis zu
                Ihrem Widerruf bzw. Ihrer Abmeldung.
              </li>
            </ul>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              9. Onlineshop und Bestellabwicklung
            </h2>
            <p className="mt-2">
              Zur Abwicklung von Bestellungen über unseren Onlineshop
              („/checkout") verarbeiten wir die hierfür erforderlichen Daten.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Verarbeitete Datenarten:
                </strong>{" "}
                Bestandsdaten und Kontaktdaten (z.&nbsp;B. Name, E-Mail-Adresse),
                Liefer- und Rechnungsanschrift sowie Vertrags- und Zahlungsdaten
                (bestellte Produkte, Bestellsumme, gewählte Zahlart,
                Bestelldatum).
              </li>
              <li>
                <strong className="text-charcoal">Zweck:</strong> Begründung,
                Durchführung und Abwicklung des Kaufvertrags, einschließlich
                Bestellbestätigung, Bereitstellung der erworbenen (digitalen)
                Produkte sowie Kundenkommunikation.
              </li>
              <li>
                <strong className="text-charcoal">Rechtsgrundlage:</strong> Art.
                6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Für die handels- und
                steuerrechtliche Aufbewahrung der Bestell- und Rechnungsdaten:
                Art. 6 Abs. 1 lit. c DSGVO i.&nbsp;V.&nbsp;m. den gesetzlichen
                Aufbewahrungspflichten.
              </li>
              <li>
                <strong className="text-charcoal">
                  Empfänger / Verarbeitung:
                </strong>{" "}
                Wir betreiben{" "}
                <strong className="text-charcoal">
                  keine eigene Bestelldatenbank
                </strong>{" "}
                auf der Website. Die Bestelldaten liegen vielmehr beim jeweils
                gewählten Zahlungsdienstleister (siehe Ziffer 10) sowie – im
                Rahmen der Bestellbestätigung an Sie und der internen
                Benachrichtigung an uns – in den beteiligten E-Mail-Postfächern.
                Der E-Mail-Versand erfolgt über unseren Auftragsverarbeiter
                (siehe Ziffer 12).
              </li>
              <li>
                <strong className="text-charcoal">
                  Pflicht zur Bereitstellung:
                </strong>{" "}
                Zur Begründung und Abwicklung des Kaufvertrags ist die
                Bereitstellung der als Pflichtfeld gekennzeichneten Bestands-,
                Kontakt-, Rechnungs- und Zahlungsdaten erforderlich. Ohne diese
                Daten können wir den Vertrag nicht schließen und Ihre Bestellung
                nicht ausführen.
              </li>
              <li>
                <strong className="text-charcoal">Speicherdauer:</strong>{" "}
                Bestell- und Rechnungsdaten werden im Rahmen der gesetzlichen
                Aufbewahrungspflichten gespeichert. Nach{" "}
                <strong className="text-charcoal">§ 257 HGB</strong> und{" "}
                <strong className="text-charcoal">§ 147 AO</strong> bestehen
                Aufbewahrungsfristen von 6 bzw. 10 Jahren (gerechnet ab Ende des
                jeweiligen Kalenderjahres). Daten, die keinen gesetzlichen
                Aufbewahrungspflichten unterliegen, löschen wir, sobald sie für
                die Vertragsabwicklung nicht mehr erforderlich sind.
              </li>
            </ul>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              10. Zahlungsdienstleister
            </h2>
            <p className="mt-2">
              Im Bestellprozess können Sie zwischen verschiedenen Zahlungsarten
              wählen. Die jeweiligen Zahlungsdienstleister verarbeiten Ihre
              Zahlungs- und ggf. weitere Daten in eigener Verantwortung als{" "}
              <strong className="text-charcoal">eigene Verantwortliche</strong>.
              Es gelten insoweit ergänzend deren Datenschutzbestimmungen.
            </p>

            <h3 className="mt-5 text-lg font-semibold text-charcoal">Klarna</h3>
            <p className="mt-2">
              Anbieter:{" "}
              <strong className="text-charcoal">Klarna Bank AB (publ)</strong>,
              Sveavägen 46, 111 34 Stockholm, Schweden.
            </p>
            <p className="mt-3">
              Bereits{" "}
              <strong className="text-charcoal">
                beim Aufruf unserer Kassenseite („/checkout") wird das
                Klarna-SDK von der Adresse{" "}
                <code className="text-sm">x.klarnacdn.net</code> geladen
              </strong>{" "}
              – unabhängig davon, ob Sie Klarna anschließend tatsächlich als
              Zahlungsart auswählen. Dadurch erhält Klarna schon beim Laden der
              Kasse bestimmte Geräte- und Nutzungsdaten (u.&nbsp;a. IP-Adresse und
              Browserinformationen); das Klarna-SDK kann zudem clientseitig
              eigene Speichertechnologien (z.&nbsp;B. Cookies oder vergleichbare
              Einträge) einsetzen. Bei Durchführung der Zahlung verarbeitet
              Klarna darüber hinaus Name, Anschrift, E-Mail-Adresse sowie
              Warenkorb- und Bestelldaten.
            </p>
            <p className="mt-3">
              Bei Auswahl von Rechnungs- oder Ratenkauf führt Klarna{" "}
              <strong className="text-charcoal">
                eigenverantwortlich Identitäts-, Betrugs- und ggf.
                Bonitätsprüfungen
              </strong>{" "}
              durch und kann hierzu Auskunfteien einbinden. Auf Inhalt und
              Umfang dieser eigenverantwortlichen Prüfungen durch Klarna haben
              wir keinen Einfluss.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">Rechtsgrundlage</strong> (für
                die Einbindung des SDK und die Übermittlung durch uns): Art. 6
                Abs. 1 lit. b DSGVO (Vertragsabwicklung) sowie Art. 6 Abs. 1 lit.
                f DSGVO (effiziente und sichere Bereitstellung der
                Zahlungsabwicklung).
              </li>
              <li>
                <strong className="text-charcoal">Drittlandübermittlung:</strong>{" "}
                Klarna kann Daten ggf. auch außerhalb der EU/des EWR verarbeiten
                bzw. durch Sub-Dienstleister verarbeiten lassen und stützt sich
                hierfür auf geeignete Garantien (insbesondere
                EU-Standardvertragsklauseln).{" "}
                <Todo>
                  [bitte ergänzen/bestätigen: ob Klarna für die hier relevanten
                  Verarbeitungen ausschließlich im EWR verarbeitet]
                </Todo>
              </li>
              <li>
                <strong className="text-charcoal">Weitere Informationen:</strong>{" "}
                Datenschutzhinweise von Klarna unter{" "}
                <a
                  href="https://www.klarna.com/de/datenschutz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={extLink}
                >
                  klarna.com/de/datenschutz
                </a>
                .
              </li>
            </ul>
            <Callout>
              <strong className="text-charcoal">
                Rechtlicher Prüfhinweis (intern, vor Veröffentlichung klären):
              </strong>{" "}
              Da das Klarna-SDK bereits vor einer aktiven Auswahl der Zahlart
              lädt und dabei eine nicht zwingend erforderliche Speicherung im
              Endgerät erfolgen kann, ist zu prüfen, ob hierfür eine Einwilligung
              nach § 25 Abs. 1 TDDDG einzuholen ist – alternativ sollte das SDK
              technisch erst nach Auswahl von Klarna geladen werden.
            </Callout>

            <h3 className="mt-6 text-lg font-semibold text-charcoal">PayPal</h3>
            <p className="mt-2">
              Anbieter:{" "}
              <strong className="text-charcoal">
                PayPal (Europe) S.à r.l. et Cie, S.C.A.
              </strong>
              , 22–24 Boulevard Royal, L-2449 Luxemburg.
            </p>
            <p className="mt-3">
              Bei der Zahlung über PayPal werden{" "}
              <strong className="text-charcoal">
                auf unseren Seiten kein PayPal-Skript und keine PayPal-Cookies
                geladen
              </strong>
              . Eine Datenübermittlung an PayPal findet erst statt, wenn Sie
              PayPal als Zahlungsart wählen und zur Bezahlung zu PayPal
              weitergeleitet werden. PayPal verarbeitet Ihre Zahlungsdaten dann
              in eigener Verantwortung und kann ebenfalls eigenverantwortlich
              Betrugs- und ggf. Bonitätsprüfungen vornehmen.
            </p>
            <p className="mt-3">
              PayPal kann Daten auch außerhalb der EU/des EWR (u.&nbsp;a. in den
              USA) verarbeiten und stützt sich hierfür auf eigene geeignete
              Garantien (z.&nbsp;B. EU-Standardvertragsklauseln bzw. das EU-US Data
              Privacy Framework).
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">Rechtsgrundlage</strong> (für
                die Übermittlung durch uns): Art. 6 Abs. 1 lit. b DSGVO
                (Vertragsabwicklung) bzw. Art. 6 Abs. 1 lit. f DSGVO (sichere
                Zahlungsabwicklung).
              </li>
              <li>
                <strong className="text-charcoal">Weitere Informationen:</strong>{" "}
                Datenschutzerklärung von PayPal unter{" "}
                <a
                  href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={extLink}
                >
                  paypal.com/de/webapps/mpp/ua/privacy-full
                </a>
                .
              </li>
            </ul>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              11. Digitale Produkte und Download-Links
            </h2>
            <p className="mt-2">
              Ein Teil unserer Produkte sind digitale Inhalte (PDF-Dateien). Nach
              einem erfolgreichen Kauf stellen wir Ihnen die erworbenen Dateien
              über{" "}
              <strong className="text-charcoal">
                signierte, zeitlich befristete Download-Links
              </strong>{" "}
              bereit.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Verarbeitete Datenarten / Verfahren:
                </strong>{" "}
                Zur Absicherung der Download-Links wird ein kryptografisches
                Signaturverfahren (HMAC) verwendet; die Links sind für einen
                begrenzten Zeitraum (30 Tage) gültig. Die Auslieferung der
                PDF-Dateien erfolgt serverseitig aus einem geschützten
                Verzeichnis. Kostenlose Downloads (z.&nbsp;B. Freebie / Mini-Guide)
                funktionieren technisch analog.
              </li>
              <li>
                <strong className="text-charcoal">Zweck:</strong> Bereitstellung
                der erworbenen bzw. angeforderten digitalen Inhalte und Schutz
                vor unbefugter Weitergabe der Download-Links.
              </li>
              <li>
                <strong className="text-charcoal">Rechtsgrundlage:</strong> Bei
                kostenpflichtigen Käufen Art. 6 Abs. 1 lit. b DSGVO (Erfüllung
                des Kaufvertrags). Beim kostenlosen Mini-Guide, der im
                Zusammenhang mit der Newsletter-Anmeldung bereitgestellt wird,
                beruht die Verarbeitung auf Ihrer Einwilligung nach Art. 6 Abs.
                1 lit. a DSGVO (siehe Ziffer 7); die rein technische
                Bereitstellung eines von Ihnen angeforderten kostenlosen
                Downloads stützt sich auf Art. 6 Abs. 1 lit. b DSGVO (Erbringung
                der angeforderten Leistung). Ein Dritter ist an der Auslieferung
                der Dateien nicht beteiligt.
              </li>
            </ul>
          </div>

          {/* 12 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              12. Auftragsverarbeitung und E-Mail-Versand
            </h2>
            <p className="mt-2">
              Für einzelne Verarbeitungen setzen wir sorgfältig ausgewählte
              Dienstleister ein, die Daten ausschließlich nach unseren Weisungen
              und auf Grundlage eines Auftragsverarbeitungsvertrags nach{" "}
              <strong className="text-charcoal">Art. 28 DSGVO</strong>{" "}
              verarbeiten.
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">
                E-Mail-Versand (Transaktions- und Newsletter-Mails).
              </strong>{" "}
              Für den Versand und die Verwaltung unserer E-Mails
              (Bestellbestätigungen, interne Benachrichtigungen,
              Kontaktformular-Mails, Newsletter, Quiz-Mails) nutzen wir den
              Dienst <strong className="text-charcoal">DigiLetter</strong>,
              betrieben von:
            </p>
            <Box>
              <Todo>
                [bitte ergänzen: exakte Firmierung des Betreibers (DigiRift),
                vollständige Anschrift (Straße, Hausnummer, PLZ, Ort) und Land]
              </Todo>
            </Box>
            <p className="mt-3">
              Die E-Mail-Infrastruktur von DigiLetter wird innerhalb der EU
              betrieben.{" "}
              <Todo>[bitte bestätigen: Verarbeitungsort EU]</Todo>
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Verarbeitete Datenarten:
                </strong>{" "}
                E-Mail-Adresse, Vorname, Quiz-Kategorie-Kennung (Tag),
                Bestelldaten, Inhalte von Kontaktanfragen sowie Versand-Metadaten
                (z.&nbsp;B. Zustell-/Öffnungsstatus, Zeitpunkte).
              </li>
              <li>
                <strong className="text-charcoal">Zweck:</strong> technischer
                Versand und Verwaltung der vorgenannten E-Mails.
              </li>
              <li>
                <strong className="text-charcoal">Rechtsgrundlage:</strong>{" "}
                abhängig vom jeweiligen Versandzweck Art. 6 Abs. 1 lit. a, b oder
                f DSGVO (siehe die jeweilige Ziffer oben); für den Einsatz als
                Auftragsverarbeiter Art. 28 DSGVO.
              </li>
              <li>
                <strong className="text-charcoal">Sub-Auftragsverarbeiter:</strong>{" "}
                DigiLetter kann für den reinen technischen Mailversand ggf.
                weitere technische Sub-Dienstleister (Sub-Auftragsverarbeiter)
                einsetzen.{" "}
                <Todo>
                  [bitte prüfen: Falls hierbei eine Verarbeitung außerhalb der
                  EU/des EWR erfolgt, geeignete Drittlandgarantien (z.&nbsp;B.
                  EU-Standardvertragsklauseln) ergänzen]
                </Todo>
              </li>
            </ul>
            <p className="mt-3">
              Daneben ist – wie in Ziffer 3 dargestellt – die{" "}
              <strong className="text-charcoal">Hetzner Online GmbH</strong> als
              Auftragsverarbeiter für das Hosting tätig.
            </p>
          </div>

          {/* 13 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              13. Soziale Teilen-Funktionen (Teilen-Links)
            </h2>
            <p className="mt-2">
              Auf der Quiz-Ergebnisseite bieten wir die Möglichkeit, Ihr Ergebnis
              zu teilen, z.&nbsp;B. über WhatsApp (<code className="text-sm">wa.me</code>)
              und einen Facebook-Sharer-Link.
            </p>
            <p className="mt-3">
              Hierbei handelt es sich um{" "}
              <strong className="text-charcoal">
                reine Verlinkungen ohne eingebettete Skripte, Pixel oder
                „Like-Buttons"
              </strong>
              . Es findet <strong className="text-charcoal">kein Tracking</strong>{" "}
              statt. Eine Datenübermittlung an die jeweilige Plattform erfolgt
              erst, wenn Sie aktiv auf einen solchen Teilen-Link{" "}
              <strong className="text-charcoal">klicken</strong> und anschließend
              auf der Seite des jeweiligen Anbieters landen. Ab diesem Zeitpunkt
              gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">Rechtsgrundlage</strong> (für
                die Bereitstellung der Links): Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an einfacher Teilbarkeit der Inhalte).
              </li>
            </ul>
          </div>

          {/* 14 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              14. Übermittlung in Drittländer
            </h2>
            <p className="mt-2">
              Die Verarbeitung Ihrer Daten findet grundsätzlich innerhalb der EU
              bzw. des EWR statt:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">Hosting</strong> (Hetzner):
                Deutschland.
              </li>
              <li>
                <strong className="text-charcoal">E-Mail-Versand</strong>{" "}
                (DigiLetter): EU.
              </li>
              <li>
                <strong className="text-charcoal">Klarna</strong>: Sitz in
                Schweden (EU); eine Verarbeitung außerhalb der EU/des EWR durch
                Klarna bzw. dessen Dienstleister kann jedoch nicht
                ausgeschlossen werden (siehe unten).
              </li>
            </ul>
            <p className="mt-3">
              Eine Übermittlung in ein Drittland kann insbesondere in folgenden
              Fällen erfolgen:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">PayPal:</strong> sofern PayPal
                Daten außerhalb der EU/des EWR (u.&nbsp;a. in den USA) verarbeitet.
                PayPal stützt sich hierfür auf eigene geeignete Garantien (z.&nbsp;B.
                EU-Standardvertragsklauseln bzw. das EU-US Data Privacy
                Framework).
              </li>
              <li>
                <strong className="text-charcoal">Klarna:</strong> Soweit Klarna
                im Rahmen von Identitäts-, Betrugs- oder Bonitätsprüfungen Daten
                außerhalb der EU/des EWR bzw. über Sub-Dienstleister verarbeitet,
                stützt sich Klarna eigenverantwortlich auf geeignete Garantien
                (insbesondere EU-Standardvertragsklauseln).{" "}
                <Todo>[bitte ergänzen/bestätigen]</Todo>
              </li>
            </ul>
            <p className="mt-3">
              Eine Übermittlung an Google im Zusammenhang mit Schriftarten oder
              Analyse-Diensten findet – wie in Ziffer 4 und 5 dargestellt –{" "}
              <strong className="text-charcoal">nicht</strong> statt.
            </p>
          </div>

          {/* 15 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              15. Speicherdauer und Löschung
            </h2>
            <p className="mt-2">
              Wir verarbeiten und speichern Ihre personenbezogenen Daten nur so
              lange, wie es für die Erreichung des jeweiligen
              Verarbeitungszwecks erforderlich ist, oder solange dies gesetzlich
              vorgeschrieben ist. Allgemein gilt:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">
                  Server-Logfiles / Rate-Limiting:
                </strong>{" "}
                keine bzw. nur kurzzeitige Speicherung (siehe Ziffer 3).
              </li>
              <li>
                <strong className="text-charcoal">Kontaktanfragen:</strong> bis
                zur abschließenden Bearbeitung; danach Löschung, soweit keine
                Aufbewahrungspflichten entgegenstehen (siehe Ziffer 6).
              </li>
              <li>
                <strong className="text-charcoal">Newsletter / Quiz-Lead:</strong>{" "}
                bis zu Ihrem Widerruf bzw. Ihrer Abmeldung; Einwilligungsnachweise
                für die Dauer möglicher Nachweispflichten (siehe Ziffer 7 und 8).
              </li>
              <li>
                <strong className="text-charcoal">
                  Bestell- und Rechnungsdaten:
                </strong>{" "}
                entsprechend den gesetzlichen Aufbewahrungsfristen von 6 bzw. 10
                Jahren nach § 257 HGB und § 147 AO (siehe Ziffer 9).
              </li>
            </ul>
            <p className="mt-3">
              Nach Ablauf der maßgeblichen Fristen werden die Daten routinemäßig
              gelöscht oder ihre Verarbeitung eingeschränkt.
            </p>
          </div>

          {/* 16 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              16. Keine automatisierte Entscheidungsfindung durch uns
            </h2>
            <p className="mt-2">
              Eine{" "}
              <strong className="text-charcoal">
                automatisierte Entscheidungsfindung im Einzelfall einschließlich
                Profiling
              </strong>{" "}
              im Sinne von Art. 22 DSGVO findet{" "}
              <strong className="text-charcoal">durch uns nicht statt</strong>.
            </p>
            <p className="mt-3">
              Soweit im Rahmen einer Zahlung per Klarna oder PayPal Bonitäts-,
              Identitäts- oder Betrugsprüfungen durchgeführt werden, erfolgen
              diese{" "}
              <strong className="text-charcoal">
                eigenverantwortlich durch den jeweiligen Zahlungsdienstleister
              </strong>
              . Nähere Informationen hierzu entnehmen Sie bitte den unter Ziffer
              10 verlinkten Datenschutzhinweisen von Klarna bzw. PayPal.
            </p>
          </div>

          {/* 17 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              17. Hinweis zu Minderjährigen / Zielgruppe
            </h2>
            <p className="mt-2">
              Unser Angebot und insbesondere die Anmeldemöglichkeiten
              (Newsletter, Quiz, Bestellungen) richten sich an{" "}
              <strong className="text-charcoal">Erwachsene</strong>{" "}
              (insbesondere Eltern sowie pädagogische Fachkräfte). Wir erheben{" "}
              <strong className="text-charcoal">nicht wissentlich</strong>{" "}
              personenbezogene Daten von Kindern. Sollten Sie minderjährig sein,
              nutzen Sie diese Funktionen bitte nur mit Einwilligung Ihrer
              Erziehungsberechtigten.
            </p>
          </div>

          {/* 18 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              18. Ihre Rechte als betroffene Person
            </h2>
            <p className="mt-2">
              Ihnen stehen nach der DSGVO insbesondere folgende Rechte zu:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong className="text-charcoal">Auskunft</strong> über die zu
                Ihrer Person verarbeiteten Daten (Art. 15 DSGVO),
              </li>
              <li>
                <strong className="text-charcoal">Berichtigung</strong>{" "}
                unrichtiger oder Vervollständigung unvollständiger Daten (Art. 16
                DSGVO),
              </li>
              <li>
                <strong className="text-charcoal">Löschung</strong> Ihrer Daten
                (Art. 17 DSGVO), soweit keine gesetzlichen Aufbewahrungspflichten
                entgegenstehen,
              </li>
              <li>
                <strong className="text-charcoal">
                  Einschränkung der Verarbeitung
                </strong>{" "}
                (Art. 18 DSGVO),
              </li>
              <li>
                <strong className="text-charcoal">Datenübertragbarkeit</strong>{" "}
                (Art. 20 DSGVO),
              </li>
              <li>
                <strong className="text-charcoal">Widerspruch</strong> gegen
                Verarbeitungen, die auf Art. 6 Abs. 1 lit. f DSGVO beruhen, aus
                Gründen, die sich aus Ihrer besonderen Situation ergeben (Art. 21
                DSGVO).
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-charcoal">
                Widerruf von Einwilligungen.
              </strong>{" "}
              Soweit eine Verarbeitung auf Ihrer Einwilligung beruht (Art. 6 Abs.
              1 lit. a DSGVO), können Sie diese{" "}
              <strong className="text-charcoal">
                jederzeit mit Wirkung für die Zukunft widerrufen
              </strong>{" "}
              (Art. 7 Abs. 3 DSGVO). Die Rechtmäßigkeit der bis zum Widerruf
              erfolgten Verarbeitung bleibt unberührt.
            </p>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an die in
              Ziffer 1 genannten Kontaktdaten.
            </p>
            <p className="mt-3">
              <strong className="text-charcoal">
                Beschwerderecht bei einer Aufsichtsbehörde.
              </strong>{" "}
              Unbeschadet anderweitiger Rechtsbehelfe haben Sie das Recht, sich
              bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77
              DSGVO). Sie können sich an die Aufsichtsbehörde Ihres üblichen
              Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des
              mutmaßlichen Verstoßes wenden. Die für uns zuständige
              Aufsichtsbehörde ist:
            </p>
            <Box>
              <strong className="text-charcoal">
                Landesbeauftragte für Datenschutz und Informationsfreiheit
                Nordrhein-Westfalen (LDI NRW)
              </strong>
              <br />
              Kavalleriestr. 2–4, 40213 Düsseldorf
            </Box>
          </div>

          {/* 19 */}
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              19. Aktualität und Änderungen dieser Datenschutzerklärung
            </h2>
            <p className="mt-2">
              Diese Datenschutzerklärung hat den{" "}
              <strong className="text-charcoal">Stand Juni 2026</strong>. Durch
              die Weiterentwicklung unserer Website und unserer Angebote oder
              aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es
              erforderlich werden, diese Datenschutzerklärung anzupassen. Es gilt
              jeweils die hier veröffentlichte aktuelle Fassung.
            </p>
            <Callout>
              <strong className="text-charcoal">Hinweis:</strong> Diese
              Datenschutzerklärung wurde sorgfältig auf Grundlage der
              tatsächlichen Datenverarbeitung der Website erstellt. Sie stellt
              eine fundierte Vorlage dar und sollte vor dem Go-Live sowie bei
              wesentlichen Änderungen der Verarbeitung von einer fachkundigen
              bzw. anwaltlichen Stelle final geprüft werden. Die mit „[bitte
              ergänzen …]" gekennzeichneten Angaben – insbesondere die
              vollständige Firmierung und Anschrift des E-Mail-Dienstleisters
              DigiLetter/DigiRift, die Bestätigung des Hosting-Anbieters und
              Serverstandorts (Hetzner), die konkrete Speicherfrist der
              Server-Logfiles, die Protokollierung der IP-Adresse beim Newsletter
              sowie etwaige Drittlandgarantien bei Klarna/Sub-Dienstleistern –
              sind vor Veröffentlichung durch den Betreiber zu vervollständigen
              bzw. zu bestätigen. Zudem wird empfohlen, den
              Cookie-/Einwilligungsbanner an die tatsächliche Verarbeitung
              anzupassen (es werden keine Analyse- oder Marketing-Dienste
              eingesetzt), damit Banner und Datenschutzerklärung übereinstimmen.
            </Callout>
          </div>
        </div>
      </div>
    </section>
  );
}
