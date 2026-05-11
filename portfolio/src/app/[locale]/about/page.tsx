import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations, locales, formatDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { benevol } from "@/data/benevol";
import { Badge } from "@/components/ui/badge";
import { GitHubSkills } from "@/components/ui/github-skills";

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

const EXPERIENCE_TYPE_LABELS: Record<string, Record<string, string>> = {
  education: { fr: "Formation", en: "Education" },
  professional: { fr: "Professionnel", en: "Professional" },
  personal: { fr: "Pause", en: "Break" },
  volunteering: { fr: "Bénévolat", en: "Volunteering" },
};

function formatPeriod(exp: { startDate: string; endDate: string | null }, locale: string, present: string): string {
  const start = formatDate(exp.startDate, locale as "fr" | "en");
  const end = exp.endDate ? formatDate(exp.endDate, locale as "fr" | "en") : present;
  return `${start} — ${end}`;
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  // Reverse chronological order for timeline
  const timeline = [...experiences].sort(
    (a, b) => b.startDate.localeCompare(a.startDate)
  );

  const anchors = [
    { id: "cv", label: t.about.anchorCV },
    { id: "competences", label: t.about.anchorCompetences },
    { id: "parcours", label: t.about.anchorParcours },
    { id: "certifications", label: t.about.anchorCertifications },
    { id: "benevol", label: t.about.anchorBenevol },
  ];

  return (
    <>
      {/* Sticky anchor nav */}
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

        {/* #cv — Hero visible sans scroll */}
        <section id="cv" className="mb-20 scroll-mt-24">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary mb-2">
            {profile.name}
          </h1>
          <p className="text-base text-accent mb-8">{t.about.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CV_HREF}
              download={CV_FILE_NAME}
              className="btn-animated inline-flex items-center gap-2 rounded border border-accent bg-accent px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity duration-150"
            >
              {t.about.downloadCV} &darr;
            </a>
            <a
              href={CV_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-secondary hover:border-accent hover:text-accent transition-colors duration-150"
            >
              {t.about.openCV} &rarr;
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-secondary hover:border-accent hover:text-accent transition-colors duration-150"
            >
              {t.about.viewLinkedin}
            </a>
          </div>
        </section>

        {/* #competences */}
        <section id="competences" className="mb-20 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorCompetences}
          </h2>
          <GitHubSkills fetching={t.about.fetching} />
        </section>

        {/* #parcours — Timeline */}
        <section id="parcours" className="mb-20 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorParcours}
          </h2>
          <ol className="relative border-l border-border space-y-0">
            {timeline.map((exp, i) => {
              const typeLabel = EXPERIENCE_TYPE_LABELS[exp.type]?.[locale] ?? exp.type;
              const period = formatPeriod(exp, locale, t.experience.present);
              return (
                <li key={i} className="fade-in relative pl-8 pb-10 last:pb-0">
                  {/* Timeline dot */}
                  <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-border border-2 border-background ring-1 ring-border" />

                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium text-tertiary border border-border rounded px-1.5 py-0.5 uppercase tracking-wider">
                      {typeLabel}
                    </span>
                    <time className="text-xs text-tertiary">{period}</time>
                  </div>

                  <p className="text-sm font-medium text-primary">{exp.role[locale as "fr" | "en"]}</p>
                  <p className="text-sm text-secondary mb-3">{exp.company}</p>

                  {/* Expandable description */}
                  <details className="group">
                    <summary className="list-none cursor-pointer text-xs text-tertiary hover:text-accent transition-colors duration-150 flex items-center gap-1">
                      <span className="group-open:hidden">{locale === "fr" ? "Voir plus" : "Show more"}</span>
                      <span className="hidden group-open:inline">{locale === "fr" ? "Voir moins" : "Show less"}</span>
                      <span className="group-open:hidden">↓</span>
                      <span className="hidden group-open:inline">↑</span>
                    </summary>
                    <p className="text-sm text-secondary leading-relaxed mt-2">
                      {exp.description[locale as "fr" | "en"]}
                    </p>
                  </details>

                  {exp.technologies.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 mt-3">
                      {exp.technologies.map((tech) => (
                        <li key={tech}>
                          <Badge variant="technology" data-tech={tech}>{tech}</Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        {/* #certifications */}
        <section id="certifications" className="mb-20 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorCertifications}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, i) => {
              const isPending = cert.statut === "en_cours";
              return (
                <div
                  key={i}
                  className={`fade-in rounded p-5 flex flex-col gap-2 ${
                    isPending
                      ? "border border-dashed border-border"
                      : "border border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-primary leading-snug">
                      {cert.titre[locale as "fr" | "en"]}
                    </p>
                    {isPending ? (
                      <span className="cert-pending shrink-0 text-xs text-tertiary border border-border rounded px-2 py-0.5">
                        {t.about.inProgress}
                        <span className="dot-loader" aria-hidden>...</span>
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs text-tertiary">{cert.date}</span>
                    )}
                  </div>
                  <p className="text-xs text-secondary">{cert.organisme}</p>
                  {cert.expiration && (
                    <p className="text-xs text-tertiary">{t.about.expires} : {cert.expiration}</p>
                  )}
                  {cert.competences.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5">
                      {cert.competences.map((c) => (
                        <li key={c}><Badge>{c}</Badge></li>
                      ))}
                    </ul>
                  )}
                  {cert.lien && (
                    <a
                      href={cert.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-xs text-accent hover:underline underline-offset-4"
                    >
                      {t.about.viewCertificate}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* #benevol */}
        <section id="benevol" className="scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorBenevol}
          </h2>
          <div className="space-y-4">
            {benevol.map((entry, i) => (
              <div key={i} className="fade-in border border-border rounded p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <p className="text-sm font-medium text-primary">{entry.titre[locale as "fr" | "en"]}</p>
                    <p className="text-sm text-secondary">{entry.structure}</p>
                  </div>
                  <time className="text-xs text-tertiary sm:whitespace-nowrap shrink-0">
                    {entry.periode[locale as "fr" | "en"]}
                  </time>
                </div>
                <p className="text-xs text-tertiary mb-2">{entry.domaine}</p>
                <p className="text-sm text-secondary leading-relaxed">
                  {entry.description[locale as "fr" | "en"]}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
