import { capturePayPalOrderAndFulfill } from "@/lib/paypal-capture";

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    if (!orderID) {
      return Response.json({ error: "Missing orderID" }, { status: 400 });
    }

    const result = await capturePayPalOrderAndFulfill(orderID);

    if (!result.success) {
      return Response.json(
        { error: result.error ?? "Payment not completed" },
        { status: 400 }
      );
    }

    return Response.json({ success: true, orderID: result.orderID });
  } catch (err) {
    console.error("PayPal capture error:", err);
    return Response.json(
      { error: "PayPal-Zahlung konnte nicht abgeschlossen werden" },
      { status: 500 }
    );
  }
}
