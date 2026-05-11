import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations, locales, formatDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { certificationsBySector } from "@/data/certifications";
import { benevol } from "@/data/benevol";
import { Badge } from "@/components/ui/badge";
import { GitHubSkills } from "@/components/ui/github-skills";
import type { CertificationSecteur } from "@/types";

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

// ── SVG logos ──────────────────────────────────────────────────────────────

function BitcoinLogo() {
  return (
    <svg viewBox="0 0 20 20" width="1.1em" height="1.1em" fill="none" aria-hidden style={{ verticalAlign: "middle", opacity: 0.85 }}>
      <path d="M7 5h4.5C12.9 5 14 6.1 14 7.5S12.9 10 11.5 10H7V5zm0 5h5C13.3 10 14.5 11.1 14.5 12.5S13.3 15 12 15H7v-5z" stroke="#F7931A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="3.5" x2="9" y2="16.5" stroke="#F7931A" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="12" y1="3.5" x2="12" y2="16.5" stroke="#F7931A" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 20 20" width="1.1em" height="1.1em" fill="none" aria-hidden style={{ verticalAlign: "middle", opacity: 0.85 }}>
      <path d="M17.5 10.2c0-.6-.1-1.1-.2-1.7H10v3.2h4.2c-.2.9-.7 1.7-1.5 2.2v1.8h2.4C16.6 14.5 17.5 12.5 17.5 10.2z" fill="#4285F4"/>
      <path d="M10 18c2 0 3.6-.7 4.8-1.8l-2.4-1.8c-.7.4-1.5.7-2.4.7-1.9 0-3.4-1.2-4-2.9H3.5v1.9C4.7 16.4 7.2 18 10 18z" fill="#34A853"/>
      <path d="M6 12.2c-.1-.4-.2-.9-.2-1.4 0-.5.1-1 .2-1.4V7.5H3.5C3 8.4 2.7 9.2 2.7 10s.3 1.6.8 2.5L6 12.2z" fill="#FBBC05"/>
      <path d="M10 5.7c1.1 0 2.1.4 2.8 1L14.7 5C13.5 3.9 11.9 3.2 10 3.2 7.2 3.2 4.7 4.8 3.5 7.2l2.5 1.9C6.6 7 8.1 5.7 10 5.7z" fill="#EA4335"/>
    </svg>
  );
}

function NotionLogo() {
  return (
    <svg viewBox="0 0 20 20" width="1.1em" height="1.1em" fill="none" aria-hidden style={{ verticalAlign: "middle", opacity: 0.85 }}>
      <path d="M5 4h2.5L13 13.5V4H15v12h-2.5L7 6.5V16H5V4z" fill="currentColor"/>
    </svg>
  );
}

function GdgLogo() {
  return (
    <svg viewBox="0 0 20 20" width="1.1em" height="1.1em" fill="none" aria-hidden style={{ verticalAlign: "middle", opacity: 0.85 }}>
      <path d="M10 2l4 4-4 4-4-4 4-4z" fill="#4285F4"/>
      <path d="M10 10l4 4-4 4-4-4 4-4z" fill="#EA4335"/>
    </svg>
  );
}

const SECTOR_LOGOS: Record<string, React.ReactNode> = {
  bitcoin: <BitcoinLogo />,
  notion: <NotionLogo />,
};

const CERT_LOGOS: Record<string, React.ReactNode> = {
  google: <GoogleLogo />,
};

// ── Helpers ────────────────────────────────────────────────────────────────

function formatPeriod(exp: { startDate: string; endDate: string | null }, locale: string, present: string): string {
  const start = formatDate(exp.startDate, locale as "fr" | "en");
  const end = exp.endDate ? formatDate(exp.endDate, locale as "fr" | "en") : present;
  return `${start} — ${end}`;
}

const TYPE_LABELS: Record<string, Record<string, string>> = {
  professional: { fr: "Professionnel", en: "Professional" },
  personal:     { fr: "Pause", en: "Break" },
};

