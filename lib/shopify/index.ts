import "server-only";

import type { Cart, Product } from "./types";
import {
  mockAddToCart,
  mockCreateCart,
  mockGetCart,
  mockProduct,
  mockRemoveFromCart,
  mockUpdateCartLine,
} from "./mock";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const PRODUCT_HANDLE = process.env.SHOPIFY_PRODUCT_HANDLE ?? "albea";
const API_VERSION = "2025-01";

// This presentation build always stays offline, even if credentials exist.
export const isShopifyConfigured = false;

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(
      `Shopify API error: ${json.errors.map((e: { message: string }) => e.message).join(", ")}`,
    );
  }
  return json.data as T;
}

/* ------------------------------- Fragments ------------------------------- */

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

/* eslint-disable @typescript-eslint/no-explicit-any */
function reshapeCart(cart: any): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: cart.cost,
    lines: cart.lines.edges.map(({ node }: any) => ({
      id: node.id,
      quantity: node.quantity,
      cost: node.cost,
      merchandise: {
        id: node.merchandise.id,
        title: node.merchandise.title,
        product: {
          title: node.merchandise.product.title,
          handle: node.merchandise.product.handle,
          image: node.merchandise.product.featuredImage,
        },
      },
    })),
  };
}

function reshapeProduct(product: any): Product {
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    availableForSale: product.availableForSale,
    price: product.priceRange.minVariantPrice,
    images: product.images.edges.map(({ node }: any) => node),
    variants: product.variants.edges.map(({ node }: any) => node),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ------------------------------- Operations ------------------------------ */

export async function getProduct(): Promise<Product> {
  if (!isShopifyConfigured) {
    return mockProduct;
  }
  const data = await shopifyFetch<{ product: unknown }>(
    /* GraphQL */ `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          handle
          title
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `,
    { handle: PRODUCT_HANDLE },
  );
  if (!data.product) {
    throw new Error(`Product not found: ${PRODUCT_HANDLE}`);
  }
  return reshapeProduct(data.product);
}

export async function createCart(): Promise<Cart> {
  if (!isShopifyConfigured) {
    return mockCreateCart();
  }
  const data = await shopifyFetch<{ cartCreate: { cart: unknown } }>(
    /* GraphQL */ `
      mutation cartCreate {
        cartCreate {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
  );
  return reshapeCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (!isShopifyConfigured) {
    return mockGetCart(cartId);
  }
  const data = await shopifyFetch<{ cart: unknown | null }>(
    /* GraphQL */ `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId },
  );
  return data.cart ? reshapeCart(data.cart) : null;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<Cart> {
  if (!isShopifyConfigured) {
    return mockAddToCart(cartId, variantId, quantity);
  }
  const data = await shopifyFetch<{ cartLinesAdd: { cart: unknown } }>(
    /* GraphQL */ `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<Cart> {
  if (!isShopifyConfigured) {
    return mockUpdateCartLine(cartId, lineId, quantity);
  }
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: unknown } }>(
    /* GraphQL */ `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(
  cartId: string,
  lineId: string,
): Promise<Cart> {
  if (!isShopifyConfigured) {
    return mockRemoveFromCart(cartId, lineId);
  }
  const data = await shopifyFetch<{ cartLinesRemove: { cart: unknown } }>(
    /* GraphQL */ `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId, lineIds: [lineId] },
  );
  return reshapeCart(data.cartLinesRemove.cart);
}
