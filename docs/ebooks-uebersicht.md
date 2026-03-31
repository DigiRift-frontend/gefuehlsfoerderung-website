# E-Books Übersicht

## 3 Leitfäden — Alle als HTML verfügbar (Print to PDF)

---

### 1. Wenn dein Kind ängstlich ist

**URL:** [/ebook/kinderangst](http://localhost:3001/ebook/kinderangst)
**Design:** Neues Website-Design (Caveat, Lavender/Rose/Gold, Watercolor-Blobs)
**Seiten:** 28 (inkl. 5 interaktive Arbeitsblätter)
**PDF:** `/public/downloads/Leitfaden-Wenn-dein-Kind-aengstlich-ist.pdf`
**Status:** Fertig + PDF generiert

| Kap. | Titel | Arbeitsblatt |
|------|-------|-------------|
| 1 | Angst ist kein Fehler | — |
| 2 | Was dein Kind wirklich sagt | Sätze übersetzen, Körpersignal-Skala, Angst-Signale Checklist |
| 3 | Was deine eigene Angst damit zu tun hat | Angst-Geschichte schreiben, Selbsteinschätzung, Verhaltens-Checklist |
| 4 | Sicherheit geben — echt und körperlich | — |
| 5 | Trennungsangst begleiten | Abschiedsritual planen, Übergangsobjekt malen, Versprechen-Lückentext |
| 6 | Soziale Ängste | Mut-Leiter erstellen, Stufen-Tracker, Mut-Skala (🐁→🦁) |
| 7 | Angst vor Dunkelheit, Monstern und dem Tod | — |
| 8 | Mut ist kein Talent — Mut ist ein Muskel | — |
| 9 | Der Angst einen Namen geben | Angst malen, Steckbrief, Angst-Ampel |
| 10 | Brief an dich | — |

---

### 2. Deine eigenen Gefühle als Elternteil

**URL:** [/ebook/eigene-muster](http://localhost:3001/ebook/eigene-muster)
**Design:** Magazine-Design (GEFÜHLE Brand, Cream/Gold, Serif-Headings)
**Seiten:** ~22
**PDF:** Noch nicht generiert
**Status:** Fertig (HTML)

| Kap. | Titel |
|------|-------|
| 1 | Du bist nicht deine Eltern |
| 2 | Die vier Masken der Eltern |
| 3 | Die Landkarte deiner Trigger |
| 4 | Dein Nervensystem verstehen |
| 5 | Die Sätze, die wir schwören nie zu sagen |
| 6 | Wenn du schreist |
| 7 | Bruch und Reparatur |
| 8 | Deine Bedürfnisse zählen auch |
| 9 | Die Beziehung mit dir selbst |
| 10 | Du durchbrichst den Kreislauf |

---

### 3. Beziehung statt Erziehung

**URL:** [/ebook/beziehung-statt-erziehung](http://localhost:3001/ebook/beziehung-statt-erziehung)
**Design:** Magazine-Design (GEFÜHLE Brand, Cream/Gold, Serif-Headings)
**Seiten:** ~22
**PDF:** Noch nicht generiert
**Status:** Fertig (HTML)

| Kap. | Titel |
|------|-------|
| 1 | Das Kind, das du warst |
| 2 | Gleichwürdigkeit |
| 3 | Das kompetente Kind |
| 4 | Authentizität |
| 5 | Bruch und Reparatur |
| 6 | Grenzen mit Liebe |
| 7 | Gefühle sind immer erlaubt |
| 8 | Die Umgebung, die du erschaffst |
| 9 | Vom Gehorsam zur Verantwortung |
| 10 | Es geht nicht um Perfektion |

---

## Design-Varianten

| Design | Verwendet bei | Merkmale |
|--------|--------------|----------|
| **Website-Design** | Kinderangst | Caveat-Headings, Lavender/Rose/Gold Gradients, Watercolor-Blobs, abgerundete Cards, Hero-Fotos mit Fade, interaktive Arbeitsblätter |
| **Magazine-Design** | Eigene Muster, Beziehung statt Erziehung | GEFÜHLE Brand-Header in Gold, Cream-Hintergrund, Playfair Display Serif, Zweispalten-Layout, Kapitel-Nummern als große Ziffern |

## Technische Dateien

```
src/
├── components/ebook/
│   ├── EbookLayout.tsx         (Magazine-Design Komponente)
│   └── EbookWebLayout.tsx      (Website-Design Komponente)
├── app/ebook/
│   ├── ebook.css               (Magazine-Design CSS)
│   ├── eigene-muster/
│   │   └── page.tsx            (10 Kapitel)
│   ├── beziehung-statt-erziehung/
│   │   └── page.tsx            (10 Kapitel)
│   └── kinderangst/
│       ├── ebook-web.css       (Website-Design CSS + interaktive Elemente)
│       └── page.tsx            (10 Kapitel + 5 Arbeitsblätter)
scripts/
│   └── generate-pdf.mjs        (Puppeteer PDF-Generator)
public/downloads/
│   └── Leitfaden-Wenn-dein-Kind-aengstlich-ist.pdf (28 Seiten, 2.1 MB)
```

## PDF generieren

```bash
# Einzelnes E-Book
node scripts/generate-pdf.mjs aengstlich
node scripts/generate-pdf.mjs Elternteil
node scripts/generate-pdf.mjs Erziehung

# Alle auf einmal
node scripts/generate-pdf.mjs
```

Voraussetzung: Dev-Server muss auf Port 3001 laufen (`npm run dev`).
