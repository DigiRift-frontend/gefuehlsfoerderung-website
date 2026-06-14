import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import path from "path";

// Persistenter Funnel-Datastore (SQLite).
//
// Trägt die Bausteine, die einen dauerhaften Zustand brauchen:
// Funnel-Tracking-Events (jetzt), später Offer-Token-Verbrauch,
// E-Mail-Sequenz-Cursor und Abbrecher-Erkennung.
//
// Fail-safe nach demselben Prinzip wie digiletter.ts / fulfillment-lock.ts:
// Lässt sich die DB nicht öffnen, wird einmal geloggt und alle Operationen
// werden zu No-Ops — die Website bricht dadurch NIE ab.
//
// Speicherort: process.env.DATA_DIR (in Prod ein gemountetes Coolify-Volume),
// lokal Fallback auf <repo>/private/data. Die DB-Datei ist per .gitignore
// vom Repo ausgeschlossen.

type DB = Database.Database;

const DATA_DIR =
  process.env.DATA_DIR || path.join(process.cwd(), "private", "data");

let db: DB | null = null;
let initFailed = false;

function getDb(): DB | null {
  if (db) return db;
  if (initFailed) return null;
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    const handle = new Database(path.join(DATA_DIR, "funnel.db"));
    handle.pragma("journal_mode = WAL");
    handle.pragma("busy_timeout = 4000");
    handle.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        type       TEXT    NOT NULL,
        ref        TEXT,
        meta       TEXT,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_events_type_time
        ON events (type, created_at);
    `);
    db = handle;
    return db;
  } catch (err) {
    initFailed = true;
    console.error("Funnel-Store konnte nicht initialisiert werden:", err);
    return null;
  }
}

export type FunnelEventType =
  | "newsletter_submit"
  | "newsletter_confirmed"
  | "quiz_completed"
  | "checkout_started"
  | "order_completed"
  | "bump_added";

// Ein Funnel-Event protokollieren. Niemals werfen.
export function recordEvent(
  type: FunnelEventType,
  opts: { ref?: string; meta?: Record<string, unknown> } = {}
): void {
  const handle = getDb();
  if (!handle) return;
  try {
    handle
      .prepare(
        "INSERT INTO events (type, ref, meta, created_at) VALUES (?, ?, ?, ?)"
      )
      .run(
        type,
        opts.ref ?? null,
        opts.meta ? JSON.stringify(opts.meta) : null,
        Date.now()
      );
  } catch (err) {
    console.error(`Funnel-Event '${type}' konnte nicht gespeichert werden:`, err);
  }
}

// Anzahl Events eines Typs (optional erst ab Zeitpunkt). 0 bei Fehler.
export function countEvents(type: FunnelEventType, sinceMs?: number): number {
  const handle = getDb();
  if (!handle) return 0;
  try {
    const row = sinceMs
      ? handle
          .prepare(
            "SELECT COUNT(*) AS n FROM events WHERE type = ? AND created_at >= ?"
          )
          .get(type, sinceMs)
      : handle
          .prepare("SELECT COUNT(*) AS n FROM events WHERE type = ?")
          .get(type);
    return (row as { n: number } | undefined)?.n ?? 0;
  } catch {
    return 0;
  }
}
