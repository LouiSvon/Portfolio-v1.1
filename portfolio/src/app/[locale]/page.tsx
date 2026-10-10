import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { alternatesFor, siteUrl } from "@/lib/site";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { highlights } from "@/data/highlights";
import { certificationsBySector } from "@/data/certifications";
import { stack } from "@/data/stack";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { StackBand } from "@/components/ui/stack-band";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


const FACT_ICONS = {
  school: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7.5 10 4l8 3.5-8 3.5-8-3.5Z" /><path d="M5.5 9v4c0 1 2 2.5 4.5 2.5s4.5-1.5 4.5-2.5V9" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="2.5" /><circle cx="14" cy="8" r="2" /><path d="M2.5 16c.5-2.5 2.3-4 4.5-4s4 1.5 4.5 4M12 12.2c2.3-.4 4.6.8 5.3 3.8" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="8" r="5" /><path d="m7 12.2-1 5.3 4-2 4 2-1-5.3" /><path d="m8 8 1.5 1.5L12.5 6.5" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7.5" /><path d="M2.5 10h15M10 2.5c2 2.2 3 4.7 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.7-3-7.5s1-5.3 3-7.5Z" />
    </svg>
  ),
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return { alternates: alternatesFor(locale, "") };
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const certificationCount = certificationsBySector
    .flatMap((s) => s.certifs)
    .filter((c) => c.statut === "obtenu").length;

  const facts = [
    { icon: "school", value: t.home.facts.school.title, text: t.home.facts.school.text },
    { icon: "community", value: t.home.facts.gdg.title, text: t.home.facts.gdg.text },
    { icon: "badge", value: `${certificationCount} ${t.home.facts.certifications.title}`, text: t.home.facts.certifications.text },
    { icon: "globe", value: t.home.facts.international.title, text: t.home.facts.international.text },
  ] as const;

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
          sameAs: [
            `https://github.com/${profile.github}`,
            profile.linkedin,
          ],
          jobTitle: t.hero.role,
          description: profile.bio[locale],
        }),
      }}
    />
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)]">

      {/* Hero */}
      <section className="hero relative py-14 sm:py-24">
        <div className="hero-halo" aria-hidden="true" />
        <div className="relative flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="availability !mt-0 !mb-5">
              <span className="availability-dot" aria-hidden="true" />
              <span>{t.home.available}</span>
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary mb-3">
              {t.hero.greeting}
            </h1>
            <p className="text-xl text-accent mb-4">{t.hero.role}</p>
            <p className="text-base text-secondary leading-relaxed mb-6">
              {t.hero.tagline}
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <a
                href={`/${profile.cvFile}`}
                download={profile.cvFile}
                className="btn-animated inline-flex items-center gap-2 rounded border border-accent bg-accent px-4 py-2 text-sm font-medium text-background"
              >
                {t.hero.cta.cv} &darr;
              </a>
              <Link
                href={`/${locale}/contact`}
                className="btn-animated inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-secondary hover:border-accent hover:text-accent transition-colors duration-150"
              >
                {t.hero.cta.contact} &rarr;
              </Link>
            </div>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary">
              <a href={`mailto:${profile.email}`} className="hover:text-accent hover:underline underline-offset-4">
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline underline-offset-4">
                LinkedIn
              </a>
              <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline underline-offset-4">
                GitHub
              </a>
            </p>
          </div>
          <Image
            src="/portrait.jpg"
            alt={`${t.home.portraitAlt} ${profile.name}`}
            width={176}
            height={176}
            priority
            className="portrait h-24 w-24 sm:h-44 sm:w-44 shrink-0 rounded-full object-cover"
          />
        </div>
      </section>

      {/* En bref */}
      <section className="pb-16 border-t border-border pt-12" aria-labelledby="en-bref">
        <SectionHeading id="en-bref" title={t.home.inBriefTitle} subtitle={t.home.inBriefSubtitle} />
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <li
              key={fact.value}
              className="fade-in fact-card"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="fact-icon" aria-hidden="true">{FACT_ICONS[fact.icon]}</span>
              <p className="text-lg font-semibold tracking-tight text-primary mb-1">{fact.value}</p>
              <p className="text-sm text-secondary leading-relaxed">{fact.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Technologies */}
      <div className="pb-16">
        <StackBand items={stack} label={t.home.stackLabel} />
      </div>

      {/* Projets phares */}
      <section className="pb-16 pt-4" aria-labelledby="projets-phares">
        <SectionHeading
          id="projets-phares"
          title={t.home.featuredTitle}
          subtitle={t.home.featuredSubtitle}
          action={
            <Link href={`/${locale}/projects`} className="text-sm text-accent hover:underline underline-offset-4">
              {t.home.viewAll} &rarr;
            </Link>
          }
        />
        <ProjectCarousel
          projects={highlights}
          github={profile.github}
          locale={locale}
          labels={{
            carousel: t.home.carouselLabel,
            prev: t.home.prevProject,
            next: t.home.nextProject,
            goTo: t.home.goToProject,
            viewCode: t.home.viewCode,
          }}
        />
      </section>

      {/* Manifeste */}
      <section className="pb-16 border-t border-border pt-12">
        <p className="max-w-[600px] mx-auto text-center text-base text-secondary leading-relaxed">
          {t.manifeste.text}
        </p>
      </section>

      {/* Contact rapide */}
      <section className="pb-20 border-t border-border pt-12" aria-labelledby="contact-rapide">
        <SectionHeading id="contact-rapide" title={t.contact.title} subtitle={t.contact.subtitle} />
        <div className="flex flex-wrap gap-4">
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              {t.contact.email} &rarr;
            </a>
          )}
          <Link
            href={`/${locale}/contact`}
            className="text-sm text-secondary hover:text-accent hover:underline underline-offset-4 transition-colors duration-150"
          >
            {t.contact.submit} &rarr;
          </Link>
        </div>
      </section>

    </div>
    </>
  );
}
