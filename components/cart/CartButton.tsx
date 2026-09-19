"use client";

import { useTranslations } from "next-intl";
import { useCart } from "./CartProvider";

export function CartButton() {
  const t = useTranslations("cart");
  const { cart, openCart } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={t("openCart", { count })}
      className="relative flex size-10 items-center justify-center rounded-full text-ink outline-none transition-colors hover:bg-mist focus-visible:ring-2 focus-visible:ring-primary"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 10V6a3 3 0 0 1 6 0v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-white">
          {count}
        </span>
      )}
    </button>
  );
}
