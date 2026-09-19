import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { copy, personas, localeOf, type Persona } from "@/lib/content";
import { Icon } from "./Icon";
import { RatingStars } from "@/components/product/RatingStars";
import { ProductComments } from "@/components/product/ProductComments";

const portraitCrops = {
  "early-signs": { x: 34, y: 21, scale: 5 },
  "family-history": { x: 61, y: 19, scale: 5 },
  "active-living": { x: 73, y: 13, scale: 5.5 },
  "on-your-feet": { x: 44, y: 17, scale: 5 },
  "lifelong-movement": { x: 49, y: 20, scale: 3.6 },
} as const;
export function Routine() {
  const locale = localeOf(useLocale());
  const t = copy[locale];
  return (
    <section className="section routine-section">
      <div className="container routine-grid">
        <div className="routine-image routine-portrait">
          <Image
            src="/images/lifestyle-wrap-man-reading.webp"
            alt={t.routineImage}
            fill
            sizes="(max-width:760px) 100vw,50vw"
          />
          <span className="image-caption">
            {locale === "fr"
              ? "LES PETITES ATTENTIONS FONT LE QUOTIDIEN."
              : "THE SMALL THINGS MAKE THE EVERYDAY."}
          </span>
        </div>
        <div className="routine-copy">
          <p className="eyebrow">{t.routineEyebrow}</p>
          <h2>
            {t.routineTitle}
            <br />
            <em>{t.routineAccent}</em>
          </h2>
          <p className="section-intro">{t.routineIntro}</p>
          <ol className="routine-steps">
            {t.routineSteps.map((step, i) => (
              <li key={step.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/product/albea" className="text-link">
            {t.discover}
            <Icon width="19" />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Reviews({ featured, rated = false }: { featured?: Persona; rated?: boolean }) {
  const locale = localeOf(useLocale());
  const t = copy[locale];
  const voices = featured
    ? [featured]
    : [personas[locale][0], personas[locale][3], personas[locale][4]];
  return (
    <section className="reviews-section section" id="reviews">
      <div className="container">
        <div className="section-heading centered">
          <p className="eyebrow">{rated ? (locale === "fr" ? "AVIS & COMMENTAIRES" : "REVIEWS & COMMENTS") : t.reviewsEyebrow}</p>
          <h2>
            {t.reviewsTitle} <em>{t.reviewsAccent}</em>
          </h2>
          {rated && <p className="review-score"><RatingStars rating={4.7}/><strong>{locale === "fr" ? "4,7/5" : "4.7/5"}</strong></p>}
        </div>
        <div className={`reviews-grid ${featured ? "single" : ""}`}>
          {voices.map((p, index) => (
            <figure className="review-card" key={p.slug}>
              <div className="review-top">
                {rated ? <span aria-label={`${index === 2 ? 4 : 5}/5`}><RatingStars rating={index === 2 ? 4 : 5}/></span> : <span className="quote-mark">“</span>}
                <span>{t.sample}</span>
              </div>
              <blockquote>{p.quote}</blockquote>
              <figcaption>
                <span className="review-portrait">
                  <Image
                    src={`/images/${p.image}.webp`}
                    alt={locale === "fr" ? `Portrait illustratif de ${p.name}` : `Illustrative portrait of ${p.name}`}
                    width={600}
                    height={400}
                    sizes="440px"
                    style={{
                      width: `${portraitCrops[p.slug].scale * 100}%`,
                      transform: `translate(-${portraitCrops[p.slug].x}%, -${portraitCrops[p.slug].y}%)`,
                    }}
                  />
                </span>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.context}</span>
                </div>
                <Icon name="leaf" />
              </figcaption>
            </figure>
          ))}
        </div>
        {rated && <ProductComments />}
      </div>
    </section>
  );
}
export function FaqSection({ extra }: { extra?: { q: string; a: string } }) {
  const t = copy[localeOf(useLocale())];
  const items = extra ? [extra, ...t.faqs] : t.faqs;
  return (
    <section className="faq-section section" id="faq">
      <div className="container faq-grid">
        <div>
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>
            {t.faqTitle}
            <br />
            <em>{t.faqAccent}</em>
          </h2>
          <Link href="/science" className="text-link">
            {t.research}
            <Icon width="17" />
          </Link>
        </div>
        <div className="faq-list">
          {items.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <Icon name="plus" width="18" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
