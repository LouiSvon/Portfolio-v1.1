import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations } from "@/lib/i18n";
import { fetchGitHubRepos } from "@/lib/github";
import { ProjectCard } from "@/components/ui/project-card";

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
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const projects = await fetchGitHubRepos();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20">
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
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-secondary">{t.projects.noProjects}</p>
      )}
    </div>
  );
}
