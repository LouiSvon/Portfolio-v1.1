import type { Translations } from "@/i18n/fr";

// Ancres de la page unique, dans l'ordre du récit : qui je suis, d'où je viens, ce que je fais,
// ce que j'ai construit, comment me joindre. Les redirections (old-pages.json) visent ces ids.
export const SECTION_IDS = [
  "accueil",
  "manifeste",
  "parcours",
  "formation",
  "competences",
  "projets",
  "articles",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

// Sections proposées dans la navigation, dans l'ordre du récit, avec leur libellé (t.nav).
const NAV: { id: SectionId; key: keyof Translations["nav"] }[] = [
  { id: "parcours", key: "journey" },
  { id: "formation", key: "education" },
  { id: "competences", key: "skills" },
  { id: "projets", key: "projects" },
  { id: "articles", key: "blog" },
  { id: "contact", key: "contact" },
];

export type NavItem = { id: SectionId; label: string };

export function navItems(t: Translations): NavItem[] {
  return NAV.map(({ id, key }) => ({ id, label: t.nav[key] }));
}
