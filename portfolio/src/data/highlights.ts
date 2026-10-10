import type { Locale } from "@/types";

// Projets mis en avant sur l'accueil. Textes tirés des README des dépôts : ne rien ajouter qui n'y figure pas.
export interface Highlight {
  repo: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  stack: string[];
}

export const highlights: Highlight[] = [
  {
    repo: "pass-gdg",
    title: {
      fr: "Carte de membre GDG Marseille",
      en: "GDG Marseille membership card",
    },
    summary: {
      fr: "Une carte de membre numérique pour l'association, vérifiable par QR code signé, avec un tableau de bord pour gérer les membres et les présences aux événements.",
      en: "A digital membership card for the association, verifiable through a signed QR code, with a dashboard to manage members and event check-ins.",
    },
    stack: ["Next.js", "TypeScript", "Supabase", "Vitest"],
  },
  {
    repo: "jobaggregator",
    title: {
      fr: "Agrégateur d'offres d'emploi",
      en: "Job offer aggregator",
    },
    summary: {
      fr: "Une plateforme qui rassemble des offres d'emploi, les rend cherchables avec des filtres, et propose un tableau de bord avec statistiques du marché et recommandations. Projet du cursus Epitech.",
      en: "A platform that gathers job offers, makes them searchable with filters, and offers a dashboard with market statistics and recommendations. Epitech curriculum project.",
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    repo: "TokenTrex",
    title: {
      fr: "TokenTrex",
      en: "TokenTrex",
    },
    summary: {
      fr: "Une application macOS qui affiche dans la barre de menu la consommation d'un abonnement d'IA, avec un T-Rex animé qui change d'état selon l'usage.",
      en: "A macOS app that shows an AI subscription's usage in the menu bar, with an animated T-Rex whose state follows usage.",
    },
    stack: ["Swift", "SwiftUI", "AppKit"],
  },
];
