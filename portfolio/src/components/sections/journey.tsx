import type { Locale } from "@/types";
import { getTranslations, formatDate } from "@/lib/i18n";
import { experiences } from "@/data/experience";
import { benevol } from "@/data/benevol";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/ui/section-heading";

// Parcours : le titre reste épinglé pendant que la frise se remplit au défilement.
// Bénévolat en tête (en cours), puis les expériences de la plus récente à la plus ancienne.
export function JourneySection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const period = (start: string, end: string | null) =>
    `${formatDate(start, locale)} — ${end ? formatDate(end, locale) : t.journey.present}`;

  const volunteering: TimelineItem[] = benevol.map((entry) => ({
    key: `${entry.structure}-${entry.titre.en}`,
    typeLabel: t.journey.types.volunteering,
    period: entry.periode[locale],
    role: entry.titre[locale],
    company: entry.structure,
    description: entry.description[locale],
    tags: [{ label: entry.domaine[locale], tech: false }],
    links: [],
    images: [],
  }));

  const work: TimelineItem[] = experiences
    .filter((e) => e.type !== "education")
    .sort((a, b) => {
      if (!a.endDate && b.endDate) return -1;
      if (a.endDate && !b.endDate) return 1;
      return b.startDate.localeCompare(a.startDate);
    })
    .map((exp) => ({
      key: `${exp.company.en}-${exp.startDate}`,
      typeLabel: t.journey.types[exp.type as keyof typeof t.journey.types],
      period: period(exp.startDate, exp.endDate),
      role: exp.role[locale],
      company: exp.company[locale],
      companyUrl: exp.companyUrl,
      description: exp.description[locale],
      tags: [
        ...exp.technologies.map((label) => ({ label, tech: true })),
        ...(exp.skills?.[locale] ?? []).map((label) => ({ label, tech: false })),
      ],
      links: (exp.links ?? []).map((link) => ({ label: link.label[locale], url: link.url })),
      images: (exp.images ?? []).map((img) => ({ src: img.src, alt: img.alt[locale] })),
    }));

  return (
    <section id="parcours" className="screen" aria-labelledby="parcours-titre">
      <div className="shell split">
        <div className="split-aside">
          <SectionHeading id="parcours-titre" title={t.journey.title} subtitle={t.journey.subtitle} />
        </div>
        <Timeline items={[...volunteering, ...work]} />
      </div>
    </section>
  );
}
