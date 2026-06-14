import { products } from "@/lib/products";

// Bundle-aware Order Bump (Pre-Purchase).
// Prüft den Warenkorb und schlägt GENAU EIN passendes, noch fehlendes
// Produkt vor — zum ECHTEN Produktpreis (kein versteckter Rabatt, kein
// Doppelverkauf). Der Bump wird im Checkout als zusätzlicher CartItem
// in den Warenkorb gelegt; calculateOrder() rechnet den Betrag dann
// serverseitig autoritativ für Klarna/PayPal.

export type BumpOffer = {
  productId: string;
  title: string;
  priceCents: number;
  isDigital: boolean;
  microcopy: string;
};

const EBOOK_IDS = [
  "leitfaden-emotionale-entwicklung",
  "leitfaden-kinderwut",
  "leitfaden-kind-redet-nicht",
];

// Effektiv vorhandene Produkte inkl. der in Bundles enthaltenen
// Einzelprodukte (contains) — damit kein Bundle-Bestandteil doppelt
// angeboten wird.
function ownedSet(items: { productId: string }[]): Set<string> {
  const owned = new Set<string>();
  for (const item of items) {
    owned.add(item.productId);
    const product = products.find((p) => p.id === item.productId);
    product?.contains?.forEach((id) => owned.add(id));
  }
  return owned;
}

function toOffer(productId: string, microcopy: string): BumpOffer | null {
  const product = products.find((p) => p.id === productId);
  if (!product || !product.inStock) return null;
  return {
    productId,
    title: product.title,
    priceCents: Math.round(product.price * 100),
    isDigital: product.type === "digital",
    microcopy,
  };
}

// Komplementär-Regeln in Prioritätsreihenfolge: erste passende,
// noch nicht vorhandene Empfehlung gewinnt.
const RULES: { needs: string; offer: string; microcopy: string }[] = [
  {
    needs: "was-fuehlst-du",
    offer: "leitfaden-emotionale-entwicklung",
    microcopy:
      'Leg mir den Leitfaden zur emotionalen Entwicklung dazu (E-Book) — das digitale Begleitheft zum Buch, sofort als Download.',
  },
  {
    needs: "emotions-memory-1",
    offer: "emotions-memory-2",
    microcopy:
      "Emotions-Memory Teil 2 dazu — zusammen 48 Karten und noch mehr Gefühle.",
  },
  {
    needs: "was-fuehlst-du",
    offer: "emotions-memory-1",
    microcopy:
      "Emotions-Memory Teil 1 dazu — Gefühle spielerisch erkennen, perfekt zum Buch.",
  },
];

export function getBumpOffer(
  items: { productId: string }[]
): BumpOffer | null {
  if (!items.length) return null;
  const owned = ownedSet(items);

  for (const rule of RULES) {
    if (owned.has(rule.needs) && !owned.has(rule.offer)) {
      const offer = toOffer(rule.offer, rule.microcopy);
      if (offer) return offer;
    }
  }

  // Reiner E-Book-/Leitfaden-Warenkorb ohne Buch → Buch als Core anbieten.
  const ownsEbook = [...owned].some((id) => EBOOK_IDS.includes(id));
  if (ownsEbook && !owned.has("was-fuehlst-du")) {
    return toOffer(
      "was-fuehlst-du",
      'Das Buch „Was fühlst du?" dazu — das Herzstück, mit dem so viele Familien anfangen.'
    );
  }

  return null;
}

// ───────────────────────────────────────────────────────────────────────────
// Bundle-Upgrade (Warenkorb / Produktseite)
//
// Schlägt vor, im Warenkorb liegende Einzelartikel gegen ein BESTEHENDES
// Bundle-SKU zu tauschen. Der Preis ist der reale Bundle-Paketpreis aus
// products.ts — kein erfundener Rabatt. Die Ersparnis wird ehrlich als
// „einzeln zusammen X · im Bundle Y" (Summe der AKTUELLEN Einzelpreise)
// dargestellt (PAngV/UWG-konform, keine originalPrice-„statt"-Aussage).
// ───────────────────────────────────────────────────────────────────────────

const BUNDLE_PRIORITY = [
  "gefuehlskompass-bundle",
  "emotionen-entdecken-bundle",
];

function priceCents(productId: string): number {
  const p = products.find((x) => x.id === productId);
  return p ? Math.round(p.price * 100) : 0;
}

