"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { Article, Resource, Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { ResourceModal } from "@/components/ui/resource-modal";

type Tab = "articles" | "ressources";

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
                  {article.linkedResource && (
                    <>
                      <span className="text-xs text-tertiary">·</span>
                      <span className="text-xs text-accent bg-accent-soft px-1.5 py-0.5 rounded">
                        PDF
                      </span>
                    </>
                  )}
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

function ResourceGrid({
  resources,
  query,
  locale,
  t,
}: {
  resources: Resource[];
  query: string;
  locale: Locale;
  t: ReturnType<typeof getTranslations>;
}) {
  const [modalResource, setModalResource] = useState<Resource | null>(null);
  const q = query.toLowerCase().trim();

  const filtered = q
    ? resources.filter(
        (r) =>
          r.title[locale].toLowerCase().includes(q) ||
          r.description[locale].toLowerCase().includes(q) ||
          r.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    : resources;

  const closeModal = useCallback(() => setModalResource(null), []);

  if (filtered.length === 0) {
    return <p className="text-sm text-secondary py-4">{t.blog.noResults}</p>;
  }

  const typeIcon: Record<Resource["type"], string> = {
    pdf: "📄",
    template: "📋",
    video: "🎬",
    other: "📎",
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource) => (
          <div
            key={resource.id}
            className="flex flex-col rounded border border-border p-5 hover:border-accent transition-colors duration-150"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="text-2xl" aria-hidden="true">
                {typeIcon[resource.type]}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  resource.free
                    ? "text-accent bg-accent-soft"
                    : "text-secondary bg-badge-bg"
                }`}
              >
                {resource.free ? t.blog.resourceFree : t.blog.resourceEmailGated}
              </span>
            </div>

            <p className="text-sm font-medium text-primary mb-2 leading-snug">
              {resource.title[locale]}
            </p>
            <p className="text-xs text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
              {resource.description[locale]}
            </p>

            <div className="flex items-center gap-2 flex-wrap mt-auto">
              {resource.free && resource.url ? (
                <a
                  href={resource.url}
                  download
                  className="text-xs font-medium text-accent hover:underline underline-offset-4"
                >
                  {t.blog.downloadResource} &darr;
                </a>
              ) : (
                <button
                  onClick={() => setModalResource(resource)}
                  className="text-xs font-medium text-accent hover:underline underline-offset-4"
                >
                  {t.blog.accessResource} &rarr;
                </button>
              )}
              {resource.linkedArticleSlug && (
                <Link
                  href={`/${locale}/blog/${resource.linkedArticleSlug}`}
                  className="text-xs text-tertiary hover:text-accent transition-colors duration-150"
                >
                  {t.blog.tabArticles} &rarr;
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalResource && (
        <ResourceModal
          resource={modalResource}
          locale={locale}
          onClose={closeModal}
        />
      )}
    </>
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

export function BlogTabs({
  articles,
  resources,
  initialTab,
  locale,
}: {
  articles: Article[];
  resources: Resource[];
  initialTab: Tab;
  locale: Locale;
}) {
  const t = getTranslations(locale);
  const router = useRouter();
  const pathname = usePathname();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [query, setQuery] = useState("");

  function switchTab(newTab: Tab) {
    setTab(newTab);
    setQuery("");
    router.replace(`${pathname}?tab=${newTab}`, { scroll: false });
  }

  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      {/* Onglets */}
      <div
        className="flex gap-0 border-b border-border mb-8 overflow-x-auto scrollbar-none"
        role="tablist"
      >
        {(["articles", "ressources"] as Tab[]).map((t_) => (
          <button
            key={t_}
            role="tab"
            aria-selected={tab === t_}
            onClick={() => switchTab(t_)}
            className={`shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150 ${
              tab === t_
                ? "border-accent text-accent"
                : "border-transparent text-secondary hover:text-accent"
            }`}
          >
            {t_ === "articles" ? t.blog.tabArticles : t.blog.tabResources}
          </button>
        ))}
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.blog.searchPlaceholder}
          className="w-full max-w-xs rounded border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-tertiary focus:border-accent focus:outline-none transition-colors duration-150"
        />
      </div>

      {/* Contenu */}
      {tab === "articles" ? (
        <ArticleList articles={sorted} query={query} locale={locale} t={t} />
      ) : (
        <ResourceGrid resources={resources} query={query} locale={locale} t={t} />
      )}
    </div>
  );
}
