import type { Article } from "@/types";

export const articles: Article[] = [
  {
    slug: "guide-llm-debutants",
    title: {
      fr: "Guide pratique des LLM pour débutants",
      en: "Practical LLM Guide for Beginners",
    },
    summary: {
      fr: "Un tour d'horizon des grands modèles de langage : ce qu'ils font vraiment, comment les utiliser efficacement, et les pièges à éviter au quotidien.",
      en: "An overview of large language models: what they actually do, how to use them effectively, and common daily pitfalls to avoid.",
    },
    date: "2025-04-15",
    tags: ["LLM", "IA", "Guide"],
    readingTime: 8,
    toc: [
      { id: "quest-ce-quun-llm", text: { fr: "Qu'est-ce qu'un LLM ?", en: "What is an LLM?" }, level: 2 },
      { id: "bien-formuler-ses-prompts", text: { fr: "Bien formuler ses prompts", en: "Writing effective prompts" }, level: 2 },
      { id: "erreurs-classiques", text: { fr: "Erreurs classiques à éviter", en: "Common mistakes to avoid" }, level: 2 },
      { id: "pour-aller-plus-loin", text: { fr: "Pour aller plus loin", en: "Going further" }, level: 2 },
    ],
    linkedResource: {
      title: {
        fr: "Guide PDF — LLM pour débutants",
        en: "PDF Guide — LLM for Beginners",
      },
      filename: "guide-llm-debutants.pdf",
    },
  },
  {
    slug: "prompt-engineering-avance",
    title: {
      fr: "Prompt engineering avancé : techniques et patterns",
      en: "Advanced Prompt Engineering: Techniques and Patterns",
    },
    summary: {
      fr: "Chain-of-thought, few-shot learning, sortie structurée — les techniques qui font vraiment la différence dans vos interactions avec les LLM.",
      en: "Chain-of-thought, few-shot learning, structured output — the techniques that actually make a difference in your LLM interactions.",
    },
    date: "2025-03-28",
    tags: ["LLM", "Prompting", "IA"],
    readingTime: 12,
    toc: [
      { id: "chain-of-thought", text: { fr: "Chain-of-thought prompting", en: "Chain-of-thought prompting" }, level: 2 },
      { id: "few-shot-learning", text: { fr: "Few-shot learning", en: "Few-shot learning" }, level: 2 },
      { id: "sortie-structuree", text: { fr: "Sortie structurée (JSON mode)", en: "Structured output (JSON mode)" }, level: 2 },
      { id: "combiner-les-techniques", text: { fr: "Combiner les techniques", en: "Combining techniques" }, level: 2 },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getLatestArticle(): Article | undefined {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function getLatestResource(): Article | undefined {
  return [...articles]
    .filter((a) => a.linkedResource)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}
