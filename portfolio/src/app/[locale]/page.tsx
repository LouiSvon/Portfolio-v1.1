import type { Metadata } from "next";
import { alternatesFor, siteUrl } from "@/lib/site";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { fetchGitHubRepos } from "@/lib/github";
import { profile } from "@/data/profile";
import { HeroSection } from "@/components/sections/hero";
import { BriefSection } from "@/components/sections/brief";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { JourneySection } from "@/components/sections/journey";
import { EducationSection } from "@/components/sections/education";
import { ArticlesSection } from "@/components/sections/articles";
import { NowSection } from "@/components/sections/now";
import { ContactSection } from "@/components/sections/contact";

// Les dépôts GitHub sont relus au plus une fois par heure.
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  const title = `${profile.name} — ${t.hero.role}`;
  return {
    title: { absolute: title },
    description: t.meta.description,
    alternates: alternatesFor(locale, ""),
    openGraph: {
      title,
      description: t.meta.description,
      url: `/${locale}`,
      siteName: profile.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      type: "profile",
    },
  };
}

// Page unique : qui je suis, ce que je fais, d'où je viens, comment me joindre.
export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  const repos = await fetchGitHubRepos();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            url: siteUrl,
            sameAs: [`https://github.com/${profile.github}`, profile.linkedin],
            jobTitle: t.hero.role,
            description: profile.bio[locale],
          }),
        }}
      />
      <HeroSection locale={locale} />
      <BriefSection locale={locale} />
      <SkillsSection locale={locale} />
      <ProjectsSection locale={locale} repos={repos} />
      <JourneySection locale={locale} />
      <EducationSection locale={locale} />
      <ArticlesSection locale={locale} />
      <NowSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
