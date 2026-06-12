import { createHmac, timingSafeEqual } from "crypto";

// Signierte Download-Tokens für digitale Produkte.
// Format: base64url(payload-json) + "." + base64url(hmac-sha256)
// Kein DB-Zugriff nötig — das Token trägt Produkt-IDs, Bestellreferenz
// und Ablaufdatum selbst.

const TOKEN_TTL_DAYS = 30;

export type DownloadTokenPayload = {
  productIds: string[];
  orderRef: string; // z. B. "klarna:abc123"
  exp: number; // Unix-Sekunden
};

function getSecret(): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) {
    throw new Error("DOWNLOAD_TOKEN_SECRET ist nicht gesetzt");
  }
  if (secret.length < 32) {
    // HMAC-Sicherheit hängt vollständig an der Entropie des Secrets.
    throw new Error(
      "DOWNLOAD_TOKEN_SECRET ist zu kurz (min. 32 Zeichen, z. B. `openssl rand -hex 32`)"
    );
  }
  return secret;
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function sign(data: string): Buffer {
  return createHmac("sha256", getSecret()).update(data).digest();
}

export function createDownloadToken(
  productIds: string[],
  orderRef: string
): string {
  const payload: DownloadTokenPayload = {
    productIds,
    orderRef,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_DAYS * 24 * 60 * 60,
  };
  const encoded = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${encoded}.${b64url(sign(encoded))}`;
}

export function verifyDownloadToken(
  token: string
): DownloadTokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;
  let expected: Buffer;
  let provided: Buffer;
  try {
    expected = sign(encoded);
    provided = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }
  if (
    expected.length !== provided.length ||
    !timingSafeEqual(expected, provided)
  ) {
    return null;
  }

  let payload: DownloadTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (
    !Array.isArray(payload.productIds) ||
    typeof payload.exp !== "number" ||
    payload.exp < Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  return payload;
}
