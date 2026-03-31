import { products } from "@/lib/products";

const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

async function getAccessToken() {
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

  const data = await res.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: { productId: string; quantity: number }[] = body.items;

    if (!items?.length) {
      return Response.json({ error: "Warenkorb ist leer" }, { status: 400 });
    }

    // Calculate total server-side
    let total = 0;
    const paypalItems = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product || !product.inStock) {
        return Response.json(
          { error: `Produkt nicht verfügbar: ${item.productId}` },
          { status: 400 }
        );
      }
      const qty = Math.min(Math.max(item.quantity, 1), 10);
      total += product.price * qty;
      paypalItems.push({
        name: product.title,
        quantity: String(qty),
        unit_amount: {
          currency_code: "EUR",
          value: product.price.toFixed(2),
        },
      });
    }

    const accessToken = await getAccessToken();

    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "EUR",
                  value: total.toFixed(2),
                },
              },
            },
            items: paypalItems,
          },
        ],
        application_context: {
          return_url: `${SITE_URL}/bestellung/erfolgreich?paypal=true`,
          cancel_url: `${SITE_URL}/bestellung/abgebrochen`,
          brand_name: "Gefühlsförderung",
          locale: "de-DE",
          user_action: "PAY_NOW",
        },
      }),
    });

    const order = await res.json();

    const approveUrl = order.links?.find(
      (l: { rel: string }) => l.rel === "approve"
    )?.href;

    return Response.json({ orderID: order.id, approveUrl });
  } catch (err) {
    console.error("PayPal create order error:", err);
    return Response.json(
      { error: "PayPal-Bestellung konnte nicht erstellt werden" },
      { status: 500 }
    );
  }
}
