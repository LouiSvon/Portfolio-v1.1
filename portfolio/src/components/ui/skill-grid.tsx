import type { Locale } from "@/types";
import { skillGroups } from "@/data/stack";

// Compétences en tuiles à logo : logo gris qui s'allume en bleu au survol, nom dessous.
export function SkillGrid({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col gap-10">
      {skillGroups.map((group) => (
        <div key={group.title.en} className="fade-in">
          <h3 className="eyebrow mb-4 flex items-center gap-3">
            {group.title[locale]}
            <span className="text-tertiary">{String(group.items.length).padStart(2, "0")}</span>
          </h3>
          <ul className="skill-tiles">
            {group.items.map((item) => (
              <li key={item.name} className="skill-tile">
                {item.logo ? (
                  <span
                    className="skill-logo"
                    style={{ WebkitMaskImage: `url(${item.logo})`, maskImage: `url(${item.logo})` }}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="skill-initial" aria-hidden="true">{item.name[0]}</span>
                )}
                <span className="skill-name">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
