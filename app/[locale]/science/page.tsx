import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { localeOf } from "@/lib/content";
import { education, sources } from "@/lib/research";
import { Science } from "@/components/storefront/Science";
import { Preorder } from "@/components/storefront/Preorder";
import { SourceLink } from "@/components/storefront/SourceLink";
type Props = {params: Promise<{locale: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params; const t = education[localeOf(locale)];
  return {title: t.eyebrow, description: t.intro};
}
export default async function SciencePage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale);
  const lang = localeOf(locale); const t = education[lang]; const fr = lang === "fr";
  return <>
    <section className="knowledge-hero"><div className="container">
      <p className="eyebrow">{t.eyebrow}</p><h1>{t.title}<br/><em>{t.accent}</em></h1><p className="knowledge-lead">{t.intro}</p>
      <div className="fact-grid">{t.facts.map(f => <article key={f.value}><span className="fact-value">{f.value}</span><h2>{f.title}</h2><p>{f.text}</p><SourceLink locale={lang} source={f.source}/></article>)}</div>
      <nav className="knowledge-nav" aria-label={fr ? "Dans ce dossier" : "In this guide"}><a href="#evidence">01 {fr ? "Le rôle du muscle" : "The muscle’s role"}</a><a href="#understand">02 {fr ? "Comprendre" : "Understand"}</a><a href="#prevention">03 {fr ? "Agir" : "Take action"}</a></nav>
    </div></section>
    <section className="section evidence-section" id="evidence">
      <div className="container">
        <div className="knowledge-split evidence-heading">
          <div><p className="eyebrow">01 / {fr ? "L’APPROCHE MUSCULAIRE" : "THE MUSCLE APPROACH"}</p><h2>{t.evidenceTitle}</h2></div>
          <p>{t.evidenceBody}</p>
        </div>
        <div className="muscle-evidence-grid">
          <article><span className="need-index">01</span><h3>{t.muscleRoleTitle}</h3><p>{t.muscleRole}</p><SourceLink locale={lang} source="anatomy"/></article>
          <article><span className="need-index">02</span><h3>{t.muscleRationaleTitle}</h3><p>{t.muscleRationale}</p><SourceLink locale={lang} source="anatomy"/></article>
          <article><span className="need-index">03</span><h3>{t.muscleStudyTitle}</h3><p>{t.muscleStudy}</p><SourceLink locale={lang} source="muscleStudy"/></article>
        </div>
        {t.stimulationNote && <p className="stimulation-evidence">{t.stimulationNote} <SourceLink locale={lang} source="trial"/></p>}
        <p className="evidence-callout">{t.evidenceNote}</p>
      </div>
    </section>
    <Science/>
    <section className="section knowledge-mechanism" id="understand"><div className="container knowledge-split">
      <div><p className="eyebrow">02 / {fr ? "LA MÉCANIQUE DU PIED" : "THE FOOT, EXPLAINED"}</p><h2>{t.mechanismTitle}</h2><p>{t.mechanismBody}</p><SourceLink locale={lang} source="basics"/>
        <div className="alignment-diagram" role="img" aria-label={fr ? "Schéma simplifié : le métatarsien et le gros orteil se désaxent" : "Simplified diagram: metatarsal and big toe move out of alignment"}>
          <svg viewBox="0 0 520 240" aria-hidden="true"><g fill="none" stroke="#ced5c7" strokeWidth="36" strokeLinecap="round"><path d="M125 190V110M125 77V38"/><path d="M335 190 307 110M325 76 360 39"/></g><g fill="none" stroke="#fffef7" strokeWidth="27" strokeLinecap="round"><path d="M125 190V110M125 77V38"/><path d="M335 190 307 110M325 76 360 39"/></g><path d="M125 25V208M335 25V208" stroke="#9aab99" strokeDasharray="4 6"/><circle cx="306" cy="99" r="24" fill="#c6786e" opacity=".45"/><path d="M273 99h-24m5-5-5 5 5 5M357 33h26m-5-5 5 5-5 5" stroke="#99574e" strokeWidth="2" fill="none"/></svg>
          <div><span>{fr ? "Alignement habituel" : "Typical alignment"}</span><span>Hallux valgus</span></div><small>{fr ? "Illustration simplifiée · Vue du dessus" : "Simplified illustration · Top view"}</small>
        </div>
      </div>
      <div className="risk-stack"><h3>{t.riskTitle}</h3>{t.risks.map(([title, body], i) => <article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}<SourceLink locale={lang} source="basics"/></div>
    </div></section>
    <section className="section prevention-section" id="prevention"><div className="container"><p className="eyebrow">03 / {fr ? "LES GESTES UTILES" : "USEFUL EVERYDAY HABITS"}</p><h2>{t.preventionTitle}<br/><em>{t.preventionAccent}</em></h2><p className="knowledge-lead">{t.preventionBody}</p><div className="care-grid care-grid-four"><article><span className="need-index">00</span><h3>{t.stimulationStepTitle}</h3><p>{t.stimulationStepBody}</p><SourceLink locale={lang} source={fr ? "muscleStudy" : "trial"}/></article>{t.steps.map(([title, body],i)=><article key={title}><span className="need-index">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><SourceLink locale={lang} source="care"/></div></section>
    <section className="section distinctions-section"><div className="container"><h2>{t.distinctionTitle}</h2><div className="care-grid">{t.distinctions.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><SourceLink locale={lang} source="basics"/><SourceLink locale={lang} source="care"/></div></section>

    <section className="section references-section"><div className="container"><p className="eyebrow">{fr ? "POUR ALLER PLUS LOIN" : "FURTHER READING"}</p><h2>{t.sourceTitle}</h2><div className="reference-grid">{Object.keys(sources[lang]).map(key=><SourceLink key={key} locale={lang} source={key}/>)}</div><small>{fr ? "Sources consultées le 19 septembre 2026. Informations générales ; elles ne remplacent pas une consultation." : "Sources checked September 19, 2026. General information; not a substitute for an individual consultation."}</small></div></section>
    <Preorder/>
  </>;
}
