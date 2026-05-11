import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { articles } from "@/data/articles";

const BASE_URL = "https://louissavon.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/projects",
    "/blog",
    "/experience",
    "/cv",
    "/contact",
    "/legal",
    "/privacy",
  ];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const articleEntries = locales.flatMap((locale) =>
    articles.map((article) => ({
      url: `${BASE_URL}/${locale}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...articleEntries];
}
