import Image from "next/image";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { certificationsBySector } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/section-heading";

// « En bref » : la phrase clé en grand, puis les faits en ligne.
// Chaque fait mène à la section qui le détaille.
export function BriefSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const certificationCount = certificationsBySector
    .flatMap((s) => s.certifs)
    .filter((c) => c.statut === "obtenu").length;

  return (
    <section id="en-bref" className="screen" aria-labelledby="en-bref-titre">
      <div className="shell">
        <SectionHeading id="en-bref-titre" title={t.brief.title} />
        <div className="brief-statement">
          <p className="brief-lead fade-in">{t.brief.introLead}</p>
          <div className="brief-aside fade-in" style={{ transitionDelay: "0.12s" }}>
            <Image
              src="/portrait.jpg"
              alt={`${t.hero.portraitAlt} ${profile.name}`}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
            <p className="brief-text">{t.brief.introText}</p>
          </div>
        </div>

        <ul className="fact-list">
          {t.brief.facts.map((fact, i) => (
            <li key={fact.category}>
              <a
                href={`#${fact.anchor}`}
                className="fact-card fade-in"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="fact-head">
                  <span className="eyebrow">{fact.category}</span>
                  <span className="fact-arrow" aria-hidden="true">&darr;</span>
                </span>
                <span className="fact-value">{fact.value.replace("{n}", String(certificationCount))}</span>
                <span className="fact-label">{fact.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
