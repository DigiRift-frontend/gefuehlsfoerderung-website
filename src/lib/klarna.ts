const KLARNA_API =
  process.env.KLARNA_MODE === "live"
    ? "https://api.klarna.com"
    : "https://api.playground.klarna.com";

function getAuth() {
  const username = process.env.KLARNA_USERNAME ?? "";
  const password = process.env.KLARNA_PASSWORD ?? "";
  return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
}

export async function klarnaFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${KLARNA_API}${path}`, {
    ...options,
    headers: {
      Authorization: getAuth(),
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(`Klarna API error [${res.status}]:`, error);
    throw new Error(`Klarna API error: ${res.status}`);
  }

  return res.json();
}
