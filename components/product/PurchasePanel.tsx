"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/money";
import { copy, localeOf } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { RatingStars } from "./RatingStars";

type AddState = "idle" | "adding" | "added" | "error";

export function PurchasePanel({ product, headingLevel = "h1", showReviews = false }: { product: Product; headingLevel?: "h1" | "h2"; showReviews?: boolean }) {
  const Title = headingLevel;
  const t = useTranslations("product.purchase");
  const locale = useLocale();
  const content = copy[localeOf(locale)];
  const { addItem } = useCart();

  const firstAvailable = product.variants.find((v) => v.availableForSale);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    firstAvailable?.id,
  );
  const [quantity, setQuantity] = useState(1);
  const [addState, setAddState] = useState<AddState>("idle");

  const selected = product.variants.find((v) => v.id === selectedId);
  const soldOut = !product.availableForSale || !firstAvailable;

  const handleAdd = async () => {
    if (!selected) return;
    setAddState("adding");
    const ok = await addItem(selected.id, quantity);
    setAddState(ok ? "added" : "error");
    if (ok) {
      setTimeout(() => setAddState("idle"), 2500);
    }
  };

  return (
    <div className="product-purchase" id="preorder">
      <p className="text-xs font-medium tracking-widest text-primary uppercase">
        {t("eyebrow")}
      </p>
      <Title className="product-title" aria-label="albea Pulse">
        <span className="wordmark product-wordmark">albea<span aria-hidden="true">™</span></span>{" "}Pulse
      </Title>
      {showReviews && <a className="product-rating" href="#reviews">
        <RatingStars rating={4.7} />
        <strong>{locale === "fr" ? "4,7/5" : "4.7/5"}</strong>
        <span>{locale === "fr" ? "3 avis illustratifs" : "3 illustrative reviews"}</span>
      </a>}
      <p className="product-price mt-3 text-2xl font-medium">
        {formatMoney(selected?.price ?? product.price, locale)}
      </p>

      <p className="mt-6 text-sm leading-relaxed text-slate-soft">
        {t("summary")}
      </p>

      {/* Size selector */}
      <fieldset className="mt-8">
        <legend className="text-sm font-medium">{t("sizeLabel")}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((variant) => {
            const isSelected = variant.id === selectedId;
            const unavailable = !variant.availableForSale;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() =>
                  variant.availableForSale && setSelectedId(variant.id)
                }
                disabled={unavailable}
                aria-pressed={isSelected}
                className={cn(
                  "size-option rounded-full border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-white hover:border-slate-soft",
                  unavailable &&
                    "cursor-not-allowed border-line text-slate-soft line-through opacity-50 hover:border-line",
                )}
              >
                {variant.title}
              </button>
            );
          })}
        </div>
        {selected && !selected.availableForSale && (
          <p className="mt-2 text-xs text-slate-soft">{t("variantSoldOut")}</p>
        )}
      </fieldset>

      <details className="size-guide">
        <summary>{content.sizeGuide} +</summary>
        <p>{content.sizeNote}</p>
      </details>

      {/* Quantity */}
      <div className="mt-6">
        <label htmlFor="quantity" className="text-sm font-medium">
          {t("quantityLabel")}
        </label>
        <div className="mt-3 inline-flex items-center rounded-full border border-line">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label={t("decrease")}
            className="flex size-11 items-center justify-center rounded-full text-slate-soft outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <input
            id="quantity"
            type="text"
            inputMode="numeric"
            readOnly
            value={quantity}
            className="w-10 border-0 bg-transparent text-center text-sm tabular-nums outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
            aria-label={t("increase")}
            className="flex size-11 items-center justify-center rounded-full text-slate-soft outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <div className="mt-8">
        <Button
          size="lg"
          fullWidth
          onClick={handleAdd}
          disabled={soldOut || !selected}
          loading={addState === "adding"}
        >
          {soldOut
            ? t("soldOut")
            : addState === "adding"
              ? t("adding")
              : addState === "added"
                ? t("added")
                : t("addToCart")}
        </Button>
        <div aria-live="polite" className="min-h-5">
          {addState === "error" && (
            <p role="alert" className="mt-2 text-sm text-ink">
              {t("addError")}
            </p>
          )}
          {addState === "added" && (
            <p className="mt-2 text-sm text-primary">{t("addedNote")}</p>
          )}
        </div>
      </div>


    </div>
  );
}
