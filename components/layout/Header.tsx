"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { CartButton } from "@/components/cart/CartButton";
import { Icon } from "@/components/storefront/Icon";
import { copy, localeOf } from "@/lib/content";
export function Header() {
  const locale = localeOf(useLocale());
  const t = copy[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    "/product/albea",
    "/science",
    "/#faq",
  ];
  return (
    <>
      {pathname === "/" && (
        <Link className="announcement" href="/product/albea">
          <span>{t.announcement}</span>
          <Icon width="14" height="14" />
        </Link>
      )}
      <header className="site-header">
        <div className="header-inner">
          <Link
            href="/"
            className="wordmark"
            aria-label={locale === "fr" ? "Albea, accueil" : "Albea, home"}
            onClick={() => setOpen(false)}
          >
            albea<span>®</span>
          </Link>
          <nav
            className="desktop-nav"
            aria-label={
              locale === "fr" ? "Navigation principale" : "Main navigation"
            }
          >
            {t.nav.map((label, i) => (
              <Link key={label} href={links[i]}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <div
              className="language-switch"
              aria-label={locale === "fr" ? "Langue" : "Language"}
            >
              <Icon name="globe" width="16" height="16" />
              {(["en", "fr"] as const).map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  lang={l}
                  aria-label={l === "fr" ? "Français" : "English"}
                  aria-current={locale === l ? "true" : undefined}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <CartButton />
            <Link className="button button-small header-join" href={pathname.startsWith("/for/") ? `${pathname}#preorder` : "/product/albea#preorder"}>
              {t.join}
              <Icon width="16" />
            </Link>
            <button
              className="menu-button"
              aria-label={
                open
                  ? locale === "fr"
                    ? "Fermer le menu"
                    : "Close menu"
                  : locale === "fr"
                    ? "Ouvrir le menu"
                    : "Open menu"
              }
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label={
              locale === "fr" ? "Navigation mobile" : "Mobile navigation"
            }
          >
            {t.nav.map((label, i) => (
              <Link key={label} href={links[i]} onClick={() => setOpen(false)}>
                {label}
                <Icon />
              </Link>
            ))}
            <Link className="mobile-preorder" href={pathname.startsWith("/for/") ? `${pathname}#preorder` : "/product/albea#preorder"} onClick={() => setOpen(false)}>{t.join}<Icon /></Link>
          </nav>
        )}
      </header>
    </>
  );
}
