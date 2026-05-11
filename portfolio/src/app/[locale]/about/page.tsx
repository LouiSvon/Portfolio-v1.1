import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations, locales, formatDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { getExperienceSections, type ExperienceSectionKey } from "@/lib/experience";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const CV_FILE_NAME = "Louis_Savon.pdf";
const CV_HREF = `/${CV_FILE_NAME}`;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return {
    title: t.about.title,
    description: t.about.subtitle,
    openGraph: { title: t.about.title, description: t.about.subtitle },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const sections = getExperienceSections(experiences).filter((s) => s.items.length > 0);
  const sectionTitles: Record<ExperienceSectionKey, string> = {
    education: t.experience.education,
    personal: t.experience.personal,
    professional: t.experience.professional,
  };

  const skillGroups = [
    { label: t.about.skillsFrontend, items: skills.frontend },
    { label: t.about.skillsBackend, items: skills.backend },
    { label: t.about.skillsTools, items: skills.tools },
  ];

  const anchors = [
    { id: "intro", label: t.about.anchorIntro },
    { id: "parcours", label: t.about.anchorParcours },
    { id: "competences", label: t.about.anchorCompetences },
    { id: "cv", label: t.about.anchorCV },
  ];

  return (
    <>
      {/* Barre d'ancres sticky sous la navbar */}
      <nav
        aria-label="Sections"
        className="sticky top-14 z-40 border-b border-border bg-background/90 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-5xl px-[clamp(1rem,4vw,3rem)] h-10 flex items-center gap-6 overflow-x-auto scrollbar-none">
          {anchors.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="shrink-0 text-xs text-secondary hover:text-accent transition-colors duration-150"
            >
              {a.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)] py-12 sm:py-20">
        {/* #intro */}
        <section id="intro" className="mb-16 scroll-mt-24">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary mb-4">
            {profile.name}
          </h1>
          <p className="text-lg text-accent mb-3">{profile.title[locale]}</p>
          <p className="text-base text-secondary leading-relaxed max-w-2xl">
            {profile.bio[locale]}
          </p>
          <p className="text-sm text-tertiary mt-2">{profile.location}</p>
        </section>

        {/* #parcours */}
        <section id="parcours" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorParcours}
          </h2>
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.key}>
                <h3 className="text-xs font-medium text-tertiary uppercase tracking-wider mb-4">
                  {sectionTitles[section.key]}
                </h3>
                <div>
                  {section.items.map((exp) => {
                    const start = formatDate(exp.startDate, locale);
                    const end = exp.endDate ? formatDate(exp.endDate, locale) : t.experience.present;
                    return (
                      <article
                        key={`${exp.company}-${exp.startDate}`}
                        className="border-b border-border py-5 first:pt-0 last:border-b-0"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                          <div>
                            <p className="text-sm font-medium text-primary">{exp.role[locale]}</p>
                            <p className="text-sm text-secondary">{exp.company}</p>
                          </div>
                          <time className="text-xs text-tertiary sm:whitespace-nowrap shrink-0">
                            {start} — {end}
                          </time>
                        </div>
                        <p className="text-sm text-secondary leading-relaxed">{exp.description[locale]}</p>
                        {exp.technologies.length > 0 && (
                          <ul className="flex flex-wrap gap-1.5 mt-3">
                            {exp.technologies.map((tech) => (
                              <li key={tech}>
                                <Badge variant="technology" data-tech={tech}>{tech}</Badge>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* #competences */}
        <section id="competences" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorCompetences}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-3">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <li key={skill}>
                      <Badge variant="technology" data-tech={skill}>{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* #cv */}
        <section id="cv" className="scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-6">
            {t.about.anchorCV}
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={CV_HREF}
              download={CV_FILE_NAME}
              className="inline-flex items-center gap-2 rounded border border-accent px-4 py-2 text-sm font-medium text-accent hover:bg-accent-soft transition-colors duration-150"
            >
              {t.about.downloadCV} &darr;
            </a>
            <a
              href={CV_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-secondary hover:border-accent hover:text-accent transition-colors duration-150"
            >
              {t.about.openCV} &rarr;
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-secondary hover:border-accent hover:text-accent transition-colors duration-150"
            >
              LinkedIn &rarr;
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
