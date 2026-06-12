import { processKlarnaOrder } from "@/lib/klarna-order";

// Klarna-Notification-Webhook — Backup für den Fall, dass die synchrone
// Verarbeitung in /api/checkout/authorize fehlgeschlagen ist.
// Idempotent: bereits eingezogene Bestellungen werden übersprungen.
export async function POST(request: Request) {
  try {
    const url = new URL(request.url);

    // Klarna signiert Push-Notifications nicht — wir authentifizieren
    // über ein Secret, das wir selbst beim Anlegen der Bestellung in
    // die notification-URL geschrieben haben.
    const expectedKey = process.env.KLARNA_WEBHOOK_SECRET;
    if (expectedKey && url.searchParams.get("key") !== expectedKey) {
      console.warn("Klarna-Webhook mit ungültigem Key abgewiesen");
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    let orderId = url.searchParams.get("klarna_order_id");

    // Klarna kann die Order-ID auch im Body senden ({"order_id": "..."})
    if (!orderId) {
      try {
        const body = await request.json();
        orderId = body?.order_id ?? body?.orderId ?? null;
      } catch {
        // kein JSON-Body — ok
      }
    }

    if (!orderId) {
      return Response.json({ error: "Missing order ID" }, { status: 400 });
    }

    const result = await processKlarnaOrder(orderId);
    console.log(
      `Klarna-Webhook ${orderId}: processed=${result.processed} alreadyCaptured=${result.alreadyCaptured} status=${result.status}`
    );

    return Response.json({ received: true });
  } catch (err) {
    console.error("Klarna webhook error:", err);
    return Response.json({ error: "Webhook error" }, { status: 500 });
  }
}
