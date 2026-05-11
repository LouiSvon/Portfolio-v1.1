import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { fetchGitHubRepos } from "@/lib/github";
import { ProjectFilter } from "@/components/ui/project-filter";

export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return { title: t.projects.title, description: t.projects.subtitle };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  const projects = await fetchGitHubRepos();

  return (
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)] py-12 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.projects.title}
        </h1>
        <p className="text-sm text-secondary mt-2">{t.projects.subtitle}</p>
      </header>

      {projects.length > 0 ? (
        <ProjectFilter projects={projects} locale={locale} />
      ) : (
        <p className="text-sm text-secondary">{t.projects.noProjects}</p>
      )}
    </div>
  );
}
