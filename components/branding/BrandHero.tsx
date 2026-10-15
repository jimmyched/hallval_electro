import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/storefront/Icon";
import type { BrandId } from "@/lib/brands";
import type { Locale } from "@/lib/content";

const words = {
  en: {
    descriptor: "Foot stimulation wrap",
    discover: "Discover the wrap",
    how: "Explore the idea",
    concept: "Brand concept",
    visual: "Product visualization",
    atHome: "For time at home",
    productAlt: "The open foot stimulation wrap, shown in a warm neutral textile",
    wornAlt: "The foot stimulation wrap shown around the inner edge of a foot",
    womanAlt: "A woman reading at home with the foot stimulation wrap",
    manAlt: "A man reading at home with the foot stimulation wrap",
    dayable: {
      first: "Make room",
      second: "for your feet.",
      intro: "A thoughtful foot stimulation wrap, conceived for the moments you already have. A quiet pause. A favourite chair. A little attention to you.",
      note: "Care that belongs in your day.",
      detail: "A simple place to begin.",
    },
    soluen: {
      first: "A considered",
      second: "approach to care.",
      intro: "Foot stimulation, thoughtfully presented. Discover the wrap, the muscle-focused idea behind it, and its place in a quiet moment at home.",
      note: "Clarity in every detail.",
      labels: ["The wrap", "The idea", "Your routine"],
      details: ["Open textile design", "Targeted muscle stimulation", "A moment at home"],
    },
    deartempo: {
      first: "A little care.",
      second: "At your tempo.",
      intro: "Your day has its own rhythm. Make space for your feet within it—with a foot stimulation wrap conceived for quiet moments at home.",
      note: "A moment that is yours.",
      detail: "Settle in. Make a little space.",
    },
    "good-measure": {
      first: "Good care.",
      second: "In good measure.",
      intro: "A foot stimulation wrap. A clear idea. Space in your day to pay attention to your feet. Nothing more complicated than it needs to be.",
      note: "Thoughtful by design. Everyday by nature.",
      detail: "A little attention goes into everything.",
      labels: ["Understand it", "Make room for it", "Keep it personal"],
    },
    ordelan: {
      first: "Attention,",
      second: "by design.",
      intro: "A focused approach to foot stimulation. An open wrap, a considered form, and a clear explanation of the thinking behind it.",
      note: "Purpose in the details.",
      detail: "Designed around the foot.",
      labels: ["Form", "Focus", "Context"],
      details: ["Open textile wrap", "Foot muscle stimulation", "Time at home"],
    },
  },
  fr: {
    descriptor: "Support de stimulation du pied",
    discover: "Découvrir le support",
    how: "Comprendre l’approche",
    concept: "Concept de marque",
    visual: "Visualisation du produit",
    atHome: "Pour les moments chez soi",
    productAlt: "Le support ouvert de stimulation du pied, dans un textile de teinte naturelle",
    wornAlt: "Le support de stimulation placé le long du bord intérieur du pied",
    womanAlt: "Une femme lit chez elle avec le support de stimulation du pied",
    manAlt: "Un homme lit chez lui avec le support de stimulation du pied",
    dayable: {
      first: "Une place",
      second: "pour vos pieds.",
      intro: "Un support de stimulation du pied pensé pour les moments que vous avez déjà. Une pause au calme. Votre fauteuil préféré. Un peu d’attention pour vous.",
      note: "Le soin trouve sa place dans votre journée.",
      detail: "Un point de départ, tout simplement.",
    },
    soluen: {
      first: "Le soin,",
      second: "avec attention.",
      intro: "La stimulation du pied, expliquée avec clarté. Découvrez le support, son approche musculaire et la place qu’il peut prendre dans un moment calme chez vous.",
      note: "La clarté dans chaque détail.",
      labels: ["Le support", "L’approche", "Votre routine"],
      details: ["Une forme textile ouverte", "La stimulation musculaire ciblée", "Un moment chez soi"],
    },
    deartempo: {
      first: "Un peu de soin.",
      second: "À votre rythme.",
      intro: "Vos journées ont leur propre rythme. Faites-y une place pour vos pieds, avec un support de stimulation pensé pour les moments calmes à la maison.",
      note: "Un moment qui vous appartient.",
      detail: "Installez-vous. Prenez un peu de temps.",
    },
    "good-measure": {
      first: "Le soin.",
      second: "À votre mesure.",
      intro: "Un support de stimulation du pied. Une idée claire. Un moment dans la journée pour prêter attention à vos pieds. Aussi simple que cela.",
      note: "Pensé avec attention. Ancré dans le quotidien.",
      detail: "Un peu d’attention dans chaque détail.",
      labels: ["Comprendre", "Faire une place", "Trouver son rythme"],
    },
    ordelan: {
      first: "Le sens",
      second: "du détail.",
      intro: "Une approche précise de la stimulation du pied. Un support ouvert, une forme réfléchie et une explication claire de sa conception.",
      note: "Chaque détail a sa raison d’être.",
      detail: "Pensé autour du pied.",
      labels: ["Forme", "Approche", "Contexte"],
      details: ["Un support textile ouvert", "La stimulation des muscles du pied", "Un moment chez soi"],
    },
  },
} as const;

