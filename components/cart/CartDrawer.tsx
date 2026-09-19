"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import type { CartLine } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/cn";
import { Button, Spinner } from "@/components/ui/Button";
import { useCart } from "./CartProvider";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LineItem({ line }: { line: CartLine }) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { updateItem, removeItem, pendingLineId } = useCart();
  const isPending = pendingLineId === line.id;

  return (
    <li
      className={cn(
        "flex gap-4 py-5 transition-opacity",
        isPending && "opacity-50",
      )}
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-line bg-mist">
        {line.merchandise.product.image && (
          <Image
            src={line.merchandise.product.image.url}
            alt={line.merchandise.product.image.altText ?? ""}
            fill
            sizes="80px"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium">
              {line.merchandise.product.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-soft">
              {line.merchandise.title}
            </p>
          </div>
          <p className="text-sm font-medium">
            {formatMoney(line.cost.totalAmount, locale)}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div
            className="flex items-center rounded-full border border-line"
            aria-label={t("quantity")}
          >
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity - 1)}
              disabled={isPending}
              aria-label={t("decreaseQuantity")}
              className="flex size-8 items-center justify-center rounded-full text-slate-soft outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed"
            >
              −
            </button>
            <span
              className="min-w-6 text-center text-sm tabular-nums"
              aria-live="polite"
            >
              {isPending ? (
                <Spinner className="mx-auto size-3" />
              ) : (
                line.quantity
              )}
            </span>
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity + 1)}
              disabled={isPending || line.quantity >= 10}
              aria-label={t("increaseQuantity")}
              className="flex size-8 items-center justify-center rounded-full text-slate-soft outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            disabled={isPending}
            className="text-xs text-slate-soft underline underline-offset-2 outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed"
          >
            {t("remove")}
          </button>
        </div>
      </div>
    </li>
  );
}

export function CartDrawer() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { cart, isOpen, closeCart, hasError, pendingLineId } = useCart();
  const router = useRouter();
  const panelRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = panelRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
      document.documentElement.classList.add("drawer-open");
    } else {
      dialog.close();
      document.documentElement.classList.remove("drawer-open");
    }
    return () => {
      document.documentElement.classList.remove("drawer-open");
    };
  }, [isOpen]);

  const isEmpty = !cart || cart.lines.length === 0;
  const handleCheckout = () => {
    if (!cart || pendingLineId) return;
    closeCart();
    router.push("/checkout");
  };

  return (
    <dialog
      ref={panelRef}
      aria-label={t("title")}
      onCancel={closeCart}
      onClose={closeCart}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right) closeCart();
        }
      }}
      className="cart-dialog"
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-5">
        <h2 className="font-display text-lg">
          {t("title")}
          {cart && cart.totalQuantity > 0 && (
            <span className="ml-2 text-sm text-slate-soft">
              ({cart.totalQuantity})
            </span>
          )}
        </h2>
        <button
          type="button"
          onClick={closeCart}
          aria-label={t("close")}
          className="flex size-9 items-center justify-center rounded-full text-slate-soft outline-none transition-colors hover:bg-mist hover:text-ink focus-visible:ring-2 focus-visible:ring-primary"
        >
          <CloseIcon />
        </button>
      </div>

      {hasError && (
        <p
          role="alert"
          className="mx-6 mt-4 rounded-xl bg-blush px-4 py-3 text-sm text-ink"
        >
          {t("error")}
        </p>
      )}

      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-mist">
            <svg
              viewBox="0 0 24 24"
              className="size-7 text-primary"
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
          </div>
          <p className="text-sm text-slate-soft">{t("empty")}</p>
          <Link
            href="/product/albea"
            onClick={closeCart}
            className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-white outline-none transition-colors hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {t("shopCta")}
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
            {cart.lines.map((line) => (
              <LineItem key={line.id} line={line} />
            ))}
          </ul>
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-soft">{t("subtotal")}</span>
              <span className="font-medium">
                {formatMoney(cart.cost.subtotalAmount, locale)}
              </span>
            </div>
            <Button
              fullWidth
              size="lg"
              className="mt-4"
              onClick={handleCheckout}
              disabled={!!pendingLineId}
            >
              {t("checkout")}
            </Button>
          </div>
        </>
      )}
    </dialog>
  );
}
