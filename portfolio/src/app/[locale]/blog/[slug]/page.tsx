import type { Metadata } from "next";
import { alternatesFor, siteUrl } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { articles, getArticleBySlug } from "@/data/articles";
import { CopyLink } from "@/components/ui/copy-link";
import GuideContent from "@/content/articles/guide-llm-debutants";
import PromptContent from "@/content/articles/prompt-engineering-avance";
import type { Locale } from "@/types";
import { PageHeader } from "@/components/ui/page-header";

const contentMap: Record<string, React.ComponentType<{ locale: Locale }>> = {
  "guide-llm-debutants": GuideContent,
  "prompt-engineering-avance": PromptContent,
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug }))
  );
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title[locale],
    description: article.summary[locale],
    alternates: alternatesFor(locale, `/blog/${slug}`),
    openGraph: { title: article.title[locale], description: article.summary[locale], type: "article", publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const ArticleContent = contentMap[slug];
  const formattedDate = new Date(article.date).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="max-w-6xl mx-auto px-[clamp(1rem,4vw,3rem)] pb-24 sm:pb-32">
      <div className="lg:flex lg:gap-12">
        {/* Contenu principal — largeur de lecture optimale */}
        <article className="min-w-0 flex-1 max-w-[720px]">
          <PageHeader
            compact
            eyebrow={
              <Link href={`/${locale}#articles`} className="btn-ghost">
                <span className="arrow" aria-hidden="true">&larr;</span> {t.articles.backToArticles}
              </Link>
            }
            title={article.title[locale]}
            subtitle={article.summary[locale]}
          />
          <div className="-mt-4 mb-12 flex flex-wrap items-center gap-2">
            <time dateTime={article.date} className="chip">
              {t.articles.publishedOn} {formattedDate}
            </time>
            <span className="chip">{article.readingTime} {t.articles.readingTime}</span>
            {article.tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          {/* TOC mobile — repliable */}
          {article.toc && article.toc.length > 0 && (
            <details className="panel mb-8 !p-0 lg:hidden">
              <summary className="eyebrow cursor-pointer px-5 py-4">
                {t.articles.tableOfContents}
              </summary>
              <ol className="px-5 pb-5 space-y-2">
                {article.toc.map((entry) => (
                  <li key={entry.id} className={entry.level === 3 ? "ml-4" : ""}>
                    <a href={`#${entry.id}`} className="text-sm text-secondary hover:text-accent transition-colors duration-(--dur-fast)">
                      {entry.text[locale]}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          {/* Contenu */}
          <div className="mb-12">
            {ArticleContent ? (
              <ArticleContent locale={locale} />
            ) : (
              <p className="text-sm text-secondary">{t.articles.comingSoon}</p>
            )}
          </div>

          {/* Partage */}
          <div className="flex items-center gap-3 py-4 border-t border-border border-b mb-10">
            <span className="text-xs text-tertiary">{t.articles.share}</span>
            <CopyLink label={t.articles.shareLink} copiedLabel={t.articles.linkCopied} />
          </div>
        </article>

        {/* TOC sidebar sticky — desktop uniquement */}
        {article.toc && article.toc.length > 0 && (
          <aside className="hidden lg:block w-52 shrink-0">
            <nav aria-label={t.articles.tableOfContents} className="sticky top-24">
              <p className="eyebrow mb-4">
                {t.articles.tableOfContents}
              </p>
              <ol className="space-y-2">
                {article.toc.map((entry) => (
                  <li key={entry.id} className={entry.level === 3 ? "ml-4" : ""}>
                    <a href={`#${entry.id}`} className="text-xs text-tertiary hover:text-accent transition-colors duration-(--dur-fast) leading-relaxed block">
                      {entry.text[locale]}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title[locale],
            description: article.summary[locale],
            datePublished: article.date,
            author: { "@type": "Person", name: "Louis Savon", url: siteUrl },
          }),
        }}
      />
    </div>
  );
}
