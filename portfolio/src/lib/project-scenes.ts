import type { Locale, Project } from "@/types";
import { formatFullDate } from "@/lib/i18n";
import type { Scene } from "@/components/ui/project-scene";
import type { FilterItem } from "@/components/ui/project-filter";

// Couleurs des panneaux des dépôts (les projets phares gardent les leurs).
const PANEL_COLORS: [string, string][] = [
  ["#4f8cff", "#9b6bff"],
  ["#2ee6a6", "#00b3ff"],
  ["#ff6b35", "#ff3d7f"],
  ["#8b7dff", "#4dd0ff"],
  ["#ffb36b", "#ff6b9a"],
  ["#3ddc84", "#4d8dff"],
];

function toScene(project: Project, index: number, locale: Locale): Scene {
  return {
    key: project.name,
    title: project.name,
    tagline: project.customDescription?.[locale] ?? project.description ?? undefined,
    kind: project.language ?? undefined,
    chips: [project.language, ...project.topics].filter(Boolean).slice(0, 4) as string[],
    href: project.url,
    colors: PANEL_COLORS[index % PANEL_COLORS.length],
    featured: project.featured,
    stars: project.stars,
    updated: formatFullDate(project.updatedAt, locale),
    demo: project.demo ?? undefined,
  };
}

// Dépôts GitHub -> éléments de la liste filtrable, mis en forme côté serveur.
export function toFilterItems(projects: Project[], locale: Locale): FilterItem[] {
  return projects.map((project, i) => ({
    name: project.name,
    language: project.language,
    featured: project.featured,
    updatedAt: project.updatedAt,
    scene: toScene(project, i, locale),
  }));
}
