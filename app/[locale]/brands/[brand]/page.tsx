import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import concepts from "@/lib/brand-concepts.json";
import { localeOf } from "@/lib/content";
type Props={params:Promise<{locale:string;brand:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {brand}=await params;const b=concepts.brands.find(b=>b.id===brand);return {title:{absolute:`${b?.name||"Brand"} · Packaging & voice`},robots:{index:false,follow:false}};}
export default async function BrandConcept({params}:Props){
  const {locale,brand}=await params;setRequestLocale(locale);const lang=localeOf(locale),fr=lang==="fr";const b=concepts.brands.find(b=>b.id===brand);if(!b)notFound();
  return <div className={`brand-lab brand-detail concept-${b.id}`} style={{"--concept-paper":b.palette.background,"--concept-ink":b.palette.ink,"--concept-accent":b.palette.accent} as React.CSSProperties}>
    <div className="brand-detail-top"><Link href="/brands">← {fr?"Les cinq identités":"All five identities"}</Link><Link className="lab-button" href={`/?brand=${b.id}`}>{fr?"Explorer le site":"Explore website"} ↗</Link></div>
    <section className="brand-detail-heading"><p className="lab-eyebrow">{b.territory[lang]}</p><h1 className="concept-wordmark">{b.name}</h1><p>{b.positioning[lang]}</p></section>
    <div className="brand-detail-image"><Image src={`/images/brands/${b.id}-packaging.webp`} width={1536} height={1024} alt={fr?`Concept de boîte, carte et langage de marque ${b.name}`:`${b.name} box, insert and brand language concept`} priority sizes="(max-width:1200px) 100vw, 1200px"/></div>
    <p className="lab-image-caption">{fr?"Visualisation de packaging · Texte anglais sur l’image ; adaptation française ci-dessous.":"Packaging visualization · Proposed materials and copy, not production artwork."}</p>
    <section className="brand-detail-section"><div><p className="lab-eyebrow">01 / {fr?"L’OBJET":"THE OBJECT"}</p><h2>{fr?"Un objet cohérent avec le nom.":"An object that belongs to the name."}</h2></div><div><h3>{fr?"Construction":"Construction"}</h3><p>{b.packaging.format[lang]}</p><h3>{fr?"Matières et finition":"Materials & finish"}</h3><p>{b.packaging.materials[lang]}</p><h3>{fr?"Le geste graphique":"Graphic language"}</h3><p>{b.graphic[lang]}</p><div className="lab-palette" aria-label={fr?"Palette":"Palette"}>{[b.palette.ink,b.palette.background,b.palette.accent,b.palette.soft].map(c=><span key={c} style={{background:c}} title={c}/>)}</div><p className="lab-note">{concepts.shared.materialsNote[lang]}</p></div></section>
    <section className="brand-detail-section"><div><p className="lab-eyebrow">02 / {fr?"LE PUBLIC":"THE AUDIENCE"}</p><h2>{fr?"Ce que la marque doit faire ressentir.":"What the brand should make people feel."}</h2></div><div><p className="lab-large-copy">{b.audience[lang]}</p><p className="lab-note">{b.watchout[lang]}</p></div></section>
    <section className="brand-detail-section"><div><p className="lab-eyebrow">03 / {fr?"LA VOIX":"THE VOICE"}</p><h2>{fr?"Des mots qui lui ressemblent.":"Words that sound like the brand."}</h2></div><div className="brand-voice-lines">{b.headlines.map(h=><p key={h.en}>{h[lang]}</p>)}<ul>{b.voice.map(v=><li key={v.en}>{v[lang]}</li>)}</ul></div></section>
    <section className="brand-pack-copy"><div><p className="lab-eyebrow">{fr?"FACE AVANT":"FRONT PANEL"}</p><div className="brand-pack-text">{b.packaging.front[lang]}</div></div><div><p className="lab-eyebrow">{fr?"FACE ARRIÈRE":"BACK PANEL"}</p><div className="brand-pack-text brand-pack-back">{b.packaging.back[lang]}</div></div></section>
    <div className="brand-insert"><p className="lab-eyebrow">{fr?"LA PREMIÈRE ATTENTION À L’OUVERTURE":"THE FIRST WORDS ON OPENING"}</p><p>{b.packaging.insert[lang]}</p></div>
    <div className="brand-detail-end"><p className="lab-note">{concepts.shared.conceptNote[lang]}</p><Link className="lab-button" href={`/?brand=${b.id}`}>{fr?"Voir cette identité sur le site":"See this identity on the website"} ↗</Link></div>
  </div>;
}
