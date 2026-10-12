import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { skillGroups } from "@/data/stack";
import { SectionHeading } from "@/components/ui/section-heading";

// Ce que je fais : la liste des domaines
// reste épinglée pendant qu'un trait bleu souligne chaque domaine à son tour (desktop). Le texte
// reste toujours lisible en entier : seul le trait, décoratif, bouge. Petits écrans, écran bas
// ou animations réduites : liste qui défile normalement, en apparitions simples.
export function SkillsSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const step = 80 / skillGroups.length;

  return (
    <section id="competences" aria-labelledby="competences-titre">
      <div className="pin-track is-wide-only" style={{ "--track": "190svh" } as React.CSSProperties}>
        <div className="pin-stage">
          <div className="shell py-[clamp(5rem,12vh,8rem)]">
            <SectionHeading id="competences-titre" title={t.skills.title} />
            <div>
              {skillGroups.map((group, i) => (
                <div
                  key={group.title.en}
                  className="skill-row on-scroll-line fade-in"
                  style={{ "--from": `${i * step}%`, "--to": `${(i + 1) * step}%` } as React.CSSProperties}
                >
                  <h3 className="eyebrow">{group.title[locale]}</h3>
                  <ul className="skill-chips">
                    {group.items.map((item) => (
                      <li key={item.name} className="skill-chip">
                        {item.logo && (
                          <span
                            className="skill-chip-logo"
                            style={{ "--logo": `url(${item.logo})` } as React.CSSProperties}
                            aria-hidden="true"
                          />
                        )}
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
