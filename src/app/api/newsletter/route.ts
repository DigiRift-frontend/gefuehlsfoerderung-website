import { dlSubscribe, DIGILETTER_LISTS } from "@/lib/digiletter";
import { clientIp, rateLimitOk } from "@/lib/rate-limit";
import { recordEvent } from "@/lib/store";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Newsletter-Anmeldung → DigiLetter Double-Opt-in.
// Der Bestätigungslink in der DOI-Mail leitet auf /newsletter/bestaetigt.
export async function POST(request: Request) {
  try {
    if (!rateLimitOk(`newsletter:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
      return Response.json(
        { error: "Zu viele Anfragen — bitte versuche es später erneut." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const firstName = String(body.vorname ?? body.firstName ?? "").trim();
    const honeypot = String(body.website ?? "");

    if (honeypot) {
      // Bot — vorgeben, dass alles ok ist
      return Response.json({ success: true, status: "pending" });
    }

    if (!EMAIL_RE.test(email)) {
      return Response.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    const result = await dlSubscribe({
      email,
      firstName: firstName || undefined,
      listId: DIGILETTER_LISTS.newsletter,
      tags: ["gefuehlsfoerderung", "newsletter"],
      redirectUrl: `${SITE_URL}/newsletter/bestaetigt`,
    });

    if (!result.ok) {
      return Response.json(
        {
          error:
            "Die Anmeldung hat gerade nicht geklappt. Bitte versuche es in ein paar Minuten erneut.",
        },
        { status: 502 }
      );
    }

    const data = result.data as { status?: string } | undefined;
    const status = data?.status ?? "pending";

    // Funnel-Tracking (ohne PII — nur Status). Fail-safe.
    recordEvent("newsletter_submit", { meta: { status } });

    return Response.json({
      success: true,
      status, // "pending" = DOI-Mail raus, "confirmed" = war schon bestätigt
    });
  } catch (err) {
    console.error("Newsletter-Anmeldung fehlgeschlagen:", err);
    return Response.json(
      { error: "Unerwarteter Fehler. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
