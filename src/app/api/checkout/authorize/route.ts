import { klarnaFetch } from "@/lib/klarna";
import { processKlarnaOrder, type MerchantData } from "@/lib/klarna-order";
import {
  calculateOrder,
  toKlarnaOrderLines,
  InvalidCartError,
  type CartItemInput,
} from "@/lib/order-lines";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      authorizationToken,
      items,
    }: {
      authorizationToken: string;
      items: CartItemInput[];
    } = body;

    if (!authorizationToken) {
      return Response.json(
        { error: "Missing authorization token" },
        { status: 400 }
      );
    }

    // Betrag + Positionen IMMER serverseitig berechnen — Werte vom
    // Client werden bewusst ignoriert.
    let calculation;
    try {
      calculation = calculateOrder(items);
    } catch (err) {
      if (err instanceof InvalidCartError) {
        return Response.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    // Produkt-IDs in merchant_data ablegen, damit Webhook/Fulfillment
    // die digitalen Produkte später zuordnen können.
    const merchantData: MerchantData = {
      items: calculation.orderLines
        .filter((l) => l.productId)
        .map((l) => ({ productId: l.productId as string, quantity: l.quantity })),
    };

    // merchant_urls erfordern HTTPS — auf der sslip.io-HTTP-Preview
    // weglassen (Fulfillment läuft ohnehin synchron direkt unten).
    // Der key-Parameter authentifiziert eingehende Notifications
    // (Klarna signiert Push-Notifications nicht).
    const webhookKey = process.env.KLARNA_WEBHOOK_SECRET
      ? `&key=${encodeURIComponent(process.env.KLARNA_WEBHOOK_SECRET)}`
      : "";
    const merchantUrls = SITE_URL.startsWith("https://")
      ? {
          confirmation: `${SITE_URL}/bestellung/erfolgreich?order_id={order.id}`,
          notification: `${SITE_URL}/api/webhook/klarna?klarna_order_id={order.id}${webhookKey}`,
        }
      : undefined;

    // Create the actual order using the authorization token
    const order = await klarnaFetch(
      `/payments/v1/authorizations/${authorizationToken}/order`,
      {
        method: "POST",
        body: JSON.stringify({
          purchase_country: "DE",
          purchase_currency: "EUR",
          locale: "de-DE",
          order_amount: calculation.totalAmount,
          order_tax_amount: 0,
          order_lines: toKlarnaOrderLines(calculation.orderLines),
          merchant_data: JSON.stringify(merchantData),
          ...(merchantUrls ? { merchant_urls: merchantUrls } : {}),
        }),
      }
    );

    console.log(
      `Klarna-Bestellung angelegt: ${order.order_id} (fraud: ${order.fraud_status})`
    );

    // Von Klarna abgelehnte Bestellungen dürfen NICHT als Erfolg
    // zurückgehen — der Kunde soll eine andere Zahlungsart wählen.
    if (order.fraud_status === "REJECTED") {
      return Response.json(
        {
          error:
            "Die Zahlung wurde von Klarna abgelehnt. Bitte wähle eine andere Zahlungsart.",
        },
        { status: 402 }
      );
    }

    // Zahlung einziehen + Bestätigungsmails — synchron, damit nichts
    // verloren geht. Fehler hier dürfen die Bestellung nicht abbrechen:
    // die Zahlung ist autorisiert, der Webhook dient als Backup.
    // (Bei fraud_status PENDING zieht Klarna die Entscheidung nach —
    // processKlarnaOrder verarbeitet nur AUTHORIZED-Bestellungen.)
    try {
      await processKlarnaOrder(order.order_id);
    } catch (err) {
      console.error(
        `Nachgelagerte Verarbeitung für ${order.order_id} fehlgeschlagen (Webhook übernimmt):`,
        err
      );
    }

    return Response.json({
      success: true,
      orderId: order.order_id,
      redirectUrl: order.redirect_url,
    });
  } catch (err) {
    console.error("Klarna authorize error:", err);
    return Response.json(
      { error: "Bestellung konnte nicht abgeschlossen werden" },
      { status: 500 }
    );
  }
}
