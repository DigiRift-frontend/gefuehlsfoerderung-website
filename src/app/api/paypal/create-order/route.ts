import { paypalFetch } from "@/lib/paypal";
import {
  calculateOrder,
  InvalidCartError,
  type CartItemInput,
} from "@/lib/order-lines";
import { products } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

function euro(cents: number): string {
  return (cents / 100).toFixed(2);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: CartItemInput[] = body.items;

    // Beträge serverseitig berechnen (inkl. Versand für physische Artikel —
    // identisch zur Klarna-Kasse).
    let calculation;
    try {
      calculation = calculateOrder(items);
    } catch (err) {
      if (err instanceof InvalidCartError) {
        return Response.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    const paypalItems = calculation.orderLines
      .filter((line) => line.type !== "shipping_fee")
      .map((line) => {
        const product = products.find((p) => p.id === line.productId);
        return {
          name: line.name.slice(0, 127),
          sku: line.productId, // Produkt-ID für das Fulfillment
          quantity: String(line.quantity),
          category:
            product?.type === "digital" ? "DIGITAL_GOODS" : "PHYSICAL_GOODS",
          unit_amount: {
            currency_code: "EUR",
            value: euro(line.unit_price),
          },
        };
      });

    const { status, data } = await paypalFetch("/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: euro(calculation.totalAmount),
              breakdown: {
                item_total: {
                  currency_code: "EUR",
                  value: euro(calculation.itemAmount),
                },
                shipping: {
                  currency_code: "EUR",
                  value: euro(calculation.shippingAmount),
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
          shipping_preference: calculation.hasPhysical
            ? "GET_FROM_FILE"
            : "NO_SHIPPING",
        },
      }),
    });

    const order = data as {
      id?: string;
      links?: { rel: string; href: string }[];
    };

    if (status >= 400 || !order?.id) {
      console.error("PayPal create order failed:", status, JSON.stringify(data).slice(0, 500));
      return Response.json(
        { error: "PayPal-Bestellung konnte nicht erstellt werden" },
        { status: 502 }
      );
    }

    const approveUrl = order.links?.find((l) => l.rel === "approve")?.href;

    return Response.json({ orderID: order.id, approveUrl });
  } catch (err) {
    console.error("PayPal create order error:", err);
    return Response.json(
      { error: "PayPal-Bestellung konnte nicht erstellt werden" },
      { status: 500 }
    );
  }
}
