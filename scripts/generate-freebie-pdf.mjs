import puppeteer from "puppeteer";
import { resolve } from "path";
import { mkdirSync } from "fs";

// Erzeugt den Newsletter-Lead-Magnet als gebrandetes PDF in
// private/downloads/newsletter-mini-guide.pdf.
// Inhalt ist ein einsatzfähiger Erst-Entwurf — Ewelina kann Texte
// jederzeit verfeinern und das PDF mit `node scripts/generate-freebie-pdf.mjs`
// neu erzeugen.

const OUT_DIR = resolve(import.meta.dirname, "../private/downloads");
const OUT = resolve(OUT_DIR, "newsletter-mini-guide.pdf");

const saetze = [
  {
    satz: "Ich bin da. Du musst das nicht allein schaffen.",
    warum:
      "Bevor ein Kind nachdenken kann, muss es sich sicher fühlen. Dieser Satz sagt: Ich gehe nicht weg, egal wie groß das Gefühl ist. Deine Ruhe wird zu seiner Ruhe — das nennt man Co-Regulation.",
  },
  {
    satz: "Du darfst wütend sein. Ich bleibe trotzdem bei dir.",
    warum:
      "Wut ist kein Fehlverhalten, sondern ein Hilferuf. Wenn dein Kind das Gefühl haben darf und du trotzdem bleibst, lernt es: Auch heftige Gefühle trennen uns nicht.",
  },
  {
    satz: "Das war gerade ganz schön viel für dich, oder?",
    warum:
      "Kinder beruhigen sich, wenn sie sich gesehen fühlen. Du musst nichts lösen — es reicht, das Gefühl in Worte zu fassen. Benennen nimmt dem Sturm die Wucht.",
  },
  {
    satz: "Komm, wir atmen einmal zusammen — tief rein, langsam wieder raus.",
    warum:
      "Mit Worten allein erreichst du ein aufgewühltes Kind selten. Über den Körper schon. Atme sichtbar mit — Kinder machen instinktiv nach, was sie bei dir sehen.",
  },
  {
    satz: "Du bist okay, so wie du bist.",
    warum:
      "Wenn der Sturm vorbei ist, bleibt oft Scham zurück. Dieser Satz trennt das Verhalten vom Wert deines Kindes: Du bist nicht zu viel. Du bist genau richtig.",
  },
];

const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Nunito', system-ui, sans-serif; color: #3D3A36; background: #FBF7F0; }
  .page { width: 210mm; min-height: 297mm; padding: 22mm 20mm; position: relative; }
  .brand { text-align: center; margin-bottom: 14mm; }
  .brand .logo { font-family: 'Caveat', cursive; font-size: 30px; color: #8B7BC7; font-weight: 700; }
  .brand .sub { font-size: 10px; letter-spacing: 2px; color: #9C8F80; text-transform: uppercase; margin-top: 2px; }
  h1 { font-family: 'Caveat', cursive; font-size: 46px; color: #3D3A36; text-align: center; line-height: 1.1; }
  .intro { max-width: 150mm; margin: 8mm auto 12mm; text-align: center; font-size: 14px; line-height: 1.7; color: #6B6258; }
  .item { background: #ffffff; border: 1px solid #EDE6F7; border-left: 5px solid #C9B8E8; border-radius: 14px; padding: 16px 20px; margin-bottom: 11px; }
  .item .num { font-family: 'Caveat', cursive; font-size: 24px; color: #C49030; font-weight: 700; }
  .item .satz { font-size: 17px; font-weight: 700; color: #3D3A36; margin: 2px 0 6px; }
  .item .warum { font-size: 12.5px; line-height: 1.6; color: #6B6258; }
  .outro { margin-top: 12mm; padding: 16px 20px; background: linear-gradient(135deg, rgba(139,123,199,0.08), rgba(232,160,176,0.08)); border-radius: 14px; font-size: 13px; line-height: 1.7; color: #4a463f; }
  .outro strong { color: #8B7BC7; }
  .foot { margin-top: 8mm; text-align: center; font-size: 10px; color: #9C8F80; line-height: 1.6; }
  .sig { font-family: 'Caveat', cursive; font-size: 22px; color: #8B7BC7; }
</style></head>
<body>
  <div class="page">
    <div class="brand">
      <div class="logo">Gefühlsförderung</div>
      <div class="sub">von Ewelina Gawlik</div>
    </div>
    <h1>5 Sätze, die jedes Kind beruhigen</h1>
    <p class="intro">
      Manchmal fehlen uns im stürmischsten Moment genau die richtigen Worte.
      Hier sind fünf Sätze, die deinem Kind helfen, sich wieder sicher zu
      fühlen — und dir, ruhig zu bleiben. Du musst sie nicht auswendig lernen.
      Nimm dir den, der sich für euch stimmig anfühlt.
    </p>
    ${saetze
      .map(
        (s, i) => `<div class="item">
        <span class="num">${i + 1}</span>
        <div class="satz">„${s.satz}"</div>
        <div class="warum">${s.warum}</div>
      </div>`
      )
      .join("\n")}
    <div class="outro">
      <strong>Ein letzter Gedanke:</strong> Diese Sätze wirken am besten, wenn
      dein Kind die Gefühle dahinter schon kennt. Genau dafür habe ich mein
      Kinderbuch <em>„Was fühlst du?"</em> geschrieben — drei Geschichten, die
      Traurigkeit, Wut und Freude greifbar machen. Aber zuerst: Probier die
      fünf Sätze aus. Ich bin gespannt, welcher eurer wird.
    </div>
    <div class="foot">
      <span class="sig">Alles Liebe, Ewelina</span><br><br>
      Gefühlsförderung von Ewelina Gawlik · Dieser Mini-Guide ist dein
      kostenloses Willkommensgeschenk. Weitergeben ausdrücklich erwünscht 💛
    </div>
  </div>
</body></html>`;

async function run() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.pdf({
    path: OUT,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  console.log(`✅ Saved: ${OUT}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
