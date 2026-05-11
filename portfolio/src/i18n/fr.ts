export interface Translations {
  nav: {
    home: string;
    projects: string;
    blog: string;
    about: string;
    contact: string;
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
    };
    pathA: string;
    pathB: string;
  };
  features: {
    sectionTitle: string;
    projects: { title: string; description: string };
    resources: { title: string; description: string };
    articles: { title: string; description: string };
  };
  latestAdds: {
    sectionTitle: string;
    latestArticle: string;
    latestResource: string;
    latestProject: string;
    readArticle: string;
    downloadResource: string;
    viewProject: string;
    minRead: string;
  };
  stats: {
    sectionTitle: string;
    sites: string;
    conferences: string;
    opportunities: string;
    community: string;
  };
  manifeste: {
    text: string;
  };
  latestResources: {
    sectionTitle: string;
    free: string;
    emailGated: string;
    access: string;
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
    relatedResource: string;
    downloadPDF: string;
    filterAll: string;
    tags: string;
    publishedOn: string;
    tabArticles: string;
    tabResources: string;
    searchPlaceholder: string;
    resourceFree: string;
    resourceEmailGated: string;
    resourceTypes: {
      pdf: string;
      template: string;
      video: string;
      other: string;
    };
    downloadResource: string;
    accessResource: string;
  };
  resources: {
    gateTitle: string;
    gateDescription: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    downloadLink: string;
    noSpam: string;
    modalClose: string;
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
      collaboration: string;
      resource: string;
      article: string;
      partnership: string;
      other: string;
    };
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
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
    menu: "Menu",
    close: "Fermer",
  },
  hero: {
    greeting: "Louis Savon",
    role: "Développeur Full-Stack",
    tagline:
      "Je construis des outils web et partage mes recherches sur les LLM.",
    cta: {
      projects: "Voir les projets",
      resources: "Lire le blog",
      about: "Mon parcours",
      contact: "Me contacter",
    },
    pathA: "Découvrir mon profil",
    pathB: "Explorer le blog & ressources",
  },
  features: {
    sectionTitle: "Ce que vous trouverez ici",
    projects: {
      title: "Projets",
      description: "Widgets, sites et outils construits et testables. Du no-code à l'API LLM.",
    },
    resources: {
      title: "Ressources",
      description: "Guides PDF pratiques pour comprendre et utiliser les LLM. Téléchargeables.",
    },
    articles: {
      title: "Articles",
      description: "Notes de recherche et explorations publiées régulièrement.",
    },
  },
  latestAdds: {
    sectionTitle: "En ce moment",
    latestArticle: "Dernier article",
    latestResource: "Dernière ressource",
    latestProject: "Dernier projet mis à jour",
    readArticle: "Lire",
    downloadResource: "Accéder",
    viewProject: "Voir sur GitHub",
    minRead: "min de lecture",
  },
  stats: {
    sectionTitle: "En chiffres",
    sites: "Sites livrés",
    conferences: "Conférences organisées",
    opportunities: "Opportunités générées",
    community: "Personnes accompagnées (crypto)",
  },
  manifeste: {
    text: "Ce site n'est pas un CV statique. C'est un espace de travail ouvert : j'y documente ce que j'apprends, partage ce que je construis et publie les ressources que j'aurais voulu trouver plus tôt.",
  },
  latestResources: {
    sectionTitle: "Dernières ressources",
    free: "Gratuit",
    emailGated: "Sur email",
    access: "Accéder →",
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
    subtitle: "Articles, guides et ressources sur le développement web et l'IA.",
    readingTime: "min de lecture",
    noArticles: "Aucun article pour l'instant.",
    noResults: "Aucun résultat pour cette recherche.",
    backToBlog: "← Retour au blog",
    tableOfContents: "Sommaire",
    shareLink: "Copier le lien",
    linkCopied: "Lien copié !",
    relatedResource: "Ressource liée",
    downloadPDF: "Télécharger le guide PDF",
    filterAll: "Tous",
    tags: "Tags",
    publishedOn: "Publié le",
    tabArticles: "Articles",
    tabResources: "Ressources & Guides",
    searchPlaceholder: "Rechercher…",
    resourceFree: "Gratuit",
    resourceEmailGated: "Sur email",
    resourceTypes: {
      pdf: "PDF",
      template: "Template",
      video: "Vidéo",
      other: "Autre",
    },
    downloadResource: "Télécharger",
    accessResource: "Accéder",
  },
  resources: {
    gateTitle: "Recevoir le guide gratuitement",
    gateDescription: "Entrez votre email pour recevoir le lien de téléchargement.",
    emailPlaceholder: "votre@email.com",
    submit: "Recevoir le PDF",
    submitting: "Envoi en cours…",
    successTitle: "C'est parti !",
    successMessage: "Le lien de téléchargement vous a été envoyé.",
    downloadLink: "Télécharger maintenant",
    noSpam: "Pas de spam. Désabonnement en 1 clic.",
    modalClose: "Fermer",
  },
  about: {
    title: "À propos",
    subtitle: "Développeur full-stack basé à Marseille.",
    tagline: "Développeur Full-Stack · Freelance · Epitech",
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
    subtitle: "Un projet, une question, ou juste envie d'échanger.",
    intro: "Disponible pour des projets web, des collaborations ou des opportunités.",
    email: "Envoyer un email",
    availability: "Disponibilité",
    availabilityText: "Ouvert aux projets freelance, collaborations et opportunités développeur.",
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
      collaboration: "Collaboration sur un projet",
      resource: "Question sur une ressource",
      article: "Retour sur un article",
      partnership: "Proposition / partenariat",
      other: "Autre",
    },
    submit: "Envoyer le message",
    submitting: "Envoi en cours…",
    successTitle: "Message envoyé !",
    successMessage: "Merci pour votre message. Je vous répondrai rapidement.",
    errorMessage: "Une erreur est survenue. Réessayez ou contactez-moi par email.",
  },
  footer: {
    builtWith: "Construit avec Next.js et TypeScript.",
    navigationTitle: "Navigation",
    legalTitle: "Légal",
    aboutTitle: "À propos",
    aboutText: "Développeur full-stack à Marseille. Outils web et recherches sur les LLM.",
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
