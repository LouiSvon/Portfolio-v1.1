import type { Locale } from "@/types";
import { getTranslations, formatDate } from "@/lib/i18n";
import { experiences } from "@/data/experience";
import { benevol } from "@/data/benevol";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { sceneImage } from "@/lib/scenes";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { JourneyMac } from "@/components/ui/journey-mac";
import { SectionHeading } from "@/components/ui/section-heading";

// D'où je viens. Grand écran : un Mac qui s'ouvre au défilement, dont l'écran raconte le chemin (JourneyMac).
// Ailleurs (petit écran, écran bas, animations réduites) : la frise, titre épinglé pendant qu'elle se remplit.
// Les deux sont dans la page ; le CSS (.journey-mac-only, .journey-lite) n'en affiche qu'une.
// Ordre chronologique, de la plus ancienne expérience au bénévolat en cours : l'histoire avance jusqu'au présent.
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
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
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

  const items = [...work, ...volunteering];
  // Un personnage dessiné (public/scenes/parcours-marcheur.png) remplace le portrait s'il existe.
  const walkerImage = sceneImage("parcours-marcheur");
  const walker = walkerImage
    ? { src: walkerImage, portrait: false, alt: profile.name }
    : { src: "/portrait.jpg", portrait: true, alt: profile.name };

  return (
    <section id="parcours" className="journey" aria-labelledby="parcours-titre">
      <div className="journey-mac-only">
        <JourneyMac
          title={t.journey.title}
          subtitle={t.journey.subtitle}
          items={items}
          walker={walker}
          host={`${new URL(siteUrl).host}/#parcours`}
        />
      </div>

      <div className="journey-lite screen">
        <div className="shell split">
          <div className="split-aside">
            <SectionHeading id="parcours-titre-lite" title={t.journey.title} subtitle={t.journey.subtitle} />
          </div>
          <Timeline items={items} />
        </div>
      </div>
    </section>
  );
}
