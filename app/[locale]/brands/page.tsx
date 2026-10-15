import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import concepts from "@/lib/brand-concepts.json";
import { localeOf } from "@/lib/content";

export const metadata: Metadata = {title:{absolute:"Five identities · Brand study"},robots:{index:false,follow:false}};
export default async function BrandStudy({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;setRequestLocale(locale);const lang=localeOf(locale),fr=lang==="fr";
  return <div className="brand-lab">
    <section className="brand-lab-intro">
      <p className="lab-eyebrow">{fr?"LE MÊME PRODUIT. CINQ IDENTITÉS.":"ONE PRODUCT. FIVE IDENTITIES."}</p>
      <h1>{fr?"Cinq noms.":"Five names."}<br/><em>{fr?"Cinq univers.":"Five ways to feel."}</em></h1>
      <p>{fr?"Des sites complets, des packagings et une voix propres à chaque nom. Explorez les univers, puis comparez ce qu’ils font ressentir.":"Complete website versions, packaging and a voice for each name. Explore the identities, then compare how they feel."}</p>
      <nav className="brand-lab-jump" aria-label={fr?"Les cinq marques":"The five brands"}>{concepts.brands.map(b=><a key={b.id} href={`#${b.id}`}>{b.name}<span>↓</span></a>)}</nav>
      <p className="lab-note">{fr?"Étude créative · Même support de stimulation · Français et anglais · Aucun nom définitivement choisi":"Creative study · Same stimulation wrap · French and English · No final name selected"}</p>
    </section>
    <div className="brand-lab-concepts">{concepts.brands.map((b,i)=><article key={b.id} id={b.id} className={`brand-lab-concept concept-${b.id}`} style={{"--concept-paper":b.palette.background,"--concept-ink":b.palette.ink,"--concept-accent":b.palette.accent} as React.CSSProperties}>
      <div className="brand-concept-copy"><p className="lab-eyebrow">0{i+1} / {b.territory[lang]}</p><h2 className="concept-wordmark">{b.name}</h2><p className="brand-concept-line">{b.headlines[0][lang]}</p><p>{b.positioning[lang]}</p><div className="lab-palette" aria-label={fr?"Palette de couleurs":"Colour palette"}>{[b.palette.ink,b.palette.background,b.palette.accent,b.palette.soft].map(c=><span key={c} style={{background:c}} title={c}/>)}</div><div className="lab-actions"><Link className="lab-button" href={`/?brand=${b.id}`}>{fr?"Explorer le site":"Explore website"}<span>↗</span></Link><Link className="lab-text-link" href={`/brands/${b.id}`}>{fr?"Packaging et langage":"Packaging & voice"} →</Link></div></div>
      <Link href={`/brands/${b.id}`} className="brand-concept-image" aria-label={`${b.name} — ${fr?"voir le packaging":"view packaging"}`}><Image src={`/images/brands/${b.id}-packaging.webp`} width={1536} height={1024} alt={fr?`Proposition de packaging ${b.name}`:`${b.name} packaging concept`} sizes="(max-width:800px) 100vw, 55vw" priority={i===0}/><span>{fr?"CONCEPT DE PACKAGING":"PACKAGING CONCEPT"}</span></Link>
    </article>)}</div>
    <section className="brand-lab-method"><h2>{fr?"Comparer ce qui compte.":"Compare what matters."}</h2><div><p>{concepts.shared.method[lang]}</p><p>{fr?"À qui cette marque semble-t-elle s’adresser ? Inspire-t-elle confiance ? Comprend-on le produit ? Le nom reste-t-il facile à dire et à retenir ?": "Who does this brand seem to be for? Does it feel trustworthy? Is the product understandable? Is the name still easy to say and remember?"}</p><a href="/research/naming.html" className="lab-text-link">{fr?"Retrouver toute la recherche de noms":"Return to all naming research"} ↗</a></div></section>
  </div>;
}
