import { copy, type Locale } from "./content";
import { brandData, brandCatalog, productName, type BrandId } from "./brands";
export function brandCopy(locale: Locale, brand: BrandId | null) {
  const content = brandData(copy[locale], brand, locale);
  if (!brand) return content;
  const name = brandCatalog[brand].name, fr = locale === "fr";
  return {...content,
    nav:[fr ? "Le support" : "The wrap", fr ? "Notre approche" : "Our approach", "Questions"],
    join:fr ? "Découvrir le support" : "Explore the wrap",
    discover:fr ? `Découvrir ${name}` : `Discover ${name}`,
    announcement:fr ? "Un nouveau regard sur le soin des pieds." : "A fresh perspective on everyday foot care.",
    footerTag:brandCatalog[brand].line[locale],
    productTitle:productName(brand,locale),
    storyBody:fr ? "Notre point de départ : accorder aux pieds une attention aussi réfléchie qu’au reste du corps. Ce concept associe une conception textile ouverte à une approche musculaire ciblée, encore en développement." : "Our starting point: give feet the same considered attention as the rest of the body. This concept brings an open textile design together with a targeted muscle approach, still in development.",
    aboutTitle:fr ? `L’intention ${name}.` : `The idea behind ${name}.`,
    aboutBody:brandCatalog[brand].line[locale],
    aboutSecond:fr ? "Un concept de support ouvert à quatre électrodes, pour explorer une activation musculaire ciblée à domicile. Le design, les réglages et l’usage final restent à valider. Cette version présente une identité de marque possible autour du même produit." : "An open wrap concept with four electrodes, exploring targeted muscle activation at home. The design, settings and final use remain to be validated. This version presents one possible brand identity around the same product.",
    consent:fr ? `Je souhaite suivre le développement de ${name}.` : `I’d like to follow ${name}’s development.`,
    faqs:content.faqs.map(item => /How do I|Comment acheter|Comment commander/.test(item.q) ? {...item,a:fr ? "Ce site est une démonstration. Vous pouvez essayer la sélection de taille et le panier ; aucune commande ni aucun paiement n’est effectué." : "This site is a demonstration. You can try the size selector and bag; no order or payment is made."} : item),
  };
}
