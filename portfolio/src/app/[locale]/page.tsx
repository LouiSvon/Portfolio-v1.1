import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { alternatesFor, siteUrl } from "@/lib/site";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { highlights } from "@/data/highlights";
import { certificationsBySector } from "@/data/certifications";
import { aiTools, stack } from "@/data/stack";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectList } from "@/components/ui/project-list";
import { LogoStars } from "@/components/ui/logo-stars";
import { Marquee } from "@/components/ui/marquee";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return { alternates: alternatesFor(locale, "") };
}

// Délai d'animation passé au CSS (.reveal-line, .reveal-soft).
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const certificationCount = certificationsBySector
    .flatMap((s) => s.certifs)
    .filter((c) => c.statut === "obtenu").length;

  const facts = t.home.facts.map((fact) => ({
    ...fact,
    value: fact.value.replace("{n}", String(certificationCount)),
  }));

  // Cibles des lignes « En ce moment ».
  const nowLinks = {
    project: { href: `https://github.com/${profile.github}/pass-gdg`, external: true },
    blog: { href: `/${locale}/blog`, external: false },
    contact: { href: `/${locale}/contact`, external: false },
  };

  // Le dernier mot du rôle (« IA », « AI ») ressort en bleu.
  const roleCut = t.hero.role.lastIndexOf(" ") + 1;

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

    {/* Héros plein écran */}
    <section className="hero-screen">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow" />
        <LogoStars />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-[clamp(1rem,4vw,3rem)] text-center">
        <p className="avail-pill reveal-soft whitespace-nowrap text-xs text-secondary sm:text-sm" style={delay(0.05)}>
          <Image
            src="/portrait.jpg"
            alt={`${t.home.portraitAlt} ${profile.name}`}
            width={32}
            height={32}
            priority
            className="hidden h-8 w-8 object-cover sm:block"
          />
          <span className="availability-dot" aria-hidden="true" />
          <span>{t.home.available}</span>
        </p>

        <h1 className="hero-name mt-8 text-primary">
          <span className="reveal-line"><span style={delay(0.15)}>{profile.name}</span></span>
        </h1>

        <p className="reveal-soft mt-6 max-w-xl text-lg text-secondary sm:text-2xl" style={delay(0.45)}>
          {t.hero.role.slice(0, roleCut)}
          <span className="hero-role-hl">{t.hero.role.slice(roleCut)}</span>
        </p>

        <div className="reveal-soft mt-10 flex flex-wrap justify-center gap-3" style={delay(0.6)}>
          <a href={`/${profile.cvFile}`} download={profile.cvFile} className="btn-pill">
            {t.hero.cta.cv} <span className="arrow" aria-hidden="true">&darr;</span>
          </a>
          <Link href={`/${locale}/contact`} className="btn-ghost">
            {t.hero.cta.contact} <span className="arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <p className="reveal-soft mt-8 text-sm text-tertiary" style={delay(0.75)}>{profile.location}</p>
      </div>
    </section>

    {/* Stack et outils : deux rangées fines, sans titre */}
    <div className="flex flex-col gap-2 border-y border-border py-4">
      <Marquee items={stack} label={t.home.stackLabel} />
      <Marquee items={aiTools} label={t.home.toolsLabel} reverse accent />
    </div>

    <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,3rem)]">

      {/* En bref */}
      <section className="py-24 sm:py-32" aria-labelledby="en-bref">
        <SectionHeading id="en-bref" title={t.home.inBriefTitle} />
        <div className="brief-grid">
          <div className="brief-intro fade-in">
            <Image
              src="/portrait.jpg"
              alt={`${t.home.portraitAlt} ${profile.name}`}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
            <p className="brief-lead">{t.home.introLead}</p>
            <p className="brief-text">{t.home.introText}</p>
            <Link href={`/${locale}/about`} className="btn-ghost mt-auto self-start">
              {t.home.introLink} <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          {facts.map((fact, i) => (
            <Link
              key={fact.anchor}
              href={`/${locale}/about#${fact.anchor}`}
              className="fact-card fade-in"
              style={{ transitionDelay: `${(i + 1) * 0.07}s` }}
            >
              <span className="fact-head">
                <span className="eyebrow">{fact.category}</span>
                <span className="fact-arrow" aria-hidden="true">&rarr;</span>
              </span>
              <span className="fact-value">{fact.value}</span>
              <span className="fact-label">{fact.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Projets phares */}
      <section className="pb-24 sm:pb-32" aria-labelledby="projets-phares">
        <SectionHeading
          id="projets-phares"
          title={t.home.featuredTitle}
          action={
            <Link href={`/${locale}/projects`} className="btn-ghost">
              {t.home.viewAll} <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
          }
        />
        <ProjectList
          projects={highlights}
          github={profile.github}
          locale={locale}
          viewCode={t.home.viewCode}
        />
      </section>

      {/* En ce moment */}
      <section className="pb-24 sm:pb-32" aria-labelledby="en-ce-moment">
        <SectionHeading id="en-ce-moment" title={t.home.nowTitle} />
        <ul className="now-list">
          {t.home.now.map((item) => {
            const content = (
              <>
                <span className="eyebrow now-label">
                  <span className="now-dot" aria-hidden="true" />
                  {item.label}
                </span>
                <span className="now-text">{item.text}</span>
                {item.link && <span className="now-arrow" aria-hidden="true">&rarr;</span>}
              </>
            );
            const target = item.link ? nowLinks[item.link] : null;
            return (
              <li key={item.label} className="fade-in">
                {!target ? (
                  <div className="now-row">{content}</div>
                ) : target.external ? (
                  <a href={target.href} target="_blank" rel="noopener noreferrer" className="now-row is-link">{content}</a>
                ) : (
                  <Link href={target.href} className="now-row is-link">{content}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Appel final */}
      <section className="border-t border-border py-24 sm:py-32" aria-labelledby="cta">
        <h2 id="cta" className="cta-xl fade-in text-primary">
          {t.home.ctaTitle}
        </h2>
        <p className="availability fade-in">
          <span className="availability-dot" aria-hidden="true" />
          <span>{t.home.available}</span>
        </p>
        <div className="fade-in flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="btn-pill">
            {t.home.ctaEmail} <span className="arrow" aria-hidden="true">&rarr;</span>
          </a>
          <Link href={`/${locale}/contact`} className="btn-ghost">
            {t.home.ctaForm} <span className="arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
    </>
  );
}
