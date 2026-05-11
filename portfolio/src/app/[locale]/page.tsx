import Link from "next/link";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { fetchGitHubRepos } from "@/lib/github";
import { getLatestArticle } from "@/data/articles";
import { resources } from "@/data/resources";
import { CountUpStats } from "@/components/ui/count-up-stats";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const projects = await fetchGitHubRepos();
  const lastUpdatedProject = [...projects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];
  const latestArticle = getLatestArticle();

  const stats = [
    { value: 5,   suffix: "+",   label: t.stats.sites,          decimals: false },
    { value: 50,  suffix: "+",   label: t.stats.conferences,     decimals: false },
    { value: 1.8, suffix: "M€+", label: t.stats.opportunities,   decimals: true  },
    { value: 150, suffix: "+",   label: t.stats.community,       decimals: false },
  ];

  const latestResources = resources.slice(0, 3);

  const siteUrl = "https://louissavon.dev";

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          url: siteUrl,
          sameAs: [
            `https://github.com/${profile.github}`,
            profile.linkedin,
          ],
          jobTitle: t.hero.role,
          description: profile.bio[locale],
        }),
      }}
    />
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)]">

      {/* Hero */}
      <section className="py-16 sm:py-28">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary mb-3">
          {t.hero.greeting}
        </h1>
        <p className="text-xl text-accent mb-4">{t.hero.role}</p>
        <p className="text-base text-secondary leading-relaxed max-w-xl mb-12">
          {t.hero.tagline}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
          <Link
            href={`/${locale}/about`}
            className="btn-animated group flex flex-col gap-2 rounded border border-border p-5 hover:border-accent transition-colors duration-150"
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
            className="btn-animated group flex flex-col gap-2 rounded border border-border p-5 hover:border-accent transition-colors duration-150"
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

      {/* En ce moment */}
      <section className="pb-16 border-t border-border pt-12">
        <h2 className="text-xs font-medium text-secondary uppercase tracking-wider mb-8">
          {t.latestAdds.sectionTitle}
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {lastUpdatedProject && (
            <div className="fade-in card flex flex-col gap-2 rounded border border-border p-4">
              <p className="text-xs text-tertiary uppercase tracking-wider">{t.latestAdds.latestProject}</p>
              <p className="text-sm font-medium text-primary leading-snug">{lastUpdatedProject.name}</p>
              {lastUpdatedProject.description && (
                <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                  {lastUpdatedProject.customDescription?.[locale] ?? lastUpdatedProject.description}
                </p>
              )}
              {lastUpdatedProject.language && (
                <p className="text-xs text-tertiary">{lastUpdatedProject.language}</p>
              )}
              <a
                href={lastUpdatedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-xs text-accent hover:underline underline-offset-4"
              >
                {t.latestAdds.viewProject} &rarr;
              </a>
            </div>
          )}

          {latestArticle && (
            <div className="fade-in card flex flex-col gap-2 rounded border border-border p-4">
              <p className="text-xs text-tertiary uppercase tracking-wider">{t.latestAdds.latestArticle}</p>
              <p className="text-sm font-medium text-primary leading-snug">
                {latestArticle.title[locale]}
              </p>
              <p className="text-xs text-tertiary">
                {new Date(latestArticle.date).toLocaleDateString(
                  locale === "fr" ? "fr-FR" : "en-US",
                  { day: "numeric", month: "short", year: "numeric" }
                )}
                {" · "}{latestArticle.readingTime} {t.latestAdds.minRead}
              </p>
              {latestArticle.tags[0] && (
                <span className="text-xs text-accent">{latestArticle.tags[0]}</span>
              )}
              <Link
                href={`/${locale}/blog/${latestArticle.slug}`}
                className="mt-auto text-xs text-accent hover:underline underline-offset-4"
              >
                {t.latestAdds.readArticle} &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Ce que tu trouveras ici */}
      <section className="pb-16 border-t border-border pt-12">
        <h2 className="text-xs font-medium text-secondary uppercase tracking-wider mb-8">
          {t.features.sectionTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="fade-in">
            <div className="mb-3 text-accent">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-primary mb-1">{t.features.projects.title}</p>
            <p className="text-xs text-secondary leading-relaxed">{t.features.projects.description}</p>
            <Link href={`/${locale}/projects`} className="mt-3 inline-block text-xs text-accent hover:underline underline-offset-4">
              {locale === "fr" ? "Voir les projets" : "View projects"} &rarr;
            </Link>
          </div>

          <div className="fade-in">
            <div className="mb-3 text-accent">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4h12M4 8h8M4 12h10M4 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-primary mb-1">{t.features.resources.title}</p>
            <p className="text-xs text-secondary leading-relaxed">{t.features.resources.description}</p>
            <Link href={`/${locale}/blog?tab=resources`} className="mt-3 inline-block text-xs text-accent hover:underline underline-offset-4">
              {locale === "fr" ? "Voir les ressources" : "View resources"} &rarr;
            </Link>
          </div>

          <div className="fade-in">
            <div className="mb-3 text-accent">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 5h14M3 10h10M3 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-primary mb-1">{t.features.articles.title}</p>
            <p className="text-xs text-secondary leading-relaxed">{t.features.articles.description}</p>
            <Link href={`/${locale}/blog`} className="mt-3 inline-block text-xs text-accent hover:underline underline-offset-4">
              {locale === "fr" ? "Lire le blog" : "Read the blog"} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="pb-16 border-t border-border pt-12">
        <h2 className="text-xs font-medium text-secondary uppercase tracking-wider mb-8">
          {t.stats.sectionTitle}
        </h2>
        <CountUpStats stats={stats} />
      </section>

      {/* Dernières ressources */}
      <section className="pb-16 border-t border-border pt-12">
        <h2 className="text-xs font-medium text-secondary uppercase tracking-wider mb-8">
          {t.latestResources.sectionTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {latestResources.map((resource) => (
            <div key={resource.id} className="fade-in card flex flex-col gap-2 rounded border border-border p-4">
              <div className="flex items-center gap-2">
                <span className="text-accent" aria-hidden>
                  {resource.type === "pdf" ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M4 5h6M4 7h4M4 9h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M4 5h6M4 7h6M4 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  )}
                </span>
                <span className="text-xs text-tertiary uppercase tracking-wider">{resource.type.toUpperCase()}</span>
                <span className={`ml-auto text-[10px] rounded px-1.5 py-0.5 ${
                  resource.free
                    ? "bg-accent-soft text-accent"
                    : "bg-badge-bg text-tertiary"
                }`}>
                  {resource.free ? t.latestResources.free : t.latestResources.emailGated}
                </span>
              </div>
              <p className="text-sm font-medium text-primary leading-snug">{resource.title[locale]}</p>
              <p className="text-xs text-secondary leading-relaxed line-clamp-2">{resource.description[locale]}</p>
              <Link
                href={`/${locale}/blog?tab=resources`}
                className="mt-auto text-xs text-accent hover:underline underline-offset-4"
              >
                {t.latestResources.access}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Manifeste */}
      <section className="pb-16 border-t border-border pt-12">
        <p className="max-w-[600px] mx-auto text-center text-base text-secondary leading-relaxed">
          {t.manifeste.text}
        </p>
      </section>

      {/* Contact rapide */}
      <section className="pb-20 border-t border-border pt-12">
        <h2 className="text-sm font-medium text-primary mb-1">{t.contact.title}</h2>
        <p className="text-sm text-secondary mb-4">{t.contact.subtitle}</p>
        <div className="flex flex-wrap gap-4">
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              {t.contact.email} &rarr;
            </a>
          )}
          <Link
            href={`/${locale}/contact`}
            className="text-sm text-secondary hover:text-accent hover:underline underline-offset-4 transition-colors duration-150"
          >
            {t.contact.submit} &rarr;
          </Link>
        </div>
      </section>

    </div>
    </>
  );
}
