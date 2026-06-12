// Sehr einfacher In-Memory-Rate-Limiter pro IP für die öffentlichen
// Formular-Endpoints. Bewusst ohne externe Abhängigkeiten — bei einem
// Neustart der Instanz beginnen die Zähler von vorn, das reicht hier.

const MAX_BUCKETS = 5000;
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimitOk(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();

  // Map-Größe hart begrenzen (Schutz vor Bucket-Flooding über gefälschte
  // IPs): erst abgelaufene Einträge räumen, danach notfalls die ältesten
  // (Map = Insertion-Order) verdrängen.
  if (buckets.size >= MAX_BUCKETS) {
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k);
    }
    while (buckets.size >= MAX_BUCKETS) {
      const oldest = buckets.keys().next().value;
      if (oldest === undefined) break;
      buckets.delete(oldest);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

// Echte Client-IP hinter dem Coolify/Traefik-Proxy ermitteln.
// WICHTIG: Traefik HÄNGT die echte Client-IP ANS ENDE von
// x-forwarded-for an — ein vom Client mitgeschickter (gefälschter)
// Header steht links davon. Deshalb das LETZTE Element nehmen,
// nicht das erste (sonst Rate-Limit-Bypass per Header-Spoofing).
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const parts = fwd.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
