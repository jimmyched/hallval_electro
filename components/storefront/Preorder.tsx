import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { copy, localeOf } from "@/lib/content";
import { Icon } from "./Icon";
export function Preorder() {
  const locale = localeOf(useLocale());
  const fr = locale === "fr";
  return <section className="preorder-section section" id="join"><div className="container preorder-inner">
    <div><p className="eyebrow">ALBEA / 2027</p><h2>{fr ? "Votre prochain petit geste." : "Your next little act of care."}<br/><em>{fr ? "À imaginer ensemble." : "A new possibility."}</em></h2><p>{fr ? "Un support ouvert. Quatre électrodes. Une nouvelle approche musculaire en développement." : "An open wrap. Four electrodes. A new muscle-focused approach in development."}</p></div>
    <div className="preorder-action"><Link href="/product/albea#preorder" className="button">{copy[locale].join}<Icon width="18"/></Link><small>{fr ? "Précommande de démonstration · Aucun paiement\nLancement envisagé en 2027" : "Demo pre-order · No payment\nLaunch planned for 2027"}</small></div>
  </div></section>;
}