function Actions({ locale }: { locale: Locale }) {
  const t = words[locale];
  return (
    <div className="brand-hero-actions">
      <Link className="button brand-main-cta" href="/product/albea">
        {t.discover}<Icon width="18" height="18" />
      </Link>
      <a className="text-link" href="#how-it-works">
        {t.how}<Icon width="17" height="17" />
      </a>
    </div>
  );
}

export function BrandHero({ brand, locale }: { brand: BrandId; locale: Locale }) {
  const t = words[locale];

  if (brand === "dayable") {
    const c = t.dayable;
    return (
      <section className="brand-hero brand-hero-dayable" aria-labelledby="brand-hero-title">
        <div className="brand-hero-shell dayable-stage">
          <div className="dayable-copy">
            <p className="brand-kicker"><span className="brand-small-dot" />{t.descriptor}</p>
            <h1 id="brand-hero-title">{c.first}<br /><span>{c.second}</span></h1>
            <p className="brand-hero-intro">{c.intro}</p>
            <Actions locale={locale} />
            <p className="dayable-note"><span aria-hidden="true">↗</span>{c.note}</p>
          </div>
          <div className="dayable-photo">
            <Image src="/images/lifestyle-wrap-woman.webp" alt={t.womanAlt} fill priority sizes="(max-width: 800px) 100vw, 52vw" />
            <span className="brand-image-label">{t.visual}</span>
            <div className="dayable-product-card">
              <Image src="/images/wrap-studio.webp" alt={t.productAlt} width={180} height={120} sizes="140px" />
              <p>{c.detail}<span>{t.descriptor}</span></p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (brand === "soluen") {
    const c = t.soluen;
    return (
      <section className="brand-hero brand-hero-soluen" aria-labelledby="brand-hero-title">
        <div className="brand-hero-shell">
          <div className="soluen-heading">
            <p className="brand-kicker">{t.descriptor}</p>
            <h1 id="brand-hero-title">{c.first}<br /><em>{c.second}</em></h1>
            <p className="soluen-heading-note">{c.note}</p>
          </div>
          <div className="soluen-stage">
            <div className="soluen-photo">
              <span className="soluen-photo-tag">Soluen / 01</span>
              <Image src="/images/wrap-studio.webp" alt={t.productAlt} fill priority sizes="(max-width: 800px) 100vw, 58vw" />
              <span className="brand-image-label">{t.visual}</span>
            </div>
            <div className="soluen-copy">
              <p className="brand-hero-intro">{c.intro}</p>
              <dl className="soluen-details">
                {c.labels.map((label, index) => (
                  <div key={label}><dt><span>0{index + 1}</span>{label}</dt><dd>{c.details[index]}</dd></div>
                ))}
              </dl>
              <Actions locale={locale} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (brand === "deartempo") {
    const c = t.deartempo;
    return (
      <section className="brand-hero brand-hero-deartempo" aria-labelledby="brand-hero-title">
        <div className="brand-hero-shell">
          <div className="tempo-heading">
            <div className="tempo-margin"><span className="tempo-rhythm" aria-hidden="true"><i /><i /><i /></span><p className="brand-kicker">{t.descriptor}</p></div>
            <h1 id="brand-hero-title">{c.first}<br /><em>{c.second}</em></h1>
            <div className="tempo-intro"><p className="brand-hero-intro">{c.intro}</p><Actions locale={locale} /></div>
          </div>
          <div className="tempo-photo">
            <Image src="/images/hero-woman-panorama.webp" alt={t.womanAlt} fill priority sizes="100vw" />
            <div className="tempo-photo-caption"><p>{c.note}</p><span>{t.visual}</span></div>
          </div>
          <div className="tempo-footnote"><span>{c.detail}</span><span>DearTempo</span></div>
        </div>
      </section>
    );
  }

  if (brand === "good-measure") {
    const c = t["good-measure"];
    return (
      <section className="brand-hero brand-hero-good-measure" aria-labelledby="brand-hero-title">
        <div className="brand-hero-shell measure-stage">
          <div className="measure-copy">
            <p className="brand-kicker">{t.descriptor}</p>
            <h1 id="brand-hero-title"><span>{c.first}</span><span>{c.second}</span></h1>
            <div className="measure-copy-bottom"><p className="brand-hero-intro">{c.intro}</p><Actions locale={locale} /></div>
          </div>
          <div className="measure-visual">
            <div className="measure-rule" aria-hidden="true" />
            <div className="measure-photo"><Image src="/images/wrap-approved.webp" alt={t.wornAlt} fill priority sizes="(max-width: 800px) 100vw, 47vw" /><span className="brand-image-label">{t.visual}</span></div>
            <p className="measure-visual-note">{c.detail}<span aria-hidden="true">+</span></p>
          </div>
          <div className="measure-footer">{c.labels.map((label, index) => <span key={label}><i>0{index + 1}</i>{label}</span>)}</div>
        </div>
      </section>
    );
  }

  const c = t.ordelan;
  return (
    <section className="brand-hero brand-hero-ordelan" aria-labelledby="brand-hero-title">
      <div className="brand-hero-shell">
        <div className="ordelan-topline"><span>{t.descriptor}</span><span>{t.atHome}</span></div>
        <div className="ordelan-stage">
          <div className="ordelan-copy">
            <span className="ordelan-symbol" aria-hidden="true"><i /><i /><i /></span>
            <h1 id="brand-hero-title">{c.first}<br />{c.second}</h1>
            <p className="brand-hero-intro">{c.intro}</p>
            <Actions locale={locale} />
            <p className="ordelan-note">{c.note}</p>
          </div>
          <div className="ordelan-visual">
            <div className="ordelan-photo"><Image src="/images/wrap-studio.webp" alt={t.productAlt} fill priority sizes="(max-width: 800px) 100vw, 53vw" /><span className="brand-image-label">{t.visual}</span><span className="ordelan-cross cross-top" aria-hidden="true">+</span><span className="ordelan-cross cross-bottom" aria-hidden="true">+</span></div>
            <p className="ordelan-image-caption"><span>{c.detail}</span><span aria-hidden="true">↗</span></p>
          </div>
        </div>
        <dl className="ordelan-details">{c.labels.map((label, index) => <div key={label}><dt>{label}</dt><dd>{c.details[index]}</dd></div>)}</dl>
      </div>
    </section>
  );
}
