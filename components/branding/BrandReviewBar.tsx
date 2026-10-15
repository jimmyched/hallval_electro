"use client";
import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { brandCatalog,brandIds } from "@/lib/brands";
import { useBrand } from "./BrandProvider";
export function BrandReviewBar(){
  const brand=useBrand(), locale=useLocale(), path=usePathname(), query=useSearchParams();
  if(!brand || path.startsWith("/brands"))return null;
  return <aside className="brand-review-bar" aria-label={locale==="fr"?"Comparer les identités":"Compare brand identities"}>
    <div className="brand-review-intro"><span>{locale==="fr"?"Concept de marque":"Brand concept"}</span><Link href="/brands">← {locale==="fr"?"Les cinq identités":"All five identities"}</Link></div>
    <nav aria-label={locale==="fr"?"Identités de marque":"Brand identities"}>{brandIds.map(id=>{const params=new URLSearchParams(query);params.set("brand",id);params.delete("theme");return <Link key={id} href={`${path}?${params}`} aria-current={brand===id?"page":undefined}>{brandCatalog[id].name}</Link>;})}</nav>
    <Link href={`/brands/${brand}`}>{locale==="fr"?"Packaging et langage ↗":"Packaging & voice ↗"}</Link>
  </aside>;
}
