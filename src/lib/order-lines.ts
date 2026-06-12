import { products } from "@/lib/products";

// Gemeinsame, serverseitige Bestell-Berechnung für Klarna UND PayPal.
// Preise kommen IMMER aus products.ts — niemals vom Client.

export const SHIPPING_AMOUNT_CENTS = 499;
export const MAX_QUANTITY = 10;

export type CartItemInput = { productId: string; quantity: number };

export type OrderLine = {
  type: "physical" | "digital" | "shipping_fee";
  productId?: string;
  name: string;
  quantity: number;
  unit_price: number; // Cent
  total_amount: number; // Cent
  tax_rate: number;
  total_tax_amount: number;
};

export type OrderCalculation = {
  orderLines: OrderLine[];
  itemAmount: number; // Cent, ohne Versand
  shippingAmount: number; // Cent
  totalAmount: number; // Cent
  hasPhysical: boolean;
  hasDigital: boolean;
};

export class InvalidCartError extends Error {}

export function calculateOrder(items: CartItemInput[]): OrderCalculation {
  if (!Array.isArray(items) || items.length === 0) {
    throw new InvalidCartError("Warenkorb ist leer");
  }

  const orderLines: OrderLine[] = [];
  let itemAmount = 0;
  let hasPhysical = false;
  let hasDigital = false;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product || !product.inStock) {
      throw new InvalidCartError(`Produkt nicht verfügbar: ${item.productId}`);
    }

    const qty = Math.min(Math.max(Math.trunc(item.quantity) || 1, 1), MAX_QUANTITY);
    const unitPrice = Math.round(product.price * 100);
    const lineTotal = unitPrice * qty;
    itemAmount += lineTotal;

    if (product.type === "physical" || product.type === "mixed") {
      hasPhysical = true;
    }
    if (product.type === "digital" || product.type === "mixed") {
      hasDigital = true;
    }

    orderLines.push({
      type: product.type === "digital" ? "digital" : "physical",
      productId: product.id,
      name: product.title,
      quantity: qty,
      unit_price: unitPrice,
      total_amount: lineTotal,
      tax_rate: 0,
      total_tax_amount: 0,
    });
  }

  const shippingAmount = hasPhysical ? SHIPPING_AMOUNT_CENTS : 0;
  if (hasPhysical) {
    orderLines.push({
      type: "shipping_fee",
      name: "Standardversand (2–5 Werktage)",
      quantity: 1,
      unit_price: shippingAmount,
      total_amount: shippingAmount,
      tax_rate: 0,
      total_tax_amount: 0,
    });
  }

  return {
    orderLines,
    itemAmount,
    shippingAmount,
    totalAmount: itemAmount + shippingAmount,
    hasPhysical,
    hasDigital,
  };
}

// Klarna erwartet die Lines ohne unser internes productId-Feld
export function toKlarnaOrderLines(lines: OrderLine[]) {
  return lines.map(({ productId: _productId, ...line }) => line);
}
