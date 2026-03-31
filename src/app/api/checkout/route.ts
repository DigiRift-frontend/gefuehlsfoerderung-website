import { klarnaFetch } from "@/lib/klarna";
import { products } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: { productId: string; quantity: number }[] = body.items;

    if (!items?.length) {
      return Response.json({ error: "Warenkorb ist leer" }, { status: 400 });
    }

    const orderLines = [];
    let totalAmount = 0;
    let hasPhysical = false;

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product || !product.inStock) {
        return Response.json(
          { error: `Produkt nicht verfügbar: ${item.productId}` },
          { status: 400 }
        );
      }

      const qty = Math.min(Math.max(item.quantity, 1), 10);
      const unitPrice = Math.round(product.price * 100);
      const lineTotal = unitPrice * qty;
      totalAmount += lineTotal;

      if (product.type === "physical" || product.type === "mixed") {
        hasPhysical = true;
      }

      orderLines.push({
        type: product.type === "digital" ? "digital" : "physical",
        name: product.title,
        quantity: qty,
        unit_price: unitPrice,
        total_amount: lineTotal,
        tax_rate: 0,
        total_tax_amount: 0,
      });
    }

    if (hasPhysical) {
      const shippingAmount = 499;
      totalAmount += shippingAmount;
      orderLines.push({
        type: "shipping_fee" as const,
        name: "Standardversand (2–5 Werktage)",
        quantity: 1,
        unit_price: shippingAmount,
        total_amount: shippingAmount,
        tax_rate: 0,
        total_tax_amount: 0,
      });
    }

    // Create Klarna Payments session
    const session = await klarnaFetch("/payments/v1/sessions", {
      method: "POST",
      body: JSON.stringify({
        purchase_country: "DE",
        purchase_currency: "EUR",
        locale: "de-DE",
        order_amount: totalAmount,
        order_tax_amount: 0,
        order_lines: orderLines,
        // merchant_urls require HTTPS, added when deployed to production
      }),
    });

    return Response.json({
      clientToken: session.client_token,
      sessionId: session.session_id,
      paymentMethods: session.payment_method_categories,
      orderAmount: totalAmount,
      orderLines,
    });
  } catch (err) {
    console.error("Klarna session error:", err);
    return Response.json(
      { error: "Checkout konnte nicht erstellt werden" },
      { status: 500 }
    );
  }
}
