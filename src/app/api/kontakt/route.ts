import { dlSendMail } from "@/lib/digiletter";
import { clientIp, rateLimitOk } from "@/lib/rate-limit";

const CONTACT_EMAIL =
  process.env.CONTACT_NOTIFY_EMAIL ||
  process.env.ORDER_NOTIFY_EMAIL ||
  "mail@ewelinagawlik.de";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TOPICS = new Set([
  "Allgemeine Frage",
  "Zahlungsprobleme",
  "Lieferschwierigkeiten",
  "Beschädigte Bestellung",
  "Kooperation",
  "Kritik und Anregung",
]);

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Kontaktformular → Mail an Ewelina (Reply-To = Absender).
export async function POST(request: Request) {
  try {
    if (!rateLimitOk(`kontakt:${clientIp(request)}`, 3, 10 * 60 * 1000)) {
      return Response.json(
        { error: "Zu viele Anfragen — bitte versuche es später erneut." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const topic = String(body.topic ?? "").trim();
    const name = String(body.name ?? "").trim().slice(0, 120);
    const email = String(body.email ?? "").trim().toLowerCase();
    const message = String(body.message ?? "").trim().slice(0, 5000);
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
    if (!name || message.length < 5) {
      return Response.json(
        { error: "Bitte fülle Name und Nachricht aus." },
        { status: 400 }
      );
    }

    const safeTopic = TOPICS.has(topic) ? topic : "Allgemeine Frage";

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#3D3A36;">
<h2 style="font-size:16px;margin:0 0 12px 0;">Neue Kontaktanfrage über gefühlsförderung.de</h2>
<p style="margin:0 0 6px 0;"><strong>Anliegen:</strong> ${esc(safeTopic)}</p>
<p style="margin:0 0 6px 0;"><strong>Name:</strong> ${esc(name)}</p>
<p style="margin:0 0 16px 0;"><strong>E-Mail:</strong> ${esc(email)}</p>
<div style="padding:14px 16px;background-color:#FBF7F0;border-radius:10px;white-space:pre-wrap;">${esc(message)}</div>
<p style="margin:16px 0 0 0;font-size:12px;color:#9C8F80;">Antworte einfach auf diese E-Mail, um den Absender zu erreichen.</p>
</div>`;

    const result = await dlSendMail({
      to: CONTACT_EMAIL,
      subject: `Kontaktformular: ${safeTopic} — ${name}`.replace(/[\r\n]/g, " "),
      html,
      replyTo: email,
    });

    if (!result.ok) {
      return Response.json(
        {
          error:
            "Deine Nachricht konnte gerade nicht zugestellt werden. Bitte schreibe direkt an mail@ewelinagawlik.de.",
        },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Kontaktformular fehlgeschlagen:", err);
    return Response.json(
      { error: "Unerwarteter Fehler. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
