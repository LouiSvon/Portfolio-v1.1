export interface Translations {
  nav: {
    home: string;
    projects: string;
    experience: string;
    cv: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    tagline: string;
    cta: {
      projects: string;
      cv: string;
      contact: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    featured: string;
    allProjects: string;
    viewOnGithub: string;
    viewDemo: string;
    stars: string;
    forks: string;
    updatedOn: string;
    noProjects: string;
    errorLoading: string;
  };
  experience: {
    title: string;
    subtitle: string;
    professional: string;
    personal: string;
    education: string;
    present: string;
    technologies: string;
  };
  cv: {
    title: string;
    subtitle: string;
    download: string;
    open: string;
    noFile: string;
    viewLinkedin: string;
  };
  contact: {
    title: string;
    subtitle: string;
    intro: string;
    email: string;
    availability: string;
    availabilityText: string;
    channels: string;
    or: string;
  };
  footer: {
    builtWith: string;
  };
  language: {
    switch: string;
    label: string;
  };
}

const fr: Translations = {
  nav: {
    home: "Accueil",
    projects: "Projets",
    experience: "Parcours",
    cv: "CV",
    contact: "Contact",
  },
  hero: {
    greeting: "Louis Savon",
    role: "Développeur Full-Stack",
    tagline:
      "Je conçois des applications web modernes, fiables et bien construites.",
    cta: {
      projects: "Voir mes projets",
      cv: "Télécharger mon CV",
      contact: "Me contacter",
    },
  },
  projects: {
    title: "Projets",
    subtitle: "Sélection de projets récents et contributions open-source.",
    featured: "Mis en avant",
    allProjects: "Tous les projets",
    viewOnGithub: "Voir sur GitHub",
    viewDemo: "Voir la démo",
    stars: "stars",
    forks: "forks",
    updatedOn: "Mis à jour le",
    noProjects: "Les projets arrivent bientôt.",
    errorLoading:
      "Impossible de charger les projets depuis GitHub. Réessayez plus tard.",
  },
  experience: {
    title: "Parcours",
    subtitle: "Études, expériences personnelles, bénévolat et parcours professionnel.",
    professional: "Expériences professionnelles",
    personal: "Expériences personnelles / bénévolat",
    education: "Études",
    present: "Aujourd\u2019hui",
    technologies: "Technologies",
  },
  cv: {
    title: "Curriculum Vitae",
    subtitle: "Mon parcours en détail.",
    download: "Télécharger le CV (PDF)",
    open: "Ouvrir le CV",
    noFile:
      "Le fichier CV sera bientôt disponible. En attendant, consultez mon profil LinkedIn.",
    viewLinkedin: "Voir mon profil LinkedIn",
  },
  contact: {
    title: "Contact",
    subtitle: "Un projet, une question, ou juste envie d\u2019échanger.",
    intro:
      "Disponible pour échanger autour d\u2019un projet web, d\u2019une opportunité de stage, ou d\u2019une collaboration tech.",
    email: "Envoyer un email",
    availability: "Disponibilité",
    availabilityText:
      "Ouvert aux projets freelance, collaborations et opportunités développeur.",
    channels: "Me retrouver",
    or: "ou retrouvez-moi sur",
  },
  footer: {
    builtWith: "Construit avec Next.js et TypeScript.",
  },
  language: {
    switch: "English",
    label: "Changer de langue",
  },
};

export default fr;
