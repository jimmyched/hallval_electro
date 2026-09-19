"use client";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { copy, localeOf } from "@/lib/content";
import type { ProductImage } from "@/lib/shopify/types";
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const locale = localeOf(useLocale());
  const t = copy[locale];
  const galleryAlts = [
    t.wornImageAlt,
    locale === "fr" ? "Albea Pulse, vue de trois quarts sur fond sauge" : "Albea Pulse, three-quarter view on a sage background",
    t.heroLifestyleAlt,
    locale === "fr" ? "Un moment de lecture à la lumière du matin, les pieds posés sur un repose-pieds avec Albea Pulse" : "Reading in soft morning light, feet resting on an ottoman wearing Albea Pulse",
    locale === "fr" ? "Un moment calme en soirée avec Albea Pulse, à la lumière d’une lampe" : "A quiet evening wearing Albea Pulse in warm lamplight",
  ];
  return (
    <div>
      <div className="product-gallery-main">
        <Image
          src={images[active].url}
          alt={galleryAlts[active] || images[active].altText}
          fill
          priority
          sizes="(max-width:760px) 100vw,50vw"
        />
      </div>
      <div
        className="gallery-thumbs"
        aria-label={locale === "fr" ? "Galerie produit" : "Product gallery"}
      >
        {images.map((img, i) => (
          <button
            key={img.url}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={
              locale === "fr" ? `Voir l’image ${i + 1}` : `View image ${i + 1}`
            }
          >
            <Image src={img.url} alt="" fill sizes="75px" />
          </button>
        ))}
      </div>
    </div>
  );
}
