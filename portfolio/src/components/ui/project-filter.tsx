"use client";

import { useState, useMemo } from "react";
import type { Project, Locale } from "@/types";
import { getTranslations, formatFullDate } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

type SortKey = "recent" | "az";

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
    <article className="group flex flex-col rounded border border-border p-5 hover:border-accent transition-colors duration-150">
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
            <span
              className="language-dot"
              data-language={project.language}
              aria-hidden
            />
            {project.language}
          </span>
        )}
        {project.stars > 0 && (
          <span>★ {project.stars}</span>
        )}
      </div>

      {project.topics.length > 0 && (
        <ul className="flex flex-wrap gap-1 mb-4">
          {visibleTopics.map((topic) => (
            <li key={topic}>
              <Badge>{topic}</Badge>
            </li>
          ))}
          {extraTopics > 0 && (
            <li>
              <Badge>+{extraTopics}</Badge>
            </li>
          )}
        </ul>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
        <span className="text-xs text-tertiary">
          {formatFullDate(project.updatedAt, locale)}
        </span>
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

  // Auto-generate language filters from data
  const availableLanguages = useMemo(() => {
    const langs = new Set(
      projects.map((p) => p.language).filter(Boolean) as string[]
    );
    return [...langs].sort();
  }, [projects]);

  const filters = [
    { value: "all", label: t.projects.filterAll },
    { value: "featured", label: t.projects.filterFeatured },
    ...availableLanguages.map((lang) => ({ value: lang, label: lang })),
  ];

  function toggleFilter(value: string) {
    if (value === "all") {
      setSelected(new Set());
      return;
    }
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
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
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [projects, selected, sort]);

  const isFiltered = selected.size > 0;
  const total = projects.length;
  const shown = filtered.length;

  return (
    <div>
      {/* Barre de filtres + tri */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Filtres — scrollable horizontalement sur mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="group" aria-label="Filtrer les projets">
          {filters.map((f) => {
            const isActive =
              f.value === "all" ? !isFiltered : selected.has(f.value);
            return (
              <button
                key={f.value}
                onClick={() => toggleFilter(f.value)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded border transition-colors duration-150 ${
                  isActive
                    ? "border-accent text-accent bg-accent-soft"
                    : "border-border text-secondary hover:border-accent hover:text-accent"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {isFiltered && (
            <button
              onClick={() => setSelected(new Set())}
              className="shrink-0 text-xs px-3 py-1.5 rounded border border-border text-tertiary hover:text-accent hover:border-accent transition-colors duration-150"
            >
              {t.projects.resetFilters} ✕
            </button>
          )}
        </div>

        {/* Tri + compteur */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-tertiary">
            {isFiltered
              ? `${shown} / ${total} ${t.projects.counter}${shown > 1 ? "s" : ""}`
              : `${total} ${t.projects.counter}${total > 1 ? "s" : ""}`}
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-xs bg-background border border-border rounded px-2 py-1.5 text-secondary focus:border-accent focus:outline-none transition-colors duration-150"
          >
            <option value="recent">{t.projects.sortRecent}</option>
            <option value="az">{t.projects.sortAZ}</option>
          </select>
        </div>
      </div>

      {/* Grille */}
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
