import Link from "next/link";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { fetchGitHubRepos } from "@/lib/github";
import { getLatestArticle, getLatestResource } from "@/data/articles";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const projects = await fetchGitHubRepos();
  const featuredProject = projects.find((p) => p.featured) ?? projects[0];
  const latestArticle = getLatestArticle();
  const latestResource = getLatestResource();

  return (
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)]">
      {/* Hero — deux chemins clairs */}
      <section className="py-16 sm:py-28">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary mb-3">
          {t.hero.greeting}
        </h1>
        <p className="text-xl text-accent mb-4">{t.hero.role}</p>
        <p className="text-base text-secondary leading-relaxed max-w-xl mb-12">
          {t.hero.tagline}
        </p>

        {/* Deux chemins */}
        <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
          <Link
            href={`/${locale}/about`}
            className="group flex flex-col gap-2 rounded border border-border p-5 hover:border-accent transition-colors duration-150"
          >
            <span className="text-xs text-tertiary uppercase tracking-wider">
              {locale === "fr" ? "Profil" : "Profile"}
            </span>
            <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors duration-150">
              {t.hero.pathA} &rarr;
            </span>
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="group flex flex-col gap-2 rounded border border-border p-5 hover:border-accent transition-colors duration-150"
          >
            <span className="text-xs text-tertiary uppercase tracking-wider">
              {locale === "fr" ? "Contenu" : "Content"}
            </span>
            <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors duration-150">
              {t.hero.pathB} &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* Derniers ajouts */}
      {(latestArticle || latestResource || featuredProject) && (
        <section className="pb-16 border-t border-border pt-12">
          <h2 className="text-xs font-medium text-secondary uppercase tracking-wider mb-8">
            {t.latestAdds.sectionTitle}
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {latestArticle && (
              <div className="flex flex-col gap-2 rounded border border-border p-4">
                <p className="text-xs text-tertiary uppercase tracking-wider">{t.latestAdds.latestArticle}</p>
                <p className="text-sm font-medium text-primary leading-snug">{latestArticle.title[locale]}</p>
                <p className="text-xs text-tertiary">
                  {new Date(latestArticle.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { day: "numeric", month: "short", year: "numeric" })}
                  {" · "}{latestArticle.readingTime} {t.latestAdds.minRead}
                </p>
                <Link href={`/${locale}/blog/${latestArticle.slug}`} className="mt-auto text-xs text-accent hover:underline underline-offset-4">
                  {t.latestAdds.readArticle} &rarr;
                </Link>
              </div>
            )}

            {latestResource && (
              <div className="flex flex-col gap-2 rounded border border-border p-4">
                <p className="text-xs text-tertiary uppercase tracking-wider">{t.latestAdds.latestResource}</p>
                <p className="text-sm font-medium text-primary leading-snug">{latestResource.linkedResource!.title[locale]}</p>
                <p className="text-xs text-tertiary">
                  {new Date(latestResource.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <Link href={`/${locale}/blog/${latestResource.slug}`} className="mt-auto text-xs text-accent hover:underline underline-offset-4">
                  {t.latestAdds.downloadResource} &rarr;
                </Link>
              </div>
            )}

            {featuredProject && (
              <div className="flex flex-col gap-2 rounded border border-border p-4">
                <p className="text-xs text-tertiary uppercase tracking-wider">{t.latestAdds.latestProject}</p>
                <p className="text-sm font-medium text-primary leading-snug">{featuredProject.name}</p>
                {featuredProject.description && (
                  <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                    {featuredProject.customDescription?.[locale] ?? featuredProject.description}
                  </p>
                )}
                <a href={featuredProject.url} target="_blank" rel="noopener noreferrer" className="mt-auto text-xs text-accent hover:underline underline-offset-4">
                  {t.latestAdds.viewProject} &rarr;
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact rapide */}
      <section className="pb-20 border-t border-border pt-12">
        <h2 className="text-sm font-medium text-primary mb-1">{t.contact.title}</h2>
        <p className="text-sm text-secondary mb-4">{t.contact.subtitle}</p>
        <div className="flex flex-wrap gap-4">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="text-sm font-medium text-accent hover:underline underline-offset-4">
              {t.contact.email} &rarr;
            </a>
          )}
          <Link href={`/${locale}/contact`} className="text-sm text-secondary hover:text-accent hover:underline underline-offset-4 transition-colors duration-150">
            {t.contact.submit} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
