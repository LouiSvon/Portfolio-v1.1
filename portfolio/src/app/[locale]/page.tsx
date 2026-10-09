import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { alternatesFor, siteUrl } from "@/lib/site";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { highlights } from "@/data/highlights";
import { certificationsBySector } from "@/data/certifications";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
    { value: t.home.facts.school.title, text: t.home.facts.school.text },
    { value: t.home.facts.gdg.title, text: t.home.facts.gdg.text },
    { value: `${certificationCount} ${t.home.facts.certifications.title}`, text: t.home.facts.certifications.text },
    { value: t.home.facts.international.title, text: t.home.facts.international.text },
  ];

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
      <section className="pb-16 border-t border-border pt-12">
        <h2 className="text-xs font-medium text-secondary uppercase tracking-wider mb-8">
          {t.home.inBriefTitle}
        </h2>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact.value} className="fade-in rounded border border-border p-4">
              <p className="text-sm font-medium text-primary mb-1">{fact.value}</p>
              <p className="text-xs text-secondary leading-relaxed">{fact.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Projets phares */}
      <section className="pb-16 border-t border-border pt-12">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <h2 className="text-xs font-medium text-secondary uppercase tracking-wider">
            {t.home.featuredTitle}
          </h2>
          <Link href={`/${locale}/projects`} className="text-xs text-accent hover:underline underline-offset-4">
            {t.home.viewAll} &rarr;
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {highlights.map((project) => (
            <article
              key={project.repo}
              className="fade-in card card-accent flex flex-col gap-3 rounded border border-border p-5"
            >
              <h3 className="text-base font-medium text-primary leading-snug">
                {project.title[locale]}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">{project.summary[locale]}</p>
              <ul className="flex flex-wrap gap-1.5 mt-auto">
                {project.stack.map((tech) => (
                  <li key={tech} className="text-xs text-tertiary bg-badge-bg px-2 py-0.5 rounded">
                    {tech}
                  </li>
                ))}
              </ul>
              <a
                href={`https://github.com/${profile.github}/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline underline-offset-4"
              >
                {t.home.viewCode} &rarr;
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Manifeste */}
      <section className="pb-16 border-t border-border pt-12">
        <p className="max-w-[600px] mx-auto text-center text-base text-secondary leading-relaxed">
          {t.manifeste.text}
        </p>
      </section>

      {/* Contact rapide */}
      <section className="pb-20 border-t border-border pt-12">
        <h2 className="text-sm font-medium text-primary mb-1">{t.contact.title}</h2>
        <p className="text-sm text-secondary mb-4">{t.contact.subtitle}</p>
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
