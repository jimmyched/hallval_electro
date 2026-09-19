import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { copy, localeOf } from "@/lib/content";
import { Icon } from "@/components/storefront/Icon";
import { Science } from "@/components/storefront/Science";
import {
  Routine,
  Reviews,
  FaqSection,
} from "@/components/storefront/Sections";
import { Preorder } from "@/components/storefront/Preorder";
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = copy[localeOf(locale)];
  return (
    <>
      <section className="hero hero-wide">
        <div className="hero-background">
          <Image
            src="/images/lifestyle-wrap-woman.webp"
            alt={t.heroLifestyleAlt}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="container hero-stage">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="live-dot" />
              {t.eyebrow}
            </p>
            <p className="hero-product-name"><span className="wordmark">albea<span aria-hidden="true">™</span></span> Pulse.</p>
            <h1>
              <span className="hero-headline">{t.title} {t.title2}</span>
              <em>{t.accent}</em>
            </h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <Link className="button" href="/product/albea">
                {t.join}
                <Icon width="19" />
              </Link>
              <a href="#how-it-works" className="text-link">
                {t.how}
                <Icon width="18" />
              </a>
            </div>
            <p className="hero-launch">
              <span className="tiny-flags">
                <i />
                <i />
              </span>
              {t.launch}
            </p>
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container">
          {t.trust.map((text, i) => (
            <div key={text}>
              <Icon name={["heart", "pulse", "leaf", "sun"][i]} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <Science />
      <Reviews />
      <Routine />
      <FaqSection />
      <Preorder />
    </>
  );
}
