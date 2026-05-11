import type { Resource } from "@/types";

export const resources: Resource[] = [
  {
    id: "guide-llm-debutants",
    title: {
      fr: "Guide pratique des LLM pour débutants",
      en: "Practical LLM Guide for Beginners",
    },
    description: {
      fr: "Comprendre les grands modèles de langage, formuler de bons prompts et éviter les erreurs courantes. PDF de 24 pages.",
      en: "Understand large language models, write effective prompts, and avoid common mistakes. 24-page PDF.",
    },
    type: "pdf",
    tags: ["LLM", "IA", "Prompting"],
    date: "2025-04-15",
    free: false,
    filename: "guide-llm-debutants.pdf",
    linkedArticleSlug: "guide-llm-debutants",
  },
  {
    id: "prompt-templates",
    title: {
      fr: "Collection de prompts — 30 templates prêts à l'emploi",
      en: "Prompt Collection — 30 Ready-to-Use Templates",
    },
    description: {
      fr: "30 prompts structurés pour les cas d'usage les plus fréquents : résumé, code, rédaction, analyse. Format Markdown.",
      en: "30 structured prompts for the most common use cases: summary, code, writing, analysis. Markdown format.",
    },
    type: "template",
    tags: ["LLM", "Prompting", "Templates"],
    date: "2025-03-10",
    free: true,
    url: "/resources/prompt-templates.md",
  },
];

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}
