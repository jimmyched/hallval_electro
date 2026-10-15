"use client";
import { useBrand, useBrandCopy } from "@/components/branding/BrandProvider";
import { brandCatalog } from "@/lib/brands";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { localeOf } from "@/lib/content";
import { Icon } from "./Icon";
export function Preorder() {
  const locale = localeOf(useLocale());
  const brand = useBrand();
  const t = useBrandCopy();
  const fr = locale === "fr";
  return <section className="preorder-section section" id="join"><div className="container preorder-inner">
    <div><p className="eyebrow">{brand ? brandCatalog[brand].name : "ALBEA / 2027"}</p><h2>{fr ? "Votre prochain petit geste." : "Your next little act of care."}<br/><em>{fr ? "À imaginer ensemble." : "A new possibility."}</em></h2><p>{fr ? "Un support ouvert. Quatre électrodes. Une nouvelle approche musculaire en développement." : "An open wrap. Four electrodes. A new muscle-focused approach in development."}</p></div>
    <div className="preorder-action"><Link href="/product/albea#preorder" className="button">{t.join}<Icon width="18"/></Link></div>
  </div></section>;
}
