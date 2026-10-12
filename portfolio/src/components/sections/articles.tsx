import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations, formatFullDate } from "@/lib/i18n";
import { articles } from "@/data/articles";
import { SectionHeading } from "@/components/ui/section-heading";

// Articles : une carte par article, chacune ouvre sa propre page.
export function ArticlesSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="articles" className="screen" aria-labelledby="articles-titre">
      <div className="shell">
        <SectionHeading id="articles-titre" title={t.articles.title} subtitle={t.articles.subtitle} />
        {sorted.length === 0 ? (
          <p className="text-sm text-secondary">{t.articles.noArticles}</p>
        ) : (
          <ul className="article-grid">
            {sorted.map((article, i) => (
              <li key={article.slug} className="fade-in" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                <article className="panel group relative flex h-full flex-col">
                  <p className="mb-3 flex flex-wrap items-center gap-2 text-xs text-tertiary">
                    <time dateTime={article.date}>{formatFullDate(article.date, locale)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime} {t.articles.readingTime}</span>
                  </p>
                  <h3 className="panel-title mb-2">
                    <Link
                      href={`/${locale}/blog/${article.slug}`}
                      className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-accent"
                    >
                      {article.title[locale]}
                    </Link>
                  </h3>
                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-secondary">{article.summary[locale]}</p>
                  {article.tags.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <li key={tag} className="chip">{tag}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
