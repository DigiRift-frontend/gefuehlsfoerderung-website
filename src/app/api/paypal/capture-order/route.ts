const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

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
    const { orderID } = await request.json();

    if (!orderID) {
      return Response.json({ error: "Missing orderID" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const res = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.status === "COMPLETED") {
      console.log("=== PAYPAL ORDER COMPLETED ===");
      console.log("Order ID:", data.id);
      console.log("Payer:", data.payer?.email_address);
      console.log("Amount:", data.purchase_units?.[0]?.payments?.captures?.[0]?.amount);
      console.log("==============================");

      return Response.json({ success: true, orderID: data.id });
    }

    return Response.json(
      { error: "Payment not completed", status: data.status },
      { status: 400 }
    );
  } catch (err) {
    console.error("PayPal capture error:", err);
    return Response.json(
      { error: "PayPal-Zahlung konnte nicht abgeschlossen werden" },
      { status: 500 }
    );
  }
}
