# Sales-Funnel-Konzept: Newsletter-Upsell-Funnel für gefühlsförderung.de

**Für:** Ewelina Gawlik · Gefühlsförderung
**Stand:** Juni 2026
**Status dieses Dokuments:** Konzept zur Umsetzung · löst die veralteten Docs `sales-funnel-konzept.md` und `gesamtkonzept-analyse.md` ab (siehe Kapitel 13)
**Ablageort:** `docs/` (noindex, interne Doku)

---

## 1. Management-Summary

### Gibt es den Newsletter-Upsell-Funnel schon? → **Nein.**

Was heute **existiert und funktioniert**, sind die *einzelnen Bausteine* — aber sie sind nicht zu einem Funnel verbunden, und an den entscheidenden Stellen passiert **nichts Verkäuferisches**:

| Baustein | Heute implementiert | Was fehlt zum Funnel |
|---|---|---|
| Newsletter-Anmeldung | Formular in Sektionen/Footer/Blog + Popup (Popup leitet zum **Quiz**, nicht zum Newsletter) | Eine echte Squeeze-/Opt-in-Page existiert noch nicht; kein echter Lead-Magnet als Anreiz; früheres „10 % Rabattcode"-Versprechen wurde entfernt |
| DOI-Bestätigung | DigiLetter Double-Opt-in → DOI-Mail → Klick → Redirect | Mail ist rein generisch, kein Pre-Frame aufs nächste Angebot |
| `/newsletter/bestaetigt` | Schlichte Seite, **nur** „Zum Blog"/„Zum Shop" | Kein Freebie-Download, **kein Angebot**, keine Verknappung |
| Quiz (`/quiz`) | 5 Fragen → Ergebnis A–E, Lead-Tagging, Produkt­empfehlung | Ergebnisseite zeigt nur **nackte Links** zu `/shop/<slug>` — kein Add-to-Cart, keine Verknappung |
| Checkout | Cart + Adresse + Klarna (LIVE) + PayPal | **Kein Order Bump**, keine Rabatt-/Coupon-Eingabe |
| `/bestellung/erfolgreich` | Schlichte Danke-Seite + Download-Links per Mail | **Kein Upsell/Downsell** |
| E-Mail-Sequenzen | DigiLetter transaktional + DOI | **Keine aktive Drip-/Automations-Engine** (nur „geplant") · **kein persistenter Schritt-Store** |

### Ist-Zustand vs. alte WordPress-Seite (das Vorbild des Kunden)

| Schritt | Alte WordPress-Seite (Vorbild) | Neue Next.js-Seite HEUTE | Dieses Konzept |
|---|---|---|---|
| Anmeldung | Opt-in mit Rabattcode-Bait | Inline-Formulare; Popup leitet ins Quiz | **Squeeze-Page (neu zu bauen)** mit **echtem Lead-Magnet** (Mini-Guide-PDF) |
| Dankesseite #1 | Produktangebote „nur heute günstiger" | Inline „Bitte E-Mail bestätigen" | Bestätigungs-Anleitung **+ Core-Offer (Buch)** |
| Bestätigungsmail | mit Angeboten | generisch | generisch + **dezenter, rechtssicherer Pre-Frame** |
| Dankesseite #2 | weitere Angebote | nur „Zum Blog/Shop" | **Freebie-Download + Bundle-Angebot** |
| Folge-Mails | — | — | **Soap-Opera- + Seinfeld-Sequenz** (nach DOI) |

Die alte WP-Seite war ein klassischer Brunson-Opt-in-Funnel mit Tripwire/OTO durchgehend — **inklusive Angeboten in der Bestätigungsmail und Fake-„nur heute"-Logik.** Genau das ist in Deutschland an mehreren Stellen abmahnbar. Dieses Konzept liefert denselben Funnel-Effekt **rechtssicher übersetzt**.

### Was dieses Konzept liefert

1. Eine **Value Ladder** auf Basis der **8 real existierenden Produkte** (keine Phantasie-SKUs, echte Preise).
2. Den **kompletten Newsletter-Opt-in-Funnel** mit fertiger deutscher Copy für jeden Schritt.
3. **Quiz-Funnel-Upgrade, Order Bump, Post-Purchase-Upsell/Downsell** — jeweils machbarkeitsehrlich.
4. **E-Mail-Sequenzen** mit DigiLetter-Tags.
5. **Technisches Fundament**: wie „X € statt Y €" **ohne Coupon-System** geht, warum echtes 1-Click-OTO mit Klarna/PayPal nicht trivial ist, wie Verknappung **echt** wird, warum ein **persistenter Datastore** der zentrale Blocker ist.
6. **Rechtliche Leitplanken** (Do/Don'ts + Ampel) und eine **Phasen-Roadmap** mit Aufwand, Impact und konkreten Dateipfaden.

### Die vier harten Wahrheiten, die alles bestimmen

| # | Constraint | Konsequenz im Konzept |
|---|---|---|
| 1 | **Kein Coupon-/Rabattsystem** | „X € statt Y €" nur über **funnel-exklusive SKUs** (empfohlen), reale Bundle-Paketpreise oder signierte Offer-Token — **keine** erfundenen Referenzpreise. Jeder rabattierte Aufpreis ist eine eigene SKU oder existiert nicht. |
| 2 | **Klarna + PayPal sind redirect/capture-basiert** | **Order Bump (pre-purchase) = leicht** und Hauptprofit-Hebel; **Post-Purchase-OTO = neue Mini-Bestellung mit Re-Auth**, kein echtes 1-Click |
| 3 | **DOI ist gesetzlich Einwilligungsbestätigung** | Angebot **NICHT** in der DOI-Mail, sondern auf der Thank-You-Page **nach** dem Klick + in der Welcome-Sequenz nach erteiltem DOI |
| 4 | **Verknappung muss echt sein (UWG)** | Keine resettenden Fake-Timer; Deadlines **serverseitig** an einen Timestamp gebunden, der **ab DOI-Bestätigungsklick** läuft |

### Der eine zentrale Infra-Blocker (vorab)

Das System hat **keine persistente Datenhaltung**: `rate-limit` ist In-Memory, `fulfillment-lock` ist eine tmp-Datei. **Ohne einen persistenten Datastore (KV/DB/Coolify-Volume) sind Drip-Sequenzen, lead-/zeitgebundene Offer-Token, Abbrecher-Erkennung und Tracking-Dedup nicht sauber baubar.** Dieser eine Baustein blockiert mehrere Features und ist deshalb als **eigene Roadmap-Maßnahme in Phase 1, vor allen darauf aufbauenden Features**, eingeplant (Kapitel 11, #6).

---

## 2. Russell-Brunson-Grundlagen (kompakt)

Nur so viel, dass das Konzept nachvollziehbar ist:

| Prinzip | Kern in einem Satz | Wo es hier greift |
|---|---|---|
| **Value Ladder** | Jede Stufe liefert mehr Wert zu höherem Preis und „erzieht" zum nächsten Kauf | Kapitel 3 |
| **Hook · Story · Offer** | Aufmerksamkeit (Hook) → Beziehung (Story) → Angebot (Offer) | Squeeze, Quiz-Ergebnis, jede Mail |
| **Attractive Character** | Eine echte, nahbare Identifikationsfigur trägt die Kommunikation | Ewelina als Ich-Erzählerin durchgängig |
| **Epiphany Bridge** | Die eine Erkenntnis, die alles verändert hat, als Story erzählt | „Kinder brauchen Worte/Bilder für Gefühle, keine Ermahnungen" |
| **Lead Magnet / Bait** | Echter Gratis-Wert generiert die E-Mail | Mini-Guide „5 Sätze, die jedes Kind beruhigen" |
| **Tripwire** | Niedrigpreis-Erstkauf — „ein Käufer ist 10× mehr wert als ein Abonnent" | E-Book-Funnel-SKU 7,90 € als niedrigster Impulspreis |
| **Stack Slide** | Wert sichtbar stapeln („einzeln X · im Paket Y") | TY2-Bundle, Quiz-Bundle, OTO (Kapitel 4.4, 5, 7) |
| **Order Bump** | Zusatz-Häkchen im Kaufmoment hebt den Warenkorbwert | Kapitel 6 |
| **OTO / Downsell** | Sofort-Upsell nach Kauf; bei „Nein" günstigere Alternative | Kapitel 7 |
| **Big Domino** | Eine Diagnose → eine logische nächste Handlung | Quiz (Kapitel 5) |
| **Soap Opera / Seinfeld** | Story-Sequenz zum Beziehungsaufbau, dann dauerhafte Bindung | Kapitel 8 |

**Begriffsdisziplin:** „**Tripwire**" meint in diesem Dokument **ausschließlich** den niedrigsten Impulspreis — die E-Book-Funnel-SKU zu 7,90 € (Stufe 1). Das Buch „Was fühlst du?" (17,90 €) ist die **Core-Stufe / der Big Domino**, kein Tripwire. Quiz-Ergebnisse können günstige Leitfäden als Einstieg anbieten, das bleibt aber Core-/Problempfad, nicht „Tripwire".

**Wichtig:** Brunsons Mechanik ist in Deutschland nicht per se verboten — aber an vier Stellen kollisionsanfällig (Werbung in der DOI-Mail, Fake-Verknappung, erfundene Streichpreise, fehlende Pflichtinfos bei Zusatzkäufen). **Wo Recht und aggressive Taktik kollidieren, gewinnt in diesem Dokument immer das Recht**, und es wird die rechtssichere Variante gezeigt.

---

## 3. Value Ladder mit den echten Produkten

Alle Preise = reale Preise aus `src/lib/products.ts`. **Streichpreise** sind nur dort gesetzt, wo eine reale Preishistorie bzw. ein Paketpreis (Summe der Einzelpreise) sie deckt — siehe Spalte „Preis-Mechanik".

```
                                          ┌─────────────────────────────────────┐
 Stufe 5  FUTURE BACKEND (fehlt!)         │  Begleitkurs / App-Abo (Continuity)  │  ⚠ existiert noch nicht
                                          └─────────────────────────────────────┘
                                   ┌──────────────────────────────────────┐
 Stufe 4  BACKEND / Stack-Top      │  Gefühlskompass-Bundle  45,99 €      │  (Paketpreis, einzeln 72,88 €, −37 %)
                                   └──────────────────────────────────────┘
                          ┌──────────────────────────────────────┐
 Stufe 3  PROFIT MAX      │  „Emotionen Entdecken" Bundle 24,99 € │  (Paketpreis, einzeln 33,89 €) + Order Bump
                          └──────────────────────────────────────┘
                 ┌──────────────────────────────────────┐
 Stufe 2  CORE   │  Buch „Was fühlst du?"  17,90 €      │  Big Domino, Anker
                 └──────────────────────────────────────┘
        ┌──────────────────────────────────────┐
 Stufe 1 TRIPWIRE  │  E-Book-Funnel-SKU  7,90 € (Endpreis) │
        └──────────────────────────────────────┘
 ┌──────────────────────────────────────┐
 Stufe 0  BAIT  │  Mini-Guide-PDF (gratis)  │
 └──────────────────────────────────────┘
```

| Stufe | Brunson-Rolle | Produkt (echt) | Preis | Preis-Mechanik / id |
|---|---|---|---|---|
| **0 — Bait** | Lead Magnet (gratis) | Mini-Guide „5 Sätze, die jedes Kind beruhigen" (PDF) | **0 €** | neu zu erstellen; lead-gebundener HMAC-Download |
| **1 — Tripwire** | Impulskauf, digital, 0 Logistik | Funnel-SKU des Leitfadens emot. Entwicklung | **7,90 € (Endpreis, KEIN „statt")** | Funnel-SKU `funnel-leitfaden-tripwire`, `hidden: true` |
| **2 — Core / Big Domino** | physischer Anker | Buch „Was fühlst du?" | **17,90 €** (Streich 22,90 € **nur mit 30-Tage-Nachweis**) | `was-fuehlst-du` |
| **3 — Profit Max** | AOV-Hebel | „Emotionen Entdecken" Bundle | **24,99 €** (Paketpreis, einzeln 33,89 €) | `emotionen-entdecken-bundle` |
| **4 — Backend** | höchster Warenkorb | Gefühlskompass-Bundle | **45,99 €** (Paketpreis, einzeln 72,88 €, −37 %) | `gefuehlskompass-bundle` |
| **5 — Future Backend** | Continuity/LTV | Begleitkurs oder App-Abo | z. B. 9 €/Mt. oder 129 € | **existiert nicht** → Roadmap |

**Wichtig zur Tripwire-SKU (Stufe 1):** Eine neu angelegte Funnel-SKU zu 7,90 € hat **keine reale 30-Tage-Preishistorie** und der reguläre Leitfaden (`leitfaden-emotionale-entwicklung`) kostet real 10,99 €. Ein durchgestrichener Referenzpreis „statt 10,99 €" wäre damit ein **erfundener Streichpreis** (§11 PAngV / §5 UWG) — verboten. Die Tripwire-SKU wird deshalb **ausschließlich mit ihrem Endpreis „7,90 €"** beworben. Wenn die Preisgünstigkeit kommuniziert werden soll, dann nur über die ehrliche Produktidentität („mein digitaler Einstiegs-Leitfaden, 7,90 €"), **nicht** als durchgestrichener Preis.

**Ehrliche Notiz:** Die Leiter endet heute bei einem 45,99-€-Einmalkauf — eine *flache* Leiter ohne wiederkehrenden Umsatz. **Der größte strategische Hebel ist Stufe 5 (Continuity).** Solange sie fehlt, ruht die Funnel-Ökonomie auf Frontend-Volumen, nicht auf Lifetime-Value. Das ist die eigentliche LTV-Lücke und gehört auf die Roadmap.

> **Spezial-Leitfäden** („Kinderwut" 14,99 €, „Kind redet nicht" 14,99 €) sind keine Leiterstufe, sondern **problemspezifische Seiten-Pfade** — sie werden über das Quiz (Kapitel 5) gezielt angeboten.

---

## 4. Der Newsletter-Opt-in-Funnel (Hauptteil)

Ablauf: **Squeeze → Thank-You #1 (+Core-Offer) → DOI-Mail → Thank-You #2 (+Bundle) → Soap-Opera-Sequenz.**

> **Ehrliche Vorbemerkung:** Eine dedizierte Squeeze-/Opt-in-Page existiert heute **nicht**. Es gibt nur Inline-Formulare (Sektionen/Footer/Blog) und ein Popup, das aktuell **ins Quiz** statt in den Newsletter leitet. Der unten beschriebene Einstieg (4.1) ist also **neu zu bauen**, und es ist zu entscheiden, ob das Popup künftig auf die Squeeze-Page umgehängt wird (Roadmap, Kapitel 11).

Pro Schritt: Zweck · Brunson-Prinzip · fertige Copy · Recht · Technik.

---

### 4.1 Squeeze / Opt-in-Page (neu zu bauen)

**Zweck:** E-Mail generieren über echten Wert-Bait (nicht über den entfernten Rabattcode).
**Brunson:** Hook · Story · Offer; Attractive Character; Bait als „Sample" der Leiter.

**Fertige Copy:**

> **Headline (Caveat):**
> Du musst nicht alle Antworten haben, um deinem Kind durch seine Gefühle zu helfen.
>
> **Subheadline (Nunito):**
> Hol dir alle 1–2 Wochen eine warme E-Mail von mir, Ewelina — Kindheitspädagogin und selbst Mama. Kleine Sätze, ehrliche Impulse und Wege, wie du mit deinem Kind über Wut, Tränen und das große Gefühlschaos sprechen kannst. Ganz ohne erhobenen Zeigefinger.
>
> **Bulletpoints:**
> - 💛 **Sätze, die wirklich helfen:** konkrete Formulierungen für die Momente, in denen dir selbst die Worte fehlen.
> - 🌿 **Ruhe statt Ratgeber-Stress:** kurze Impulse aus der Kindheitspädagogik. In 2 Minuten gelesen, am selben Abend anwendbar.
> - ✨ **Als Willkommen für dich:** mein Mini-Guide *„5 Sätze, die jedes Kind beruhigen"* — kostenlos, direkt nach deiner Bestätigung.
>
> **Button:** Ja, schick mir die Impulse 💌
>
> **Vertrauens-Microcopy:** Du bekommst gleich eine E-Mail mit einem Bestätigungslink (Double-Opt-in) — bitte einmal klicken, dann sind wir verbunden. Kein Spam, keine Weitergabe deiner Daten. Abmelden jederzeit mit einem Klick. Mehr in meiner [Datenschutzerklärung](/datenschutz).

Formular: **Vorname + E-Mail** (Vorname für Personalisierung der Sequenz). POST `/api/newsletter` → DigiLetter Liste `newsletter`, Tags `gefuehlsfoerderung`, `newsletter`, `lead-magnet-starterset`.

**Recht:** 🟢 Sauber. DOI-Hinweis + Datenschutzlink Pflicht. Das Freebie-Versprechen darf hier stehen (es ist die Anmelde-Belohnung). Es werden **keine** Preise/Streichpreise genannt → kein PAngV/§19-Thema auf der Squeeze.
**Technik (M):** Neue Route `/newsletter` (oder `/impulse`) als Squeeze-Page. Bestehendes `/api/newsletter` bleibt. Der Bait (PDF) ist neu (siehe 4.4 Technik). Popup-Umlenkung entscheiden.

---

### 4.2 Thank-You-Page #1 (nach Absenden, VOR DOI-Klick)

**Zweck:** zwei Jobs — (1) Bestätigung sicherstellen (sonst stirbt der Funnel an unbestätigten DOIs), (2) ersten Verkaufsmoment mit dem Core-Anker setzen.
**Brunson:** Bridge-Page; Core-Offer; „ein Käufer ist 10× wertvoller als ein Abonnent".

**Job 1 — Bestätigungs-Anleitung (oben, wichtigster CTA):**

> **Headline (Caveat):** Fast geschafft — ein kleiner Klick fehlt noch 💌
>
> Ich habe dir gerade eine E-Mail geschickt. So holst du dir deinen Mini-Guide:
> 1. **Öffne dein E-Mail-Postfach.**
> 2. **Such die Mail von „Ewelina · Gefühlsförderung"** — Betreff: *„Bitte bestätige kurz — dann gehört der Mini-Guide dir 💛"*.
> 3. **Klick auf den Bestätigungs-Button.** Damit ist alles erledigt und dein Guide kommt direkt zu dir.
>
> *Nichts angekommen? Schau bitte in den Spam-/Werbung-Ordner. Wenn du die Mail als „kein Spam" markierst, finden wir uns in Zukunft leichter.*

**Job 2 — Core-Offer („Während du wartest…"):**

> **Bridge:** Während du auf die Mail wartest, möchte ich dir noch etwas zeigen — weil so vieles davon abhängt, dass dein Kind seine Gefühle überhaupt *benennen* kann.
>
> Genau dafür habe ich mein Kinderbuch *„Was fühlst du?"* geschrieben. Drei Geschichten über den kleinen Julian und seinen Teddy Tobi, die Kindern zwischen 6 und 10 helfen, Traurigkeit, Wut und Freude in Worte zu fassen — mit Reflexionsfragen, die das Gespräch von allein in Gang bringen.
>
> **Angebot:** „Was fühlst du?" — das Buch, mit dem so viele Familien angefangen haben
> - Handgemaltes Hardcover (6–10 Jahre) · 3 Geschichten: Traurigkeit · Wut · Freude
> - Reflexionsfragen nach jeder Geschichte · FSC-Papier
> - **17,90 €** (Gesamtpreis; gemäß §19 UStG keine USt.) — Streichpreis „statt 22,90 €" **nur**, wenn 22,90 € nachweislich der niedrigste Preis der letzten 30 Tage war (sonst nur „17,90 €")
>
> **Ehrliche Verknappung (kein Fake-Timer):** Jedes Buch wird in kleinen Auflagen liebevoll produziert — ein Bestseller, der regelmäßig vergriffen ist. Solange „Auf Lager" steht, ist es sofort lieferbar.
>
> **Button:** Buch ansehen & sichern → *(zu `/shop/was-fuehlst-du`)*
> **„Nein danke":** Nein danke — ich bestätige erstmal nur meine E-Mail.

**Recht:** 🟢 Werbung VOR dem DOI-Klick ist On-Page (kein E-Mail-Marketing) → zulässig. Der `22,90 €`-Streichpreis ist nur zulässig, wenn er nachweisbar der niedrigste Preis der letzten 30 Tage war (PAngV §11) → **Preis-Log je SKU führen** (siehe Kapitel 10/11). Ist das nicht gesichert, nur den Endpreis „17,90 €" nennen. **§19-Hinweis Pflicht**, niemals „inkl. MwSt".
**Hinweis zur Verknappung:** `inStock` ist im Datenmodell ein Boolean ohne Stückzahl — „Auf Lager" ist daher Dauerzustand, keine echte zeitliche Knappheit. Diese Stelle nutzt bewusst **nur** ehrliche Lager-/Auflagen-Aussagen, **keinen** Timer. Echte zeitliche Verknappung kommt erst nach erteiltem DOI über den Offer-Token (4.4 / 9.3) zum Einsatz.
**Technik:** Variante A (empfohlen, S): bestehenden Inline-Success von `useNewsletterForm.ts` in `Newsletter.tsx`/`NewsletterCompact.tsx`/`NewsletterSignup.tsx` um Angebots-Karte erweitern — kein Routing-Umbau, da das Formular an vielen Stellen sitzt (ein Redirect zerstört den Kontext). Variante B (M): eigene Route `/newsletter/fast-geschafft`.

---

### 4.3 DOI-Bestätigungsmail (DigiLetter, „lavendel"-Branding)

**Zweck:** Einwilligung bestätigen — **mehr nicht**. Dies ist der rechtlich heikelste Stein.
**Brunson, rechtssicher übersetzt:** statt „Offer in der Confirmation Mail" → **Pre-Frame** in der Mail + Offer auf der Post-Click-Page.

**Fertige Copy:**

> **Betreff (A/B):**
> A: Bitte bestätige kurz — dann gehört der Mini-Guide dir 💛
> B: Ein Klick noch, dann sind wir verbunden 💌
> **Preheader:** Bestätige deine Anmeldung — danach schicke ich dir „5 Sätze, die jedes Kind beruhigen".
>
> Hallo 💛
> schön, dass du da bist. Ich bin Ewelina — Kindheitspädagogin, Mama und der Mensch hinter der Gefühlsförderung.
> Bitte bestätige einmal kurz, dass du meine Impulse rund um Gefühle, Wut und das Miteinander mit deinem Kind bekommen möchtest. Erst danach darf ich dir schreiben — so will es der Datenschutz, und das ist auch gut so.
>
> **→ [Ja, ich möchte die Impulse erhalten]**
>
> Sobald du bestätigt hast, landest du direkt auf einer Seite, auf der dein Willkommensgeschenk *„5 Sätze, die jedes Kind beruhigen"* auf dich wartet.
> Bis gleich, deine Ewelina
>
> *Du hast dich nicht angemeldet? Dann ignoriere diese Mail einfach — ohne deine Bestätigung passiert nichts.*

**Recht:** 🔴→🟢 **Erlaubt:** Anrede, EIN Bestätigungs-CTA, Absenderidentität, Datenschutz-/Widerrufszeile, Impressum, Branding (Corporate Design ≠ Werbung), sachlicher Ausblick aufs Geschenk (Zweckbezug zur Anmeldung). **Verboten in dieser Mail:** Preise, Streichpreise, „nur heute günstiger", Add-to-Cart, Bundle-Pitches, Countdown — das wäre Werbung an einen noch nicht eingewilligten Empfänger (§7 Abs. 2 Nr. 2 UWG, BGH I ZR 164/09). Der dezente Pre-Frame aufs Geschenk ist zulässig, weil das Geschenk Teil der Anmeldung ist.
**Technik:** Mail liegt in DigiLetter, nicht im Repo. Redirect nach Klick → `/newsletter/bestaetigt`. Für Personalisierung/Verknappung optional `redirectUrl` mit signiertem Confirm-Token (`?c=<token>`) — Konfiguration in DigiLetter. **Wichtig:** Eine etwaige Verknappungsfrist startet **erst mit dem Bestätigungsklick** (Token-`exp` wird beim Eintreffen auf `/newsletter/bestaetigt` gesetzt/abgeleitet), **nicht** ab Mail-Versand — sonst kann das Angebot ablaufen, bevor der Nutzer überhaupt klickt (irreführend, siehe 9.3).

---

### 4.4 Thank-You-Page #2 (nach DOI-Klick — Aufwertung von `/newsletter/bestaetigt`)

**Zweck:** Versprechen einlösen (Freebie) + ersten echten Verkaufs-Push (Werbung jetzt erlaubt, DOI ist erteilt).
**Brunson:** Value-Ladder-Aufstieg direkt nach dem ersten „Yes"; **Stack Slide** („einzeln X · im Paket Y").

**Block 1 — Freebie-Auslieferung:**

> **Headline (Caveat):** Da bist du — herzlich willkommen 💛
> Schön, dass du dabei bist. Ab jetzt schicke ich dir alle ein bis zwei Wochen einen kleinen, warmen Impuls. Und weil du bestätigt hast, gehört dein Willkommensgeschenk jetzt dir:
>
> **📥 Mini-Guide herunterladen: „5 Sätze, die jedes Kind beruhigen" (PDF)**
> *Speicher ihn dir gleich aufs Handy — dann hast du die Sätze griffbereit, wenn der nächste Sturm kommt.*

**Block 2 — Bundle-Angebot mit Wert-Stack:**

> **Headline (Caveat):** Wenn du tiefer einsteigen möchtest …
> Der Mini-Guide ist ein Anfang. Viele Familien wünschen sich danach etwas in der Hand — etwas, das Gefühle *sichtbar* macht. Genau dafür habe ich meine drei Herzstücke zusammengestellt.
>
> **Gefühlskompass-Bundle — das steckt drin:**
> - Buch „Was fühlst du?" — einzeln 22,90 €
> - Emotions-Memory Teil 1 — einzeln 24,99 €
> - Emotions-Memory Teil 2 — einzeln 24,99 €
> - Leitfaden zur emotionalen Entwicklung (E-Book) — einzeln 10,99 €
>
> **Einzeln zusammen: 72,88 € · im Bundle: 45,99 € (Gesamtpreis; gemäß §19 UStG keine USt.) — du sparst über 37 %.**
>
> **Ehrliche Verknappung:** Der Bundle-Preis ist günstiger als jeder Einzelkauf, weil alles zusammenkommt. Memory-Spiele und Buch werden in kleinen Auflagen handproduziert — wenn sie da sind, sind sie sofort bei dir.
>
> **Button:** Das Gefühlskompass-Bundle ansehen → *(zu `/shop/gefuehlskompass-bundle`)*
> **„Nein danke":** Vielleicht später — jetzt erstmal in Ruhe stöbern: [Zum Blog](/blog) · [Zum Shop](/shop)

**Hinweis zur statischen Angebotsführung:** TY2 (`/newsletter/bestaetigt`) hat **keinen** Zugriff auf eine Bestellhistorie (kein User-Account-System, kein serverseitiger DigiLetter-Read für den Kaufstatus — DigiLetter-Tags eignen sich fürs *Targeting* von Mails, nicht für einen synchronen Read beim Seiten-Render). Eine „hat der Lead schon das Buch gekauft?"-Verzweigung ist hier **nicht** zuverlässig umsetzbar und wird daher **nicht** versucht. Stattdessen: **statisch das Gefühlskompass-Bundle** anbieten. Die kaufstatus-abhängige Aufstiegslogik (Buch-Käufer → „Emotionen Entdecken") wird **per E-Mail-Sequenz** (Kapitel 8) gelöst, wo der `gekauft-<sku>`-Tag beim Versand ausgewertet werden kann.

**Recht:** 🟢 Nach dem Bestätigungsklick ist Werbung On-Page zulässig (Einwilligung erteilt). Der `72,88 €`-Vergleich ist **kein** §11-Streichpreis, sondern eine **Set-/Paketpreis-Darstellung** (Summe der Einzelpreise) → zulässig, klar als „einzeln 72,88 € · im Bundle 45,99 €" gelabelt, **nicht** als „früherer Preis". **§19-Hinweis Pflicht.** Verknappung muss echt sein (kein Fake-Timer).
**Technik:** Heute schlichte Seite (`src/app/newsletter/bestaetigt/page.tsx`). Aufwerten um (1) Freebie-Download und (2) statisches Bundle-Angebot. Freebie-Auslieferung **lead-gebunden**: PDF nach `private/downloads/` (NICHT `public/`), Asset-Eintrag `productId: "freebie-newsletter"` in `digital-assets.ts`, Token **frisch in der Server-Component** via `createDownloadToken(["freebie-newsletter"], "newsletter:freebie")` mit 30-Tage-TTL erzeugen — **kein** statisch geteilter Sharelink (sonst Bait ohne Lead, da der Link ohne Anmeldung kursieren könnte). Keine Änderung an `download-token.ts` nötig.

---

### 4.5 Soap-Opera-Sequenz (5 Mails, nach erfolgtem DOI)

**Zweck:** Beziehung > Verkauf; über Story zur Kaufentscheidung führen.
**Brunson:** Soap Opera Sequence (Attractive Character + Epiphany Bridge in Mail-Form).

**Fertige Copy (gekürzt auf Betreff + Kern):**

| Mail | Tag | Betreff | Kern |
|---|---|---|---|
| 1 | 0 | Warum ich angefangen habe, über Gefühle zu schreiben | Vorgeschichte: ein tobendes Kind, eine ratlose Pädagogin. „Konsequenter sein" war der falsche Weg. Cliffhanger. Soft-Verweis: Mini-Guide wartet auf der Bestätigungsseite. |
| 2 | 2 | Der Satz, der alles verändert hat | Wendepunkt: „Du bist gerade richtig wütend, oder?" — das Gefühl wurde *gesehen*. Epiphany. Noch kein Pitch. |
| 3 | 4 | Warum „red doch mit mir" fast nie funktioniert | Versteckte Hürde: Kindern fehlen die Worte für Gefühle. Lösbar — spielerisch, ohne Druck. |
| 4 | 6 | Gefühle muss man sehen können, bevor man darüber spricht | Aha: Gefühle wurden greifbar (Geschichten, Bilder, Spiel). So entstanden Buch und Memorys. „Morgen zeige ich dir, womit du anfangen kannst." |
| 5 | 8 | Womit du heute Abend anfangen kannst | Offer mit Wert-Stack: Buch *„Was fühlst du?"* (17,90 €) als sanfter Einstieg ODER **Gefühlskompass-Bundle** (einzeln 72,88 € · im Bundle 45,99 €). Kein Druck. **→ [Buch ansehen]** · **→ [Bundle ansehen]** |

**Danach: Seinfeld / Daily-Sequenz** — 2–3 Mails/Woche, je eine Mini-Story aus dem Familienalltag → Lehre → **ein** CTA (mal Blog, mal Produkt, mal Quiz). Verkauft die ganze Leiter über Zeit, ohne Werbedruck.

**Recht:** 🟢 Werbung erlaubt (DOI erteilt). **Pflicht: Abmeldelink in jeder Mail** (§7 Abs. 3 Nr. 4 UWG / Art. 21 DSGVO). Streichpreise nur mit echter 30-Tage-Historie; Bundle als Paketpreis labeln; §19-Hinweis bei jedem Preis.
**Technik:** ⚠️ DigiLetter hat **keine aktive Drip-Engine** („geplant") und es gibt **keinen persistenten Schritt-Store**. Diese Sequenz braucht zwingend (a) den persistenten Datastore (Kapitel 9.4 / Roadmap #6) und (b) Next-Cron + `/api/v1/transactional`. Bis dahin nur manuelle Broadcasts möglich. Siehe Kapitel 8 + 9.

---

## 5. Quiz-Funnel-Upgrade (Add-to-Cart auf Ergebnisseite)

**Heute:** Quiz → Ergebnisseite zeigt nur nackte Links zu `/shop/<slug>`. Das verschenkt den heißesten Moment (Diagnose gestellt, Problem bewusst).
**Brunson:** Das Quiz ist der präziseste **Big-Domino**-Mechanismus — eine Diagnose, eine logische Handlung. Ergebnis = Hook · Story · Offer in komprimierter Form.

**Mapping exakt aus `quiz.ts` (A–E):**

| Ergebnis | Diagnose / Headline | Empfohlenes Angebot (reale Preise) | Sekundär |
|---|---|---|---|
| **A — Gefühlschaos** | „Aus dem Gefühlschaos wird eine Entdeckungsreise." | **Bundle „Emotionen Entdecken" 24,99 €** (einzeln 33,89 €) = Buch + Leitfaden | nur Buch 17,90 € |
| **B — Wut** | „Wut ist kein Feind — sie ist ein Hilferuf." | **Leitfaden „Kinderwut" 14,99 €** (E-Book, sofort) | — |
| **C — Schweigen** | „Dein Kind will nicht schweigen — es sucht nur eine andere Tür." | **Leitfaden „Kind redet nicht" 14,99 €** | — |
| **D — Eigene Muster** | „Du bist nicht deine Eltern — und das ist deine Stärke." | **Bundle „Emotionen Entdecken" 24,99 €** (einzeln 33,89 €) = Buch + Leitfaden | nur Buch 17,90 € |
| **E — Angst/Mut** | „Angst ist Mut, der noch eine Umarmung braucht." | **Buch „Was fühlst du?" 17,90 €** | — |

> **Konsistenz-Hinweis:** A und D haben in `quiz.ts` dasselbe `productIds`-Array `["was-fuehlst-du", "leitfaden-emotionale-entwicklung"]`. Beide bieten daher **dasselbe** Primär- (Bundle „Emotionen Entdecken" 24,99 €) und **dasselbe** Sekundärangebot (nur Buch 17,90 €) an — bewusst vereinheitlicht, damit gleiche Datenbasis nicht zu willkürlich unterschiedlichen Angeboten führt.

**Beispiel-Copy (Ergebnis B):**
> Du brauchst keine strengere Hand, sondern einen Weg, der euch beiden hilft. Mein Leitfaden *„Kinderwut verstehen und meistern"* (E-Book, 14,99 €, Gesamtpreis; gemäß §19 UStG keine USt.) zeigt dir genau das — konkret, ruhig und sofort als Download bei dir, wenn der nächste Sturm kommt.
> **Button:** In den Warenkorb → `/shop/leitfaden-kinderwut`

**Mechanik-Upgrade gegenüber heute:**
- Ergebnisseite zeigt **ein empfohlenes Produkt mit „In den Warenkorb"-Button** (nicht nur Shop-Link) — der Verkaufsmoment.
- **Echte Verknappung optional:** „Dein persönliches Ergebnis-Angebot ist 24 h gültig" — nur über signierten Offer-Token mit `exp` (siehe Kapitel 9), ab Quiz-Lead-Timestamp. Ohne E-Mail: session-basiert (kürzer). **Kein** Client-Fake-Timer.
- Tags `quiz-ergebnis-{a..e}` bleiben → die Sequenz kann ergebnisspezifisch personalisiert werden.

**Recht:** 🟢 On-Page, zulässig. Preise = reale Produkt-/Paketpreise → **kein neues Rabattsystem nötig.** Add-to-Cart über den bestehenden CartContext-Button. §19-Hinweis bei jedem Preis; etwaige Streichpreise nur mit echter 30-Tage-Historie.
**Technik:** Leichte Erweiterung der Ergebnisseite (CartContext-Button), kein neues Preissystem. Slugs/Mapping aus `src/lib/quiz.ts`.

---

## 6. Order Bump im Checkout (Pre-Purchase, bundle-aware)

**Der wichtigste, technisch realistische Profit-Maximizer** — eine Checkbox vor dem Redirect, **kein Re-Auth**.
**Brunson:** Order Bump = AOV-Hebel; „Slippery Slope" im Kaufmomentum.

**Regel: realer Produktpreis als Aufpreis, kein Doppelverkauf.** Der Bump prüft den Cart und bietet *nur* an, was fehlt. **Alle Aufpreise unten sind echte Produktpreise** — es entsteht kein versteckter Rabatt.

| Im Cart | Order-Bump (Checkbox) | Aufpreis (realer Preis) | Logik |
|---|---|---|---|
| Buch „Was fühlst du?" | Leitfaden emot. Entwicklung (E-Book) | **+10,99 €** | digital, 0 Logistik, reine Marge |
| Buch | Emotions-Memory Teil 1 | **+14,99 €** | macht Buch+Spiel-Set |
| Memory 1 (ohne Teil 2) | Emotions-Memory Teil 2 | **+19,99 €** | „komplettiere auf 48 Karten" |
| E-Book/Leitfaden | Buch „Was fühlst du?" | **+17,90 €** | hebt auf Core |
| Gefühlskompass-Bundle | **kein Bump** (optional Leitfaden Kinderwut) | — / +14,99 € | enthält schon alles |

**Microcopy (Beispiel, NICHT vorausgewählt):**
> ☐ **Ja, leg mir den Leitfaden zur emotionalen Entwicklung dazu (E-Book, +10,99 €).** Das digitale Begleitheft zum Buch — sofort als Download, mit dem passenden Hintergrundwissen direkt zur Hand.

**Pflichtinfo-Block am Bestell-Button (verpflichtend, nicht nur Microcopy):** Direkt oberhalb des Bestell-Buttons — „unmittelbar bevor der Verbraucher seine Bestellung abgibt" (§312j Abs. 2 BGB) — muss der vollständige Pflichtinfo-Block stehen, **inklusive des zugeschalteten Bump-Artikels**: wesentliche Eigenschaften, aktualisierter **Gesamtpreis** (inkl. Bump), und bei digitalem Bump die **Widerrufsbelehrung für digitale Inhalte** plus den **§356-Doppel-Consent** (aktiv, nicht vorausgewählt) **vor** Vertragsschluss. Erst dann der Button „**zahlungspflichtig bestellen**".

**Wichtige Klarstellung zu Preisen:** Die Aufpreise oben sind die **echten Produktpreise** — kein „statt". Ein **rabattierter** Bump-Aufpreis („+12,99 € statt 14,99 €") würde eine **versteckte Funnel-SKU** (Kapitel 9.1) erfordern; ohne sie gilt: realer Preis, kein „statt".

**Recht:** 🟢/🔴 **Nicht vorausgewählt** (§312a Abs. 3 BGB / Anhang Nr. 32 UWG — sonst Entgelt nicht geschuldet). Gesamtpreis sichtbar aktualisieren. Ist der Bump digital → **§356-Download-Consent muss erneut greifen** (die `hasDigital`-Logik muss den Bump einbeziehen) und die digitale Widerrufsbelehrung vor Vertragsschluss anzeigen. §19-Hinweis am Gesamtpreis. Button „zahlungspflichtig bestellen".
**Technik (M):** Neue Engine `src/lib/order-bump.ts` mit `getBumpOffer(items)`; optionales Feld `contains: string[]` an Bundle-Produkten in `products.ts`; Bump-UI + Pflichtinfo-Block in `src/app/checkout/page.tsx`. Bei Toggle wird der Bump als `CartItem` (digital qty 1) in den CartContext gelegt → Klarna-Session/PayPal-Order werden aus `items` neu gebaut → `calculateOrder` rechnet autoritativ. **Bundle-aware-Schutz:** liegt das Bump-Produkt (auch via Bundle, geprüft über `contains`) schon im Cart, wird der Bump nicht gezeigt.

---

## 7. Post-Purchase Upsell → Downsell (machbarkeitsehrlich)

**Ehrliche Einordnung zuerst:** Ein echter Brunson-„1-Click-OTO auf dieselbe Zahlung" ist mit diesem Stack **NICHT realistisch.**
- **Klarna:** macht direkt nach Authorize einen **vollen Capture** (`klarna-order.ts`). Danach gibt es keine Restautorisierung zum Aufstocken → OTO = neue Session + neue Authorize.
- **PayPal:** `intent: "CAPTURE"` + sofortiger Capture. Echtes 1-Click bräuchte **Vaulting/Billing-Agreement** — nicht implementiert, eigenes größeres Projekt mit zusätzlicher Compliance. **Bewusst nicht empfohlen.**

**Architektur-Ehrlichkeit:** `/bestellung/erfolgreich` ist genau die Seite, auf der der **erste** Capture serverseitig beim Rendern passiert. Einen zweiten Checkout-Flow auf derselben Seite zu starten, ist ein **Eingriff in die heikelste Stelle des Systems** (Capture beim Re-Render, Doppel-Capture-Schutz via `fulfillment-lock` pro `orderRef`). Die OTO-Mini-Bestellung muss daher als **eigener, sauber getrennter Bestellvorgang mit eigenem `orderRef`** geführt werden — nicht als Mutation der ersten Bestellung. Deshalb ist der Aufwand **L–XL**, nicht „L", und dieser Schritt steht bewusst am Ende der Roadmap.

**Pragmatischer Weg (empfohlen):** Post-Purchase-OTO als **neue Mini-Bestellung mit Re-Auth**. Der Kunde durchläuft einen zweiten, kurzen Checkout — 2–3 Klicks, kein „1-Click". Conversion liegt unter echtem 1-Click → deshalb **nachrangig zum Order Bump**.

**Rechnerische Grundlage (alle Beträge = reale Einzelpreise, kein versteckter Rabatt):**

| Gekauft | UPSELL (Re-Auth) | Preis | Bei „Nein" → DOWNSELL (günstiger!) | Preis |
|---|---|---|---|---|
| Buch (17,90 €) | Emotions-Memory Teil 1 + Teil 2 | **+34,98 €** (14,99 € + 19,99 €) | nur Memory Teil 1 | **+14,99 €** |
| Tripwire-Leitfaden (7,90 €) | Buch „Was fühlst du?" | **+17,90 €** | Leitfaden emot. Entwicklung (E-Book, digital) | **+10,99 €** |
| „Emotionen Entdecken" Bundle (24,99 €) | Emotions-Memory Teil 1 + Teil 2 ergänzen | **+34,98 €** (14,99 € + 19,99 €) | nur Memory Teil 1 | **+14,99 €** |
| Gefühlskompass (45,99 €) | beide Spezial-Leitfäden (Kinderwut + Kind-redet-nicht) | **+29,98 €** (14,99 € + 14,99 €) | ein Leitfaden frei wählbar | **+14,99 €** |

> **Korrektur-Hinweise gegenüber Vorentwurf:**
> - **„Emotionen Entdecken" → Gefühlskompass:** Die fehlenden Artikel sind Memory 1 (14,99 €) + Memory 2 (19,99 €) = **34,98 €** reale Einzelpreise. Ein „+21,00 €"-Upgrade (die reine Bundle-Differenz 45,99 − 24,99) würde Memory 1+2 (Wert 34,98 €) für 21,00 € verkaufen = **versteckter 13,98-€-Rabatt ohne Mechanik** → durch `calculateOrder` nicht abbildbar. Wird daher als **+34,98 €** (reale Preise) geführt. Soll der günstigere 21,00-€-Aufstieg angeboten werden, ist **zwingend eine versteckte Funnel-SKU „Gefühlskompass-Upgrade 21,00 €"** anzulegen (Kapitel 9.1a) — nicht als geschmuggelter Rabatt.
> - **Tripwire-Downsell:** Ein Downsell muss **billiger als der Upsell und sanfter als der eben getätigte Kauf** sein. Der frühere Vorschlag „Leitfaden Kinderwut 14,99 €" war teurer als der gekaufte Tripwire (7,90 €) und nur 2,91 € unter dem Buch-Upsell — kein Downsell. Ersetzt durch **Leitfaden emot. Entwicklung 10,99 €** (digital, unter dem 17,90-€-Upsell).

**Copy (OTO-Block, Beispiel nach Buch-Kauf):**
> **Headline:** Deine Bestellung ist da — danke, dass du deinem Kind das schenkst 💛
> Bevor du gehst, ein letzter Gedanke: Das Buch öffnet das Gespräch — aber Gefühle bleiben besser hängen, wenn Kinder sie auch *anfassen* und *spielen* dürfen.
> Füge jetzt **beide Emotions-Memory-Spiele (Teil 1 & 2)** hinzu — 48 handgemalte Karten.
> **Teil 1 + Teil 2 zusammen: 34,98 €** *(14,99 € + 19,99 €; Gesamtpreis, gemäß §19 UStG keine USt.)*
> **Button:** Ja, die Memorys dazunehmen → *(kurzer Folge-Checkout)*
> **Ablehnen:** Nein danke, ich bleibe bei meiner Bestellung →
>
> **Downsell (nach „Nein"):** Verstehe ich — vielleicht lieber klein anfangen? Dann nimm nur **Emotions-Memory Teil 1** — der sanfte Einstieg. **Nur Teil 1: 14,99 €.**

**Downsell-Logik:** Nie leer ausgehen lassen — günstigere Teilmenge desselben Versprechens, **digital-first** wo möglich (reine Marge, kein Versand), immer **unter** dem Upsell-Preis.

**Recht:** 🟡 Jeder Zusatzkauf ist eine **neue Bestellung** → volle §312j-Pflichtinfos + Button „zahlungspflichtig bestellen" + (bei E-Book) erneuter §356-Download-Consent + §19-Hinweis. **Stiller 1-Click-Charge ohne neue Pflichtinfo-Seite ist 🔴 unzulässig** (§312j Abs. 4 BGB: Vertrag kommt nicht zustande).
**Technik (L–XL):** OTO-Block in `src/app/bestellung/erfolgreich/page.tsx`; „hinzufügen" startet einen **separaten regulären Checkout mit eigenem `orderRef`** über bestehende Routen (`/api/paypal/create-order` bzw. neue Klarna-Session ohne Versand), strikt getrennt von der Capture-Logik der ersten Bestellung. `fulfillment-lock` ist pro `orderRef` → zweite Bestellung sauber isoliert. **Empfehlung: zuerst Bump bauen** (liefert ~80 % des Effekts ohne Re-Auth-Reibung), OTO erst später.

---

## 8. E-Mail-Sequenzen (mit DigiLetter-Tags)

Alle Werbe-Sequenzen nur an **bestätigte** Leads (DOI). Transaktionale Bestell-Mail bleibt getrennt.

| Sequenz | Auslöser / Zielgruppe | DigiLetter-Tags | Inhalt | Recht |
|---|---|---|---|---|
| **Soap Opera** (5 Mails) | nach DOI (Newsletter-Lead) | `newsletter`, `gefuehlsfoerderung`, `lead-magnet-starterset` | Story-Bogen (Kapitel 4.5), Mail 5 = Offer | 🟢 Abmeldelink Pflicht |
| **Seinfeld / Daily** | nach Soap Opera | `newsletter` | 2–3/Woche Mini-Story + 1 CTA | 🟢 |
| **Quiz-Sequenz** (personalisiert) | nach Quiz-Lead | `quiz`, `quiz-ergebnis-{a..e}` | schmerzpunktspezifisch (B → Wut-Story zuerst) | 🟢 |
| **Abbrecher** (Cart-/Funnel-Abbruch) | Tripwire/Checkout begonnen, nicht gekauft | `abbrecher` (neu) | sanfte Erinnerung + Hilfe-Angle | 🟢 nur an DOI-Leads |
| **Nach-Kauf / Onboarding** | nach Kauf | `bestandskunde`, `gekauft-<sku>` (neu) | Produkt-Onboarding + **gleichartige** Folge-Produkte (Aufstiegslogik) | 🟡 §7 Abs. 3 UWG (siehe unten) |

**Kaufstatus-abhängige Aufstiegslogik (statt TY2-Verzweigung):** Die in 4.4 bewusst weggelassene „Buch-Käufer → Emotionen-Entdecken"-Logik wird **hier** umgesetzt: Beim Kauf wird in `fulfillment.ts` ein `gekauft-<sku>`-Tag gesetzt; die Versandlogik der Sequenz wertet diesen Tag aus und bietet das passende Aufstiegsprodukt an (bzw. nimmt Käufer aus der Verkaufssequenz heraus). Das ist der technisch saubere Ort dafür, weil der Versand asynchron Zugriff auf die Tags hat.

**Rechtliche Trennung (Tagging!) — vollständig durchdekliniert:**
- **Newsletter-Leads** = DOI-Einwilligung → Werbung nach Bestätigung erlaubt (Art. 6 Abs. 1 a DSGVO / §7 Abs. 2 UWG erfüllt).
- **Käufer** = **§7 Abs. 3 UWG** Bestandskundenwerbung. **Alle vier Voraussetzungen müssen kumulativ erfüllt sein:** (1) Kontaktdaten **im Zusammenhang mit dem Verkauf** erhalten; (2) Werbung **nur für eigene, ähnliche Waren/Dienstleistungen**; (3) Widerspruchshinweis **bei Erhebung UND in jeder Mail**; (4) **kein** Widerspruch erfolgt. **„Ähnlich" konservativ auslegen:** Wer ein **E-Book** gekauft hat, bekommt Werbung für **ähnliche E-Books/Leitfäden**. Ob ein **physisches** Memory-Spiel „ähnlich" zu einem E-Book ist, ist juristisch angreifbar — im Zweifel **nicht** ohne separate Einwilligung bewerben. Für cross-mediale Angebote (E-Book-Käufer → physisches Produkt) ist der saubere Weg eine **eigene DOI-Einwilligung** (z. B. über den Newsletter), nicht §7 Abs. 3.
- **Käufer NICHT in die allgemeine Newsletter-Liste mischen** — Rechtsgrundlagen sauber trennen (`bestandskunde`-Tag), sonst kollidieren Einwilligungs- und Bestandskundenlogik.

**Technik:** ⚠️ DigiLetter hat keine Automation **und es fehlt der persistente Schritt-Store** (siehe Kapitel 9.4, Roadmap #6). MVP-Empfehlung: **Next-Cron** (Coolify-Cron oder geschützte Route `POST /api/sequences/tick` mit Secret) prüft fällige Schritte gegen den **persistenten Store** und sendet via `dlSendMail`/`/api/v1/transactional`. Kauf-Events in `fulfillment.ts` taggen (`gekauft-<sku>`), damit Käufer aus der Verkaufssequenz fallen.

---

## 9. Technisches Fundament & offene Voraussetzungen

### 9.1 Das Rabatt-Problem (kritisch)

Heute liest `calculateOrder()` in `src/lib/order-lines.ts` **hart** `product.price` — es gibt keinen Mechanismus, einen Preis darunter zu setzen. **Der Preis kommt immer serverseitig, nie vom Client** (= Zahlungssicherheit). Jede „X € statt Y €"-Aktion und **jeder rabattierte Aufpreis** braucht eine von drei Lösungen:

| Option | Mechanik | Aufwand | Bewertung |
|---|---|---|---|
| **(a) Funnel-exklusive SKUs** ✅ empfohlen | neue Produkte in `products.ts` mit Flag `hidden: true`, eigener (niedrigerer) `price`; Shop-Listing filtert sie raus, Detailseite nur via Funnel-Token erreichbar | **M–L** (nicht „S"): die **erste** SKU ist klein, aber jede rabattierte Variante (Tripwire, Gefühlskompass-Upgrade, ggf. Bump-Rabatte) ist eine **weitere** SKU mit eigenem `digital-assets.ts`-Mapping, Shop-Filter-Gate und ggf. `bundleContents` → Kombinatorik | `calculateOrder` **unverändert** — der Sonderpreis IST der SKU-Preis; Klarna/PayPal bekommen automatisch den richtigen Betrag. Sauberste Lösung, aber Pflegeaufwand wächst mit jeder Variante |
| **(b) Generische Rabatt-Engine** | Coupon-Tabelle + Server-Validierung + Eingriff in `calculateOrder` + alle 3 Order-Routen + Persistenz für Einlösungslimits | **L** | Größter Blast-Radius (berührt die zahlungskritische Preisberechnung), neue Persistenz nötig. **Overkill** für einen Shop ohne klassische Gutscheinanforderung |
| **(c) Signierter Offer-Token (per-Link/Session-Preis)** | HMAC-Token `{productId, overridePriceCents, exp}` analog `download-token.ts`; `calculateOrder` akzeptiert verifizierten Preis nur bei validem HMAC + nicht abgelaufen | **M–L** | Fälschungssicher wie die Download-Links; **echte zeit-/lead-gebundene Verknappung** möglich. **Aber:** das Token muss durch den **gesamten** Cart→Checkout→Klarna/PayPal-Flow getragen werden — der heutige `CartItem` ist nur `{productId, quantity}` und kennt kein Token. Erfordert **`CartItem`-Erweiterung um `offerToken`**, Token-Persistenz in localStorage über den Redirect hinweg und Verifikation in **allen 3 Order-Routen**. Deshalb „M–L", nicht „M". |

**Empfehlung:** **(a) für feste Tripwire-/OTO-/Upgrade-Angebote** (jeder Sonderpreis = eigene SKU; das verhindert versteckte Rabatte zuverlässig), ergänzt durch **(c), sobald der Rabatt lead-/zeitgebunden sein muss** (echte 24/48h-Verknappung). **(b) überspringen**, außer es werden geschäftlich frei eingebbare Gutscheincodes gefordert. In (a) und (c) bleibt der Betrag, den Klarna/PayPal sehen, ausschließlich serverseitig bestimmt.

### 9.2 Klarna/PayPal-OTO-Realität

- **Pre-Purchase Order Bump:** ✅ leicht — additive Order-Line, eine Autorisierung, ein Capture, kein Re-Auth.
- **Post-Purchase-1-Click-OTO:** ❌ nicht trivial — beide Provider cappen sofort voll; OTO = neue Mini-Bestellung mit erneutem Redirect (2–3 Klicks) und **eigenem `orderRef`**, strikt getrennt von der Capture-Logik der Erfolgsseite (Kapitel 7). Echtes 1-Click nur via Vaulting (bewusst nicht empfohlen).

### 9.3 Echte Verknappung (kein Client-Fake-Timer)

Anforderung: 24/48h-Fenster **pro Lead, serverseitig autoritativ**. **Empfehlung: Offer-Token mit `exp`** — signiert beim relevanten Lead-Event und so, dass die Frist **ab dem Moment läuft, in dem der Nutzer tatsächlich ankommt** (DOI-Funnel: ab Bestätigungsklick auf `/newsletter/bestaetigt`, **nicht** ab Mail-Versand; Quiz-Funnel: ab Quiz-Abschluss). Der Client-Countdown zählt nur zum vom Server gelieferten `exp` herunter (reine Anzeige). Nach Ablauf lehnt `calculateOrder` den Sonderpreis ab → realer Vollpreis. Nicht fälschbar, nicht resettbar. DigiLetter-Tags eignen sich für *Targeting*, nicht für die *Preis-Gültigkeit* (kein belegter Timestamp-Read).

### 9.4 Persistenter Datastore — der zentrale Blocker

Es gibt **keine persistente Datenhaltung**: `rate-limit` ist In-Memory, `fulfillment-lock` ist eine tmp-Datei — beide ungeeignet für dauerhafte Zustände. **Folgende Features sind ohne persistenten Store (KV/DB/Coolify-Volume) nicht sauber baubar:**
- Drip-Sequenz-Schritt-Tracking (welcher Lead ist bei welcher Mail),
- Offer-Token-Einlöselimits / Einmal-Verbrauch,
- Abbrecher-Erkennung (begonnen, nicht gekauft),
- Tracking-Dedup pro `orderRef`.

Das ist **keine Detail-Maßnahme, sondern eine Infrastruktur-Grundsatzentscheidung** und steht als **eigene Roadmap-Zeile (Phase 1, #6), vor** allen darauf aufbauenden Features. DigiLetter selbst hat **keine** aktive Drip-Engine; der MVP-Versand ist Next-Cron gegen diesen Store.

### 9.5 Tracking / Attribution

Serverseitig wo möglich (Client-Pixel blocken/erfordern Consent). Events: `newsletter_submit`, `newsletter_confirmed`, `quiz_completed` + `quiz_result_{a..e}`, `checkout_session_created`, `bump_added`, `order_completed` (in `fulfillment.ts`, **dedup pro `orderRef` → braucht den persistenten Store, 9.4**), `oto_view`/`oto_purchase`. Attribution-Quelle in den Offer-Token (`offerId`/`?src=`) packen → Quelle trägt bis ins Fulfillment. Tool-Entscheidung (Plausible/GA4/eigenes) ist Voraussetzung; serverseitige anonyme Conversion-Logs sind DSGVO-unkritischer als Client-Pixel.

---

## 10. Rechtliche Leitplanken (Do/Don'ts + Ampel)

**Merksatz:** **Vor** dem DOI-Klick = nur Bestätigung. **Nach** dem Klick (On-Page oder per Mail) = Werbung erlaubt.

**Kompakte Do/Don'ts:**
- ✅ Angebot/Core-Offer auf der Thank-You-Page **nach** dem Bestätigungsklick — nicht in der DOI-Mail.
- ✅ Verknappung **serverseitig** an Lead/Token binden; Frist läuft **ab Nutzer-Ankunft** (Bestätigungsklick/Quiz-Abschluss), nicht ab Mail-Versand; nach Ablauf Angebot echt weg.
- ✅ Streichpreis nur, wenn der höhere Preis nachweisbar der **niedrigste der letzten 30 Tage** war (PAngV §11) → **Preis-Log je SKU** (Roadmap-Maßnahme). Gilt auch für die realen `originalPrice`-Werte der 8 Produkte.
- ✅ Bundle als „einzeln X · im Paket Y" labeln (Set-Preis), nicht als „früherer Preis".
- ✅ Neue Funnel-SKU nur mit **Endpreis** bewerben (kein „statt", da keine SKU-eigene 30-Tage-Historie).
- ✅ §19-Hinweis an **jedem** konkreten Preis im Funnel (TY1, TY2, Quiz, Bump, OTO): **„Gesamtpreis, gemäß §19 UStG wird keine Umsatzsteuer ausgewiesen."** — niemals „inkl. 19 % MwSt" (§14c UStG!).
- ✅ Bei jedem Sofort-Download: aktive, **nicht** vorausgewählte §356-Bestätigung + digitale Widerrufsbelehrung vor Vertragsschluss + Doku in der Bestell-Mail — **in jedem Schritt erneut** (Bump, OTO).
- ✅ Jeder Bestell-Button: „**zahlungspflichtig bestellen**".
- ✅ Freebie-Download **lead-gebunden** (frischer Token, kein teilbarer Sharelink).
- ✅ Käufer nur §7-Abs-3-konform bewerben (**eigene, ähnliche** Produkte; „ähnlich" konservativ) und **nicht** in die Newsletter-Liste mischen.
- ❌ Kein Angebot/Countdown in der DOI-Mail. ❌ Kein resettender Fake-Timer. ❌ Kein „nur noch X" bei E-Books. ❌ Kein vorausgewählter Bump. ❌ Kein erfundener „statt"-Preis (auch nicht bei neuen Funnel-SKUs). ❌ Kein versteckter Rabatt-Aufpreis ohne eigene SKU.

| # | Taktik | Ampel | Auflage |
|---|---|:---:|---|
| 1 | Tripwire/Angebot in DOI-Bestätigungsmail | 🔴 | Nicht machen (§7 Abs. 2 UWG). Auf Thank-You-Page verlagern |
| 2 | Angebot auf TY-Page nach Bestätigungsklick | 🟢 | Hier Core-Offer + echte Verknappung (Token) |
| 3 | Welcome-Sequenz mit Angeboten (nach DOI) | 🟢 | Abmeldelink in jeder Mail; setzt Drip-Engine + Store voraus |
| 4 | Personalisiertes 24/48h-Fenster, serverseitig | 🟢 | Deadline persistiert, ab Nutzer-Ankunft (nicht ab Versand) |
| 5 | Resettender/Evergreen-Fake-Countdown | 🔴 | Anhang Nr. 7 zu §3 III UWG (per-se-Verbot) |
| 6 | „nur noch X" bei E-Books | 🔴 | digitale Güter unbegrenzt |
| 7 | Streichpreis „statt Y €" bei den 8 realen Produkten | 🟡 | nur mit 30-Tage-Tiefstpreis-Nachweis (PAngV §11) |
| 8 | Bundle „spare 37 %" als Set-/Paketpreis | 🟢 | klar als „einzeln X · im Paket Y" labeln |
| 9 | Funnel-exklusive SKU zu Eigenpreis (nur Endpreis) | 🟢 | sauberste Lösung mangels Coupon-System; **kein** „statt" |
| 10 | „X € statt Y €" ohne reale Preis-Historie (auch neue SKU) | 🔴 | erfundener Referenzpreis = §5 UWG + PAngV |
| 11 | Versteckter Rabatt-Aufpreis (z. B. Upgrade +21 € statt +34,98 €) ohne eigene SKU | 🔴 | nicht durch `calculateOrder` abbildbar + intransparenter Preis → eigene Funnel-SKU nötig |
| 12 | §19-Darstellung (kein MwSt-Ausweis) | 🟢 | nie „inkl. 19 % MwSt" (§14c UStG); an jedem Preis |
| 13 | Sofort-Download mit Doppel-Consent (§356 V) + digitaler Widerrufsbelehrung | 🟢 | aktiv, nicht vorausgewählt, vor Vertragsschluss, in jedem Schritt |
| 14 | Sofort-Download ohne §356-Consent | 🔴 | Widerrufsrecht erlischt nicht |
| 15 | Pre-Purchase Order Bump (nicht vorausgewählt) | 🟢 | §312a III BGB; Gesamtpreis + Pflichtinfo-Block am Button |
| 16 | Vorausgewählter Order Bump | 🔴 | Anhang Nr. 32 UWG → Entgelt nicht geschuldet |
| 17 | Order Bump ohne §312j-Pflichtinfo-Block am Bestell-Button | 🔴 | wesentliche Eigenschaften + Gesamtpreis + Widerruf unmittelbar vor Button Pflicht |
| 18 | Post-Purchase-OTO als neue, transparente Bestellung (eigener orderRef) | 🟡 | volle §312j-Seite + Button + ggf. erneuter Download-Consent |
| 19 | Stiller 1-Click-Charge ohne neue Pflichtinfo-Seite | 🔴 | §312j IV BGB: Vertrag nicht wirksam |
| 20 | Button „Jetzt sichern"/„Weiter" als Bestell-Button | 🔴 | muss „zahlungspflichtig bestellen" sein |
| 21 | Bestandskundenwerbung §7 III für **ähnliche** Produkte (E-Book→E-Book) | 🟢 | alle 4 Voraussetzungen kumulativ; „ähnlich" konservativ; eigenes Tag |
| 22 | §7-III-Werbung cross-medial (E-Book-Käufer → physisches Produkt) | 🟡 | „ähnlich" angreifbar → im Zweifel separate DOI-Einwilligung |
| 23 | Käufer in Newsletter-Liste mischen | 🟡 | Rechtsgrundlagen trennen; `bestandskunde`-Tag |
| 24 | Freebie als teilbarer, nicht lead-gebundener Sharelink | 🟡 | kein Rechts-, aber Funnel-Defekt (Lead-Magnet ohne Lead) |

> *Dies ist eine strukturierte juristische Ersteinschätzung, keine verbindliche Rechtsberatung. Finale Texte (Widerrufsbelehrung, AGB, §19-Hinweis) vor Go-Live fachkundig gegenzeichnen lassen.*

---

## 11. Umsetzungs-Roadmap (Phasen)

| Phase | # | Maßnahme | Aufwand | Impact | Dateien / Routen |
|---|---|---|---|---|---|
| **0 — Quick Wins** (Tage) | 1 | **Pre-Purchase Order Bump** im Checkout (inkl. §312j-Pflichtinfo-Block) | M | ⭐⭐⭐ höchster ROI/Aufwand | `src/lib/order-bump.ts` (neu), `src/lib/products.ts` (`contains`), `src/app/checkout/page.tsx` |
| | 2 | **Freebie-Download (lead-gebunden) auf `/newsletter/bestaetigt`** | S | ⭐⭐ | `src/app/newsletter/bestaetigt/page.tsx`, `src/lib/digital-assets.ts`, `src/lib/download-token.ts` (Vorlage) |
| | 3 | **1–2 versteckte Funnel-SKUs** (Tripwire, nur Endpreis) | S–M | ⭐⭐ | `src/lib/products.ts` (`hidden`), `src/app/shop/[slug]/page.tsx` (Gate), `Products.tsx` (Filter), `digital-assets.ts` |
| | 4 | **Thank-You #1 aufwerten** (Inline Core-Offer Buch) | S | ⭐⭐ | `src/lib/useNewsletterForm.ts`, `Newsletter.tsx`/`NewsletterCompact.tsx`/`NewsletterSignup.tsx` |
| | 5 | **Quiz-Ergebnisseite → Add-to-Cart** | S–M | ⭐⭐ | Quiz-Ergebnis-Komponente, `src/lib/quiz.ts`, CartContext |
| | 6 | **Preis-Log je SKU** (PAngV §11) — deckt alle „statt"-Preise | S | ⭐⭐ Recht | kleiner persistenter Log (Teil von #6/Phase-1-Store) bzw. Build-Artefakt |
| **1 — Mittel** (Wochen) | 6 | **Persistenter Datastore** (KV/DB/Volume) — **zentraler Blocker, zuerst** | M | ⭐⭐⭐ Voraussetzung | neu (Infra: Coolify-Volume/KV), ersetzt In-Memory `rate-limit`/tmp `fulfillment-lock` für persistente Zustände |
| | 7 | **Squeeze-Page bauen + Popup-Umlenkung** (Quiz→Newsletter entscheiden) | M | ⭐⭐ | neue Route `/newsletter` bzw. `/impulse`, Popup-Logik |
| | 8 | **Offer-Token + echte Verknappung** (inkl. `CartItem.offerToken`) | M–L | ⭐⭐ | `src/lib/offer-token.ts` (neu, Klon von `download-token.ts`), `CartContext` (Model-Erweiterung), `src/lib/order-lines.ts`, 3 Order-Routen |
| | 9 | **Thank-You #2 Bundle-Angebot (statisch, Wert-Stack)** | S–M | ⭐⭐ | `src/app/newsletter/bestaetigt/page.tsx` |
| | 10 | **Tracking-Basis** (serverseitige Events, dedup über Store) | S | ⭐⭐ | `src/lib/fulfillment.ts`, API-Routen |
| **2 — Infra/Vollausbau** (Monate) | 11 | **E-Mail-Sequenzen** (Cron + Schritt-Store + Kauf-Tag-Aufstiegslogik) | M–L | ⭐⭐⭐ LTV | `src/app/api/sequences/tick/route.ts` (neu), `src/lib/sequences.ts` (neu), `src/lib/fulfillment.ts` (`gekauft-<sku>`) |
| | 12 | **Post-Purchase-OTO/Downsell** (Re-Auth, eigener `orderRef`) | L–XL | ⭐ | `src/app/bestellung/erfolgreich/page.tsx`, Order-Routen, neue Klarna-Session — Architektureingriff an der Capture-Seite |
| | 13 | **Continuity-Produkt (Stufe 5)** | XL | ⭐⭐⭐ strategisch | neu (Produkt + Abo-Infra) |
| | 14 | *(optional)* generische Promo-Engine | L | — | nur falls echte Gutscheincodes gefordert |

> **Reihenfolge-Hinweis:** Der **persistente Datastore (#6)** ist Voraussetzung für Offer-Token-Limits (#8), Sequenzen (#11), Abbrecher-Sequenz und Tracking-Dedup (#10) — er steht deshalb am Anfang von Phase 1. Das **Preis-Log je SKU** ist rechtlich Voraussetzung für jeden „statt"-Preis und kann als kleines Artefakt schon in Phase 0 starten, lebt aber dauerhaft im Store.

**Kernaussage Umsatz/Aufwand:** **Order Bump (#1) + 1–2 versteckte Funnel-SKUs (#3)** bringen den schnellsten Umsatz bei kleinstem Risiko — sie nutzen die bewährte, serverseitig-autoritative `calculateOrder`-Pipeline nur additiv, ohne Coupon-Engine, Re-Auth oder neue Persistenz. Echter Zeitdruck und sauberes Sequenz-Tracking brauchen **zuerst den persistenten Datastore (#6)**, dann den signierten Offer-Token (#8) und die Sequenzen (#11). Post-Purchase-OTO (#12) ist der teuerste Infra-Brocken (Architektureingriff an der Capture-Seite) und gehört ans Ende.

---

## 12. KPIs pro Funnel-Stufe

| Funnel-Stufe | Primär-KPI | Sekundär-KPI | Benchmark-Richtwert* |
|---|---|---|---|
| Squeeze | Opt-in-Rate (Submits/Besucher) | Traffic-Quelle | 20–40 % |
| DOI | Confirm-Rate (Confirms/Submits) | Zeit bis Bestätigung | 50–70 % |
| Thank-You #1 | Core-Offer-Conversion | „Nein danke"-Rate | 2–8 % |
| Thank-You #2 | Freebie-Download-Rate · Bundle-Klick | Bundle-Conversion | 30–60 % DL |
| Quiz | Completion-Rate · Lead-Rate | Verteilung A–E | 60–80 % Compl. |
| Quiz-Ergebnis | Add-to-Cart · Conversion | pro Ergebnis A–E | 3–10 % |
| Order Bump | **Bump-Take-Rate** · **AOV-Uplift** | Bump je Cart-Inhalt | 10–30 % Take |
| Post-Purchase-OTO | OTO-View → Purchase | Downsell-Rettungsrate | 1–5 % (Re-Auth!) |
| Soap Opera | Open/Click pro Mail · Mail-5-Conversion | Abmelderate | branchenüblich |
| Seinfeld/Daily | Click-Rate · Umsatz/Mail | Abmelderate | — |
| **Compliance/Retoure** | **Widerrufs-/Refund-Rate** (physisch) | **§356-Consent-Rate** (digital) | so niedrig wie möglich |
| Gesamt | **LTV pro Lead** · Käufer-Anteil · **Cost-per-Lead vs. Frontend-Deckungsbeitrag** | Wiederkaufrate | — |

*Richtwerte zur Orientierung, kein Versprechen — die echten Zahlen liefert das Tracking (Kapitel 9.5).*

**Nordstern:** **LTV pro bestätigtem Lead.** Solange Stufe 5 (Continuity) fehlt, ist dieser Wert nach oben gedeckelt und faktisch *statisch* — die einzige belastbare Ökonomie-Kennzahl der flachen Leiter ist dann **Cost-per-Lead vs. Frontend-Deckungsbeitrag** pro Lead. Die **Widerrufs-/Refund-Rate** ist bei einem Funnel mit Zusatzkäufen ein Kern-Gesundheitsindikator (zu aggressiv verkaufte OTOs zeigen sich dort zuerst). Der wichtigste strategische Hebel bleibt das Backend-Continuity-Produkt.

---

## 13. Abgrenzung: Was dieses Dokument korrigiert/ablöst

Dieses Konzept **ersetzt** `docs/sales-funnel-konzept.md` und `docs/gesamtkonzept-analyse.md` sowie die `/docs/funnel-Seite`. Die alten Docs enthalten folgende **Fehler**, die hier korrigiert sind:

| Alt (falsch) | Neu (korrekt, Stand Juni 2026) |
|---|---|
| **Stripe** als Zahlungsanbieter | **Klarna (LIVE) + PayPal**, beide redirect/capture-basiert; Capture serverseitig auf `/bestellung/erfolgreich`. Kein Stripe. |
| **5 Leitfäden** im Shop (inkl. „eigene Muster" / „Kinderangst") | **3 E-Book-Leitfäden** im Shop (emot. Entwicklung, Kinderwut, Kind-redet-nicht). „Eigene Muster"/„Kinderangst" existieren **nicht** als Shop-Produkt (nur als Quiz-Ergebnis-Kategorien + reine `/ebook/*`-Marketingseiten ohne Kaufbutton). |
| **Rabatt-/Coupon-Aktionen** ohne Mechanik („X € statt Y €") | **Kein Coupon-System** → Funnel-Preise nur über versteckte SKUs, reale Bundle-Paketpreise oder signierte Offer-Token. „Statt"-Preise nur mit echter 30-Tage-Historie. **Jeder rabattierte Aufpreis = eigene SKU**, kein geschmuggelter Rabatt. |
| **„10 % Rabattcode"** als Newsletter-Bait | **entfernt** (kein Coupon-System) → ersetzt durch **echten Lead-Magnet** (Mini-Guide-PDF). |
| **Angebote in der DOI-Bestätigungsmail** (WP-Vorbild) | **rechtlich unzulässig** → Angebot auf die **Thank-You-Page nach dem Klick** + Post-Confirm-Sequenz verlagert. |
| **„Nur heute günstiger"** / Fake-Countdown | **echte**, serverseitig an Lead/Token gebundene Verknappung; Frist **ab Nutzer-Ankunft**, keine resettenden Timer. |
| **1-Click-Post-Purchase-OTO** als selbstverständlich | **machbarkeitsehrlich**: mit Klarna/PayPal nur als neue Mini-Bestellung mit Re-Auth und eigenem `orderRef`; echtes 1-Click bräuchte Vaulting (nicht empfohlen). Architektureingriff an der Capture-Seite. |
| **Tripwire = Buch 17,90 €** (Begriff verwässert) | **Tripwire = E-Book-Funnel-SKU 7,90 €** (niedrigster Impulspreis, nur Endpreis). Buch = **Core/Big Domino**. |
| **OTO-/Upgrade-Aufpreise teils rabattiert ohne Mechanik** (z. B. +21 €) | reale Einzelpreis-Summen (+34,98 € usw.) **oder** explizite versteckte Funnel-SKU; Downsell stets **billiger** als Upsell. |
| **8 Produkte** als implizit gegeben, teils falsch benannt | exakt die **8 realen SKUs** aus `src/lib/products.ts` mit korrekten Preisen und IDs. |
| **Squeeze-Page / Newsletter-Popup** als vorhanden suggeriert | Squeeze-Page **existiert nicht**; Popup leitet aktuell **ins Quiz** — beides als Roadmap-Maßnahme ausgewiesen. |
| **Drip-Sequenzen** als „nur Mail schreiben" | brauchen **persistenten Datastore** (fehlt heute) — als zentraler Blocker und eigene Roadmap-Zeile ausgewiesen. |

**Single Source of Truth für Produkte/Preise:** `/Users/hydra-01/Documents/DigiWorkspace/gefuehlsfoerderung-website/src/lib/products.ts`
**Single Source of Truth für Quiz/Mapping:** `/Users/hydra-01/Documents/DigiWorkspace/gefuehlsfoerderung-website/src/lib/quiz.ts`

---

*Ende des Konzepts. Alle mit „braucht Technik" markierten Stellen (Squeeze-Page, Freebie-PDF lead-gebunden, persistenter Datastore, Drip-Versand, Order-Bump-Logik + Pflichtinfo-Block, Funnel-SKUs, Offer-Token inkl. `CartItem`-Erweiterung, Folge-Checkout mit eigenem `orderRef`) erfordern Implementierung gemäß Roadmap (Kapitel 11) — aber **kein** Coupon-/Rabattsystem, da ausschließlich reale Produkt-/Paketpreise bzw. versteckte Funnel-SKUs verwendet werden. Jeder „statt"-Preis ist durch eine echte 30-Tage-Historie (Preis-Log) zu decken, jeder rabattierte Aufpreis durch eine eigene SKU.*