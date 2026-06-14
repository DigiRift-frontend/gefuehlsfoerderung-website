import { existsSync } from "fs";
import path from "path";

// Zuordnung: Produkt-ID → auslieferbare Datei(en).
// Die Dateien liegen bewusst in private/downloads/ (NICHT in public/),
// damit sie nur über die signierte Download-Route erreichbar sind.
//
// WICHTIG: Die drei Leitfaden-PDFs müssen aus dem alten
// WooCommerce-Shop übernommen und unter genau diesen Dateinamen
// abgelegt werden. Fehlende Dateien werden in der Bestell-
// benachrichtigung an Ewelina als "manuell nachliefern" markiert.

export const DOWNLOADS_DIR = path.join(process.cwd(), "private", "downloads");

export type DigitalAsset = {
  productId: string;
  label: string;
  fileName: string;
};

const assets: DigitalAsset[] = [
  {
    productId: "leitfaden-kind-redet-nicht",
    label: 'Leitfaden "Hilfe, mein Kind redet nicht mehr mit mir" (PDF)',
    fileName: "leitfaden-kind-redet-nicht.pdf",
  },
  {
    productId: "leitfaden-kinderwut",
    label: 'Leitfaden "Kinderwut verstehen und meistern" (PDF)',
    fileName: "leitfaden-kinderwut.pdf",
  },
  {
    productId: "leitfaden-emotionale-entwicklung",
    label: "Leitfaden zur emotionalen Entwicklung (PDF)",
    fileName: "leitfaden-emotionale-entwicklung.pdf",
  },
  // Newsletter-Lead-Magnet (kostenlos). Kein Shop-Produkt — wird nur über
  // die Bestätigungsseite /newsletter/bestaetigt per signiertem Token
  // ausgeliefert.
  {
    productId: "freebie-newsletter",
    label: 'Mini-Guide „5 Sätze, die jedes Kind beruhigen" (PDF)',
    fileName: "newsletter-mini-guide.pdf",
  },
];

// Bundles enthalten den Leitfaden zur emotionalen Entwicklung als digitalen Teil
const bundleContents: Record<string, string[]> = {
  "gefuehlskompass-bundle": ["leitfaden-emotionale-entwicklung"],
  "emotionen-entdecken-bundle": ["leitfaden-emotionale-entwicklung"],
};

// Liefert alle digitalen Assets für eine gekaufte Produkt-ID
// (inkl. der digitalen Bestandteile von Bundles).
export function getAssetsForProduct(productId: string): DigitalAsset[] {
  const direct = assets.filter((a) => a.productId === productId);
  const fromBundle = (bundleContents[productId] ?? []).flatMap((id) =>
    assets.filter((a) => a.productId === id)
  );
  return [...direct, ...fromBundle];
}

export function getAssetsForProducts(productIds: string[]): DigitalAsset[] {
  const seen = new Set<string>();
  const result: DigitalAsset[] = [];
  for (const id of productIds) {
    for (const asset of getAssetsForProduct(id)) {
      if (!seen.has(asset.fileName)) {
        seen.add(asset.fileName);
        result.push(asset);
      }
    }
  }
  return result;
}

export function assetFileExists(asset: DigitalAsset): boolean {
  return existsSync(path.join(DOWNLOADS_DIR, asset.fileName));
}

export function findAssetByFileName(
  fileName: string
): DigitalAsset | undefined {
  return assets.find((a) => a.fileName === fileName);
}
