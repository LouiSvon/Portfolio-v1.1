import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  // /cv et /experience redirigent vers /about : ils ne figurent pas ici.
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/contact",
    "/legal",
    "/privacy",
  ];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const articleEntries = locales.flatMap((locale) =>
    articles.map((article) => ({
      url: `${siteUrl}/${locale}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...articleEntries];
}
