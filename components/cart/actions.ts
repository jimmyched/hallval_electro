"use server";

import { cookies } from "next/headers";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCartLine,
} from "@/lib/shopify";
import type { Cart } from "@/lib/shopify/types";

const CART_COOKIE = "cartId";

async function getOrCreateCartId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CART_COOKIE)?.value;
  if (existing) {
    const cart = await getCart(existing);
    if (cart) return existing;
  }
  const cart = await createCart();
  cookieStore.set(CART_COOKIE, cart.id, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return cart.id;
}

export type CartActionResult =
  | { ok: true; cart: Cart }
  | { ok: false; error: "cart_error" };

export async function addItemAction(
  variantId: string,
  quantity: number,
): Promise<CartActionResult> {
  try {
    const cartId = await getOrCreateCartId();
    const cart = await addToCart(cartId, variantId, quantity);
    return { ok: true, cart };
  } catch {
    return { ok: false, error: "cart_error" };
  }
}

export async function updateItemAction(
  lineId: string,
  quantity: number,
): Promise<CartActionResult> {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE)?.value;
    if (!cartId) return { ok: false, error: "cart_error" };
    const cart = await updateCartLine(cartId, lineId, quantity);
    return { ok: true, cart };
  } catch {
    return { ok: false, error: "cart_error" };
  }
}

export async function removeItemAction(
  lineId: string,
): Promise<CartActionResult> {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE)?.value;
    if (!cartId) return { ok: false, error: "cart_error" };
    const cart = await removeFromCart(cartId, lineId);
    return { ok: true, cart };
  } catch {
    return { ok: false, error: "cart_error" };
  }
}

export async function getInitialCart(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  try {
    return await getCart(cartId);
  } catch {
    return null;
  }
}
