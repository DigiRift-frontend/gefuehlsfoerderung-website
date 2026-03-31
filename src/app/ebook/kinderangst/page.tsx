"use client";

import "./ebook-web.css";
import { EbookWebLayout, type WebEbookConfig } from "@/components/ebook/EbookWebLayout";

const config: WebEbookConfig = {
  badge: "Leitfaden für Eltern",
  title: "Wenn dein Kind ängstlich ist",
  subtitle:
    "Ängste verstehen, Sicherheit geben, Mut wachsen lassen — ohne dein Kind zu überfordern oder seine Gefühle kleinzureden.",
  coverImage: "/images/blog/wie-du-lernst-dein-hochsensibles-kind-zu-verstehen/featured.webp",
  authorImage: "/images/author/ewelina-ueber-mich.jpeg",
  authorBio:
    "Ewelina Gawlik ist Kindheitspädagogin B.A. und Mutter von zwei Kindern. Sie weiß: Ein ängstliches Kind braucht keine Eltern, die seine Ängste wegreden. Es braucht Eltern, die verstehen, dass Angst eine Sprache ist — und die bereit sind, zuzuhören. Dieser Leitfaden ist für alle Eltern, die sich fragen: Wie helfe ich meinem Kind, ohne es zu überfordern?",
  chapters: [
    {
      number: 1,
      title: "Angst ist kein Fehler",
      subtitle: "Warum dein Kind nicht 'zu empfindlich' ist — sondern genau richtig",
      image: "/images/blog/gefuehle-von-kindern-ernst-nehmen-und-verstehen/featured.webp",
      content: (
        <>
          <p>
            Dein Kind will nicht allein im Zimmer bleiben. Es klammert sich
            an deinem Bein fest, wenn ihr bei einer Geburtstagsfeier ankommt.
            Es fragt zum zehnten Mal, ob du es wirklich abholst. Und du
            fragst dich: Ist das noch normal? Stimmt etwas nicht mit meinem
            Kind? Bin ich schuld?
          </p>
          <p>
            Die Antwort auf alle drei Fragen beginnt mit einer Erkenntnis,
            die vielleicht überrascht: Angst ist kein Fehler im System deines
            Kindes. Angst ist das System. Sie ist einer der ältesten und
            wichtigsten Schutzmechanismen, den die Evolution hervorgebracht
            hat. Ohne Angst hätte unsere Spezies nicht überlebt.
          </p>
          <h4>Was Angst im Gehirn deines Kindes tut</h4>
          <p>
            Wenn dein Kind Angst hat, sendet seine Amygdala — das
            Alarmsystem des Gehirns — ein Signal: Gefahr! Sofort werden
            Stresshormone ausgeschüttet, der Herzschlag beschleunigt sich,
            die Muskeln spannen sich an. Dein Kind ist biologisch bereit
            für Kampf, Flucht oder Erstarrung. Das ist keine Überreaktion.
            Das ist genau das, wofür dieses System gebaut wurde.
          </p>
          <p>
            Das Problem ist: Dieses System unterscheidet nicht zwischen
            einem Tiger und dem ersten Schultag. Für das Nervensystem deines
            Kindes fühlt sich beides gleich bedrohlich an.
          </p>
          <div className="wb-quote">
            „Dein Kind ist nicht zu empfindlich. Sein Alarmsystem ist
            besonders wachsam. Das ist eine Stärke — wenn es lernt, damit
            umzugehen."
          </div>
          <h4>Angst nach Altersstufen — was normal ist</h4>
          <p>
            <strong>0–2 Jahre:</strong> Trennungsangst, Fremdenangst, Angst
            vor lauten Geräuschen. Zeichen einer gesunden Bindung.
          </p>
          <p>
            <strong>3–5 Jahre:</strong> Dunkelheit, Monster, Gewitter,
            Tiere. Die Fantasie explodiert — und damit die Fähigkeit, sich
            Bedrohungen vorzustellen, die es nicht gibt.
          </p>
          <p>
            <strong>6–8 Jahre:</strong> Einbrecher, Krankheit, Tod
            nahestehender Personen. Das Kind beginnt zu verstehen: Schlimme
            Dinge passieren wirklich.
          </p>
          <p>
            <strong>9–12 Jahre:</strong> Soziale Bewertung, Leistungsdruck,
            Sorgen über die Zukunft. Das Selbstbild wird wichtiger.
          </p>
          <div className="wb-card">
            <p className="wb-card-label">Was du dir merken darfst</p>
            <p>
              Die meisten kindlichen Ängste sind altersgerecht, vorübergehend
              und verschwinden mit liebevoller Begleitung von selbst. Du
              musst sie nicht „reparieren". Du musst sie begleiten.
            </p>
          </div>
        </>
      ),
    },
    {
      number: 2,
      title: "Was dein Kind wirklich sagt",
      subtitle: "Angst als Sprache verstehen lernen — die Botschaft hinter dem Verhalten",
      image: "/images/blog/starke-gefuehle-bei-kindern-so-hilfst-du-deinem-kind-dabei/featured.webp",
      activity: (
        <>
          <h3>Was sagt dein Kind wirklich?</h3>
          <p>Beobachte dein Kind diese Woche und fülle dieses Arbeitsblatt aus.</p>

          <div className="wb-fillin">
            <p className="wb-fillin-label">Sätze übersetzen</p>
            <div className="wb-fillin-row">Mein Kind sagt: <span className="wb-fillin-blank" /></div>
            <div className="wb-fillin-row">Was es vielleicht meint: <span className="wb-fillin-blank" /></div>
            <div className="wb-fillin-row">Welche der 3 Fragen stellt es? (Sicher / Dazugehören / Schaffen): <span className="wb-fillin-blank" /></div>
            <div style={{height: "3mm"}} />
            <div className="wb-fillin-row">Mein Kind sagt: <span className="wb-fillin-blank" /></div>
            <div className="wb-fillin-row">Was es vielleicht meint: <span className="wb-fillin-blank" /></div>
            <div className="wb-fillin-row">Welche der 3 Fragen stellt es?: <span className="wb-fillin-blank" /></div>
          </div>

          <div className="wb-scale">
            <p className="wb-scale-label">Körper-Signale erkennen</p>
            <p className="wb-scale-question">Wie oft zeigt dein Kind körperliche Angst-Zeichen (Bauchschmerzen, Klammern, Erstarren)?</p>
            <div className="wb-scale-row">
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <div key={n} className="wb-scale-circle">{n}</div>
              ))}
            </div>
            <div className="wb-scale-labels">
              <span>Selten</span><span>Täglich</span>
            </div>
          </div>

          <div className="wb-checklist">
            <p className="wb-checklist-label">Häufigste Angst-Signale meines Kindes</p>
            <ul className="wb-checklist-items">
              <li><span className="wb-checkbox" /> Bauchschmerzen / Übelkeit</li>
              <li><span className="wb-checkbox" /> Klammern / nicht loslassen wollen</li>
              <li><span className="wb-checkbox" /> Erstarren / ganz still werden</li>
              <li><span className="wb-checkbox" /> Weinen / Wutausbruch</li>
              <li><span className="wb-checkbox" /> Schlafprobleme / nicht einschlafen können</li>
              <li><span className="wb-checkbox" /> Vermeidung bestimmter Situationen</li>
              <li><span className="wb-checkbox" /> Nägelkauen / Unruhe / Zappeln</li>
            </ul>
          </div>
        </>
      ),
      content: (
        <>
          <p>
            Dein Kind sagt nicht: „Mama, ich habe eine aktivierte Amygdala
            und mein Nervensystem befindet sich im Kampf-Flucht-Modus."
            Dein Kind sagt: „Mir ist schlecht." „Ich will nicht in die
            Schule." „Ich hab Bauchweh." Oder es sagt gar nichts — es
            klammert, weint, verweigert, erstarrt.
          </p>
          <p>
            Ein Kind, das kompetent und gleichwürdig ist, kommuniziert
            immer. Nur nicht immer mit Worten. Es kommuniziert mit seinem
            Körper, seinem Verhalten, seinem Rückzug. Unsere Aufgabe als
            Eltern ist nicht, das Verhalten zu stoppen. Unsere Aufgabe ist,
            die Botschaft zu hören.
          </p>
          <h4>Der Körper spricht zuerst</h4>
          <p>
            Angst ist zuallererst ein Körpergefühl. Bevor dein Kind
            überhaupt einen ängstlichen Gedanken denken kann, hat sein
            Körper bereits reagiert:
          </p>
          <ul>
            <li><strong>Bauchschmerzen</strong> — Das Verdauungssystem reagiert
            als erstes auf Stress. „Mir ist schlecht" ist oft die ehrlichste
            Beschreibung von Angst, die ein Kind geben kann.</li>
            <li><strong>Kopfschmerzen</strong> — Anspannung im Nacken und
            Kiefer, Durchblutungsveränderungen.</li>
            <li><strong>Klammern</strong> — Der Körper sucht Sicherheit durch
            physische Nähe zur Bezugsperson.</li>
            <li><strong>Erstarren</strong> — Das Kind wird still, bewegt sich
            nicht, antwortet nicht. Kein Trotz — Shutdown.</li>
            <li><strong>Unruhe</strong> — Zappeln, nicht stillsitzen können,
            Nägelkauen, am Ärmel ziehen.</li>
          </ul>
          <h4>Die Frage hinter der Angst</h4>
          <p>
            Jede Angst deines Kindes stellt im Kern eine von drei Fragen:
          </p>
          <p>
            <strong>„Bin ich sicher?"</strong> — Angst vor Dunkelheit,
            Einbrechern, Monstern, neuen Situationen. Dein Kind braucht die
            Antwort: „Ja, du bist sicher. Ich bin hier."
          </p>
          <p>
            <strong>„Gehöre ich dazu?"</strong> — Angst vor Ablehnung,
            Ausgrenzung, nicht gemocht zu werden. Dein Kind braucht: „Du
            gehörst hierher. Du bist genug, genau so."
          </p>
          <p>
            <strong>„Schaffe ich das?"</strong> — Angst vor Versagen, vor
            dem Neuen, vor Herausforderungen. Dein Kind braucht: „Ich
            traue dir das zu. Und wenn nicht, bin ich da."
          </p>
          <div className="wb-quote">
            „Wenn du verstehst, welche Frage dein Kind stellt, musst du
            nicht mehr raten, was es braucht. Du musst nur noch antworten."
          </div>
        </>
      ),
    },
    {
      number: 3,
      title: "Was deine eigene Angst damit zu tun hat",
      subtitle: "Wie deine Reaktion die Angst deines Kindes formt",
      image: "/images/blog/wieso-du-ueber-deine-gefuehle-mit-deinem-kind-sprechen-solltest/featured.webp",
      activity: (
        <>
          <h3>Ehrliche Selbstreflexion</h3>
          <p>Nimm dir 15 Minuten für diese Übung. Sei ehrlich — niemand liest das außer dir.</p>

          <div className="wb-worksheet">
            <p className="wb-worksheet-label">Meine eigene Angst-Geschichte</p>
            <p className="wb-worksheet-prompt">Wovor hatte ICH als Kind am meisten Angst?</p>
            <div className="wb-worksheet-line" />
            <div className="wb-worksheet-line" />
            <p className="wb-worksheet-prompt">Wie haben meine Eltern auf meine Angst reagiert?</p>
            <div className="wb-worksheet-line" />
            <div className="wb-worksheet-line" />
            <p className="wb-worksheet-prompt">Was hätte ich mir stattdessen gewünscht?</p>
            <div className="wb-worksheet-line" />
            <div className="wb-worksheet-line" />
          </div>

          <div className="wb-scale">
            <p className="wb-scale-label">Selbsteinschätzung</p>
            <p className="wb-scale-question">Wie stark neige ICH dazu, mein Kind zu überbeschützen?</p>
            <div className="wb-scale-row">
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <div key={n} className="wb-scale-circle">{n}</div>
              ))}
            </div>
            <div className="wb-scale-labels">
              <span>Gar nicht</span><span>Sehr stark</span>
            </div>
          </div>

          <div className="wb-checklist">
            <p className="wb-checklist-label">Mein eigenes Verhalten erkennen</p>
            <ul className="wb-checklist-items">
              <li><span className="wb-checkbox" /> Ich sage oft &quot;Pass auf!&quot; oder &quot;Vorsicht!&quot;</li>
              <li><span className="wb-checkbox" /> Ich beantworte Fragen, bevor mein Kind sie stellt</li>
              <li><span className="wb-checkbox" /> Ich vermeide Situationen, die schwierig werden könnten</li>
              <li><span className="wb-checkbox" /> Ich sage &quot;Das ist nicht schlimm&quot; wenn mein Kind Angst hat</li>
              <li><span className="wb-checkbox" /> Ich merke, dass ich selbst ängstlich werde, wenn mein Kind Angst hat</li>
            </ul>
          </div>
        </>
      ),
      content: (
        <>
          <p>
            Hier kommt der unbequeme Teil. Er ist unbequem, weil er ehrlich
            ist. Und er ist wichtig, weil er der Schlüssel zu allem Weiteren
            ist.
          </p>
          <p>
            Dein Kind lernt nicht nur aus dem, was du sagst. Es lernt vor
            allem aus dem, was du TUST — und was du FÜHLST. Kinder sind
            seismographisch empfindlich für die Emotionen ihrer Eltern. Wenn
            du bei Gewitter selbst zusammenzuckst, wird dein Kind Gewitter
            als bedrohlich abspeichern — egal wie oft du sagst „Das ist
            nicht schlimm." Wenn du bei jeder Erkältung panisch zum Arzt
            fährst, lernt dein Kind: Krank sein ist gefährlich.
          </p>
          <h4>Die drei Wege, wie Eltern Angst verstärken</h4>
          <p>
            <strong>1. Überbeschützung:</strong> Du räumst jedes Hindernis
            aus dem Weg, bevor dein Kind es sieht. Du beantwortest jede
            Frage, bevor es sie stellt. Du verhinderst jede Situation, die
            schwierig werden könnte. Die Botschaft an dein Kind: „Die Welt
            ist so gefährlich, dass du sie ohne mich nicht bewältigen kannst."
          </p>
          <p>
            <strong>2. Bagatellisieren:</strong> „Da brauchst du keine Angst
            zu haben." „Stell dich nicht so an." „Das ist doch nicht
            schlimm." Die Botschaft: „Dein Gefühl ist falsch. Du solltest
            anders fühlen, als du fühlst."
          </p>
          <p>
            <strong>3. Eigene Angst übertragen:</strong> Du bist selbst
            ängstlich — vielleicht war deine eigene Kindheit unsicher,
            vielleicht hast du nie gelernt, mit Angst umzugehen. Dein Kind
            spürt deine Anspannung und übernimmt sie, weil es denkt: Wenn
            Mama Angst hat, muss es wirklich gefährlich sein.
          </p>
          <div className="wb-card">
            <p className="wb-card-label">Ehrliche Reflexion</p>
            <p>
              Frage dich heute Abend:<br />
              • Welche Ängste hatte ICH als Kind?<br />
              • Welche davon habe ich noch heute?<br />
              • Wie reagieren meine Eltern auf Angst — und wie reagiere ich?<br />
              • In welchen Momenten beschütze ich mein Kind vor MEINER
              Angst, nicht vor seiner?
            </p>
          </div>
          <div className="wb-quote">
            „Die mutigste Sache, die du für dein ängstliches Kind tun
            kannst, ist ehrlich hinzuschauen, wie du selbst mit Angst
            umgehst."
          </div>
        </>
      ),
    },
    {
      number: 4,
      title: "Sicherheit geben — echt und körperlich",
      subtitle: "Was dein Kind braucht, bevor es mutig sein kann",
      image: "/images/blog/12-schluesselfragen-zur-staerkung-der-bindung-mit-deinem-kind/featured.jpg",
      content: (
        <>
          <p>
            Bevor ein Kind mutig sein kann, muss es sich sicher fühlen.
            Nicht „sicher" im Sinne von „es gibt keine Gefahr." Sondern
            sicher im Sinne von: „Wenn es schwierig wird, ist jemand da."
            Das ist der Unterschied zwischen äußerer und innerer Sicherheit.
          </p>
          <h4>Die Basis: Co-Regulation</h4>
          <p>
            Kinder können ihre Angst nicht allein regulieren. Ihr Gehirn
            ist dafür neurologisch noch nicht reif. Sie brauchen einen
            Erwachsenen, dessen Nervensystem sagt: „Es ist okay. Ich bin
            ruhig. Du kannst dich an meiner Ruhe orientieren."
          </p>
          <p>
            Das heißt konkret: Wenn dein Kind panisch ist und du sagst „Alles
            gut!" mit zitternder Stimme und angespanntem Körper, hört dein
            Kind nicht deine Worte. Es liest deinen Körper. Und dein Körper
            sagt: Ich habe auch Angst.
          </p>
          <h4>So sieht echte Sicherheit aus</h4>
          <p>
            <strong>Körperliche Nähe:</strong> Dein Kind darf auf deinen
            Schoß. Du legst deine Hand auf seinen Rücken. Du hältst es,
            wenn es gehalten werden will. Nähe ist das stärkste
            Regulationswerkzeug, das die Natur uns gegeben hat.
          </p>
          <p>
            <strong>Ruhige Stimme:</strong> Nicht fröhlich-aufgesetzt.
            Nicht besorgt. Sondern ruhig und warm: „Ich sehe, dass du
            gerade Angst hast. Ich bin bei dir. Wir schaffen das zusammen."
          </p>
          <p>
            <strong>Langsamer Atem:</strong> Atme bewusst langsam. Dein
            Kind wird — oft unbewusst — seinen Atem an deinen anpassen.
            Das ist Co-Regulation in ihrer reinsten Form.
          </p>
          <p>
            <strong>Validierung:</strong> „Ja, das macht dir Angst. Das
            verstehe ich." Nicht: „Du brauchst keine Angst zu haben."
            Denn dein Kind HAT Angst. Ihr zu sagen, sie solle nicht
            existieren, macht sie größer, nicht kleiner.
          </p>
          <div className="wb-quote">
            „Dein Kind muss nicht aufhören, Angst zu haben, bevor du ihm
            Nähe gibst. Es braucht deine Nähe, DAMIT die Angst kleiner
            werden kann."
          </div>
          <div className="wb-card">
            <p className="wb-card-label">Die 4-Satz-Formel für Angstmomente</p>
            <p>
              1. „Ich sehe, dass du Angst hast." (Benennen)<br />
              2. „Das ist okay so." (Validieren)<br />
              3. „Ich bin hier bei dir." (Sicherheit)<br />
              4. „Wir machen das zusammen." (Verbindung)
            </p>
          </div>
        </>
      ),
    },
    {
      number: 5,
      title: "Trennungsangst begleiten",
      subtitle: "Wenn der Abschied zum Kampf wird — und wie du ihn in Vertrauen verwandelst",
      image: "/images/blog/wie-du-konflikte-gewaltfrei-loesen-kannst/featured.webp",
      activity: (
        <>
          <h3>Unser Abschiedsritual planen</h3>
          <p>Entwickle gemeinsam mit deinem Kind ein festes Abschiedsritual. Fülle dieses Blatt zusammen aus!</p>

          <div className="wb-worksheet">
            <p className="wb-worksheet-label">Unser persönliches Ritual</p>
            <p className="wb-worksheet-prompt">Schritt 1 — Was machen wir zuerst? (z.B. Umarmung, Handkuss...)</p>
            <div className="wb-worksheet-line" />
            <p className="wb-worksheet-prompt">Schritt 2 — Unser besonderer Satz: (z.B. &quot;Bis nach dem Mittagessen!&quot;)</p>
            <div className="wb-worksheet-line" />
            <p className="wb-worksheet-prompt">Schritt 3 — Letzter Schritt: (z.B. dreimal winken)</p>
            <div className="wb-worksheet-line" />
          </div>

          <div className="wb-activity">
            <p className="wb-activity-label">Übergangsobjekt gestalten</p>
            <p className="wb-activity-prompt">Male oder beschreibe hier das Übergangsobjekt, das dein Kind mitnehmen kann. Was ist es? Wie fühlt es sich an? Warum ist es besonders?</p>
            <div className="wb-activity-area" />
          </div>

          <div className="wb-fillin">
            <p className="wb-fillin-label">Mein Versprechen</p>
            <div className="wb-fillin-row">Ich hole dich ab um <span className="wb-fillin-blank" /> Uhr.</div>
            <div className="wb-fillin-row">Wenn du mich vermisst, schau auf <span className="wb-fillin-blank" /></div>
            <div className="wb-fillin-row">Unser Geheimzeichen für &quot;Ich hab dich lieb&quot; ist: <span className="wb-fillin-blank" /></div>
          </div>
        </>
      ),
      content: (
        <>
          <p>
            Es ist Morgen in der Kita. Du hast dein Kind ausgezogen, die
            Tasche abgestellt, ihm einen Kuss gegeben. Und dann klammern
            sich kleine Finger an deine Jacke und eine Stimme schluchzt:
            „Mama, geh nicht!" Und dein Herz bricht. Jeden. Einzelnen. Tag.
          </p>
          <h4>Was Trennungsangst wirklich ist</h4>
          <p>
            Trennungsangst ist im Kern ein Liebesbeweis. Dein Kind sagt:
            „Du bist meine sichere Basis. Ohne dich fühle ich mich verloren."
            Das ist keine Schwäche. Das ist tiefe, gesunde Bindung. Die Frage
            ist nicht, wie du die Angst loswirst. Die Frage ist, wie du
            deinem Kind hilfst, Vertrauen aufzubauen, dass die Bindung hält —
            auch über Distanz.
          </p>
          <h4>Was NICHT hilft</h4>
          <ul>
            <li><strong>Heimlich wegschleichen.</strong> Es fühlt sich leichter
            an, aber es zerstört Vertrauen. Dein Kind lernt: Mama kann
            jederzeit verschwinden, ohne Vorwarnung. Die Angst wird GRÖSSER.</li>
            <li><strong>Den Abschied endlos ausdehnen.</strong> „Noch eine
            Umarmung. Noch ein Kuss. Noch einmal winken." Je länger der
            Abschied, desto mehr bestätigst du: Das hier ist wirklich
            schlimm.</li>
            <li><strong>Schimpfen oder beschämen.</strong> „Alle anderen
            Kinder schaffen das!" Dein Kind hört: Ich bin falsch, weil ich
            so fühle, wie ich fühle.</li>
          </ul>
          <h4>Was hilft</h4>
          <p>
            <strong>Ein festes Abschiedsritual.</strong> Immer gleich, immer
            kurz, immer liebevoll. Zum Beispiel: Zwei Küsse auf die Hand
            („einen für jetzt, einen für später"), eine Umarmung, ein
            bestimmter Satz („Ich hole dich nach dem Mittagessen ab"), und
            dann gehst du. Rituale schaffen Vorhersehbarkeit, und
            Vorhersehbarkeit ist das Gegenteil von Angst.
          </p>
          <p>
            <strong>Übergangsobjekte.</strong> Ein Tuch mit deinem Parfum.
            Ein kleiner Stein, den du „aufgeladen" hast mit einer Umarmung.
            Ein Foto von euch beiden. Etwas Greifbares, das sagt: Mama ist
            nicht hier, aber die Verbindung ist noch da.
          </p>
          <p>
            <strong>Ehrlichkeit.</strong> „Ich gehe jetzt zur Arbeit. Ich
            weiß, dass du das nicht magst. Ich komme nach dem Mittagessen
            wieder." Kurz, klar, wahr. Kein „Vielleicht komme ich früher" —
            halte, was du sagst.
          </p>
          <div className="wb-quote">
            „Dein Kind muss nicht aufhören zu weinen, bevor du gehen
            darfst. Es muss wissen, dass du wiederkommst. Immer."
          </div>
        </>
      ),
    },
    {
      number: 6,
      title: "Soziale Ängste",
      subtitle: "Wenn die Welt der anderen Kinder bedrohlich wird",
      image: "/images/blog/wie-du-deinem-kind-toleranz-vermittelst/featured.webp",
      activity: (
        <>
          <h3>Die Mut-Leiter deines Kindes</h3>
          <p>Erstelle gemeinsam mit deinem Kind eine persönliche Mut-Leiter. Beginnt unten und arbeitet euch nach oben.</p>

          <div className="wb-worksheet">
            <p className="wb-worksheet-label">Von leicht nach schwer</p>
            <p className="wb-worksheet-prompt">Stufe 5 (am schwersten):</p>
            <div className="wb-worksheet-line" />
            <p className="wb-worksheet-prompt">Stufe 4:</p>
            <div className="wb-worksheet-line" />
            <p className="wb-worksheet-prompt">Stufe 3:</p>
            <div className="wb-worksheet-line" />
            <p className="wb-worksheet-prompt">Stufe 2:</p>
            <div className="wb-worksheet-line" />
            <p className="wb-worksheet-prompt">Stufe 1 (am leichtesten — hier starten wir!):</p>
            <div className="wb-worksheet-line" />
          </div>

          <div className="wb-checklist">
            <p className="wb-checklist-label">Geschaffte Stufen feiern!</p>
            <ul className="wb-checklist-items">
              <li><span className="wb-checkbox" /> Stufe 1 geschafft am: ___________</li>
              <li><span className="wb-checkbox" /> Stufe 2 geschafft am: ___________</li>
              <li><span className="wb-checkbox" /> Stufe 3 geschafft am: ___________</li>
              <li><span className="wb-checkbox" /> Stufe 4 geschafft am: ___________</li>
              <li><span className="wb-checkbox" /> Stufe 5 geschafft am: ___________</li>
            </ul>
          </div>

          <div className="wb-scale">
            <p className="wb-scale-label">Wie mutig fühlt sich dein Kind heute?</p>
            <p className="wb-scale-question">Lass dein Kind zeigen, wie mutig es sich gerade fühlt:</p>
            <div className="wb-scale-row">
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <div key={n} className="wb-scale-circle">{n}</div>
              ))}
            </div>
            <div className="wb-scale-labels">
              <span>🐁 Ganz klein</span><span>🦁 Löwenmutig</span>
            </div>
          </div>
        </>
      ),
      content: (
        <>
          <p>
            Dein Kind steht am Rand des Spielplatzes und schaut zu. Andere
            Kinder spielen, lachen, rennen. Und dein Kind steht da. Nicht
            weil es nicht will. Sondern weil der Abstand zwischen „Zuschauen"
            und „Mitmachen" sich anfühlt wie ein Ozean.
          </p>
          <p>
            Oder: Dein Kind wurde zu einem Geburtstag eingeladen und
            bekommt am Morgen Bauchschmerzen. Echte Bauchschmerzen. Weil
            die Angst echt ist. Und du stehst dazwischen — zwischen „Ich
            möchte, dass es hingeht" und „Ich möchte ihm das nicht antun."
          </p>
          <h4>Was soziale Angst NICHT ist</h4>
          <p>
            Soziale Angst ist nicht Schüchternheit. Schüchternheit ist ein
            Temperamentsmerkmal — eine Art, mit der Welt in Kontakt zu
            treten, die etwas länger braucht. Soziale Angst ist die Furcht
            vor Bewertung, Ablehnung, Blamage. Es ist die Überzeugung: Wenn
            die anderen mich wirklich sehen, werden sie mich nicht mögen.
          </p>
          <h4>Die Balance: Nicht drängen, nicht vermeiden</h4>
          <p>
            Hier liegt die größte Herausforderung für Eltern. Wenn du dein
            Kind zwingst, auf den Geburtstag zu gehen, bestätigst du seine
            schlimmste Befürchtung: Meine Gefühle zählen nicht. Wenn du es
            komplett rausziehst, bestätigst du eine andere: Die Situation
            ist tatsächlich so gefährlich, wie ich denke.
          </p>
          <p>
            Der Weg liegt in der Mitte — und er beginnt immer mit
            Anerkennung: „Ich sehe, dass dir das schwerfällt. Lass uns
            zusammen überlegen, wie wir es schaffen können."
          </p>
          <div className="wb-card">
            <p className="wb-card-label">Die Mut-Leiter</p>
            <p>
              Erstellt gemeinsam eine Liste von Situationen, sortiert von
              „ein bisschen unangenehm" bis „richtig schwer":<br /><br />
              Stufe 1: Mit einem bekannten Kind allein spielen<br />
              Stufe 2: Mit zwei bekannten Kindern spielen<br />
              Stufe 3: Auf dem Spielplatz ein fremdes Kind ansprechen<br />
              Stufe 4: Zu einem Geburtstag gehen (mit dir in der Nähe)<br />
              Stufe 5: Zu einem Geburtstag gehen (ohne dich)<br /><br />
              Beginnt bei Stufe 1. Feiert jeden Schritt. Kein Druck nach
              oben — aber auch kein dauerhaftes Bleiben unten.
            </p>
          </div>
          <div className="wb-quote">
            „Mut wächst nicht, indem man ein Kind in kaltes Wasser wirft. Mut
            wächst, indem man gemeinsam eine Zehe eintaucht — und feststellt,
            dass es geht."
          </div>
        </>
      ),
    },
    {
      number: 7,
      title: "Angst vor der Dunkelheit, Monstern und dem Tod",
      subtitle: "Die großen Ängste der kleinen Menschen — und wie du sie begleitest",
      image: "/images/blog/emotionsregulation-bei-kindern/featured.jpg",
      content: (
        <>
          <p>
            „Mama, da ist ein Monster unter meinem Bett." Du seufzt. Du hast
            schon dreimal nachgeschaut. Du hast das Licht angelassen, den
            Flur beleuchtet, einen „Monster-Spray" (Wasser mit Lavendel)
            benutzt. Und trotzdem: Das Monster ist noch da. Weil das Monster
            nicht unter dem Bett lebt. Es lebt in der Fantasie deines Kindes.
            Und Fantasie lässt sich nicht mit Logik besiegen.
          </p>
          <h4>Warum Logik nicht hilft — und was stattdessen</h4>
          <p>
            „Es gibt keine Monster" ist für ein Vierjähriges keine
            beruhigende Information. Es ist eine Widerlegung seiner
            Wahrnehmung. Und wenn das, was es wahrnimmt, offensichtlich nicht
            stimmt, was stimmt dann noch? Kann es seinen eigenen Augen
            trauen? Seinen Gefühlen?
          </p>
          <p>
            Stattdessen: Geh in die Welt deines Kindes hinein. „Oh, ein
            Monster? Wie sieht es aus? Was macht es? Glaubst du, es hat
            vielleicht selbst Angst?" Wenn du das Monster ernst nimmst (nicht
            als real, aber als Gefühl), nimmst du dein Kind ernst. Und das
            ist alles, was es braucht.
          </p>
          <h4>Wenn Kinder anfangen, über den Tod nachzudenken</h4>
          <p>
            Zwischen 5 und 7 Jahren beginnen die meisten Kinder zu
            verstehen, dass der Tod endgültig ist. Diese Erkenntnis kann
            sich als nächtliche Angst äußern, als plötzliches Klammern, als
            die Frage: „Mama, stirbst du auch mal?"
          </p>
          <p>
            Dein Impuls ist vielleicht, zu beschwichtigen: „Nein, nein, das
            dauert noch ganz lange!" Aber Kinder verdienen Ehrlichkeit — in
            einer Form, die sie tragen können:
          </p>
          <p>
            „Ja, irgendwann sterben alle Menschen. Aber das wird
            wahrscheinlich erst in ganz, ganz langer Zeit sein. Und bis
            dahin bin ich jeden Tag bei dir. Jeden einzelnen Tag."
          </p>
          <div className="wb-card">
            <p className="wb-card-label">Abend-Rituale gegen Nachtangst</p>
            <p>
              • <strong>Mut-Licht:</strong> Ein kleines Nachtlicht, das dein
              Kind selbst an- und ausmachen kann. Kontrolle reduziert Angst.<br />
              • <strong>Sicherheits-Satz:</strong> Ein Satz, den ihr jeden
              Abend zusammen sagt: „Ich bin sicher, ich bin geliebt, ich bin
              mutig."<br />
              • <strong>Körper-Scan:</strong> „Spür mal deine Füße. Sind sie
              warm? Deine Beine. Dein Bauch..." — Aufmerksamkeit auf den
              Körper holt Kinder aus der Angst-Spirale im Kopf.
            </p>
          </div>
          <div className="wb-quote">
            „Du musst die Monster nicht besiegen. Du musst nur da sein,
            damit dein Kind lernt: Auch wenn es Monster gibt — ich bin
            nicht allein."
          </div>
        </>
      ),
    },
    {
      number: 8,
      title: "Mut ist kein Talent — Mut ist ein Muskel",
      subtitle: "Wie dein Kind Schritt für Schritt lernt, sich Herausforderungen zu stellen",
      image: "/images/blog/wie-du-am-besten-das-selbstbewusstsein-deines-kindes-unterstuetzt/featured.webp",
      content: (
        <>
          <p>
            Mut sieht in Filmen so aus: Ein Held springt ohne zu zögern in
            die Gefahr. Im echten Leben sieht Mut anders aus. Es ist das
            Kind, das trotz Bauchkribbeln die Bühne betritt. Es ist die
            Fünfjährige, die zum ersten Mal ohne Mama auf dem Spielplatz
            bleibt. Es ist der Achtjährige, der seine Hand hebt, obwohl er
            sich nicht sicher ist.
          </p>
          <p>
            Mut ist nicht die Abwesenheit von Angst. Mut ist die
            Entscheidung, etwas zu tun, OBWOHL die Angst da ist. Und diese
            Entscheidung kann man trainieren. Wie einen Muskel. Nicht durch
            Zwang, sondern durch wiederholte positive Erfahrungen.
          </p>
          <h4>Die drei Zutaten für Mut</h4>
          <p>
            <strong>1. Selbstwirksamkeit:</strong> Die Erfahrung „Ich kann
            etwas bewirken." Jedes Mal, wenn dein Kind eine kleine
            Herausforderung meistert — den Turm baut, der umfällt und es
            nochmal versucht, allein zum Bäcker geht, sich selbst die
            Schuhe bindet — speichert sein Gehirn ab: Ich schaffe Dinge.
          </p>
          <p>
            <strong>2. Sichere Basis:</strong> Ein Kind, das weiß „Wenn
            es schiefgeht, fängt mich jemand auf", traut sich mehr. Nicht
            weil es leichtsinnig wird, sondern weil die Angst vor dem
            Scheitern kleiner wird.
          </p>
          <p>
            <strong>3. Sprache:</strong> Wie du über Herausforderungen
            sprichst, formt, wie dein Kind sie wahrnimmt. „Das ist schwer,
            aber du schaffst das" ist eine andere Botschaft als „Pass auf,
            das ist gefährlich!"
          </p>
          <h4>Alltagsübungen für den Mut-Muskel</h4>
          <ul>
            <li><strong>Das Mut-Glas:</strong> Ein Glas, in das dein Kind
            jeden Tag einen kleinen Zettel wirft mit etwas, das es mutig
            gemacht hat. Am Wochenende lest ihr sie zusammen vor.</li>
            <li><strong>Die Superhelden-Pose:</strong> Beine breit, Hände
            in die Hüften, Brust raus. 2 Minuten vor einer schwierigen
            Situation. Lustig UND wirksam.</li>
            <li><strong>Der persönliche Mut-Spruch:</strong> „Ich bin mutig
            wie ein Löwe." „Ich schaffe das, Schritt für Schritt." Dein
            Kind wählt seinen eigenen.</li>
            <li><strong>Scheitern feiern:</strong> „Du hast es versucht!
            Das ist das Mutigste." Nicht das Ergebnis zählt, sondern der
            Versuch.</li>
          </ul>
          <div className="wb-quote">
            „Jedes Mal, wenn dein Kind etwas tut, wovor es Angst hatte,
            wächst in seinem Gehirn ein neuer Pfad: Ich kann das. Ich
            schaffe das. Ich bin mutig."
          </div>
        </>
      ),
    },
    {
      number: 9,
      title: "Der Angst einen Namen geben",
      subtitle: "Kreative Werkzeuge, die Kindern helfen, ihre Angst zu verstehen",
      image: "/images/blog/wie-du-selbststaendigkeit-bei-kindern-foerdern-kannst/featured.webp",
      activity: (
        <>
          <h3>Meine Angst kennenlernen</h3>
          <p>Diese Seite ist für dein Kind! Bearbeitet sie gemeinsam.</p>

          <div className="wb-activity">
            <p className="wb-activity-label">Male deine Angst!</p>
            <p className="wb-activity-prompt">Wie sieht deine Angst aus? Ist sie groß oder klein? Welche Farbe hat sie? Hat sie Augen, Arme, Beine? Male sie hier:</p>
            <div className="wb-activity-area" style={{minHeight: "45mm"}} />
          </div>

          <div className="wb-fillin">
            <p className="wb-fillin-label">Steckbrief meiner Angst</p>
            <div className="wb-fillin-row">Meine Angst heißt: <span className="wb-fillin-blank" /></div>
            <div className="wb-fillin-row">Sie kommt meistens, wenn: <span className="wb-fillin-blank" /></div>
            <div className="wb-fillin-row">Sie fühlt sich an wie: <span className="wb-fillin-blank" /></div>
            <div className="wb-fillin-row">Ich spüre sie im: <span className="wb-fillin-blank" /> (Bauch? Kopf? Brust?)</div>
            <div className="wb-fillin-row">Wenn sie da ist, sage ich ihr: <span className="wb-fillin-blank" /></div>
          </div>

          <div className="wb-checklist">
            <p className="wb-checklist-label">Meine Angst-Ampel (ankreuzen was passt)</p>
            <ul className="wb-checklist-items">
              <li><span className="wb-checkbox" style={{borderColor: "rgba(90,158,110,0.5)"}} /> 🟢 Grün: Ein bisschen kribbelig — ich probiere es!</li>
              <li><span className="wb-checkbox" style={{borderColor: "rgba(232,184,77,0.5)"}} /> 🟡 Gelb: Ziemlich viel Angst — ich brauche Hilfe</li>
              <li><span className="wb-checkbox" style={{borderColor: "rgba(232,100,100,0.5)"}} /> 🔴 Rot: Zu viel — wir pausieren erst mal</li>
            </ul>
          </div>
        </>
      ),
      content: (
        <>
          <p>
            Eines der mächtigsten Werkzeuge gegen Angst ist paradoxerweise
            eines der einfachsten: Ihr einen Namen geben. Denn Angst, die
            benannt wird, verliert einen Teil ihrer Macht. Was im Dunkeln
            lauert, ist immer bedrohlicher als das, was einen Namen hat.
          </p>
          <h4>Die Angst externalisieren</h4>
          <p>
            Lass dein Kind seine Angst als eigenes Wesen betrachten. Nicht
            als Teil von sich selbst („Ich BIN ängstlich"), sondern als
            etwas, das zu Besuch kommt („Die Angst ist wieder da"). Dieser
            Unterschied klingt klein, ist aber gewaltig. Denn wenn die Angst
            ein Besucher ist, kann man mit ihr reden. Man kann sie
            beobachten. Man kann ihr sogar sagen: „Danke, dass du mich
            beschützen willst, aber ich brauche dich gerade nicht."
          </p>
          <h4>Werkzeuge zum Externalisieren</h4>
          <p>
            <strong>Die Angst malen:</strong> „Wie sieht deine Angst aus?
            Welche Farbe hat sie? Ist sie groß oder klein? Hat sie Augen?"
            Kinder sind großartig darin, abstrakte Gefühle in Bilder zu
            verwandeln. Und ein gemaltes Monster ist deutlich weniger
            bedrohlich als eines in der Fantasie.
          </p>
          <p>
            <strong>Die Angst benennen:</strong> „Wie soll sie heißen?"
            Vielleicht heißt sie „Frau Sorge" oder „der Kribbel-Drache"
            oder „Herr Magengrummel." Ab jetzt könnt ihr sagen: „Oh, der
            Kribbel-Drache ist wieder da. Was braucht er wohl?"
          </p>
          <p>
            <strong>Der Angst einen Platz geben:</strong> „Die Angst darf
            da sein. Aber sie darf nicht bestimmen, was wir tun. Sie darf
            mitkommen — aber sie fährt nicht." Das Bild vom Bus: „Du bist
            der Fahrer. Die Angst sitzt hinten. Sie darf mitfahren, aber
            sie greift nicht ans Steuer."
          </p>
          <div className="wb-card">
            <p className="wb-card-label">Die Angst-Ampel</p>
            <p>
              Erstellt zusammen eine Angst-Ampel, die eurem Kind hilft,
              seine Angst einzuschätzen:<br /><br />
              <strong>Grün:</strong> „Ein bisschen kribbelig, aber ich
              schaffe das." → Ich probiere es.<br />
              <strong>Gelb:</strong> „Ziemlich viel Angst, ich brauche
              Hilfe." → Wir machen es zusammen.<br />
              <strong>Rot:</strong> „Zu viel. Ich kann gerade nicht." →
              Wir pausieren und beruhigen uns erst.<br /><br />
              Die Ampel gibt deinem Kind Sprache für seine Angst-Intensität —
              und euch beiden ein gemeinsames System.
            </p>
          </div>
          <div className="wb-quote">
            „Wenn dein Kind seiner Angst einen Namen gibt, wird es zum
            Beobachter seiner Angst statt zum Gefangenen."
          </div>
        </>
      ),
    },
    {
      number: 10,
      title: "Angst ist Mut, der noch eine Umarmung braucht",
      subtitle: "Ein Brief an dich — und an das mutige Kind, das du großziehst",
      image: "/images/blog/achtsamkeit-bei-kindern-so-kannst-du-dein-kind-dabei-unterstuetzen/featured.webp",
      content: (
        <>
          <p>
            Du bist am Ende dieses Leitfadens angekommen. Und vielleicht
            fühlst du dich jetzt ein bisschen wie dein Kind: ein
            bisschen mutig, ein bisschen unsicher, und voller Fragen, ob
            du das alles schaffen wirst.
          </p>
          <p>
            Lass mich dir etwas sagen, von Mutter zu Elternteil: Du
            schaffst das. Nicht perfekt. Nicht jeden Tag gleich gut. Aber
            genug. Mehr als genug.
          </p>
          <h4>Was du gelernt hast</h4>
          <p>
            Du weißt jetzt, dass Angst kein Fehler ist, sondern ein
            Schutzmechanismus. Dass dein Kind nicht „zu empfindlich" ist,
            sondern besonders aufmerksam. Dass seine Angst eine Sprache
            ist, die du jetzt besser verstehst. Dass deine eigene Geschichte
            eine Rolle spielt — und dass Bewusstsein der erste Schritt zur
            Veränderung ist.
          </p>
          <h4>Was dein Kind von dir bekommt</h4>
          <p>
            Dein Kind bekommt etwas, das viele von uns als Kinder nicht
            hatten: Einen Erwachsenen, der seine Angst nicht kleinredet.
            Der sie nicht wegmacht. Der nicht sagt „Stell dich nicht so
            an." Sondern der sagt: „Ich sehe deine Angst. Ich nehme sie
            ernst. Und ich bin hier."
          </p>
          <p>
            Das ist kein kleines Geschenk. Das ist das Fundament, auf dem
            dein Kind ein ganzes Leben aufbauen wird.
          </p>
          <div className="wb-quote">
            „Angst ist Mut, der noch eine Umarmung braucht. Und du bist
            diese Umarmung."
          </div>
          <h4>Dein nächster Schritt</h4>
          <p>
            Wähle EINE Sache aus diesem Leitfaden. Nur eine. Vielleicht
            die 4-Satz-Formel aus Kapitel 4. Vielleicht das Abschiedsritual
            aus Kapitel 5. Vielleicht die Angst-Ampel aus Kapitel 9. Oder
            vielleicht nur diesen einen Satz, den du heute Abend zu deinem
            Kind sagst, wenn es wieder Angst hat:
          </p>
          <p>
            „Ich sehe, dass du Angst hast. Das ist okay. Ich bin hier.
            Wir schaffen das zusammen."
          </p>
          <div className="wb-card">
            <p className="wb-card-label">Die drei Sätze, die bleiben</p>
            <p>
              <strong>1.</strong> Angst ist kein Feind — sie ist ein
              Beschützer, der manchmal zu laut wird.<br />
              <strong>2.</strong> Dein Kind braucht keine angstfreie Welt —
              es braucht dich als sichere Basis, von der aus es die Welt
              erkunden kann.<br />
              <strong>3.</strong> Mut wächst nicht durch Druck, sondern
              durch tausend kleine Momente, in denen jemand sagt: „Ich
              traue dir das zu."
            </p>
          </div>
          <p>
            Danke, dass du diesen Weg für dein Kind gehst. Es wird sich
            daran erinnern. Nicht an die perfekten Tage. Sondern daran,
            wie es sich in deiner Nähe gefühlt hat, wenn es Angst hatte.
          </p>
          <p>
            Von Herzen,<br />
            <em>Ewelina</em>
          </p>
        </>
      ),
    },
  ],
};

export default function KinderangstEbook() {
  return <EbookWebLayout config={config} />;
}
