export type Locale = "fr" | "en";

export interface Profile {
  name: string;
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
  bio: Record<Locale, string>;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  blog?: string;
  available?: boolean;
  cvFile: string;
}

export interface Experience {
  company: Record<Locale, string>;
  role: Record<Locale, string>;
  startDate: string;
  endDate: string | null;
  description: Record<Locale, string>;
  technologies: string[];
  // Compétences non techniques, traduites (emplois hors informatique).
  skills?: Record<Locale, string[]>;
  // Site de la structure, liens à l'appui (chaîne, article…) et photos (dans public/).
  companyUrl?: string;
  links?: { label: Record<Locale, string>; url: string }[];
  images?: { src: string; alt: Record<Locale, string> }[];
  // Phrases clés mises en valeur : sous-chaînes exactes de la description (vérifiées au build).
  highlights?: Record<Locale, string[]>;
  type: "professional" | "personal" | "volunteering" | "education";
}

export interface ProjectOverride {
  description?: Record<Locale, string>;
  image?: string;
  demo?: string;
  order?: number;
}

export interface ProjectsConfig {
  featured: string[];
  hidden: string[];
  overrides: Record<string, ProjectOverride>;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  homepage: string | null;
  fork: boolean;
}

export interface Project {
  name: string;
  url: string;
  description: string | null;
  customDescription?: Record<Locale, string>;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  demo: string | null;
  image?: string;
  featured: boolean;
  order: number;
}

export interface Social {
  name: string;
  url: string;
  label: string;
}

export interface Certification {
  titre: Record<Locale, string>;
  organisme: string;
  date: string | null;
  expiration?: string;
  lien: string | null;
  competences: string[];
  statut: "obtenu" | "en_cours";
  logo?: "bitcoin" | "google" | "notion";
}

export interface CertificationSecteur {
  secteur: Record<Locale, string>;
  logo?: "bitcoin" | "google" | "notion";
  certifs: Certification[];
}

export interface Benevol {
  titre: Record<Locale, string>;
  structure: string;
  periode: Record<Locale, string>;
  domaine: Record<Locale, string>;
  description: Record<Locale, string>;
  // Phrases clés mises en valeur : sous-chaînes exactes de la description (vérifiées au build).
  highlights?: Record<Locale, string[]>;
}

export interface ArticleTocEntry {
  id: string;
  text: Record<Locale, string>;
  level: 2 | 3;
}

export interface Article {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  date: string; // YYYY-MM-DD
  tags: string[];
  readingTime: number; // minutes
  toc?: ArticleTocEntry[];
}
