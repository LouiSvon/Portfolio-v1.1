export interface Translations {
  nav: {
    home: string;
    projects: string;
    blog: string;
    about: string;
    contact: string;
    cv: string;
    skip: string;
    menu: string;
    close: string;
  };
  hero: {
    greeting: string;
    role: string;
    tagline: string;
    cta: {
      projects: string;
      resources: string;
      about: string;
      contact: string;
      cv: string;
    };
    pathA: string;
    pathB: string;
  };
  features: {
    sectionTitle: string;
    projects: { title: string; description: string };
    articles: { title: string; description: string };
  };
  latestAdds: {
    sectionTitle: string;
    latestArticle: string;
    latestProject: string;
    readArticle: string;
    viewProject: string;
    minRead: string;
  };
  manifeste: {
    text: string;
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
    filterAll: string;
    filterFeatured: string;
    sortRecent: string;
    sortAZ: string;
    sortType: string;
    counter: string;
    counterFiltered: string;
    resetFilters: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readingTime: string;
    noArticles: string;
    noResults: string;
    backToBlog: string;
    tableOfContents: string;
    shareLink: string;
    linkCopied: string;
    filterAll: string;
    tags: string;
    publishedOn: string;
    searchPlaceholder: string;
  };
  about: {
    title: string;
    subtitle: string;
    tagline: string;
    anchorCV: string;
    anchorCompetences: string;
    anchorParcours: string;
    anchorCertifications: string;
    anchorEtudes: string;
    anchorBenevol: string;
    anchorIntro: string;
    skillsTitle: string;
    skillsFrontend: string;
    skillsBackend: string;
    skillsTools: string;
    downloadCV: string;
    openCV: string;
    noCV: string;
    viewLinkedin: string;
    viewCertificate: string;
    inProgress: string;
    expires: string;
    fetching: string;
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
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formMessageHint: string;
    formSource: string;
    ratingLabel: string;
    subjectOptions: {
      placeholder: string;
      internship: string;
      collaboration: string;
      article: string;
      partnership: string;
      other: string;
    };
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
    formNotice: string;
    privacyLink: string;
  };
  footer: {
    builtWith: string;
    navigationTitle: string;
    legalTitle: string;
    aboutTitle: string;
    aboutText: string;
    mentionsLegales: string;
    privacy: string;
    copyright: string;
    madeWithCare: string;
    accentLabel: string;
  };
  legal: {
    title: string;
    lastUpdated: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
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
    blog: "Blog",
    about: "À propos",
    contact: "Contact",
    cv: "CV",
    skip: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
  },
  hero: {
    greeting: "Louis Savon",
    role: "Étudiant en informatique, full-stack et IA",
    tagline:
      "2e année de bachelor à Epitech Marseille. Je conçois des applications web et des outils d'IA. Je cherche un stage de 3 mois à partir d'avril 2027, puis une alternance sur l'année 2027-2028.",
    cta: {
      projects: "Voir les projets",
      resources: "Lire le blog",
      about: "Mon parcours",
      contact: "Me contacter",
      cv: "Télécharger mon CV (PDF)",
    },
    pathA: "Découvrir mon profil",
    pathB: "Voir mes projets",
  },
  features: {
    sectionTitle: "Ce que vous trouverez ici",
    projects: {
      title: "Projets",
      description: "Widgets, sites et outils construits et testables. Du no-code à l'API LLM.",
    },
    articles: {
      title: "Articles",
      description: "Notes sur les LLM et le prompt engineering.",
    },
  },
  latestAdds: {
    sectionTitle: "En ce moment",
    latestArticle: "Dernier article",
    latestProject: "Dernier projet mis à jour",
    readArticle: "Lire",
    viewProject: "Voir sur GitHub",
    minRead: "min de lecture",
  },
  manifeste: {
    text: "Ce site rassemble ce que je construis et ce que j'apprends.",
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
    errorLoading: "Impossible de charger les projets.",
    filterAll: "Tous",
    filterFeatured: "Mis en avant",
    sortRecent: "Plus récent",
    sortAZ: "A–Z",
    sortType: "Par type",
    counter: "projet",
    counterFiltered: "affiché",
    resetFilters: "Réinitialiser",
  },
  blog: {
    title: "Blog",
    subtitle: "Articles sur le développement web et l'IA.",
    readingTime: "min de lecture",
    noArticles: "Aucun article pour l'instant.",
    noResults: "Aucun résultat pour cette recherche.",
    backToBlog: "← Retour au blog",
    tableOfContents: "Sommaire",
    shareLink: "Copier le lien",
    linkCopied: "Lien copié !",
    filterAll: "Tous",
    tags: "Tags",
    publishedOn: "Publié le",
    searchPlaceholder: "Rechercher…",
  },
  about: {
    title: "À propos",
    subtitle: "Étudiant en informatique à Epitech Marseille.",
    tagline: "Étudiant en informatique, Epitech Marseille. Recherche un stage puis une alternance.",
    anchorCV: "CV",
    anchorCompetences: "Compétences",
    anchorParcours: "Parcours",
    anchorCertifications: "Certifications",
    anchorEtudes: "Études",
    anchorBenevol: "Bénévolat",
    anchorIntro: "Intro",
    skillsTitle: "Compétences",
    skillsFrontend: "Frontend",
    skillsBackend: "Backend",
    skillsTools: "Outils",
    downloadCV: "Télécharger le CV (PDF)",
    openCV: "Ouvrir",
    noCV: "Le CV sera disponible prochainement. Consultez mon LinkedIn en attendant.",
    viewLinkedin: "LinkedIn →",
    viewCertificate: "Voir le diplôme →",
    inProgress: "En cours",
    expires: "Expire",
    fetching: "Chargement des langages GitHub…",
  },
  experience: {
    title: "Parcours",
    subtitle: "Études, expériences personnelles, bénévolat et parcours professionnel.",
    professional: "Expériences professionnelles",
    personal: "Expériences personnelles / bénévolat",
    education: "Études",
    present: "Aujourd'hui",
    technologies: "Technologies",
  },
  cv: {
    title: "Curriculum Vitae",
    subtitle: "Mon parcours en détail.",
    download: "Télécharger le CV (PDF)",
    open: "Ouvrir le CV",
    noFile: "Le fichier CV sera bientôt disponible.",
    viewLinkedin: "Voir mon profil LinkedIn",
  },
  contact: {
    title: "Contact",
    subtitle: "Une offre de stage ou d'alternance, une question : écris-moi.",
    intro: "Je cherche un stage de 3 mois à partir d'avril 2027, puis une alternance sur l'année 2027-2028.",
    email: "Envoyer un email",
    availability: "Disponibilité",
    availabilityText: "Je cherche un stage de 3 mois à partir d'avril 2027, puis une alternance sur l'année 2027-2028.",
    channels: "Me retrouver",
    or: "ou",
    formName: "Prénom",
    formEmail: "Email",
    formSubject: "Sujet",
    formMessage: "Message",
    formMessageHint: "50 caractères minimum",
    formSource: "Comment avez-vous trouvé ce site ? (optionnel)",
    ratingLabel: "Avez-vous aimé le site ?",
    subjectOptions: {
      placeholder: "Choisissez un sujet",
      internship: "Offre de stage ou d'alternance",
      collaboration: "Collaboration sur un projet",
      article: "Retour sur un article",
      partnership: "Proposition / partenariat",
      other: "Autre",
    },
    submit: "Envoyer le message",
    submitting: "Envoi en cours…",
    successTitle: "Message envoyé !",
    successMessage: "Merci pour votre message. Je vous répondrai rapidement.",
    errorMessage: "Une erreur est survenue. Réessayez ou contactez-moi par email.",
    formNotice: "Vos informations servent uniquement à répondre à votre demande. Le message transite par Formspree. Vous pouvez demander l'accès ou la suppression de vos données par email.",
    privacyLink: "Politique de confidentialité",
  },
  footer: {
    builtWith: "Construit avec Next.js et TypeScript.",
    navigationTitle: "Navigation",
    legalTitle: "Légal",
    aboutTitle: "À propos",
    aboutText: "Étudiant en informatique à Epitech Marseille. Applications web et outils d'IA.",
    mentionsLegales: "Mentions légales",
    privacy: "Politique de confidentialité",
    copyright: "Louis Savon",
    madeWithCare: "Fait avec soin",
    accentLabel: "Couleur d'accent",
  },
  legal: {
    title: "Mentions légales",
    lastUpdated: "Dernière mise à jour",
  },
  privacy: {
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour",
  },
  language: {
    switch: "English",
    label: "Changer de langue",
  },
};

export default fr;
