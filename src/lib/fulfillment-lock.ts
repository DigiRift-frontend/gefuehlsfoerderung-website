import { mkdirSync, openSync, closeSync } from "fs";
import path from "path";
import os from "os";

// Idempotenz-Schutz für das Fulfillment: Zwischen synchronem
// Authorize-Pfad, Webhook und Seiten-Reload kann dieselbe Bestellung
// mehrfach verarbeitet werden. Ein Datei-Marker (O_EXCL = atomar)
// stellt sicher, dass Mails + Download-Links pro Bestellung nur
// EINMAL rausgehen. Lebensdauer: Container-Laufzeit — das deckt das
// reale Race-Fenster (Sekunden bis Minuten) ab.

const LOCK_DIR = path.join(os.tmpdir(), "gefuehlsfoerderung-fulfillments");

export function tryAcquireFulfillment(orderRef: string): boolean {
  try {
    mkdirSync(LOCK_DIR, { recursive: true });
    const safe = orderRef.replace(/[^a-zA-Z0-9:_-]/g, "_");
    // "wx" = O_CREAT | O_EXCL → schlägt atomar fehl, wenn Datei existiert
    const fd = openSync(path.join(LOCK_DIR, safe), "wx");
    closeSync(fd);
    return true;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "EEXIST") {
      return false;
    }
    // Bei unerwarteten FS-Fehlern lieber zustellen als verschlucken
    console.error("Fulfillment-Lock fehlgeschlagen (fahre fort):", err);
    return true;
  }
}
