import type { Translations } from "./fr";

const en: Translations = {
  nav: {
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    cv: "Resume",
    contact: "Contact",
  },
  hero: {
    greeting: "Louis Savon",
    role: "Full-Stack Developer",
    tagline:
      "I build modern, reliable, and well-crafted web applications.",
    cta: {
      projects: "View projects",
      cv: "Download resume",
      contact: "Get in touch",
    },
  },
  projects: {
    title: "Projects",
    subtitle: "Selected recent projects and open-source contributions.",
    featured: "Featured",
    allProjects: "All projects",
    viewOnGithub: "View on GitHub",
    viewDemo: "View demo",
    stars: "stars",
    forks: "forks",
    updatedOn: "Updated on",
    noProjects: "Projects coming soon.",
    errorLoading:
      "Could not load projects from GitHub. Please try again later.",
  },
  experience: {
    title: "Experience",
    subtitle: "Education, personal experiences, volunteering, and professional background.",
    professional: "Professional experience",
    personal: "Personal experience / volunteering",
    education: "Education",
    present: "Present",
    technologies: "Technologies",
  },
  cv: {
    title: "Resume",
    subtitle: "My background in detail.",
    download: "Download resume (PDF)",
    open: "Open resume",
    noFile:
      "The resume file will be available soon. In the meantime, check out my LinkedIn profile.",
    viewLinkedin: "View LinkedIn profile",
  },
  contact: {
    title: "Contact",
    subtitle: "A project, a question, or just want to chat.",
    intro:
      "Open to talking about a web project, an internship opportunity, or a tech collaboration.",
    email: "Send an email",
    availability: "Availability",
    availabilityText:
      "Open to freelance projects, collaborations, and developer opportunities.",
    channels: "Find me",
    or: "or find me on",
  },
  footer: {
    builtWith: "Built with Next.js and TypeScript.",
  },
  language: {
    switch: "Français",
    label: "Switch language",
  },
} as const;

export default en;
