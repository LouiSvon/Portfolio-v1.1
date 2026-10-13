import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { skillGroups } from "@/data/stack";
import { SkillOrbit } from "@/components/ui/skill-orbit";

// Ce que je fais : les outils gravitent famille par famille (SkillOrbit), après la formation et avant les
// projets, qui en montrent l'usage.
export function SkillsSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <SkillOrbit
      id="competences"
      title={t.skills.title}
      countLabel={t.skills.count}
      groups={skillGroups.map((group) => ({ title: group.title[locale], items: group.items }))}
    />
  );
}
