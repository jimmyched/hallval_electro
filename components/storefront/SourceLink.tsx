import { sources } from "@/lib/research";
import type { Locale } from "@/lib/content";
export function SourceLink({locale, source}: {locale: Locale; source: string}) {
  const s = sources[locale][source];
  if (!s) return null;
  return <a className="citation" href={s.url} target="_blank" rel="noreferrer">{s.title} <span aria-hidden="true">↗</span></a>;
}
