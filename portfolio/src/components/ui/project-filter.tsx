"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { Project, Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { ProjectScene, type Scene } from "@/components/ui/project-scene";

type SortKey = "recent" | "oldest" | "az";

// Ce que la liste reçoit : la scène déjà mise en forme côté serveur (langue de la page),
// plus les seuls champs qui servent au filtre et au tri. Rien d'autre ne transite vers le navigateur.
export type FilterItem = Pick<Project, "name" | "language" | "featured" | "updatedAt"> & { scene: Scene };

export function ProjectFilter({
  items: projects,
  locale,
}: {
  items: FilterItem[];
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
      if (next.has(value)) next.delete(value);
      else next.add(value);
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
      // Tri par défaut : le projet mis en avant reste en tête.
      if (sort === "recent" && a.featured !== b.featured) return a.featured ? -1 : 1;
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "oldest") return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [projects, selected, sort]);

  const labels = { viewCode: t.projects.viewCode, featured: t.projects.featured, demo: t.projects.demo };
  const isFiltered = selected.size > 0 || sort !== "recent";
  const shown = filtered.length;
  const total = projects.length;

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
            aria-label={t.projects.filters}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border text-secondary transition-colors duration-(--dur-fast) hover:border-accent hover:text-accent"
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
              aria-label={t.projects.settings}
              className="settings-panel"
            >
              {/* Sort */}
              <div className="mb-5">
                <p className="eyebrow mb-3">
                  {t.projects.sortBy}
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
                        {key === "recent" ? t.projects.sortRecent : key === "oldest" ? t.projects.sortOldest : t.projects.sortAZ}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: featured */}
              <div className="mb-4">
                <p className="eyebrow mb-3">
                  {t.projects.filter}
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
                        className={`chip transition-colors duration-(--dur-fast) ${
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
                  className="btn-ghost w-full justify-center !h-10"
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
        <div className="showcase flex flex-col gap-[clamp(4rem,10vh,8rem)]">
          {filtered.map((project, i) => (
            <div key={project.name} className="fade-in">
              <ProjectScene scene={project.scene} index={i} labels={labels} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-secondary">{t.projects.noProjects}</p>
      )}
    </div>
  );
}
