import Image from "next/image";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { LogoStars } from "@/components/ui/logo-stars";

// Délai d'animation passé au CSS (.reveal-line, .reveal-soft).
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

// Ouverture plein écran : qui je suis, en une phrase. Le nom (h1) reste l'élément le plus grand
// affiché en premier (LCP), rendu côté serveur. Au défilement, le fond dérive et le texte s'efface (CSS).
export function HeroSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  // Le dernier mot du rôle (« IA », « AI ») ressort en bleu.
  const roleCut = t.hero.role.lastIndexOf(" ") + 1;

  return (
    <section id="accueil" className="hero-screen" aria-labelledby="accueil-titre">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow" />
        <LogoStars />
      </div>

      <div className="hero-content mx-auto flex w-full max-w-6xl flex-col items-center px-[clamp(1rem,4vw,3rem)] text-center">
        <p className="avail-pill reveal-soft whitespace-nowrap text-xs text-secondary sm:text-sm" style={delay(0.05)}>
          <Image
            src="/portrait.jpg"
            alt={`${t.hero.portraitAlt} ${profile.name}`}
            width={32}
            height={32}
            priority
            className="hidden h-8 w-8 object-cover sm:block"
          />
          <span className="availability-dot" aria-hidden="true" />
          <span>{t.hero.available}</span>
        </p>

        <h1 id="accueil-titre" className="hero-name mt-8 text-primary">
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
          <a href="#contact" className="btn-ghost">
            {t.hero.cta.contact} <span className="arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <p className="reveal-soft mt-8 text-sm text-tertiary" style={delay(0.75)}>{profile.location}</p>
      </div>
    </section>
  );
}
