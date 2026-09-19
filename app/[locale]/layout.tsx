import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getInitialCart } from "@/components/cart/actions";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ScrollReset } from "@/components/layout/ScrollReset";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { resolveTheme, THEME_HEADER } from "@/lib/theme";
import "../globals.css";

const inter = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const fraunces = localFont({
  src: [
    {
      path: "../../public/fonts/fraunces-latin.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/fonts/fraunces-italic-latin.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("title"),
      template: `%s — Albea`,
    },
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const initialCart = await getInitialCart();
  const theme = resolveTheme((await headers()).get(THEME_HEADER));

  return (
    <html
      lang={locale}
      data-theme={theme}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <NextIntlClientProvider>
          <ThemeProvider>
            <CartProvider initialCart={initialCart}>
              <a href="#main-content" className="skip-link">
                {locale === "fr" ? "Aller au contenu" : "Skip to content"}
              </a>
              <ScrollReset />
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
