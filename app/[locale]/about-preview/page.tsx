import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { copy, localeOf } from "@/lib/content";
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = copy[localeOf(locale)];
  return (
    <section className="section editorial-page container">
      <p className="eyebrow">{t.preview}</p>
      <h1>{t.aboutTitle}</h1>
      <p className="editorial-lead">{t.aboutBody}</p>
      <p>{t.aboutSecond}</p>
      <Link href="/science" className="text-link">
        {t.research} ↗
      </Link>
    </section>
  );
}
