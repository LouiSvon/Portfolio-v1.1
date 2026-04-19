import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations } from "@/lib/i18n";
import { experiences } from "@/data/experience";
import { ExperienceItem } from "@/components/ui/experience-item";
import {
  getExperienceSections,
  type ExperienceSectionKey,
} from "@/lib/experience";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return {
    title: t.experience.title,
    description: t.experience.subtitle,
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const sectionTitles: Record<ExperienceSectionKey, string> = {
    education: t.experience.education,
    personal: t.experience.personal,
    professional: t.experience.professional,
  };

  const sectionSpacing: Record<ExperienceSectionKey, string> = {
    education: "mb-12",
    personal: "mb-12",
    professional: "",
  };
  const sections = getExperienceSections(experiences).filter(
    (section) => section.items.length > 0
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.experience.title}
        </h1>
        <p className="text-sm text-secondary mt-2">{t.experience.subtitle}</p>
      </header>

      {sections.map((section) => (
        <section key={section.key} className={sectionSpacing[section.key]}>
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            {sectionTitles[section.key]}
          </h2>
          <div>
            {section.items.map((exp) => (
              <ExperienceItem
                key={`${section.key}-${exp.company}-${exp.startDate}`}
                experience={exp}
                locale={locale}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
