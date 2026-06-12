// Server-seitige PayPal-Helfer (Orders v2 API).

const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? "";
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET ?? "";
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth error: ${res.status}`);
  }
  const data = await res.json();
  return data.access_token;
}

export async function paypalFetch(
  path: string,
  options: RequestInit = {}
): Promise<{ status: number; data: unknown }> {
  const accessToken = await getPayPalAccessToken();
  const res = await fetch(`${PAYPAL_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  return { status: res.status, data };
}

type PayPalOrderDetails = {
  id: string;
  status: string;
  payerEmail: string | null;
  payerGivenName: string | null;
  payerFullName: string | null;
  productIds: string[];
  items: {
    productId: string;
    name: string;
    quantity: number;
    totalAmountCents: number;
  }[];
  totalAmountCents: number;
  shippingAmountCents: number;
  shippingAddress: {
    name?: string;
    street?: string;
    postalCode?: string;
    city?: string;
    country?: string;
  } | null;
};

function toCents(value?: string): number {
  const parsed = Number.parseFloat(value ?? "0");
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
}

// Liest Bestelldetails (Käufer, Artikel, Beträge, Lieferadresse) aus
// einer PayPal-Order. SKU = unsere Produkt-ID (beim Erstellen gesetzt).
// Beträge kommen bewusst aus der PayPal-Order selbst — das ist exakt
// das, was der Kunde autorisiert hat (kein Drift bei Preisänderungen).
export function parsePayPalOrder(raw: unknown): PayPalOrderDetails | null {
  const order = raw as {
    id?: string;
    status?: string;
    payer?: {
      email_address?: string;
      name?: { given_name?: string; surname?: string };
    };
    purchase_units?: Array<{
      amount?: {
        value?: string;
        breakdown?: { shipping?: { value?: string } };
      };
      items?: Array<{
        sku?: string;
        name?: string;
        quantity?: string;
        unit_amount?: { value?: string };
      }>;
      shipping?: {
        name?: { full_name?: string };
        address?: {
          address_line_1?: string;
          address_line_2?: string;
          postal_code?: string;
          admin_area_2?: string;
          country_code?: string;
        };
      };
    }>;
  };

  if (!order?.id) return null;

  const unit = order.purchase_units?.[0];
  const items = (unit?.items ?? [])
    .filter((i) => i.sku)
    .map((i) => {
      const quantity = Math.max(parseInt(i.quantity ?? "1", 10) || 1, 1);
      return {
        productId: i.sku as string,
        name: i.name ?? (i.sku as string),
        quantity,
        totalAmountCents: toCents(i.unit_amount?.value) * quantity,
      };
    });

  const addr = unit?.shipping?.address;
  const shippingAddress = addr
    ? {
        name: unit?.shipping?.name?.full_name,
        street: [addr.address_line_1, addr.address_line_2]
          .filter(Boolean)
          .join(", "),
        postalCode: addr.postal_code,
        city: addr.admin_area_2,
        country: addr.country_code,
      }
    : null;

  const given = order.payer?.name?.given_name ?? null;
  const surname = order.payer?.name?.surname ?? "";

  return {
    id: order.id,
    status: order.status ?? "",
    payerEmail: order.payer?.email_address ?? null,
    payerGivenName: given,
    payerFullName: given ? `${given} ${surname}`.trim() : null,
    productIds: items.map((i) => i.productId),
    items,
    totalAmountCents: toCents(unit?.amount?.value),
    shippingAmountCents: toCents(unit?.amount?.breakdown?.shipping?.value),
    shippingAddress,
  };
}
