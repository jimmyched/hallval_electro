import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";
import { resolveTheme, THEME_HEADER } from "./lib/theme";

import { BRAND_HEADER, resolveBrand } from "./lib/brands";

const localeMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  request.headers.set(THEME_HEADER, resolveTheme(request.nextUrl.searchParams.get("theme")));
  request.headers.set(BRAND_HEADER, resolveBrand(request.nextUrl.searchParams.get("brand")) || "");
  return localeMiddleware(request);
}

export const config = {
  // Match all pathnames except for API routes, Next.js internals and static files
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
