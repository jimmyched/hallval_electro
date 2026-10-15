"use client";
import { useBrand, useBrandCopy } from "@/components/branding/BrandProvider";
import { brandCatalog } from "@/lib/brands";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

import { Icon } from "@/components/storefront/Icon";
export function Footer() {
  const t = useBrandCopy();
  const brand = useBrand();
  const path = usePathname();
  const fr = useLocale() === "fr";
  if (path.startsWith("/brands")) return <footer className="brand-lab-footer">{fr ? "Étude créative · Identités et packagings conceptuels · Aucun choix définitif" : "Creative study · Concept identities and packaging · No final selection"}</footer>;
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/" className={`wordmark ${brand ? "brand-wordmark" : ""}`}>
            {brand ? brandCatalog[brand].name : <>albea<span>®</span></>}
          </Link>
          <p className="footer-tagline">{t.footerTag}</p>
        </div>
        <div>
          <h3>{t.footerExplore}</h3>
          <Link href="/product/albea">{t.nav[0]}</Link>
          <Link href="/#faq">{t.nav[2]}</Link>
          <Link href="/product/albea#preorder">
            {t.join} <Icon width="13" />
          </Link>
        </div>
        <div>
          <h3>{t.footerLearn}</h3>
          <Link href="/#faq">{t.faq}</Link>
          <Link href="/science">{t.research}</Link>
          <Link href="/about-preview">{t.demo}</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{t.footerNote}</p>
        <div>
          <span>{t.rights}</span>
          <span>{t.privacy}</span>
        </div>
      </div>
    </footer>
  );
}
