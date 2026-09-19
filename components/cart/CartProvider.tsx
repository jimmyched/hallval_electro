"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/shopify/types";
import {
  addItemAction,
  removeItemAction,
  updateItemAction,
  type CartActionResult,
} from "./actions";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  /** Line id currently being updated/removed, if any. */
  pendingLineId: string | null;
  /** Set when the last cart operation failed; cleared on the next one. */
  hasError: boolean;
  addItem: (variantId: string, quantity: number) => Promise<boolean>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingLineId, setPendingLineId] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const applyResult = useCallback((result: CartActionResult): boolean => {
    if (result.ok) {
      setCart(result.cart);
      setHasError(false);
      return true;
    }
    setHasError(true);
    return false;
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      setHasError(false);
      const ok = applyResult(await addItemAction(variantId, quantity));
      if (ok) setIsOpen(true);
      return ok;
    },
    [applyResult],
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      setHasError(false);
      setPendingLineId(lineId);
      try {
        applyResult(await updateItemAction(lineId, quantity));
      } finally {
        setPendingLineId(null);
      }
    },
    [applyResult],
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      setHasError(false);
      setPendingLineId(lineId);
      try {
        applyResult(await removeItemAction(lineId));
      } finally {
        setPendingLineId(null);
      }
    },
    [applyResult],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        pendingLineId,
        hasError,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
