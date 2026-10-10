import type { Metadata } from "next";
import { alternatesFor } from "@/lib/site";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { fetchGitHubRepos } from "@/lib/github";
import { ProjectFilter } from "@/components/ui/project-filter";
import { PageHeader } from "@/components/ui/page-header";

export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return { title: t.projects.title, description: t.projects.subtitle, alternates: alternatesFor(locale, "/projects") };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  const projects = await fetchGitHubRepos();

  return (
    <div className="max-w-6xl mx-auto px-[clamp(1rem,4vw,3rem)] pb-24 sm:pb-32">
      <PageHeader title={t.projects.title} subtitle={t.projects.subtitle} />

      {projects.length > 0 ? (
        <ProjectFilter projects={projects} locale={locale} />
      ) : (
        <p className="text-sm text-secondary">{t.projects.noProjects}</p>
      )}
    </div>
  );
}
