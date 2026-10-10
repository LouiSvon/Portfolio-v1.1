"use client";

import { useState } from "react";
import Link from "next/link";
import type { Article, Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";

function ArticleList({
  articles,
  query,
  locale,
  t,
}: {
  articles: Article[];
  query: string;
  locale: Locale;
  t: ReturnType<typeof getTranslations>;
}) {
  const q = query.toLowerCase().trim();
  const filtered = q
    ? articles.filter(
        (a) =>
          a.title[locale].toLowerCase().includes(q) ||
          a.summary[locale].toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    : articles;

  if (filtered.length === 0) {
    return <p className="text-sm text-secondary py-4">{t.blog.noResults}</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {filtered.map((article) => {
        const formattedDate = new Date(article.date).toLocaleDateString(
          locale === "fr" ? "fr-FR" : "en-US",
          { day: "numeric", month: "long", year: "numeric" }
        );
        return (
          <article key={article.slug} className="panel group relative flex flex-col fade-in">
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <time dateTime={article.date} className="text-xs text-tertiary">
                    {formattedDate}
                  </time>
                  <span className="text-xs text-tertiary">·</span>
                  <span className="text-xs text-tertiary">
                    {article.readingTime} {t.blog.readingTime}
                  </span>
                </div>

                <h2 className="panel-title mb-2">
                  <Link
                    href={`/${locale}/blog/${article.slug}`}
                    className="after:absolute after:inset-0 group-hover:text-accent transition-colors duration-150"
                  >
                    {article.title[locale]}
                  </Link>
                </h2>

                <p className="text-sm text-secondary leading-relaxed line-clamp-3 mb-5">
                  {article.summary[locale]}
                </p>

                {article.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function BlogList({
  articles,
  locale,
}: {
  articles: Article[];
  locale: Locale;
}) {
  const t = getTranslations(locale);
  const [query, setQuery] = useState("");

  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      {/* Recherche */}
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.blog.searchPlaceholder}
          aria-label={t.blog.searchPlaceholder}
          className="field w-full max-w-sm"
        />
      </div>

      <ArticleList articles={sorted} query={query} locale={locale} t={t} />
    </div>
  );
}
