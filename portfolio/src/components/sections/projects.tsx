import type { Locale, Project } from "@/types";
import { getTranslations, formatFullDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { highlights } from "@/data/highlights";
import type { Scene } from "@/components/ui/project-scene";
import { ProjectStack } from "@/components/ui/project-stack";
import { OtherProjects } from "@/components/ui/other-projects";
import { toFilterItems } from "@/lib/project-scenes";
import { SectionHeading } from "@/components/ui/section-heading";

// Ce que j'ai construit : les projets phares en cartes empilées, puis le reste des dépôts sur demande.
// `repos` vient de l'API GitHub : vide si elle ne répond pas, les projets phares restent affichés.
export function ProjectsSection({ locale, repos }: { locale: Locale; repos: Project[] }) {
  const t = getTranslations(locale);
  const labels = { viewCode: t.projects.viewCode, featured: t.projects.featured, demo: t.projects.demo };
  const featuredRepos = new Set(highlights.map((h) => h.repo));

  const scenes: Scene[] = highlights.map((h) => {
    const repo = h.private ? undefined : repos.find((r) => r.name === h.repo);
    return {
      key: h.repo,
      title: h.title[locale],
      tagline: h.tagline[locale],
      kind: h.kind[locale],
      role: h.role?.[locale],
      chips: h.stack,
      href: h.private ? undefined : (repo?.url ?? `https://github.com/${profile.github}/${h.repo}`),
      colors: h.colors,
      stars: repo?.stars,
      updated: repo ? formatFullDate(repo.updatedAt, locale) : undefined,
      demo: repo?.demo ?? undefined,
      media: { src: h.image, alt: h.imageAlt[locale], hint: `public/projets/${h.repo}.webp` },
    };
  });
  const others = repos.filter((r) => !featuredRepos.has(r.name));

  return (
    <section id="projets" className="screen" aria-labelledby="projets-titre">
      <div className="shell">
        <SectionHeading id="projets-titre" title={t.projects.title} />
        <ProjectStack scenes={scenes} labels={labels} />
        {others.length > 0 && <OtherProjects items={toFilterItems(others, locale)} locale={locale} />}
      </div>
    </section>
  );
}
