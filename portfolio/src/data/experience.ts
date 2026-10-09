import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Epitech — L'école de l'excellence informatique",
    role: { fr: "Étudiant", en: "Student" },
    startDate: "2025-09",
    endDate: null,
    description: {
      fr: "Bachelor informatique en pédagogie par projets : développement web, systèmes, données et IA. Une approche centrée sur des produits concrets : comprendre un besoin, structurer une solution, puis l'implémenter.",
      en: "Computer science bachelor with project-based learning: web development, systems, data and AI. An approach centered on concrete products: understanding a need, structuring a solution, then implementing it.",
    },
    technologies: ["Python", "Développement web", "IA"],
    type: "education",
  },
  {
    company: "Projets entrepreneuriaux personnels",
    role: { fr: "Web et crypto", en: "Web and crypto" },
    startDate: "2022-01",
    endDate: "2022-12",
    description: {
      fr: "Projets menés à titre personnel : conception et mise en ligne de sites web, organisation d'événements autour de la crypto, accompagnement de personnes débutantes sur la crypto. J'y ai appris à comprendre un besoin, à organiser, à parler devant un public et à tenir un engagement sans cadre formel.",
      en: "Personal projects: designing and launching websites, organizing crypto events, supporting beginners in crypto. I learned to understand a need, organize, speak in front of an audience and keep a commitment without a formal framework.",
    },
    technologies: ["Développement web", "Organisation", "Prise de parole"],
    type: "personal",
  },
  {
    company: "Picard Surgelés",
    role: { fr: "Employé polyvalent", en: "Versatile Employee" },
    startDate: "2024-09",
    endDate: "2025-06",
    description: {
      fr: "Gestion d'un magasin avec forte autonomie dans un environnement isolé, parfois seul responsable. Responsabilité directe, gestion opérationnelle d'un point de vente, relation client dans un cadre exigeant.",
      en: "Store management with strong autonomy in an isolated environment, often the sole person in charge. Direct responsibility, operational management of a retail point of sale, customer relations in a demanding context.",
    },
    technologies: ["Gestion des stocks", "Mise en rayon", "Relation client"],
    type: "professional",
  },
  {
    company: "CryptoRizon",
    role: { fr: "Responsable marketing (à distance)", en: "Marketing Manager (remote)" },
    startDate: "2023-12",
    endDate: "2024-02",
    description: {
      fr: "Marketing d'un projet média crypto d'un créateur de vidéos, mené à distance pendant mon voyage. Structuration d'une audience, construction d'une ligne éditoriale, compréhension des leviers de croissance communautaire.",
      en: "Marketing for a crypto media project run by a video creator, done remotely while travelling. Building an audience, an editorial line, and understanding community growth levers.",
    },
    technologies: ["Blockchain", "Cryptomonnaie", "Marketing digital"],
    type: "professional",
  },
  {
    company: "Pause professionnelle",
    role: { fr: "Voyage", en: "Travel" },
    startDate: "2023-08",
    endDate: "2024-09",
    description: {
      fr: "Voyage long format en autonomie totale à travers l'Europe et un mois au Vietnam. GR20, Tour du Mont-Blanc, GR58 et GR738 en fastpacking / ultra-light.",
      en: "Long-form solo travel across Europe and one month in Vietnam. GR20, Tour du Mont-Blanc, GR58 and GR738 in fastpacking / ultra-light mode.",
    },
    technologies: ["Adaptabilité", "Autonomie"],
    type: "personal",
  },
  {
    company: "SuperValu",
    role: { fr: "Conseiller ventes — Irlande", en: "Sales Advisor — Ireland" },
    startDate: "2022-11",
    endDate: "2022-11",
    description: {
      fr: "Première immersion professionnelle dans un environnement international dans le cadre d'un Erasmus à Dublin. Travail en équipe multiculturelle, adaptation rapide (langue, rythme, méthodes).",
      en: "First professional immersion in an international environment through an Erasmus program in Dublin. Multicultural teamwork, rapid adaptation (language, pace, methods).",
    },
    technologies: ["Anglais", "Satisfaction client"],
    type: "professional",
  },
  {
    company: "Yellow Monkeys",
    role: { fr: "Stagiaire marketing", en: "Marketing Intern" },
    startDate: "2021-07",
    endDate: "2021-07",
    description: {
      fr: "Premier stage en marketing.",
      en: "First marketing internship.",
    },
    technologies: ["Marketing"],
    type: "professional",
  },
];
