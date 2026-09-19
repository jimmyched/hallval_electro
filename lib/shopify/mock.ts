import { MOCK_CHECKOUT_URL } from "./constants";
import type { Cart, CartLine, Product, ProductVariant } from "./types";

/**
 * Mock storefront used when Shopify credentials are not configured.
 * The product mirrors the shape returned by the Storefront API so the
 * rest of the app is agnostic to which backend is active.
 */

const EUR = "EUR";

export const mockProduct: Product = {
  id: "gid://mock/Product/albea",
  handle: "albea",
  title: "Albea Pulse",
  description:
    "Open foot wrap concept with four integrated electrode positions to explore activation of the abductor hallucis.",
  availableForSale: true,
  price: { amount: "150.0", currencyCode: EUR },
  images: [
    {
      url: "/images/wrap-approved.webp",
      altText: "Approved Albea Pulse slim open wrap with four round modules, worn on a foot",
      width: 1536,
      height: 1024,
    },
    {
      url: "/images/gallery-studio-sage.webp",
      altText: "Albea Pulse open foot wrap, elevated view on a sage background",
      width: 1536,
      height: 1024,
    },
    {
      url: "/images/lifestyle-wrap-woman.webp",
      altText: "Illustrative lifestyle scene",
      width: 1536,
      height: 1024,
    },
    {
      url: "/images/gallery-morning-reading.webp",
      altText: "Man reading on a sofa in cool morning light wearing Albea Pulse",
      width: 1536,
      height: 1024,
    },
    {
      url: "/images/gallery-evening-pause.webp",
      altText: "Older man relaxing with Albea Pulse in warm evening lamplight",
      width: 1536,
      height: 1024,
    },
  ],
  variants: [
    {
      id: "gid://mock/ProductVariant/albea-s",
      title: "S (EU 35–37)",
      availableForSale: true,
      price: { amount: "150.0", currencyCode: EUR },
    },
    {
      id: "gid://mock/ProductVariant/albea-m",
      title: "M (EU 38–40)",
      availableForSale: true,
      price: { amount: "150.0", currencyCode: EUR },
    },
    {
      id: "gid://mock/ProductVariant/albea-l",
      title: "L (EU 41–43)",
      availableForSale: true,
      price: { amount: "150.0", currencyCode: EUR },
    },
    {
      id: "gid://mock/ProductVariant/albea-xl",
      title: "XL (EU 44–47)",
      availableForSale: true,
      price: { amount: "150.0", currencyCode: EUR },
    },
  ],
};

function findVariant(variantId: string): ProductVariant | undefined {
  return mockProduct.variants.find((v) => v.id === variantId);
}

// In-memory cart store. Lives for the duration of the server process,
// which is enough for local development and demos.
const demoGlobal = globalThis as typeof globalThis & {
  albeaDemoCarts?: Map<string, Cart>;
};
const carts = (demoGlobal.albeaDemoCarts ??= new Map<string, Cart>());

function computeTotals(cart: Cart): Cart {
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + parseFloat(line.cost.totalAmount.amount),
    0,
  );
  return {
    ...cart,
    totalQuantity: cart.lines.reduce((sum, line) => sum + line.quantity, 0),
    cost: {
      subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: EUR },
    },
  };
}

function makeLine(variantId: string, quantity: number): CartLine {
  const variant = findVariant(variantId);
  if (!variant) {
    throw new Error(`Unknown variant: ${variantId}`);
  }
  const total = parseFloat(variant.price.amount) * quantity;
  return {
    id: `mock-line-${variantId}`,
    quantity,
    merchandise: {
      id: variant.id,
      title: variant.title,
      product: {
        title: mockProduct.title,
        handle: mockProduct.handle,
        image: mockProduct.images[0],
      },
    },
    cost: {
      totalAmount: { amount: total.toFixed(2), currencyCode: EUR },
    },
  };
}

export function mockCreateCart(): Cart {
  const id = `mock-cart-${Math.random().toString(36).slice(2, 10)}`;
  const cart: Cart = {
    id,
    checkoutUrl: MOCK_CHECKOUT_URL,
    totalQuantity: 0,
    lines: [],
    cost: { subtotalAmount: { amount: "0.00", currencyCode: EUR } },
  };
  carts.set(id, cart);
  return cart;
}

export function mockGetCart(cartId: string): Cart | null {
  return carts.get(cartId) ?? null;
}

export function mockAddToCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Cart {
  const cart = carts.get(cartId) ?? mockCreateCart();
  const existing = cart.lines.find((l) => l.merchandise.id === variantId);
  const newQuantity = (existing?.quantity ?? 0) + quantity;
  const lines = cart.lines.filter((l) => l.merchandise.id !== variantId);
  lines.push(makeLine(variantId, newQuantity));
  const updated = computeTotals({ ...cart, lines });
  carts.set(cart.id, updated);
  return updated;
}

export function mockUpdateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Cart {
  const cart = carts.get(cartId);
  if (!cart) throw new Error(`Unknown cart: ${cartId}`);
  const lines = cart.lines
    .map((line) => {
      if (line.id !== lineId) return line;
      if (quantity <= 0) return null;
      return makeLine(line.merchandise.id, quantity);
    })
    .filter((l): l is CartLine => l !== null);
  const updated = computeTotals({ ...cart, lines });
  carts.set(cart.id, updated);
  return updated;
}

export function mockRemoveFromCart(cartId: string, lineId: string): Cart {
  return mockUpdateCartLine(cartId, lineId, 0);
}
