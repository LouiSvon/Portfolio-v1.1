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
import { Marquee } from "@/components/ui/marquee";
import { ScrollStatement } from "@/components/ui/scroll-statement";

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

  const statement = t.home.statement.map((part) => ({
    highlight: part.highlight.replace("{n}", String(certificationCount)),
    text: part.text,
  }));

  const [firstName, ...lastName] = profile.name.split(" ");
  const half = Math.ceil(stack.length / 2);

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
        <div className="hero-blob" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-[clamp(1rem,4vw,3rem)]">
        <p className="avail-pill reveal-soft text-xs text-secondary sm:text-sm" style={delay(0.05)}>
          <Image
            src="/portrait.jpg"
            alt={`${t.home.portraitAlt} ${profile.name}`}
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-cover"
          />
          <span className="availability-dot" aria-hidden="true" />
          <span>{t.home.available}</span>
        </p>

        <h1 className="hero-name mt-8 text-primary">
          <span className="reveal-line"><span style={delay(0.15)}>{firstName}</span></span>
          <span className="reveal-line"><span className="grad-text" style={delay(0.3)}>{lastName.join(" ")}</span></span>
        </h1>

        <p className="reveal-soft mt-8 max-w-xl text-lg text-secondary sm:text-xl" style={delay(0.6)}>
          {t.hero.role}
        </p>

        <div className="reveal-soft mt-8 flex flex-wrap gap-3" style={delay(0.75)}>
          <a href={`/${profile.cvFile}`} download={profile.cvFile} className="btn-pill">
            {t.hero.cta.cv} <span className="arrow" aria-hidden="true">&darr;</span>
          </a>
          <Link href={`/${locale}/contact`} className="btn-ghost">
            {t.hero.cta.contact} <span className="arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="reveal-soft mx-auto mt-16 flex w-full max-w-6xl items-center justify-between px-[clamp(1rem,4vw,3rem)]" style={delay(1)}>
        <span className="eyebrow">{profile.location}</span>
        <span className="eyebrow scroll-cue">{t.home.scrollCue}</span>
      </div>
    </section>

    {/* Bandeau de technologies */}
    <div className="flex flex-col gap-4 border-y border-border py-6">
      <Marquee items={stack.slice(0, half)} label={t.home.stackLabel} />
      <Marquee items={stack.slice(half)} label={t.home.stackLabel} reverse />
    </div>

    <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,3rem)]">

      {/* En bref */}
      <section className="py-24 sm:py-32" aria-labelledby="en-bref">
        <h2 id="en-bref" className="sr-only">{t.home.inBriefTitle}</h2>
        <ScrollStatement parts={statement} />
      </section>

      {/* Projets phares */}
      <section className="pb-24 sm:pb-32" aria-labelledby="projets-phares">
        <SectionHeading
          id="projets-phares"
          title={t.home.featuredTitle}
          action={
            <Link href={`/${locale}/projects`} className="btn-ghost hidden sm:inline-flex">
              {t.home.viewAll} <span className="arrow" aria-hidden="true">&rarr;</span>
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
        <Link href={`/${locale}/projects`} className="btn-ghost mt-8 sm:hidden">
          {t.home.viewAll} <span className="arrow" aria-hidden="true">&rarr;</span>
        </Link>
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
