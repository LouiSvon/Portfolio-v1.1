// Textes du site, rangés comme la page unique : une entrée par section, dans l'ordre du récit.
// en.ts suit ce type : les deux langues ont donc toujours les mêmes clés.
export interface Translations {
  meta: {
    description: string;
  };
  nav: {
    home: string;
    sections: string;
    skills: string;
    blog: string;
    projects: string;
    journey: string;
    education: string;
    contact: string;
    skip: string;
    menu: string;
    close: string;
  };
  hero: {
    role: string;
    available: string;
    portraitAlt: string;
    cta: {
      cv: string;
      contact: string;
    };
  };
  brief: {
    introLead: string;
    // Groupes de mots de introLead mis en couleur à l'allumage (sous-chaînes exactes, vérifiées au build).
    introKeywords: string[];
    introText: string;
  };
  skills: {
    title: string;
    count: string;
  };
  projects: {
    title: string;
    viewCode: string;
    demo: string;
    featured: string;
    showOthers: string;
    hideOthers: string;
    noProjects: string;
    counter: string;
    filters: string;
    settings: string;
    sortBy: string;
    sortRecent: string;
    sortOldest: string;
    sortAZ: string;
    filter: string;
    filterFeatured: string;
    resetFilters: string;
  };
  journey: {
    title: string;
    subtitle: string;
    present: string;
    types: {
      professional: string;
      personal: string;
      volunteering: string;
    };
  };
  education: {
    title: string;
    studies: string;
    certifications: string;
    viewCertificate: string;
    inProgress: string;
    expires: string;
    downloadCV: string;
    openCV: string;
    linkedin: string;
  };
  articles: {
    readingTime: string;
    noArticles: string;
    backToArticles: string;
    tableOfContents: string;
    share: string;
    shareLink: string;
    linkCopied: string;
    publishedOn: string;
    comingSoon: string;
  };
  blog: {
    title: string;
    subtitle: string;
    read: string;
  };
  contact: {
    title: string;
    subtitle: string;
    availabilityText: string;
    unavailableText: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formMessageHint: string;
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
    successMessage: string;
    newMessage: string;
    errorMessage: string;
    formNotice: string;
    privacyLink: string;
  };
  footer: {
    navigationTitle: string;
    aboutTitle: string;
    aboutText: string;
    mentionsLegales: string;
    privacy: string;
    copyright: string;
  };
  legal: {
    title: string;
    lastUpdated: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
  };
  notFound: {
    title: string;
    back: string;
  };
  error: {
    title: string;
    retry: string;
  };
  language: {
    switch: string;
    label: string;
  };
}

const fr: Translations = {
  meta: {
    description:
      "Étudiant en 2e année de bachelor informatique à Epitech Marseille. Je conçois des applications web et des outils d'IA. Je cherche un stage de 3 mois à partir d'avril 2027, puis une alternance sur l'année 2027-2028.",
  },
  nav: {
    home: "Accueil",
    sections: "Sections de la page",
    skills: "Compétences",
    blog: "Blog",
    projects: "Projets",
    journey: "Parcours",
    education: "Formation",
    contact: "Contact",
    skip: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
  },
  hero: {
    role: "Étudiant en informatique, spécialité IA",
    available: "Stage dès avril 2027 · Alternance 2027-2028",
    portraitAlt: "Portrait de",
    cta: {
      cv: "Télécharger mon CV (PDF)",
      contact: "Me contacter",
    },
  },
  brief: {
    introLead: "Je transforme des idées en applications web et en outils d'IA qui servent vraiment.",
    introKeywords: ["applications web", "outils d'IA"],
    introText: "Étudiant à Epitech Marseille, je cherche un stage de 3 mois à partir d'avril 2027, puis une alternance sur l'année 2027-2028.",
  },
  skills: {
    title: "Compétences",
    count: "outils",
  },
  projects: {
    title: "Projets phares",
    viewCode: "Voir le code",
    demo: "Démo",
    featured: "Mis en avant",
    showOthers: "Voir tous les projets",
    hideOthers: "Réduire la liste",
    noProjects: "Les projets arrivent bientôt.",
    counter: "projet",
    filters: "Filtres et tri",
    settings: "Réglages des projets",
    sortBy: "Trier par",
    sortRecent: "Plus récent",
    sortOldest: "Plus ancien",
    sortAZ: "A → Z",
    filter: "Filtrer",
    filterFeatured: "Mis en avant",
    resetFilters: "Réinitialiser",
  },
  journey: {
    title: "Parcours",
    subtitle: "Études, expériences personnelles, bénévolat et parcours professionnel.",
    present: "Aujourd'hui",
    types: {
      professional: "Professionnel",
      personal: "Personnel",
      volunteering: "Bénévolat",
    },
  },
  education: {
    title: "Formation",
    studies: "Études",
    certifications: "Certifications",
    viewCertificate: "Voir le certificat →",
    inProgress: "En cours",
    expires: "Expire",
    downloadCV: "Télécharger le CV (PDF)",
    openCV: "Ouvrir",
    linkedin: "LinkedIn →",
  },
  articles: {
    readingTime: "min de lecture",
    noArticles: "Aucun article pour l'instant.",
    backToArticles: "Retour aux articles",
    tableOfContents: "Sommaire",
    share: "Partager :",
    shareLink: "Copier le lien",
    linkCopied: "Lien copié !",
    publishedOn: "Publié le",
    comingSoon: "Contenu bientôt disponible.",
  },
  blog: {
    title: "Blog",
    subtitle: "Ce que j'apprends sur les LLM, écrit pour être compris.",
    read: "Lire",
  },
  contact: {
    title: "Un stage à proposer ?",
    subtitle: "Une offre de stage ou d'alternance, une question : écrivez-moi.",
    availabilityText: "Je cherche un stage de 3 mois à partir d'avril 2027, puis une alternance sur l'année 2027-2028.",
    unavailableText: "Indisponible pour le moment, réponse sous 48h",
    formName: "Prénom",
    formEmail: "Email",
    formSubject: "Sujet",
    formMessage: "Message",
    formMessageHint: "50 caractères minimum",
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
    successMessage: "Merci pour votre message. Je vous répondrai rapidement.",
    newMessage: "Nouveau message",
    errorMessage: "Une erreur est survenue. Réessayez ou contactez-moi par email.",
    formNotice: "Vos informations servent uniquement à répondre à votre demande. Le message transite par Formspree. Vous pouvez demander l'accès ou la suppression de vos données par email.",
    privacyLink: "Politique de confidentialité",
  },
  footer: {
    navigationTitle: "Navigation",
    aboutTitle: "À propos",
    aboutText: "Étudiant en informatique à Epitech Marseille. Applications web et outils d'IA.",
    mentionsLegales: "Mentions légales",
    privacy: "Politique de confidentialité",
    copyright: "Louis Savon",
  },
  legal: {
    title: "Mentions légales",
    lastUpdated: "Dernière mise à jour",
  },
  privacy: {
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour",
  },
  notFound: {
    title: "Page introuvable",
    back: "Retour à l'accueil",
  },
  error: {
    title: "Une erreur est survenue",
    retry: "Réessayer",
  },
  language: {
    switch: "English",
    label: "Changer de langue",
  },
};

export default fr;
