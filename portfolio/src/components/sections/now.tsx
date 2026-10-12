import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations, formatFullDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { articles } from "@/data/articles";
import { SectionHeading } from "@/components/ui/section-heading";

// En ce moment : le présent, ligne par ligne. Les articles se rangent sous « Écrit » ;
// la dernière ligne (« Cherche ») mène au contact.
export function NowSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const projectHref = `https://github.com/${profile.github}/pass-gdg`;

  return (
    <section id="maintenant" className="screen" aria-labelledby="maintenant-titre">
      <div className="shell">
        <SectionHeading id="maintenant-titre" title={t.now.title} />
        <ul>
          {t.now.items.map((item, i) => {
            const content = (
              <>
                <span className="eyebrow now-label">
                  <span className="now-dot" aria-hidden="true" />
                  {item.label}
                </span>
                <span className="now-text">{item.text}</span>
                {item.link && item.link !== "articles" && <span className="now-arrow" aria-hidden="true">&rarr;</span>}
              </>
            );
            const delay = { "--i": i } as React.CSSProperties;

            if (item.link === "articles") {
              return (
                <li key={item.label} id="articles" className="fade-in" style={delay}>
                  <div className="now-row">{content}</div>
                  {sorted.length === 0 ? (
                    <p className="pb-8 text-sm text-secondary">{t.articles.noArticles}</p>
                  ) : (
                    <ul className="article-grid pb-8">
                      {sorted.map((article) => (
                        <li key={article.slug}>
                          <article className="panel group relative flex h-full flex-col">
                            <p className="mb-3 flex flex-wrap items-center gap-2 text-xs text-tertiary">
                              <time dateTime={article.date}>{formatFullDate(article.date, locale)}</time>
                              <span aria-hidden="true">·</span>
                              <span>{article.readingTime} {t.articles.readingTime}</span>
                            </p>
                            <h3 className="panel-title mb-2">
                              <Link
                                href={`/${locale}/blog/${article.slug}`}
                                className="transition-colors duration-(--dur-fast) after:absolute after:inset-0 group-hover:text-accent"
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
                </li>
              );
            }

            return (
              <li key={item.label} className="fade-in" style={delay}>
                {item.link === "project" ? (
                  <a href={projectHref} target="_blank" rel="noopener noreferrer" className="now-row is-link">{content}</a>
                ) : item.link === "contact" ? (
                  <a href="#contact" className="now-row is-link">{content}</a>
                ) : (
                  <div className="now-row">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
