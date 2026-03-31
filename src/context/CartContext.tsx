"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type CartItem,
  addItem,
  removeItem,
  updateQuantity,
  getCartTotal,
  getCartCount,
} from "@/lib/cart";

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  mounted: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "gefuehlsfoerderung-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setMounted(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const addToCart = useCallback(
    (productId: string) => setItems((prev) => addItem(prev, productId)),
    []
  );
  const removeFromCart = useCallback(
    (productId: string) => setItems((prev) => removeItem(prev, productId)),
    []
  );
  const setQuantity = useCallback(
    (productId: string, qty: number) =>
      setItems((prev) => updateQuantity(prev, productId, qty)),
    []
  );
  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
        cartCount: getCartCount(items),
        cartTotal: getCartTotal(items),
        isCartOpen,
        setCartOpen,
        mounted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
