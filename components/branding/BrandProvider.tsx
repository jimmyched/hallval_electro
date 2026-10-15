"use client";
import { createContext, useContext, useLayoutEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { brandData, resolveBrand, type BrandId } from "@/lib/brands";
import { brandCopy } from "@/lib/brand-copy";
import { localeOf } from "@/lib/content";
const BrandContext=createContext<BrandId|null>(null);
export const useBrand=()=>useContext(BrandContext);
export function useBrandCopy(){ return brandCopy(localeOf(useLocale()),useBrand()); }
export function BrandProvider({children}:{children:React.ReactNode}){
  const brand=resolveBrand(useSearchParams().get("brand")), locale=localeOf(useLocale()), base=useMessages();
  const messages=useMemo(()=>brandData(base,brand,locale),[base,brand,locale]);
  useLayoutEffect(()=>{if(brand)document.documentElement.dataset.brand=brand;else delete document.documentElement.dataset.brand;},[brand]);
  return <BrandContext.Provider value={brand}><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></BrandContext.Provider>;
}
