import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Epitech — L'école de l'excellence informatique",
    role: { fr: "Étudiant", en: "Student" },
    startDate: "2025-09",
    endDate: null,
    description: {
      fr: "Formation en intelligence artificielle dans un environnement orienté projet et exécution. Développement d'une approche centrée sur la création de produits concrets : comprendre un besoin, structurer une solution, et aller jusqu'à l'implémentation technique (full-stack, systèmes, données).",
      en: "AI-focused training in a project-driven environment. Building an approach centered on concrete product creation: understanding a need, structuring a solution, and implementing it technically (full-stack, systems, data).",
    },
    technologies: ["Python", "Développement web", "IA"],
    type: "education",
  },
  {
    company: "Indépendant",
    role: { fr: "Freelance", en: "Freelancer" },
    startDate: "2022-01",
    endDate: null,
    description: {
      fr: "Création de produits digitaux et accompagnement de projets entrepreneuriaux. Conception et mise en ligne de 5+ sites web. Contribution à la génération de 1,8M€+ d'opportunités sur 12 mois. Organisation de 50+ conférences. Accompagnement de plus de 150 personnes sur la crypto. Création d'un club privé finance/crypto/blockchain (20–35 membres actifs).",
      en: "Building digital products and supporting entrepreneurial projects. Designed and shipped 5+ websites. Contributed to generating €1.8M+ in opportunities over 12 months. Organized 50+ conferences. Guided 150+ people on crypto. Founded a private finance/crypto/blockchain club (20–35 active members).",
    },
    technologies: ["Développement web", "Business", "Gestion d'équipe", "Leadership"],
    type: "professional",
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
    role: { fr: "Responsable marketing", en: "Marketing Manager" },
    startDate: "2023-12",
    endDate: "2024-02",
    description: {
      fr: "Marketing d'un projet média crypto dépassant les 40 000 personnes. Structuration d'une audience, construction d'une ligne éditoriale, compréhension des leviers de croissance communautaire.",
      en: "Marketing for a crypto media project with over 40,000 followers. Building an audience structure, editorial line, and understanding community growth levers.",
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
