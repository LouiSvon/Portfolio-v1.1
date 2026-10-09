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
    <div>
      {filtered.map((article) => {
        const formattedDate = new Date(article.date).toLocaleDateString(
          locale === "fr" ? "fr-FR" : "en-US",
          { day: "numeric", month: "long", year: "numeric" }
        );
        return (
          <article
            key={article.slug}
            className="border-b border-border py-6 first:pt-0 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:gap-6">
              {/* Bande colorée par tag principal */}
              <div
                className="hidden sm:block w-1 shrink-0 rounded self-stretch"
                style={{ backgroundColor: tagColor(article.tags[0]) }}
                aria-hidden="true"
              />
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

                <h2 className="text-base font-medium text-primary mb-1 leading-snug">
                  <Link
                    href={`/${locale}/blog/${article.slug}`}
                    className="hover:text-accent hover:underline underline-offset-4 transition-colors duration-150"
                  >
                    {article.title[locale]}
                  </Link>
                </h2>

                <p className="text-sm text-secondary leading-relaxed line-clamp-2 mb-3">
                  {article.summary[locale]}
                </p>

                {article.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <li
                        key={tag}
                        className="text-xs text-tertiary bg-badge-bg px-2 py-0.5 rounded"
                      >
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

// Couleur sobre basée sur le premier tag (déterministe)
function tagColor(tag?: string): string {
  const map: Record<string, string> = {
    LLM: "#4A9EBF",
    IA: "#5C8A6E",
    Prompting: "#7B6BA8",
    Guide: "#C17A5A",
  };
  return (tag && map[tag]) ?? "#5A7089";
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
          className="w-full max-w-xs rounded border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-tertiary focus:border-accent focus:outline-none transition-colors duration-150"
        />
      </div>

      <ArticleList articles={sorted} query={query} locale={locale} t={t} />
    </div>
  );
}
