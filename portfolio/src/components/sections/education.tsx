import type { Locale } from "@/types";
import { getTranslations, formatDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { certificationsBySector } from "@/data/certifications";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";

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

function BitcoinLogo() {
  return (
    <svg viewBox="0 0 20 20" width="1.1em" height="1.1em" fill="none" aria-hidden style={{ verticalAlign: "middle", opacity: 0.85 }}>
      <path d="M7 5h4.5C12.9 5 14 6.1 14 7.5S12.9 10 11.5 10H7V5zm0 5h5C13.3 10 14.5 11.1 14.5 12.5S13.3 15 12 15H7v-5z" stroke="#F7931A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="3.5" x2="9" y2="16.5" stroke="#F7931A" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="12" y1="3.5" x2="12" y2="16.5" stroke="#F7931A" strokeWidth="1.4" strokeLinecap="round"/>
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

const LOGOS = { bitcoin: <BitcoinLogo />, google: <GoogleLogo />, notion: <NotionLogo /> };

// Formation : études et certifications vérifiables, le CV toujours à portée (colonne épinglée).
export function EducationSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const studies = experiences.filter((e) => e.type === "education");
  const cvHref = `/${profile.cvFile}`;

  return (
    <section id="formation" className="screen" aria-labelledby="formation-titre">
      <div className="shell split">
        <div className="split-aside">
          <SectionHeading id="formation-titre" title={t.education.title} />
          <div className="fade-in flex flex-wrap gap-3">
            <a href={cvHref} download={profile.cvFile} className="btn-pill">
              {t.education.downloadCV} <span className="arrow" aria-hidden="true">&darr;</span>
            </a>
            <a href={cvHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {t.education.openCV} <span className="arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {t.education.linkedin}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-14">
          <div>
            <h3 className="eyebrow mb-4">{t.education.studies}</h3>
            <div className="space-y-4">
              {studies.map((exp) => (
                <article key={exp.startDate} className="fade-in panel">
                  <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="panel-title">{exp.role[locale]}</h4>
                      <p className="text-sm text-secondary">
                        {exp.companyUrl ? (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-accent hover:underline">
                            {exp.company[locale]} <span aria-hidden="true">&#8599;</span>
                          </a>
                        ) : (
                          exp.company[locale]
                        )}
                      </p>
                    </div>
                    <time className="chip shrink-0 self-start sm:whitespace-nowrap">
                      {formatDate(exp.startDate, locale)} — {exp.endDate ? formatDate(exp.endDate, locale) : t.journey.present}
                    </time>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">{exp.description[locale]}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <li key={tech}><Badge variant="technology" data-tech={tech}>{tech}</Badge></li>
                    ))}
                    {exp.skills?.[locale].map((skill) => (
                      <li key={skill} className="chip">{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-4">{t.education.certifications}</h3>
            <ul className="cert-list">
              {certificationsBySector.flatMap((sector) =>
                sector.certifs.map((cert) => {
                  const logo = cert.logo ?? sector.logo;
                  const pending = cert.statut === "en_cours";
                  return (
                    <li key={cert.titre.en} className={`fade-in panel cert-card${pending ? " border-dashed" : ""}`}>
                      <span className="eyebrow">{sector.secteur[locale]}</span>
                      <h4 className="panel-title flex items-center gap-1.5">
                        {logo && <span className="shrink-0">{LOGOS[logo]}</span>}
                        {cert.titre[locale]}
                      </h4>
                      <p className="text-xs text-secondary">
                        {cert.organisme}
                        {pending ? ` · ${t.education.inProgress}` : cert.date ? ` · ${cert.date}` : ""}
                        {cert.expiration && ` · ${t.education.expires} ${cert.expiration}`}
                      </p>
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
                          className="mt-auto pt-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
                        >
                          {t.education.viewCertificate}
                        </a>
                      )}
                    </li>
                  );
                }),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
