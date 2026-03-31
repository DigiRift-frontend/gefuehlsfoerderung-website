import puppeteer from "puppeteer";
import { resolve } from "path";

const BASE = "http://localhost:3001";
const OUT_DIR = resolve(import.meta.dirname, "../public/downloads");

const ebooks = [
  {
    url: `${BASE}/ebook/kinderangst`,
    filename: "Leitfaden-Wenn-dein-Kind-aengstlich-ist.pdf",
  },
  {
    url: `${BASE}/ebook/eigene-muster`,
    filename: "Leitfaden-Deine-eigenen-Gefuehle-als-Elternteil.pdf",
  },
  {
    url: `${BASE}/ebook/beziehung-statt-erziehung`,
    filename: "Leitfaden-Beziehung-statt-Erziehung.pdf",
  },
];

// Pick which ebooks to generate from CLI args, or all
const args = process.argv.slice(2);
const toGenerate = args.length
  ? ebooks.filter((e) => args.some((a) => e.filename.toLowerCase().includes(a.toLowerCase())))
  : ebooks;

if (toGenerate.length === 0) {
  console.log("No matching ebook found. Available:");
  ebooks.forEach((e) => console.log(`  - ${e.filename}`));
  process.exit(1);
}

async function run() {
  const { mkdirSync } = await import("fs");
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });

  for (const ebook of toGenerate) {
    console.log(`\n📖 Generating: ${ebook.filename}`);
    console.log(`   URL: ${ebook.url}`);

    const page = await browser.newPage();
    await page.goto(ebook.url, { waitUntil: "networkidle0", timeout: 60000 });

    // Wait for page to settle
    await new Promise((r) => setTimeout(r, 3000));

    const outPath = resolve(OUT_DIR, ebook.filename);
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    console.log(`   ✅ Saved: ${outPath}`);
    await page.close();
  }

  await browser.close();
  console.log("\n🎉 Done!\n");
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
