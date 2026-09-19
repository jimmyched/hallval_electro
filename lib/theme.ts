export type Theme = "default" | "1" | "2";

export const THEME_HEADER = "x-albea-theme";

export function resolveTheme(value: string | null | undefined): Theme {
  return value === "1" || value === "2" ? value : "default";
}

/** Keep destination parameters and fragments, and respect explicit theme links. */
export function themedHref(href: string, theme: Theme): string {
  if (theme === "default" || !href.startsWith("/") || href.startsWith("//")) {
    return href;
  }
  const hashIndex = href.indexOf("#");
  const hash = hashIndex < 0 ? "" : href.slice(hashIndex);
  const pathAndQuery = hashIndex < 0 ? href : href.slice(0, hashIndex);
  const queryIndex = pathAndQuery.indexOf("?");
  const path = queryIndex < 0 ? pathAndQuery : pathAndQuery.slice(0, queryIndex);
  const query = new URLSearchParams(queryIndex < 0 ? "" : pathAndQuery.slice(queryIndex + 1));
  if (!query.has("theme")) query.set("theme", theme);
  return `${path}?${query}${hash}`;
}
