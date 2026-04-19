import Link from "next/link";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { fetchGitHubRepos } from "@/lib/github";
import { ProjectCard } from "@/components/ui/project-card";
import { SocialLink } from "@/components/ui/social-link";
import type { Locale } from "@/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "fr";
  const t = getTranslations(locale as Locale);

  const projects = await fetchGitHubRepos();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentProjects =
    featuredProjects.length > 0
      ? featuredProjects
      : projects.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-6">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
          {t.hero.greeting}
        </h1>
        <p className="text-lg text-accent mt-2">{t.hero.role}</p>
        <p className="text-base text-secondary mt-4 leading-relaxed max-w-lg">
          {t.hero.tagline}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            href={`/${locale}/projects`}
            className="text-sm font-medium text-primary hover:text-accent hover:underline underline-offset-4 transition-colors duration-150"
          >
            {t.hero.cta.projects} &rarr;
          </Link>
          <Link
            href={`/${locale}/cv`}
            className="text-sm font-medium text-primary hover:text-accent-warm hover:underline underline-offset-4 transition-colors duration-150"
          >
            {t.hero.cta.cv} &rarr;
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-sm font-medium text-primary hover:text-accent hover:underline underline-offset-4 transition-colors duration-150"
          >
            {t.hero.cta.contact} &rarr;
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      {recentProjects.length > 0 && (
        <section className="pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-primary">
              {t.projects.title}
            </h2>
            <Link
              href={`/${locale}/projects`}
              className="text-sm text-secondary hover:text-accent transition-colors duration-150"
            >
              {t.projects.allProjects} &rarr;
            </Link>
          </div>
          <div>
            {recentProjects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                locale={locale as Locale}
              />
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="pb-20 border-t border-border pt-12">
        <h2 className="text-lg font-semibold text-primary mb-2">
          {t.contact.title}
        </h2>
        <p className="text-sm text-secondary mb-4">{t.contact.subtitle}</p>

        <div className="flex flex-wrap items-center gap-4">
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-accent font-medium hover:underline underline-offset-4"
            >
              {t.contact.email}
            </a>
          )}
          <span className="text-sm text-tertiary">{t.contact.or}</span>
          {socials.map((social) => (
            <SocialLink key={social.name} social={social} />
          ))}
        </div>
      </section>
    </div>
  );
}
