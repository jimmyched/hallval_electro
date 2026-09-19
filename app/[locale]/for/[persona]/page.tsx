import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { copy, personas, localeOf, personaSlugs } from "@/lib/content";
import { campaigns } from "@/lib/campaigns";
import { getProduct } from "@/lib/shopify";
import { Science } from "@/components/storefront/Science";
import { Reviews } from "@/components/storefront/Sections";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { SourceLink } from "@/components/storefront/SourceLink";
import { Icon } from "@/components/storefront/Icon";
type Params = Promise<{ locale: string; persona: string }>;
export function generateStaticParams() {return personaSlugs.map(persona => ({persona}));}
export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
 const {locale,persona} = await params; const p=personas[localeOf(locale)].find(p=>p.slug===persona);
 const c=p && campaigns[localeOf(locale)][p.slug]; return {title:c?.title,description:c?.intro,robots:{index:false,follow:false}};
}
export default async function CampaignPage({params}: {params: Params}) {
 const {locale,persona}=await params;setRequestLocale(locale);const lang=localeOf(locale);const fr=lang==="fr";const t=copy[lang];
 const p=personas[lang].find(p=>p.slug===persona);if(!p)notFound();const c=campaigns[lang][p.slug];const product=await getProduct();
 const questions=[
  [c.question,c.answer],
  [fr?"Comment Albea Pulse est-il conçu ?":"How is Albea Pulse designed?",fr?"Un textile ouvert, un boîtier compact et quatre électrodes : deux le long de l’abducteur de l’hallux, une à l’arrière et une à l’avant, puis une au-dessus et une en dessous du gros orteil. Le design final peut évoluer.":"An open textile wrap, a compact controller and four electrodes: rear and front of the abductor hallucis, plus above and below the big toe. The final design may evolve."],
  [fr?"Quand pourrai-je l’utiliser ?":"When will I be able to use it?",fr?"Le lancement est envisagé pour 2027, en France et aux États-Unis, sous réserve des validations nécessaires. La durée des séances, les réglages et les conditions d’utilisation seront définis après les essais.":"Launch is planned for 2027 in France and the United States, subject to the necessary validations. Session duration, settings and conditions of use will be defined after testing."],
  [fr?"Comment acheter albea™ Pulse ?":"How do I buy albea™ Pulse?",fr?"Choisissez votre taille, ajoutez albea™ Pulse au panier et poursuivez vers le paiement.":"Choose your size, add albea™ Pulse to your bag and continue to checkout."],
 ];
 return <div className="campaign-page">
  <section className={`campaign-hero campaign-${p.slug}`}><div className="container campaign-hero-grid"><div className="campaign-copy"><p className="eyebrow">ALBEA / {p.label}</p><h1>{c.title}<br/><em>{c.accent}</em></h1><p className="hero-intro">{c.intro}</p><div className="hero-actions"><a href="#preorder" className="button">{t.join}<Icon width="18"/></a><a href="#campaign-evidence" className="text-link">{fr?"Les faits d’abord":"Start with the facts"}<Icon width="17"/></a></div><p className="campaign-micro">{fr?"2027 · France & États-Unis":"2027 · France & United States"}</p></div><div className="campaign-image"><Image src={`/images/${p.image}.webp`} alt={p.label} fill priority sizes="(max-width:760px) 100vw,50vw"/><span>{t.concept}</span></div></div></section>
  <div className="campaign-benefits"><div className="container"><span><Icon name="pulse"/>{fr?"4 électrodes intégrées":"4 integrated electrodes"}</span><span><Icon name="leaf"/>{fr?"Un support ouvert":"An open wrap"}</span><span><Icon name="sun"/>{fr?"Imaginé pour le repos":"Conceived for time at rest"}</span></div></div>
  <section className="section campaign-problem" id="campaign-evidence"><div className="container knowledge-split"><div><p className="eyebrow">{fr?"CE QUE VOUS RESSENTEZ COMPTE":"YOUR EVERYDAY EXPERIENCE MATTERS"}</p><h2>{c.problemTitle}</h2><p>{c.problem}</p></div><article className="campaign-fact"><p className="eyebrow">{fr?"LE REPÈRE SCIENTIFIQUE":"THE EVIDENCE IN CONTEXT"}</p><span className="fact-value">{c.fact}</span><h3>{c.factTitle}</h3><p>{c.factBody}</p><SourceLink locale={lang} source={c.source}/><small>{fr?"Ces données ne sont pas des résultats d’essais sur Albea.":"These findings are not results from trials of Albea."}</small></article></div></section>
  <section className="section campaign-care"><div className="container"><p className="eyebrow">{fr?"DES CHOIX CONCRETS, DÈS AUJOURD’HUI":"PRACTICAL CHOICES, STARTING TODAY"}</p><h2>{fr?"Une routine commence":"A routine starts"}<br/><em>{fr?"par de petits gestes.":"with small, thoughtful steps."}</em></h2><div className="care-grid">{c.steps.map(([title,body],i)=><article key={title}><span className="need-index">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><SourceLink locale={lang} source={p.slug==="on-your-feet"?"standing":p.slug==="lifelong-movement"?"feet":"care"}/></div></section>
  <section className="section campaign-introduction"><div className="container knowledge-split"><div className="campaign-product-image"><Image src="/images/wrap-approved.webp" alt={t.wornImageAlt} width={900} height={600}/><small>{t.concept}</small></div><div><p className="eyebrow">{fr?"VOICI ALBEA":"MEET ALBEA"}</p><h2>{c.offer}</h2><p>{fr?"Un design ouvert qui libère les orteils et le dessus du pied. Deux électrodes le long du muscle, deux autour du gros orteil. Notre intention : explorer une activation ciblée de l’abducteur de l’hallux dans une routine simple à la maison.":"An open design that leaves the toes and instep free. Two electrodes along the muscle, two around the big toe. Our intention: explore targeted activation of the abductor hallucis in a simple routine at home."}</p><p className="campaign-boundary">{fr?"Concept en développement. La prévention de l’hallux valgus, la réduction de la fatigue et l’endurance debout ne sont pas des bénéfices démontrés d’Albea.":"Concept in development. Bunion prevention, fatigue reduction and greater standing endurance are not demonstrated benefits of Albea."}</p><a href="#preorder" className="button">{t.join}<Icon width="18"/></a></div></div></section>
  <Science/>
  <Reviews featured={p}/>
  <section className="section campaign-offer"><div className="container campaign-offer-grid"><div><p className="eyebrow">{fr?"VOTRE PROCHAIN GESTE":"YOUR NEXT STEP"}</p><h2>{fr?"Le soin de demain.":"Tomorrow’s foot care."}<br/><em>{fr?"Une attention dès aujourd’hui.":"A little care today."}</em></h2><Image src="/images/wrap-studio.webp" alt={t.imageAlt} width={900} height={600}/><p>{fr?"Choisissez votre taille, ajoutez albea™ Pulse à votre panier et passez au paiement.":"Choose your size, add albea™ Pulse to your bag and continue to checkout."}</p></div><PurchasePanel product={product} headingLevel="h2"/></div></section>
  <section className="section campaign-faq"><div className="container faq-grid"><div><p className="eyebrow">{fr?"AVANT DE VOUS DÉCIDER":"BEFORE YOU DECIDE"}</p><h2>{fr?"Des réponses.":"Clear answers."}<br/><em>{fr?"En toute clarté.":"Considered choices."}</em></h2><Link href="/science" className="text-link">{fr?"Consulter le dossier scientifique":"Read the science guide"}<Icon width="17"/></Link></div><div className="faq-list">{questions.map(([q,a])=><details key={q}><summary>{q}<Icon name="plus" width="18"/></summary><p>{a}</p></details>)}</div></div></section>
  <div className="campaign-rail"><div className="container"><span><strong>Albea</strong> <span>{fr?"4 électrodes · 2027":"4 electrodes · 2027"}</span></span><a className="button button-small" href="#preorder">{t.join}<Icon width="17"/></a></div></div>
 </div>;
}
