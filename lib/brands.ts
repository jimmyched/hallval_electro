import type { Locale } from "./content";

export const brandIds = ["dayable", "soluen", "deartempo", "good-measure", "ordelan"] as const;
export type BrandId = (typeof brandIds)[number];
export const BRAND_HEADER = "x-electrosock-brand";
export type Brand = { id: BrandId; name: string; color: string; paper: string; territory: Record<Locale, string>; line: Record<Locale, string>; voice: Record<Locale, string> };
export const brandCatalog: Record<BrandId, Brand> = {
  dayable: {id:"dayable",name:"Dayable",color:"#49364b",paper:"#f5eee6",territory:{en:"Everyday capability",fr:"Les capacités du quotidien"},line:{en:"Care for the day you want to have.",fr:"Prendre soin de vos journées."},voice:{en:"Warm, direct and quietly optimistic. Start with the person’s day, then explain the product.",fr:"Chaleureux, direct et sereinement optimiste. Partir de la journée, puis expliquer le produit."}},
  soluen: {id:"soluen",name:"Soluen",color:"#214e4d",paper:"#f0f3ef",territory:{en:"Composed expertise",fr:"Une expertise posée"},line:{en:"Care, thoughtfully considered.",fr:"Le soin, pensé avec attention."},voice:{en:"Calm, precise and attentive. Explain the purpose without asking the customer to become a specialist.",fr:"Calme, précis et attentif. Expliquer l’usage sans demander à chacun de devenir spécialiste."}},
  deartempo: {id:"deartempo",name:"DearTempo",color:"#652e37",paper:"#f6ece2",territory:{en:"A personal rhythm",fr:"Un rythme personnel"},line:{en:"A little time. Entirely yours.",fr:"Un peu de temps. Juste pour vous."},voice:{en:"Personal, unhurried and adult. Invite a moment of care without turning it into another obligation.",fr:"Personnel, posé et adulte. Inviter à un moment de soin sans en faire une obligation de plus."}},
  "good-measure": {id:"good-measure",name:"Good Measure",color:"#204b9b",paper:"#f6f3eb",territory:{en:"Thoughtful practicality",fr:"Une attention concrète"},line:{en:"A little more thought. For your feet.",fr:"Un peu plus d’attention. Pour vos pieds."},voice:{en:"Plainspoken, useful and assured. Specific details earn trust; big promises do not.",fr:"Simple, utile et assuré. La confiance vient des détails concrets, sans grandes promesses."}},
  ordelan: {id:"ordelan",name:"Ordelan",color:"#222f3b",paper:"#f2f4f1",territory:{en:"Human precision",fr:"Une précision humaine"},line:{en:"A considered approach to foot care.",fr:"Une approche réfléchie du soin des pieds."},voice:{en:"Structured, exact and composed. Make engineering understandable and keep the person in view.",fr:"Structuré, précis et posé. Rendre la conception compréhensible, sans perdre de vue la personne."}},
};
export function resolveBrand(value: string | null | undefined): BrandId | null {
  return brandIds.includes(value as BrandId) ? value as BrandId : null;
}
export const productDescriptor = (locale: Locale) => locale === "fr" ? "Support de stimulation du pied" : "Foot stimulation wrap";
export function productName(brand: BrandId | null, locale: Locale) {
  return brand ? `${brandCatalog[brand].name} · ${locale === "fr" ? "Support pour le pied" : "Foot wrap"}` : "Albea Pulse";
}
/** Rebrand editorial copy only. URLs, asset paths, IDs and references stay stable. */
export function brandText(text: string, brand: BrandId | null, locale: Locale): string {
  if (!brand || /^(?:https?:|\/|gid:)/.test(text)) return text;
  const name = brandCatalog[brand].name;
  const rebranded = text.replace(/albea[™®]?\s*(?:\/\s*)?pulse/gi, name)
    .replace(/albea[™®]?/gi, name)
;
  if (locale !== "fr" || brand === "ordelan") return rebranded;
  return rebranded.replace(/\b(d|qu|l)[’'](?=Dayable|Soluen|DearTempo|Good Measure)/g, (_, article: string) => ({d: "de ", qu: "que ", l: "le "}[article] || article));
}
export function brandData<T>(value: T, brand: BrandId | null, locale: Locale): T {
  if (!brand) return value;
  if (typeof value === "string") return brandText(value, brand, locale) as T;
  if (Array.isArray(value)) return value.map(item => brandData(item, brand, locale)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key,item]) => [key, brandData(item, brand, locale)])) as T;
  return value;
}
export function brandedHref(href: string, brand: BrandId | null): string {
  if (!brand || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/research/") || /^\/(?:en\/|fr\/)?brands(?:[/?#]|$)/.test(href)) return href;
  const hashIndex=href.indexOf("#"), hash=hashIndex<0?"":href.slice(hashIndex), base=hashIndex<0?href:href.slice(0,hashIndex);
  const queryIndex=base.indexOf("?"), path=queryIndex<0?base:base.slice(0,queryIndex), query=new URLSearchParams(queryIndex<0?"":base.slice(queryIndex+1));
  if (!query.has("brand")) query.set("brand",brand);
  return `${path}?${query}${hash}`;
}
