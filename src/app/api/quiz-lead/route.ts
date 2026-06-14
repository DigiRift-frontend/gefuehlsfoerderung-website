import { dlSubscribe, DIGILETTER_LISTS } from "@/lib/digiletter";
import { clientIp, rateLimitOk } from "@/lib/rate-limit";
import { recordEvent } from "@/lib/store";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VALID_RESULTS = new Set(["A", "B", "C", "D", "E"]);

// Quiz-Lead → DigiLetter Double-Opt-in mit Ergebnis-Tag
// (z. B. "quiz-ergebnis-b" = Kinderwut). Die Tags ermöglichen später
// passgenaue Sequenzen pro Schmerzpunkt.
export async function POST(request: Request) {
  try {
    if (!rateLimitOk(`quiz:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
      return Response.json(
        { error: "Zu viele Anfragen — bitte versuche es später erneut." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const firstName = String(body.name ?? body.firstName ?? "").trim();
    const result = String(body.result ?? "").trim().toUpperCase();
    const honeypot = String(body.website ?? "");

    if (honeypot) {
      return Response.json({ success: true });
    }

    if (!EMAIL_RE.test(email)) {
      return Response.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    const tags = ["gefuehlsfoerderung", "quiz"];
    if (VALID_RESULTS.has(result)) {
      tags.push(`quiz-ergebnis-${result.toLowerCase()}`);
    }

    const dlResult = await dlSubscribe({
      email,
      firstName: firstName || undefined,
      listId: DIGILETTER_LISTS.quiz,
      tags,
      redirectUrl: `${SITE_URL}/newsletter/bestaetigt`,
    });

    // Funnel-Tracking (ohne PII — nur Ergebnis-Tag + ob E-Mail dabei war).
    recordEvent("quiz_completed", {
      ref: VALID_RESULTS.has(result) ? result : undefined,
      meta: { withEmail: true },
    });

    // Das Quiz-Ergebnis wird dem Nutzer unabhängig vom Lead-Versand
    // angezeigt — deshalb auch bei DigiLetter-Fehlern kein harter Fehler.
    return Response.json({ success: dlResult.ok });
  } catch (err) {
    console.error("Quiz-Lead fehlgeschlagen:", err);
    return Response.json({ success: false });
  }
}
