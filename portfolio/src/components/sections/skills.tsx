import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { aiTools, skillGroups, stack } from "@/data/stack";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";

// Compétences : les deux bandeaux en ouverture, puis une ligne par domaine,
// petites pastilles à logo pour se lire d'un coup d'œil.
export function SkillsSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <section id="competences" className="screen" aria-labelledby="competences-titre">
      <div className="flex flex-col gap-2 border-y border-border py-4">
        <Marquee items={stack} label={t.skills.stackLabel} />
        <Marquee items={aiTools} label={t.skills.toolsLabel} reverse accent />
      </div>

      <div className="shell mt-[clamp(4rem,10vh,7rem)]">
        <SectionHeading id="competences-titre" title={t.skills.title} />
        <div>
          {skillGroups.map((group) => (
            <div key={group.title.en} className="skill-row fade-in">
              <h3 className="eyebrow">{group.title[locale]}</h3>
              <ul className="skill-chips">
                {group.items.map((item) => (
                  <li key={item.name} className="skill-chip">
                    {item.logo && (
                      <span
                        className="skill-chip-logo"
                        style={{ WebkitMaskImage: `url(${item.logo})`, maskImage: `url(${item.logo})` }}
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
    </section>
  );
}
