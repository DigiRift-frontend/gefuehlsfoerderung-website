import { klarnaFetch } from "@/lib/klarna";
import { fulfillOrder, type FulfillmentResult } from "@/lib/fulfillment";
import type { EmailAddress, OrderEmailItem } from "@/lib/order-emails";

// Gemeinsame Klarna-Order-Verarbeitung für die Authorize-Route (synchron
// direkt nach Bestellanlage) und den Notification-Webhook (Backup).
// Idempotent: bereits eingezogene Bestellungen werden nicht erneut
// verarbeitet.

type KlarnaAddress = {
  given_name?: string;
  family_name?: string;
  email?: string;
  street_address?: string;
  street_address2?: string;
  postal_code?: string;
  city?: string;
  country?: string;
};

type KlarnaOmOrder = {
  order_id: string;
  status: string; // AUTHORIZED | PART_CAPTURED | CAPTURED | CANCELLED | EXPIRED | CLOSED
  order_amount: number;
  captured_amount?: number;
  remaining_authorized_amount?: number;
  merchant_data?: string;
  billing_address?: KlarnaAddress;
  shipping_address?: KlarnaAddress;
  order_lines?: Array<{
    type?: string;
    name?: string;
    quantity?: number;
    total_amount?: number;
  }>;
};

function toEmailAddress(addr?: KlarnaAddress): EmailAddress | null {
  if (!addr) return null;
  return {
    name: [addr.given_name, addr.family_name].filter(Boolean).join(" "),
    street: [addr.street_address, addr.street_address2]
      .filter(Boolean)
      .join(", "),
    postalCode: addr.postal_code,
    city: addr.city,
    country: addr.country,
  };
}

export type MerchantData = {
  items: { productId: string; quantity: number }[];
};

export function parseMerchantData(raw?: string): MerchantData | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.items)) return parsed as MerchantData;
    return null;
  } catch {
    return null;
  }
}

export type KlarnaProcessResult = {
  processed: boolean; // true = Capture + Fulfillment in diesem Aufruf passiert
  alreadyCaptured: boolean;
  status: string;
  fulfillment?: FulfillmentResult;
};

// Holt die Bestellung aus dem Order-Management, zieht die Zahlung ein
// (Capture) und stößt das Fulfillment an. Sicher mehrfach aufrufbar.
export async function processKlarnaOrder(
  orderId: string
): Promise<KlarnaProcessResult> {
  const order = (await klarnaFetch(
    `/ordermanagement/v1/orders/${orderId}`
  )) as KlarnaOmOrder | null;

  if (!order) {
    throw new Error(`Klarna-Bestellung ${orderId} nicht gefunden`);
  }

  // Bereits verarbeitet? (Capture vorhanden → Fulfillment lief schon)
  if ((order.captured_amount ?? 0) > 0) {
    return {
      processed: false,
      alreadyCaptured: true,
      status: order.status,
    };
  }

  if (order.status !== "AUTHORIZED" && order.status !== "PART_CAPTURED") {
    console.warn(
      `Klarna-Bestellung ${orderId} in Status ${order.status} — keine Verarbeitung`
    );
    return { processed: false, alreadyCaptured: false, status: order.status };
  }

  // 1. Acknowledge (Klarna erwartet das nach Bestellanlage; 204, idempotent
  //    fehlertolerant — bei bereits bestätigter Bestellung wirft Klarna 4xx)
  try {
    await klarnaFetch(`/ordermanagement/v1/orders/${orderId}/acknowledge`, {
      method: "POST",
    });
  } catch (err) {
    // Bereits acknowledged ist normal; andere Fehler sichtbar machen,
    // da sie auf einen ungültigen Order-Status hindeuten können.
    console.warn(`Klarna-Acknowledge für ${orderId}:`, err);
  }

  // 2. Capture über den vollen Betrag
  let captured = false;
  let captureError: string | undefined;
  const captureAmount =
    order.remaining_authorized_amount ?? order.order_amount;
  try {
    await klarnaFetch(`/ordermanagement/v1/orders/${orderId}/captures`, {
      method: "POST",
      body: JSON.stringify({
        captured_amount: captureAmount,
        description: "Bestellung gefühlsförderung.de",
      }),
    });
    captured = true;
  } catch (err) {
    captureError = err instanceof Error ? err.message : "unbekannter Fehler";
    console.error(`Klarna-Capture für ${orderId} fehlgeschlagen:`, err);
  }

  // 3. Fulfillment (Mails, Download-Links)
  const merchantData = parseMerchantData(order.merchant_data);
  const productIds = merchantData?.items.map((i) => i.productId) ?? [];

  const lines = order.order_lines ?? [];
  const items: OrderEmailItem[] = lines
    .filter((l) => l.type !== "shipping_fee")
    .map((l) => ({
      title: l.name ?? "Artikel",
      quantity: l.quantity ?? 1,
      totalAmount: l.total_amount ?? 0,
    }));
  const shippingAmount = lines
    .filter((l) => l.type === "shipping_fee")
    .reduce((sum, l) => sum + (l.total_amount ?? 0), 0);

  const billing = order.billing_address;
  const shipping = order.shipping_address ?? billing;

  const fulfillment = await fulfillOrder({
    provider: "klarna",
    providerOrderId: orderId,
    items,
    shippingAmount,
    totalAmount: order.order_amount,
    hasPhysical: shippingAmount > 0,
    productIds,
    customerEmail: billing?.email ?? shipping?.email ?? null,
    customerFirstName: billing?.given_name ?? shipping?.given_name,
    customerName: [
      billing?.given_name ?? shipping?.given_name,
      billing?.family_name ?? shipping?.family_name,
    ]
      .filter(Boolean)
      .join(" "),
    shippingAddress: toEmailAddress(shipping),
    billingAddress: toEmailAddress(billing),
    captured,
    captureError,
  });

  return {
    processed: true,
    alreadyCaptured: false,
    status: order.status,
    fulfillment,
  };
}
