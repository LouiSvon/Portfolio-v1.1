import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { articles, getArticleBySlug } from "@/data/articles";
import { ResourceGate } from "@/components/ui/resource-gate";
import { CopyLink } from "@/components/ui/copy-link";
import GuideContent from "@/content/articles/guide-llm-debutants";
import PromptContent from "@/content/articles/prompt-engineering-avance";
import type { Locale } from "@/types";

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
  const t = getTranslations(locale);
  return {
    title: article.title[locale],
    description: article.summary[locale],
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
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)] py-12 sm:py-20">
      <div className="lg:flex lg:gap-12">
        {/* Contenu principal — largeur de lecture optimale */}
        <article className="min-w-0 flex-1 max-w-[720px]">
          <nav className="mb-8">
            <Link href={`/${locale}/blog`} className="text-sm text-secondary hover:text-accent transition-colors duration-150">
              {t.blog.backToBlog}
            </Link>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <time dateTime={article.date} className="text-xs text-tertiary">
                {t.blog.publishedOn} {formattedDate}
              </time>
              <span className="text-xs text-tertiary">·</span>
              <span className="text-xs text-tertiary">{article.readingTime} {t.blog.readingTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary mb-3">
              {article.title[locale]}
            </h1>
            <p className="text-base text-secondary leading-relaxed">{article.summary[locale]}</p>
            {article.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5 mt-4">
                {article.tags.map((tag) => (
                  <li key={tag} className="text-xs text-tertiary bg-badge-bg px-2 py-0.5 rounded">{tag}</li>
                ))}
              </ul>
            )}
          </header>

          {/* TOC mobile — repliable */}
          {article.toc && article.toc.length > 0 && (
            <details className="mb-8 rounded border border-border lg:hidden">
              <summary className="px-4 py-3 text-xs font-medium text-secondary uppercase tracking-wider cursor-pointer">
                {t.blog.tableOfContents}
              </summary>
              <ol className="px-4 pb-4 space-y-2">
                {article.toc.map((entry) => (
                  <li key={entry.id} className={entry.level === 3 ? "ml-4" : ""}>
                    <a href={`#${entry.id}`} className="text-sm text-secondary hover:text-accent transition-colors duration-150">
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
              <p className="text-sm text-secondary">{locale === "fr" ? "Contenu bientôt disponible." : "Content coming soon."}</p>
            )}
          </div>

          {/* Partage */}
          <div className="flex items-center gap-3 py-4 border-t border-border border-b mb-10">
            <span className="text-xs text-tertiary">{locale === "fr" ? "Partager :" : "Share:"}</span>
            <CopyLink label={t.blog.shareLink} copiedLabel={t.blog.linkCopied} />
          </div>

          {/* Ressource liée */}
          {article.linkedResource && (
            <section aria-label={t.blog.relatedResource}>
              <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">{t.blog.relatedResource}</h2>
              <ResourceGate locale={locale} resourceTitle={article.linkedResource.title[locale]} filename={article.linkedResource.filename} />
            </section>
          )}
        </article>

        {/* TOC sidebar sticky — desktop uniquement */}
        {article.toc && article.toc.length > 0 && (
          <aside className="hidden lg:block w-52 shrink-0">
            <nav aria-label={t.blog.tableOfContents} className="sticky top-24">
              <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-4">
                {t.blog.tableOfContents}
              </p>
              <ol className="space-y-2">
                {article.toc.map((entry) => (
                  <li key={entry.id} className={entry.level === 3 ? "ml-4" : ""}>
                    <a href={`#${entry.id}`} className="text-xs text-tertiary hover:text-accent transition-colors duration-150 leading-relaxed block">
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
            author: { "@type": "Person", name: "Louis Savon", url: "https://louissavon.dev" },
          }),
        }}
      />
    </div>
  );
}
