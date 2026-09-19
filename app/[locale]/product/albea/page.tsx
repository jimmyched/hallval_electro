import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProduct } from "@/lib/shopify";
import { copy, localeOf } from "@/lib/content";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { Science } from "@/components/storefront/Science";
import { FaqSection, Reviews } from "@/components/storefront/Sections";
import { Preorder } from "@/components/storefront/Preorder";
import { ProductCommitments } from "@/components/product/ProductCommitments";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = copy[localeOf(locale)];
  return { title: t.productTitle, description: t.intro };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = copy[localeOf(locale)];
  const product = await getProduct();
  return (
    <div className="product-page-layout">
      <section className="product-page container">
        <nav
          className="product-breadcrumb"
          aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}
        >
          <Link href="/">Albea</Link>
          <span>/</span>
          <span>{t.productTitle}</span>
        </nav>
        <div className="product-grid">
          <div>
            <ProductGallery images={product.images} />
            <ProductCommitments />
          </div>
          <PurchasePanel product={product} showReviews />
        </div>
        <div className="product-details">
          {t.routineSteps.map((step) => (
            <div key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Science />
      <Reviews rated />
      <FaqSection />
      <Preorder />
    </div>
  );
}
