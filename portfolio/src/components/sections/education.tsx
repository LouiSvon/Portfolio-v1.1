import type { Locale } from "@/types";
import { getTranslations, formatDate } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { certificationsBySector } from "@/data/certifications";
import { PinTrack } from "@/components/ui/pin-track";
import { highlights } from "@/data/highlights";

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
      <path d="M7 5h4.5C12.9 5 14 6.1 14 7.5S12.9 10 11.5 10H7V5zm0 5h5C13.3 10 14.5 11.1 14.5 12.5S13.3 15 12 15H7v-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="3.5" x2="9" y2="16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="12" y1="3.5" x2="12" y2="16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
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

// Teinte de chaque domaine (bleu et violet de la palette).
const DOMAIN_TONES = ["blue", "violet", "blue"] as const;

// Formation, sur un écran. En tête : titre et CV. Dessous, deux colonnes de lecture : à gauche la fiche du diplôme
// (intitulé, école, période, ce qu'on y apprend, projet de cursus), à droite les certifications en liste, une ligne
// chacune (titre, organisme, date, lien de vérification), précédées des domaines qu'elles couvrent.
// Grand écran : section épinglée, le diplôme puis les certifications s'allument au fil du défilement.
// Ailleurs : empilés, dans le flux.
export function EducationSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const text = (value: string | Record<Locale, string>) => (typeof value === "string" ? value : value[locale]);
  const studies = experiences.filter((e) => e.type === "education");
  const certs = certificationsBySector.flatMap((sector) => sector.certifs.map((cert) => ({ sector, cert })));
  const schoolProject = highlights.find((h) => h.school);
  const cvHref = `/${profile.cvFile}`;

  return (
    <PinTrack id="formation" labelledBy="formation-titre" steps={2} step={35} tail={25} mode="wide" stageClassName="edu-stage">
      <div className="shell edu-grid">
        <div className="edu-head fade-in">
          <h2 id="formation-titre" className="section-title">{t.education.title}</h2>
          <div className="edu-cta flex flex-wrap gap-3">
            <a href={cvHref} download={profile.cvDownloadName} className="btn-pill">
              {t.education.downloadCV} <span className="arrow" aria-hidden="true">&darr;</span>
            </a>
            <a href={cvHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {t.education.openCV} <span className="arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div className="edu-panel edu-studies step fade-in" data-from={0} data-step={0}>
          <h3 className="eyebrow">{t.education.studies}</h3>
          {studies.map((exp) => (
            <article key={exp.startDate} className="study">
              <p className="study-degree">{t.education.degree}</p>
              <p className="study-meta">
                {exp.companyUrl ? (
                  <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="study-school">
                    {t.education.school} <span aria-hidden="true">&#8599;</span>
                  </a>
                ) : (
                  <span className="study-school">{t.education.school}</span>
                )}
                <span aria-hidden="true">·</span>
                <span>{t.education.year}</span>
              </p>
              <time className="study-period" dateTime={exp.startDate}>
                {formatDate(exp.startDate, locale)} — {exp.endDate ? formatDate(exp.endDate, locale) : t.journey.present}
              </time>
              <p className="study-desc">{exp.description[locale]}</p>
              {schoolProject && (
                <a
                  href={`https://github.com/${profile.github}/${schoolProject.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="study-project"
                >
                  <span className="eyebrow">{t.education.schoolProject}</span>
                  <span className="study-project-title">
                    {schoolProject.title[locale]} <span aria-hidden="true">&#8599;</span>
                  </span>
                  <span className="text-sm text-secondary">{schoolProject.stack.join(" · ")}</span>
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="edu-panel edu-certs step fade-in" data-from={1} data-step={1}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="eyebrow">{t.education.certifications}</h3>
            <ul className="domain-list" aria-label={t.education.domains}>
              {t.education.domainList.map((label, i) => (
                <li key={label} className="domain" data-tone={DOMAIN_TONES[i % DOMAIN_TONES.length]}>{label}</li>
              ))}
            </ul>
          </div>
          <ul className="cred-list">
            {certs.map(({ sector, cert }) => {
              const logo = cert.logo ?? sector.logo;
              const pending = cert.statut === "en_cours";
              return (
                <li key={cert.titre.en} className="cred-row">
                  <span className="cred-logo" aria-hidden="true">{logo ? LOGOS[logo] : null}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="cred-title">{cert.titre[locale]}</h4>
                    <p className="text-sm text-secondary">
                      {cert.organisme}
                      {pending ? ` · ${t.education.inProgress}` : cert.date ? ` · ${text(cert.date)}` : ""}
                      {cert.expiration && ` · ${t.education.expires} ${text(cert.expiration)}`}
                    </p>
                  </div>
                  {cert.lien && (
                    <a href={cert.lien} target="_blank" rel="noopener noreferrer" className="cred-link">
                      {t.education.viewCertificate}
                      <span className="sr-only"> : {cert.titre[locale]}</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </PinTrack>
  );
}