// ── Page ───────────────────────────────────────────────────────────────────

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  const L = locale as "fr" | "en";

  // Education section
  const etudes = experiences.filter((e) => e.type === "education");

  // Professional timeline: ongoing first, then by startDate desc
  const parcours = experiences
    .filter((e) => e.type !== "education")
    .sort((a, b) => {
      if (!a.endDate && b.endDate) return -1;
      if (a.endDate && !b.endDate) return 1;
      return b.startDate.localeCompare(a.startDate);
    });

  const anchors = [
    { id: "cv",             label: t.about.anchorCV },
    { id: "competences",    label: t.about.anchorCompetences },
    { id: "certifications", label: t.about.anchorCertifications },
    { id: "etudes",         label: t.about.anchorEtudes },
    { id: "benevol",        label: t.about.anchorBenevol },
    { id: "parcours",       label: t.about.anchorParcours },
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

        {/* ── #cv ─────────────────────────────────────────────────── */}
        <section id="cv" className="mb-20 scroll-mt-24">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary mb-2">
            {profile.name}
          </h1>
          <p className="text-base text-accent mb-8">{t.about.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CV_HREF}
              download={CV_FILE_NAME}
              className="btn-animated inline-flex items-center gap-2 rounded border border-accent bg-accent px-4 py-2 text-sm font-medium text-background"
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

        {/* ── #competences ────────────────────────────────────────── */}
        <section id="competences" className="mb-20 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorCompetences}
          </h2>
          <GitHubSkills fetching={t.about.fetching} />
        </section>

        {/* ── #certifications ─────────────────────────────────────── */}
        <section id="certifications" className="mb-20 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorCertifications}
          </h2>
          <div className="space-y-10">
            {certificationsBySector.map((sector: CertificationSecteur) => (
              <div key={sector.secteur.fr}>
                {/* Sector heading with optional logo */}
                <div className="flex items-center gap-2 mb-4">
                  {sector.logo && SECTOR_LOGOS[sector.logo] && (
                    <span className="shrink-0">{SECTOR_LOGOS[sector.logo]}</span>
                  )}
                  <h3 className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    {sector.secteur[L]}
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {sector.certifs.map((cert, i) => {
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
                          {/* Cert title with optional per-cert logo */}
                          <div className="flex items-center gap-1.5 min-w-0">
                            {cert.logo && CERT_LOGOS[cert.logo] && (
                              <span className="shrink-0">{CERT_LOGOS[cert.logo]}</span>
                            )}
                            <p className="text-sm font-medium text-primary leading-snug">
                              {cert.titre[L]}
                            </p>
                          </div>
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
              </div>
            ))}
          </div>
        </section>

        {/* ── #etudes ─────────────────────────────────────────────── */}
        <section id="etudes" className="mb-20 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorEtudes}
          </h2>
          <div className="space-y-4">
            {etudes.map((exp, i) => (
              <div key={i} className="fade-in border border-border rounded p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <p className="text-sm font-medium text-primary">{exp.role[L]}</p>
                    <p className="text-sm text-secondary">{exp.company}</p>
                  </div>
                  <time className="text-xs text-tertiary sm:whitespace-nowrap shrink-0">
                    {formatPeriod(exp, locale, t.experience.present)}
                  </time>
                </div>
                <p className="text-sm text-secondary leading-relaxed">{exp.description[L]}</p>
                {exp.technologies.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5 mt-3">
                    {exp.technologies.map((tech) => (
                      <li key={tech}><Badge variant="technology" data-tech={tech}>{tech}</Badge></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── #benevol ────────────────────────────────────────────── */}
        <section id="benevol" className="mb-20 scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorBenevol}
          </h2>
          <div className="space-y-4">
            {benevol.map((entry, i) => (
              <div key={i} className="fade-in border border-border rounded p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <GoogleLogo />
                      <p className="text-sm font-medium text-primary">{entry.titre[L]}</p>
                    </div>
                    <p className="text-sm text-secondary">{entry.structure}</p>
                  </div>
                  <time className="text-xs text-tertiary sm:whitespace-nowrap shrink-0">
                    {entry.periode[L]}
                  </time>
                </div>
                <p className="text-xs text-tertiary mb-2">{entry.domaine}</p>
                <p className="text-sm text-secondary leading-relaxed">{entry.description[L]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── #parcours ────────────────────────────────────────────── */}
        <section id="parcours" className="scroll-mt-24">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-8">
            {t.about.anchorParcours}
          </h2>
          <ol className="relative border-l border-border space-y-0">
            {parcours.map((exp, i) => {
              const typeLabel = TYPE_LABELS[exp.type]?.[locale] ?? exp.type;
              const period = formatPeriod(exp, locale, t.experience.present);
              return (
                <li key={i} className="fade-in relative pl-8 pb-10 last:pb-0">
                  <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-border border-2 border-background ring-1 ring-border" />

                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium text-tertiary border border-border rounded px-1.5 py-0.5 uppercase tracking-wider">
                      {typeLabel}
                    </span>
                    <time className="text-xs text-tertiary">{period}</time>
                  </div>

                  <p className="text-sm font-medium text-primary">{exp.role[L]}</p>
                  <p className="text-sm text-secondary mb-3">{exp.company}</p>

                  <details className="group">
                    <summary className="list-none cursor-pointer text-xs text-tertiary hover:text-accent transition-colors duration-150 flex items-center gap-1">
                      <span className="group-open:hidden">{locale === "fr" ? "Voir plus" : "Show more"} ↓</span>
                      <span className="hidden group-open:inline">{locale === "fr" ? "Voir moins" : "Show less"} ↑</span>
                    </summary>
                    <p className="text-sm text-secondary leading-relaxed mt-2">{exp.description[L]}</p>
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

      </div>
    </>
  );
}
