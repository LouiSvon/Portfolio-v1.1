"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { Project, Locale } from "@/types";
import { getTranslations, formatFullDate } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

type SortKey = "recent" | "oldest" | "az";

function ProjectGridCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = getTranslations(locale);
  const description = project.customDescription?.[locale] ?? project.description;
  const visibleTopics = project.topics.slice(0, 3);
  const extraTopics = project.topics.length - 3;

  return (
    <article className="card group flex flex-col rounded border border-border p-5 hover:border-accent transition-colors duration-150">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-medium text-primary leading-snug">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-150"
          >
            {project.name}
          </a>
        </h3>
        {project.featured && (
          <Badge variant="featured" className="shrink-0">
            {t.projects.featured}
          </Badge>
        )}
      </div>

      {description && (
        <p className="text-xs text-secondary leading-relaxed line-clamp-2 mb-3 flex-1">
          {description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-xs text-tertiary">
        {project.language && (
          <span className="flex items-center gap-1.5">
            <span className="language-dot" data-language={project.language} aria-hidden />
            {project.language}
          </span>
        )}
        {project.stars > 0 && <span>★ {project.stars}</span>}
      </div>

      {project.topics.length > 0 && (
        <ul className="flex flex-wrap gap-1 mb-4">
          {visibleTopics.map((topic) => (
            <li key={topic}><span className="tag">{topic}</span></li>
          ))}
          {extraTopics > 0 && <li><span className="tag">+{extraTopics}</span></li>}
        </ul>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
        <span className="text-xs text-tertiary">{formatFullDate(project.updatedAt, locale)}</span>
        <div className="flex gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-secondary hover:text-accent transition-colors duration-150"
          >
            GitHub &rarr;
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary hover:text-accent-warm transition-colors duration-150"
            >
              Demo &rarr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectFilter({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  const t = getTranslations(locale);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortKey>("recent");
  const [panelOpen, setPanelOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const availableLanguages = useMemo(() => {
    const langs = new Set(projects.map((p) => p.language).filter(Boolean) as string[]);
    return [...langs].sort();
  }, [projects]);

  // Close on outside click
  useEffect(() => {
    if (!panelOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !panelRef.current?.contains(e.target as Node)
      ) {
        setPanelOpen(false);
      }
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setPanelOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [panelOpen]);

  function toggleFilter(value: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  }

  const filtered = useMemo(() => {
    let result = projects;
    if (selected.size > 0) {
      result = result.filter((p) => {
        if (selected.has("featured") && !p.featured) return false;
        const langFilters = [...selected].filter((s) => s !== "featured");
        if (langFilters.length > 0 && !langFilters.includes(p.language ?? "")) return false;
        return true;
      });
    }
    return [...result].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "oldest") return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [projects, selected, sort]);

  const isFiltered = selected.size > 0 || sort !== "recent";
  const shown = filtered.length;
  const total = projects.length;

  const isFr = locale === "fr";

  return (
    <div>
      {/* Topbar: counter + settings button */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs text-tertiary">
          {isFiltered
            ? `${shown} / ${total} ${t.projects.counter}${shown > 1 ? "s" : ""}`
            : `${total} ${t.projects.counter}${total > 1 ? "s" : ""}`}
        </span>

        <div className="relative">
          <button
            ref={btnRef}
            onClick={() => setPanelOpen((v) => !v)}
            aria-expanded={panelOpen}
            aria-label={isFr ? "Filtres et tri" : "Filters and sort"}
            className="relative flex items-center justify-center w-9 h-9 rounded border border-border text-secondary hover:border-accent hover:text-accent transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
              <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
              <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
            </svg>
            {isFiltered && (
              <span
                aria-hidden
                className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent"
              />
            )}
          </button>

          {/* Panel — dropdown desktop, drawer mobile */}
          {panelOpen && (
            <div
              ref={panelRef}
              role="dialog"
              aria-label={isFr ? "Réglages des projets" : "Project settings"}
              className="settings-panel"
            >
              {/* Sort */}
              <div className="mb-5">
                <p className="text-[10px] font-medium text-tertiary uppercase tracking-wider mb-2">
                  {isFr ? "Trier par" : "Sort by"}
                </p>
                <div className="space-y-1.5">
                  {(["recent", "oldest", "az"] as SortKey[]).map((key) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value={key}
                        checked={sort === key}
                        onChange={() => setSort(key)}
                        className="accent-[var(--accent)]"
                      />
                      <span className="text-sm text-secondary">
                        {key === "recent" ? (isFr ? "Plus récent" : "Most recent") :
                         key === "oldest" ? (isFr ? "Plus ancien" : "Oldest first") :
                         "A → Z"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: featured */}
              <div className="mb-4">
                <p className="text-[10px] font-medium text-tertiary uppercase tracking-wider mb-2">
                  {isFr ? "Filtrer" : "Filter"}
                </p>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={selected.has("featured")}
                    onChange={() => toggleFilter("featured")}
                    className="accent-[var(--accent)]"
                  />
                  <span className="text-sm text-secondary">{t.projects.filterFeatured}</span>
                </label>

                {/* Languages */}
                {availableLanguages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => toggleFilter(lang)}
                        className={`text-xs px-2.5 py-1 rounded border transition-colors duration-150 ${
                          selected.has(lang)
                            ? "border-accent text-accent bg-accent-soft"
                            : "border-border text-secondary hover:border-accent hover:text-accent"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset */}
              {isFiltered && (
                <button
                  onClick={() => { setSelected(new Set()); setSort("recent"); }}
                  className="w-full text-xs text-tertiary border border-border rounded py-1.5 hover:text-accent hover:border-accent transition-colors duration-150"
                >
                  {t.projects.resetFilters}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectGridCard key={project.name} project={project} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-secondary">{t.projects.noProjects}</p>
      )}
    </div>
  );
}
