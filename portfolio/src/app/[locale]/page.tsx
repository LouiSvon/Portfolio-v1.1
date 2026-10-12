import type { Metadata } from "next";
import { alternatesFor, siteUrl } from "@/lib/site";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { fetchGitHubRepos } from "@/lib/github";
import { profile } from "@/data/profile";
import { HeroSection } from "@/components/sections/hero";
import { ManifestoSection } from "@/components/sections/manifesto";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { JourneySection } from "@/components/sections/journey";
import { EducationSection } from "@/components/sections/education";
import { BlogSection } from "@/components/sections/blog";
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

// Page unique, dans l'ordre du récit : qui je suis, d'où je viens, ce que je fais,
// ce que j'ai construit, ce que j'écris, comment me joindre.
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
      <ManifestoSection locale={locale} />
      <JourneySection locale={locale} />
      <EducationSection locale={locale} />
      <SkillsSection locale={locale} />
      <ProjectsSection locale={locale} repos={repos} />
      <BlogSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
