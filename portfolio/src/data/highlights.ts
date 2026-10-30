import type { Locale } from "@/types";

// Projets mis en avant sur l'accueil. Textes tirés des README des dépôts : ne rien ajouter qui n'y figure pas.
export interface Highlight {
  repo: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  // Version courte du résumé, affichée sur l'accueil.
  tagline: Record<Locale, string>;
  kind: Record<Locale, string>;
  // Rôle tenu, affiché seulement s'il est prouvé (CV, README, dépôt). Absent : à demander, jamais deviné.
  role?: Record<Locale, string>;
  // Dépôt privé : carte sans lien.
  private?: boolean;
  // Projet du cursus Epitech : cité dans la fiche du diplôme (Formation).
  school?: boolean;
  // Couleurs propres au projet (lueur de la carte).
  colors: [string, string];
  stack: string[];
  // Capture d'écran à déposer dans public/projets/ (voir media) ; texte alternatif prévu d'avance.
  image?: string;
  imageAlt: Record<Locale, string>;
}

export const highlights: Highlight[] = [
  {
    repo: "cvrie",
    title: {
      fr: "CVRIE, IA médicale",
      en: "CVRIE, medical AI",
    },
    summary: {
      fr: "Un projet d'IA en équipe de deux : classification de cellules sanguines (BloodMNIST, F1 macro 0,850 sur le jeu de test) et regroupement non supervisé de 1011 témoignages de patients. Une hypothèse, « les niveaux de gris suffisent », testée puis réfutée.",
      en: "A two-person AI project: blood cell classification (BloodMNIST, macro F1 0.850 on the test set) and unsupervised grouping of 1,011 patient testimonials. One hypothesis, \"grayscale is enough\", tested then refuted.",
    },
    tagline: {
      fr: "Classer des cellules sanguines et regrouper des témoignages de patients avec scikit-learn.",
      en: "Classify blood cells and group patient testimonials with scikit-learn.",
    },
    kind: { fr: "IA · Projet Epitech", en: "AI · Epitech project" },
    school: true,
    colors: ["#ff5d73", "#9b6bff"],
    stack: ["Python", "scikit-learn", "pandas", "Jupyter"],
    imageAlt: {
      fr: "Aperçu du projet CVRIE : classification de cellules sanguines",
      en: "Preview of the CVRIE project: blood cell classification",
    },
  },
  {
    repo: "persona",
    private: true,
    title: {
      fr: "Newsletter personnalisée pilotée par un agent IA",
      en: "Personalized newsletter driven by an AI agent",
    },
    summary: {
      fr: "Une newsletter personnalisée sans interface : on parle à un agent IA conversationnel, qui apprend ses préférences. L'IA collecte, trie et résume les articles, puis envoie la newsletter par email au créneau choisi. Projet en équipe de deux, côté IA et côté cybersécurité.",
      en: "A personalized newsletter with no interface: you talk to a conversational AI agent that learns your preferences. The AI collects, sorts and summarizes articles, then emails the newsletter at the chosen time. Two-person project, AI side and cybersecurity side.",
    },
    tagline: {
      fr: "Un agent IA qui apprend vos préférences et envoie la newsletter au créneau choisi.",
      en: "An AI agent that learns your preferences and sends the newsletter at the chosen time.",
    },
    kind: { fr: "IA · Projet Epitech", en: "AI · Epitech project" },
    colors: ["#ffb454", "#ff5d73"],
    stack: ["N8N", "Docker"],
    imageAlt: {
      fr: "Aperçu du projet de newsletter personnalisée",
      en: "Preview of the personalized newsletter project",
    },
  },
  {
    repo: "starttrek",
    private: true,
    title: {
      fr: "Atterrissage autonome d'un module lunaire",
      en: "Autonomous lunar module landing",
    },
    summary: {
      fr: "Un module lunaire apprend à se poser seul (Lunar Lander) avec deux algorithmes d'apprentissage par renforcement, DQN et PPO. Sur 100 atterrissages jamais vus à l'entraînement, PPO en réussit en moyenne 99,7 et DQN 89 (seuil de réussite : 200 points). Projet en équipe de deux.",
      en: "A lunar module learns to land on its own (Lunar Lander) with two reinforcement learning algorithms, DQN and PPO. On 100 landings never seen during training, PPO succeeds on 99.7 on average and DQN on 89 (success threshold: 200 points). Two-person project.",
    },
    tagline: {
      fr: "Comparer deux algorithmes d'apprentissage par renforcement sur un atterrissage lunaire.",
      en: "Comparing two reinforcement learning algorithms on a lunar landing.",
    },
    kind: { fr: "IA · Projet Epitech", en: "AI · Epitech project" },
    colors: ["#2ee6a6", "#4f8cff"],
    stack: ["Python", "PyTorch"],
    imageAlt: {
      fr: "Aperçu du projet d'atterrissage lunaire",
      en: "Preview of the lunar landing project",
    },
  },
  {
    repo: "nextbuy",
    title: {
      fr: "NEXTBUY, comportement client",
      en: "NEXTBUY, customer behavior",
    },
    summary: {
      fr: "Un projet de data science en équipe de deux : nettoyage de données e-commerce, analyse exploratoire, segmentation de clients par clustering et modèles pour prédire la taille du panier.",
      en: "A two-person data science project: cleaning e-commerce data, exploratory analysis, customer segmentation by clustering, and models to predict basket size.",
    },
    tagline: {
      fr: "Des données e-commerce brutes à la segmentation de clients et à la prédiction du panier.",
      en: "From raw e-commerce data to customer segmentation and basket size prediction.",
    },
    kind: { fr: "Data · Projet Epitech", en: "Data · Epitech project" },
    school: true,
    colors: ["#2ee6a6", "#00b3ff"],
    stack: ["Python", "scikit-learn", "pandas", "Jupyter"],
    imageAlt: {
      fr: "Aperçu du projet NEXTBUY : analyse de données e-commerce",
      en: "Preview of the NEXTBUY project: e-commerce data analysis",
    },
  },
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
    tagline: {
      fr: "Gérer les adhérents de l'association et vérifier une carte de membre par QR code signé.",
      en: "Manage the association's members and verify a membership card through a signed QR code.",
    },
    kind: { fr: "Web · Association", en: "Web · Association" },
    // CV : « Bénévole, Google Developer Group (GDG) Marseille : développement d'une carte membre numérique ».
    role: { fr: "Développeur bénévole au GDG Marseille", en: "Volunteer developer at GDG Marseille" },
    colors: ["#4f8cff", "#9b6bff"],
    stack: ["Next.js", "TypeScript", "SQLite", "Supabase", "Vitest"],
    imageAlt: {
      fr: "Capture d'écran de la carte de membre GDG Marseille",
      en: "Screenshot of the GDG Marseille membership card",
    },
  },
  {
    repo: "claude-code-mods",
    title: {
      fr: "Mods pour Claude Code",
      en: "Mods for Claude Code",
    },
    summary: {
      fr: "Deux mods pour l'application Claude Code : une barre des tâches qui montre ce que font les agents, et une ligne d'état. Le travail des agents devient lisible d'un coup d'oeil.",
      en: "Two mods for the Claude Code app: a task bar showing what agents are doing, and a status line. Agent work becomes readable at a glance.",
    },
    tagline: {
      fr: "Voir d'un coup d'oeil ce que font les agents de Claude Code.",
      en: "See at a glance what Claude Code agents are doing.",
    },
    kind: { fr: "Outil développeur", en: "Developer tool" },
    role: { fr: "Auteur", en: "Author" },
    colors: ["var(--accent-violet)", "#ff3d7f"],
    stack: ["TypeScript"],
    imageAlt: {
      fr: "Aperçu de la barre des tâches des agents Claude Code",
      en: "Preview of the Claude Code agents task bar",
    },
  },
];
