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
    "Taxe-calculator": {
      description: {
        fr: "Application web de calcul de taxes avec une interface simple, rapide et orientée usage.",
        en: "Tax calculation web app with a simple, fast, user-focused interface.",
      },
    },
  },
};
