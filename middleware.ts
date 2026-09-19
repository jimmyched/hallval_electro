import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";
import { resolveTheme, THEME_HEADER } from "./lib/theme";

const localeMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  request.headers.set(THEME_HEADER, resolveTheme(request.nextUrl.searchParams.get("theme")));
  return localeMiddleware(request);
}

export const config = {
  // Match all pathnames except for API routes, Next.js internals and static files
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
