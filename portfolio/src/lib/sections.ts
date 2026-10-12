import type { Translations } from "@/i18n/fr";

// Ancres de la page unique, dans l'ordre du récit. Les redirections (next.config.ts) visent ces ids.
export const SECTION_IDS = [
  "accueil",
  "en-bref",
  "competences",
  "projets",
  "parcours",
  "formation",
  "articles",
  "maintenant",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

// Sections proposées dans la navigation, avec leur libellé (t.nav).
const NAV: { id: SectionId; key: keyof Translations["nav"] }[] = [
  { id: "projets", key: "projects" },
  { id: "parcours", key: "journey" },
  { id: "formation", key: "education" },
  { id: "articles", key: "articles" },
  { id: "contact", key: "contact" },
];

export type NavItem = { id: SectionId; label: string };

export function navItems(t: Translations): NavItem[] {
  return NAV.map(({ id, key }) => ({ id, label: t.nav[key] }));
}