export type BundleUpgrade = {
  bundleId: string;
  slug: string;
  title: string;
  bundlePriceCents: number;
  singleSumCents: number; // Summe der aktuellen Einzelpreise aller Bundle-Inhalte
  savingsCents: number; // singleSumCents − bundlePriceCents (echte Paket-Ersparnis)
  savingsPercent: number;
  replaceIds: string[]; // im Warenkorb liegende Artikel, die ersetzt werden
  addTitles: string[]; // Titel der neu hinzukommenden Inhalte
};

// Liefert das stärkste Bundle-Upgrade (größte echte Ersparnis) oder null.
export function getBundleUpgrade(
  items: { productId: string }[]
): BundleUpgrade | null {
  if (!items.length) return null;
  const owned = ownedSet(items);
  const cartIds = items.map((i) => i.productId);

  let best: BundleUpgrade | null = null;
  for (const bundleId of BUNDLE_PRIORITY) {
    const bundle = products.find((p) => p.id === bundleId);
    if (!bundle?.contains || !bundle.inStock) continue;
    if (cartIds.includes(bundleId)) continue; // Bundle liegt schon im Warenkorb
    const contains = bundle.contains;

    // Was im Warenkorb wird durch das Bundle ersetzt: enthaltene Einzelartikel
    // sowie kleinere Bundles, die komplett im Ziel-Bundle aufgehen.
    const replaceIds = cartIds.filter((id) => {
      if (id === bundleId) return false;
      const p = products.find((x) => x.id === id);
      if (!p) return false;
      if (p.category === "bundle") {
        return (
          (p.contains ?? []).length > 0 &&
          (p.contains ?? []).every((c) => contains.includes(c))
        );
      }
      return contains.includes(id);
    });
    if (replaceIds.length === 0) continue; // kein Bezug zum Bundle

    const newIds = contains.filter((id) => !owned.has(id));
    if (newIds.length === 0) continue; // Bundle brächte nichts Neues

    const bundlePriceCents = Math.round(bundle.price * 100);
    const singleSumCents = contains.reduce((s, id) => s + priceCents(id), 0);
    const savingsCents = singleSumCents - bundlePriceCents;
    if (savingsCents <= 0) continue; // nur echte Paket-Ersparnis anbieten

    const candidate: BundleUpgrade = {
      bundleId,
      slug: bundle.slug,
      title: bundle.title,
      bundlePriceCents,
      singleSumCents,
      savingsCents,
      savingsPercent: Math.round((savingsCents / singleSumCents) * 100),
      replaceIds,
      addTitles: newIds.map(
        (id) => products.find((p) => p.id === id)?.title ?? id
      ),
    };
    if (!best || candidate.savingsCents > best.savingsCents) best = candidate;
  }
  return best;
}

export type BundlePromo = {
  bundleId: string;
  slug: string;
  title: string;
  bundlePriceCents: number;
  singleSumCents: number;
  savingsCents: number;
  savingsPercent: number;
};

// Kontextbezogenes Bundle-Banner für die Produktseite: zeigt das
// Flagship-Bundle, das das angezeigte Produkt enthält. Für rein
// thematische Leitfäden (nicht Teil eines Bundles) oder das Top-Bundle
// selbst → null (kein irreführendes/unpassendes Banner).
export function getProductBundlePromo(productId: string): BundlePromo | null {
  const flagship = products.find((p) => p.id === "gefuehlskompass-bundle");
  if (!flagship?.contains || !flagship.inStock) return null;
  if (productId === "gefuehlskompass-bundle") return null; // bereits das Top-Bundle

  const isComponent = flagship.contains.includes(productId);
  const isSmallerBundle = productId === "emotionen-entdecken-bundle";
  if (!isComponent && !isSmallerBundle) return null;

  const bundlePriceCents = Math.round(flagship.price * 100);
  const singleSumCents = flagship.contains.reduce(
    (s, id) => s + priceCents(id),
    0
  );
  const savingsCents = singleSumCents - bundlePriceCents;
  return {
    bundleId: flagship.id,
    slug: flagship.slug,
    title: flagship.title,
    bundlePriceCents,
    singleSumCents,
    savingsCents,
    savingsPercent: Math.round((savingsCents / singleSumCents) * 100),
  };
}
