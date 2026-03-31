# Checkliste: Neuen Blogartikel erstellen

Diese Checkliste stellt sicher, dass jeder neue Blogartikel SEO- und GEO-optimiert ist.

---

## 1. Datenmodell (blog.ts)

Fuer jeden neuen Artikel muss ein Eintrag in `src/lib/blog.ts` angelegt werden:

```ts
{
  slug: "mein-neuer-artikel",           // URL-freundlich, beschreibend, deutsch, Bindestriche
  title: "Mein neuer Artikel",          // H1 der Seite, max. 60 Zeichen ideal
  excerpt: "Kurze Zusammenfassung...",   // Meta Description, 120-160 Zeichen, mit Keyword
  date: "2026-03-30",                   // Veroeffentlichungsdatum (ISO)
  modifiedDate: "2026-03-30",           // Optional: Letzte Aenderung (ISO), bei Updates setzen
  readTime: "7 Min.",                   // Geschaetzte Lesezeit
  categories: ["Erziehung", "Gefuehle"], // Relevante Kategorien (werden als OG-Tags + Keywords genutzt)
  image: "/images/blog/mein-neuer-artikel/featured.jpg", // Featured Image
}
```

**Wichtig:**
- `slug` = exakt der Ordnername unter `src/content/blog/`
- `excerpt` = wird als Meta Description UND OG Description verwendet — muss eigenstaendig sinnvoll sein
- `categories` = werden als `article:tag`, `keywords` und fuer "Aehnliche Artikel" genutzt
- `modifiedDate` = bei jedem inhaltlichen Update aktualisieren (wichtig fuer Freshness-Signal)

---

## 2. Content (MDX-Datei)

Datei: `src/content/blog/[slug].mdx`

### Struktur-Anforderungen

- [ ] **H1 wird automatisch** aus `post.title` generiert — NICHT nochmal im MDX setzen
- [ ] **H2-Ueberschriften** als Hauptgliederung (klar, beschreibend, Keyword-nah)
- [ ] **H3-Ueberschriften** fuer Unterpunkte
- [ ] **Erster Absatz** = Zusammenfassung/Kernaussage (wird von KI-Systemen bevorzugt zitiert)
- [ ] **Listen und Aufzaehlungen** verwenden (KI extrahiert daraus besonders gut)
- [ ] **Fettungen** fuer Schluesselaussagen (`**wichtiger Punkt**`)

### SEO-Content-Regeln

- [ ] **Haupt-Keyword** im Titel, im ersten Absatz und in mindestens einer H2
- [ ] **Neben-Keywords** natuerlich im Text verteilt
- [ ] **Interne Links** zu verwandten Artikeln einbauen (mind. 2-3 pro Artikel)
- [ ] **Interne Links zum Shop** wo passend (Buecher, Leitfaeden erwaehnen)
- [ ] **Link zur Autorin** wo passend (`/ueber-ewelina`)

### GEO-Content-Regeln (fuer KI-Sichtbarkeit)

- [ ] **Klare Antworten** auf Fragen geben (nicht nur Fragen aufwerfen)
- [ ] **Fakten und Zahlen** mit Quellenangaben wo moeglich
- [ ] **Expertise zeigen** — Erfahrung als Kindheitspaedagogin einbringen
- [ ] **Einzigartiger Mehrwert** — was gibt es nur hier?
- [ ] **Praxisbeispiele** und konkrete Tipps (nicht nur Theorie)

### FAQ-Sektion

- [ ] **3-5 haeufige Fragen** zum Thema am Ende des Artikels
- [ ] FAQ-Komponente verwenden: `<FAQ items={[{ question: "...", answer: "..." }]} />`
- [ ] Fragen so formulieren wie Eltern sie bei Google eingeben wuerden
- [ ] Antworten kurz und praegnant (2-3 Saetze ideal)
- [ ] FAQ generiert automatisch FAQPage JSON-LD Schema

---

## 3. Bilder

### Featured Image

- [ ] Pfad: `/public/images/blog/[slug]/featured.jpg`
- [ ] Format: JPG oder WebP
- [ ] Seitenverhaeltnis: 16:9
- [ ] Mindestgroesse: 1200x675px (fuer OG-Image)
- [ ] Alt-Text wird automatisch aus `post.title` generiert

### Bilder im Artikel

- [ ] Beschreibende Dateinamen (nicht `IMG_1234.jpg` sondern `kind-spielt-mit-gefuehlskarten.jpg`)
- [ ] Alt-Texte in MDX setzen: `![Kind spielt mit Gefuehlskarten](bild.jpg)`
- [ ] Bilder im selben Ordner wie Featured Image ablegen

---

## 4. Was automatisch passiert (kein manuelles Zutun noetig)

Folgende SEO-Elemente werden automatisch generiert:

- **Title Tag**: `[post.title] | Gefuehlsfoerderung`
- **Meta Description**: aus `post.excerpt`
- **Canonical URL**: `https://gefuehlsfoerderung.de/blog/[slug]`
- **Open Graph** (og:title, og:description, og:image, og:type=article, og:url, article:published_time, article:modified_time, article:author, article:tag)
- **Twitter Card** (summary_large_image mit Bild)
- **BlogPosting JSON-LD** (headline, datePublished, dateModified, author, publisher, image, keywords)
- **BreadcrumbList JSON-LD** (Home > Blog > Artikeltitel)
- **FAQPage JSON-LD** (wenn FAQ-Komponente verwendet)
- **Sitemap-Eintrag** (automatisch aus blogPosts Array)
- **RSS Feed-Eintrag** (automatisch)
- **Aehnliche Artikel** (basierend auf gemeinsamen Kategorien)
- **Share Buttons** (WhatsApp, Facebook, X, Link kopieren)

---

## 5. Nach Veroeffentlichung

- [ ] Artikel im Browser pruefen (Darstellung, Links, Bilder)
- [ ] OG-Tags testen: https://developers.facebook.com/tools/debug/
- [ ] Google Search Console: URL zur Indexierung einreichen
- [ ] Auf Social Media teilen (Instagram, Facebook)
- [ ] In Newsletter aufnehmen

---

## 6. Bei Artikel-Updates

Wenn ein bestehender Artikel inhaltlich ueberarbeitet wird:

- [ ] `modifiedDate` in `blog.ts` auf aktuelles Datum setzen
- [ ] Pruefen ob `excerpt` noch passt
- [ ] Pruefen ob `categories` noch stimmen
- [ ] Interne Links aktualisieren falls sich Slugs geaendert haben
