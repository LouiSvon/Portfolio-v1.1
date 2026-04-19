import type { Metadata } from "next";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { fetchGitHubRepos } from "@/lib/github";
import { ProjectCard } from "@/components/ui/project-card";
import type { Locale } from "@/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return {
    title: t.projects.title,
    description: t.projects.subtitle,
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "fr";
  const t = getTranslations(locale as Locale);

  const projects = await fetchGitHubRepos();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.projects.title}
        </h1>
        <p className="text-sm text-secondary mt-2">{t.projects.subtitle}</p>
      </header>

      {projects.length > 0 ? (
        <div>
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              locale={locale as Locale}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-secondary">{t.projects.noProjects}</p>
      )}
    </div>
  );
}
