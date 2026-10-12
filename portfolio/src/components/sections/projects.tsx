import type { Locale, Project } from "@/types";
import { getTranslations, formatFullDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { highlights } from "@/data/highlights";
import { ProjectScene, type Scene } from "@/components/ui/project-scene";
import { OtherProjects } from "@/components/ui/other-projects";
import { SectionHeading } from "@/components/ui/section-heading";

// Projets phares en scènes qui se dévoilent au défilement, puis le reste des dépôts sur demande.
// `repos` vient de l'API GitHub : vide si elle ne répond pas, les projets phares restent affichés.
export function ProjectsSection({ locale, repos }: { locale: Locale; repos: Project[] }) {
  const t = getTranslations(locale);
  const labels = { viewCode: t.projects.viewCode, featured: t.projects.featured, demo: t.projects.demo };
  const featuredRepos = new Set(highlights.map((h) => h.repo));

  const scenes: Scene[] = highlights.map((h) => {
    const repo = repos.find((r) => r.name === h.repo);
    return {
      key: h.repo,
      title: h.title[locale],
      tagline: h.tagline[locale],
      kind: h.kind[locale],
      chips: h.stack,
      href: repo?.url ?? `https://github.com/${profile.github}/${h.repo}`,
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
        <div className="showcase flex flex-col gap-[clamp(4rem,10vh,8rem)]">
          {scenes.map((scene, i) => (
            <ProjectScene key={scene.key} scene={scene} index={i} labels={labels} />
          ))}
        </div>
        {others.length > 0 && <OtherProjects projects={others} locale={locale} />}
      </div>
    </section>
  );
}
