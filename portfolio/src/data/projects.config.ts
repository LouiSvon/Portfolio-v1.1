import { ProjectsConfig } from "@/types";

export const projectsConfig: ProjectsConfig = {
  featured: ["TokenTrex"],
  hidden: [],
  overrides: {
    "TokenTrex": {
      description: {
        fr: "Widget macOS qui affiche ma consommation de tokens Claude en temps réel dans la barre de menu, avec un T-Rex animé en pixel art.",
        en: "macOS menu bar widget that tracks Claude token usage in real time, with an animated pixel art T-Rex.",
      },
    },
    "Halo-widget": {
      description: {
        fr: "Widget macOS minimaliste dans l'encoche : titre Spotify en cours et appareils Bluetooth, façon Dynamic Island.",
        en: "Minimal macOS notch widget: Spotify now playing and Bluetooth devices, Dynamic Island style.",
      },
    },
    "life-in-weeks.widget": {
      description: {
        fr: "Visualisation de ta vie en semaines, widget Übersicht pour macOS.",
        en: "Your life visualized in weeks, an Übersicht widget for macOS.",
      },
    },
    "Portfolio": {
      description: {
        fr: "Portfolio web interactif développé pour démontrer mes compétences en développement full-stack. Le projet inclut un backend et une architecture évolutive.",
        en: "Interactive web portfolio built to demonstrate my full-stack development skills. The project includes a backend and a scalable architecture.",
      },
    },
    "Portfolio-v1.1": {
      description: {
        fr: "Ce portfolio : Next.js, TypeScript, bilingue français et anglais.",
        en: "This portfolio: Next.js, TypeScript, bilingual French and English.",
      },
    },
    "Taxe-calculator": {
      description: {
        fr: "Application web de calcul de taxes avec une interface simple, rapide et orientée usage.",
        en: "Tax calculation web app with a simple, fast, user-focused interface.",
      },
    },
  },
};
