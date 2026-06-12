import { paypalFetch, parsePayPalOrder } from "@/lib/paypal";
import { fulfillOrder } from "@/lib/fulfillment";
import { products } from "@/lib/products";

export type PayPalCaptureResult = {
  success: boolean;
  alreadyCaptured: boolean;
  orderID?: string;
  error?: string;
};

// Kapselt Capture + Fulfillment für eine approved PayPal-Order.
// Wird von der API-Route (Client-Flow) UND der Redirect-Landing-Page
// (/bestellung/erfolgreich?paypal=true&token=...) verwendet.
// Idempotent: ORDER_ALREADY_CAPTURED gilt als Erfolg, löst aber kein
// zweites Fulfillment aus (Mails wurden beim ersten Capture verschickt).
export async function capturePayPalOrderAndFulfill(
  orderID: string
): Promise<PayPalCaptureResult> {
  if (!orderID || !/^[A-Za-z0-9-]{5,40}$/.test(orderID)) {
    return { success: false, alreadyCaptured: false, error: "Ungültige Order-ID" };
  }

  // 1. Bestelldetails VOR dem Capture holen (Käufer, Artikel, Adresse)
  const detailsRes = await paypalFetch(`/v2/checkout/orders/${orderID}`);
  const details = parsePayPalOrder(detailsRes.data);

  if (detailsRes.status >= 400 || !details) {
    console.error("PayPal order lookup failed:", detailsRes.status);
    return {
      success: false,
      alreadyCaptured: false,
      error: "Bestellung nicht gefunden",
    };
  }

  let alreadyCaptured = false;

  if (details.status === "COMPLETED") {
    // Seite neu geladen o. Ä. — Zahlung ist schon durch. Fulfillment
    // trotzdem anstoßen: der Lock in fulfillOrder() verhindert Doppel-
    // Mails, fängt aber den Fall ab, dass der erste Versuch abstürzte.
    alreadyCaptured = true;
  } else {
    // 2. Capture
    const captureRes = await paypalFetch(
      `/v2/checkout/orders/${orderID}/capture`,
      { method: "POST" }
    );

    const captureData = captureRes.data as {
      status?: string;
      details?: Array<{ issue?: string }>;
    };

    if (
      captureData?.details?.some((d) => d.issue === "ORDER_ALREADY_CAPTURED")
    ) {
      alreadyCaptured = true;
    } else if (captureRes.status >= 400 || captureData?.status !== "COMPLETED") {
      console.error(
        "PayPal capture failed:",
        captureRes.status,
        JSON.stringify(captureRes.data).slice(0, 500)
      );
      return {
        success: false,
        alreadyCaptured: false,
        error: "Zahlung konnte nicht abgeschlossen werden",
      };
    } else {
      console.log(
        `PayPal-Bestellung eingezogen: ${orderID} (${details.payerEmail})`
      );
    }
  }

  // 3. Fulfillment — Artikel/Beträge direkt aus der PayPal-Order (das ist
  //    exakt, was der Kunde autorisiert hat). Produkt-Titel werden, wo
  //    möglich, aus unserem Katalog aufgelöst (SKU = Produkt-ID).
  try {
    const emailItems = details.items.map((item) => ({
      title:
        products.find((p) => p.id === item.productId)?.title ?? item.name,
      quantity: item.quantity,
      totalAmount: item.totalAmountCents,
    }));

    const hasPhysical =
      details.shippingAmountCents > 0 ||
      details.items.some((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product?.type === "physical" || product?.type === "mixed";
      });

    await fulfillOrder({
      provider: "paypal",
      providerOrderId: orderID,
      items: emailItems,
      shippingAmount: details.shippingAmountCents,
      totalAmount: details.totalAmountCents,
      hasPhysical,
      productIds: details.productIds,
      customerEmail: details.payerEmail,
      customerFirstName: details.payerGivenName ?? undefined,
      customerName: details.payerFullName ?? undefined,
      shippingAddress: details.shippingAddress,
      captured: true,
    });
  } catch (err) {
    // Zahlung ist durch — Fulfillment-Fehler nur loggen.
    console.error(`PayPal-Fulfillment für ${orderID} fehlgeschlagen:`, err);
  }

  return { success: true, alreadyCaptured, orderID };
}
