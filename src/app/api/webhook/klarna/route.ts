import { klarnaFetch } from "@/lib/klarna";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get("klarna_order_id");

    if (!orderId) {
      return Response.json({ error: "Missing order ID" }, { status: 400 });
    }

    // Fetch order details from Klarna
    const order = await klarnaFetch(
      `/ordermanagement/v1/orders/${orderId}`
    );

    console.log("=== KLARNA ORDER PUSH ===");
    console.log("Order ID:", order.order_id);
    console.log("Status:", order.status);
    console.log("Email:", order.billing_address?.email);
    console.log("Amount:", order.order_amount);
    console.log("Items:", order.order_lines?.map((l: { name: string }) => l.name));
    console.log("==========================");

    // Acknowledge the order
    if (order.status === "AUTHORIZED") {
      await klarnaFetch(
        `/ordermanagement/v1/orders/${orderId}/acknowledge`,
        { method: "POST" }
      );
      console.log("Order acknowledged:", orderId);
    }

    // TODO: Send order confirmation email via DigiLetter
    // TODO: For digital products, send download links
    // TODO: For physical products, trigger shipping + capture payment

    return Response.json({ received: true });
  } catch (err) {
    console.error("Klarna webhook error:", err);
    return Response.json({ error: "Webhook error" }, { status: 500 });
  }
}
