import "server-only";
import { headers } from "next/headers";
import { BRAND_HEADER, resolveBrand } from "./brands";
import { brandCopy } from "./brand-copy";
import type { Locale } from "./content";
export async function getBrand() { return resolveBrand((await headers()).get(BRAND_HEADER)); }
export async function getBrandCopy(locale: Locale) { return brandCopy(locale, await getBrand()); }
