import { readFile } from "fs/promises";
import path from "path";
import { verifyDownloadToken } from "@/lib/download-token";
import {
  DOWNLOADS_DIR,
  findAssetByFileName,
  getAssetsForProducts,
} from "@/lib/digital-assets";

// Signierte Download-Route für gekaufte digitale Produkte.
// GET /api/download/<token>?file=<dateiname>
// Das Token (HMAC, 30 Tage gültig) stammt aus der Bestellbestätigung.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const url = new URL(request.url);
  const fileName = url.searchParams.get("file") ?? "";

  const payload = verifyDownloadToken(token);
  if (!payload) {
    return new Response(
      "Dieser Download-Link ist ungültig oder abgelaufen. Bitte melde dich über das Kontaktformular — wir senden dir einen neuen Link.",
      { status: 403, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  // Datei muss zu einem im Token enthaltenen Produkt gehören
  const asset = findAssetByFileName(fileName);
  const allowed = getAssetsForProducts(payload.productIds);
  if (!asset || !allowed.some((a) => a.fileName === asset.fileName)) {
    return new Response("Datei nicht gefunden.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Pfad strikt innerhalb des Download-Verzeichnisses halten
  const filePath = path.join(DOWNLOADS_DIR, asset.fileName);
  if (!filePath.startsWith(DOWNLOADS_DIR + path.sep)) {
    return new Response("Datei nicht gefunden.", { status: 404 });
  }

  let data: Buffer;
  try {
    data = await readFile(filePath);
  } catch {
    console.error(`Download-Datei fehlt auf dem Server: ${asset.fileName}`);
    return new Response(
      "Diese Datei ist gerade nicht verfügbar. Bitte melde dich über das Kontaktformular — wir senden sie dir umgehend per E-Mail.",
      { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${asset.fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
