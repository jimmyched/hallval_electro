import { useLocale } from "next-intl";
import { Icon } from "@/components/storefront/Icon";

export function ProductCommitments() {
  const fr = useLocale() === "fr";
  return <div className="product-commitments">
    <div className="commitment-grid">
      <div>
        <svg className="french-flag" viewBox="0 0 36 24" aria-hidden="true"><path fill="#354c85" d="M0 0h12v24H0z"/><path fill="#fff" d="M12 0h12v24H12z"/><path fill="#c76559" d="M24 0h12v24H24z"/></svg>
        <strong>{fr ? "Conception & fabrication" : "Designed & made"}</strong><span>{fr ? "françaises" : "in France"}</span>
      </div>
      <div><Icon name="leaf" width="28" height="28"/><strong>{fr ? "Éco-conception" : "Eco-conscious design"}</strong><span>{fr ? "Une démarche responsable" : "A thoughtful approach"}</span></div>
      <div><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M6 9a9 9 0 1 1-1 10M6 3v6h6"/><text x="14" y="17" fill="currentColor" stroke="none" textAnchor="middle" fontSize="9">30</text></svg><strong>{fr ? "Retours & échanges offerts" : "Free returns & exchanges"}</strong><span>{fr ? "Pendant 30 jours" : "For 30 days"}</span></div>
    </div>
  </div>;
}
