import type { Project, Locale } from "@/types";
import { getTranslations, formatFullDate } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

function ProjectLanguage({ language }: { language: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="language-dot" data-language={language} aria-hidden />
      {language}
    </span>
  );
}

export function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = getTranslations(locale);
  const description =
    project.customDescription?.[locale] ?? project.description;

  return (
    <article className="group border-b border-border py-6 first:pt-0 last:border-b-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 className="min-w-0 text-base font-medium text-primary">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words hover:text-accent hover:underline underline-offset-4 transition-colors duration-150"
              >
                {project.name}
              </a>
            </h3>
            {project.featured && (
              <Badge variant="featured">{t.projects.featured}</Badge>
            )}
          </div>

          {description && (
            <p className="text-sm text-secondary mt-1 leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-tertiary">
            {project.language && (
              <ProjectLanguage language={project.language} />
            )}

            {project.stars > 0 && (
              <span>
                {project.stars} {t.projects.stars}
              </span>
            )}

            {project.forks > 0 && (
              <span>
                {project.forks} {t.projects.forks}
              </span>
            )}

            <span>
              {t.projects.updatedOn} {formatFullDate(project.updatedAt, locale)}
            </span>
          </div>

          {project.topics.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 mt-3">
              {project.topics.map((topic) => (
                <li key={topic}>
                  <Badge>{topic}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex shrink-0 flex-row gap-4 sm:flex-col sm:gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-secondary hover:text-accent transition-colors duration-150"
          >
            GitHub &rarr;
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary hover:text-accent-warm transition-colors duration-150"
            >
              Demo &rarr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
