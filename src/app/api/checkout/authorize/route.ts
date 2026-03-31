import { klarnaFetch } from "@/lib/klarna";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      authorizationToken,
      items,
      orderAmount,
      orderLines,
    }: {
      authorizationToken: string;
      items: { productId: string; quantity: number }[];
      orderAmount: number;
      orderLines: unknown[];
    } = body;

    if (!authorizationToken) {
      return Response.json(
        { error: "Missing authorization token" },
        { status: 400 }
      );
    }

    // Create the actual order using the authorization token
    const order = await klarnaFetch(
      `/payments/v1/authorizations/${authorizationToken}/order`,
      {
        method: "POST",
        body: JSON.stringify({
          purchase_country: "DE",
          purchase_currency: "EUR",
          locale: "de-DE",
          order_amount: orderAmount,
          order_tax_amount: 0,
          order_lines: orderLines,
        }),
      }
    );

    console.log("=== KLARNA ORDER CREATED ===");
    console.log("Order ID:", order.order_id);
    console.log("Fraud Status:", order.fraud_status);
    console.log("Redirect URL:", order.redirect_url);
    console.log("============================");

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
