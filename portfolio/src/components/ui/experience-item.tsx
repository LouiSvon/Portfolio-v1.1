import type { Experience, Locale } from "@/types";
import { getTranslations, formatDate } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

function TechnologyBadges({
  label,
  technologies,
}: {
  label: string;
  technologies: string[];
}) {
  if (technologies.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5 mt-3" aria-label={label}>
      {technologies.map((technology) => (
        <li key={technology}>
          <Badge variant="technology" data-tech={technology}>
            {technology}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceItem({
  experience,
  locale,
}: {
  experience: Experience;
  locale: Locale;
}) {
  const t = getTranslations(locale);
  const start = formatDate(experience.startDate, locale);
  const end = experience.endDate
    ? formatDate(experience.endDate, locale)
    : t.experience.present;

  return (
    <article className="border-b border-border py-6 first:pt-0 last:border-b-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
        <div>
          <h3 className="text-base font-medium text-primary">
            {experience.role[locale]}
          </h3>
          <p className="text-sm text-secondary">{experience.company}</p>
        </div>
        <time className="text-sm text-tertiary whitespace-nowrap">
          {start} — {end}
        </time>
      </div>

      <p className="text-sm text-secondary leading-relaxed mt-2">
        {experience.description[locale]}
      </p>

      <TechnologyBadges
        label={t.experience.technologies}
        technologies={experience.technologies}
      />
    </article>
  );
}
