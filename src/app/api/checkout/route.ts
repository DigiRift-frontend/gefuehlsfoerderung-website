import { klarnaFetch } from "@/lib/klarna";
import {
  calculateOrder,
  toKlarnaOrderLines,
  InvalidCartError,
  type CartItemInput,
} from "@/lib/order-lines";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: CartItemInput[] = body.items;

    let calculation;
    try {
      calculation = calculateOrder(items);
    } catch (err) {
      if (err instanceof InvalidCartError) {
        return Response.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    // Create Klarna Payments session
    const session = await klarnaFetch("/payments/v1/sessions", {
      method: "POST",
      body: JSON.stringify({
        purchase_country: "DE",
        purchase_currency: "EUR",
        locale: "de-DE",
        order_amount: calculation.totalAmount,
        order_tax_amount: 0,
        order_lines: toKlarnaOrderLines(calculation.orderLines),
      }),
    });

    return Response.json({
      clientToken: session.client_token,
      sessionId: session.session_id,
      paymentMethods: session.payment_method_categories,
      orderAmount: calculation.totalAmount,
    });
  } catch (err) {
    console.error("Klarna session error:", err);
    return Response.json(
      { error: "Checkout konnte nicht erstellt werden" },
      { status: 500 }
    );
  }
}
