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
}

export interface Experience {
  company: string;
  role: Record<Locale, string>;
  startDate: string;
  endDate: string | null;
  description: Record<Locale, string>;
  technologies: string[];
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

export interface Resource {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  type: "pdf" | "template" | "video" | "other";
  tags: string[];
  date: string; // YYYY-MM-DD
  free: boolean;
  filename?: string; // /resources/filename — email-gated
  url?: string; // direct link if free
  linkedArticleSlug?: string;
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
  linkedResource?: {
    title: Record<Locale, string>;
    filename: string; // public/resources/filename.pdf
  };
}
