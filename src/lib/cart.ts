import { products, type Product } from "./products";

export type CartItem = {
  productId: string;
  quantity: number;
};

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function addItem(items: CartItem[], productId: string): CartItem[] {
  const existing = items.find((i) => i.productId === productId);
  const product = getProduct(productId);
  if (!product) return items;

  // Digital products: max quantity 1
  if (product.type === "digital" && existing) return items;

  if (existing) {
    return items.map((i) =>
      i.productId === productId
        ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
        : i
    );
  }
  return [...items, { productId, quantity: 1 }];
}

export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

export function updateQuantity(
  items: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) return removeItem(items, productId);
  return items.map((i) =>
    i.productId === productId ? { ...i, quantity: Math.min(quantity, 10) } : i
  );
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function hasPhysicalItems(items: CartItem[]): boolean {
  return items.some((item) => {
    const product = getProduct(item.productId);
    return product?.type === "physical" || product?.type === "mixed";
  });
}
