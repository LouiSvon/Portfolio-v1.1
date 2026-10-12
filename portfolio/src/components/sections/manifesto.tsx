import Image from "next/image";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";

// Manifeste : la promesse en une phrase, épinglée pendant qu'elle s'allume mot à mot au défilement.
// Le texte entier reste dans la page, dans l'ordre de lecture ; seule son opacité varie (plancher --dim :
// le grand texte garde un contraste d'au moins 3:1). La présentation, en petit texte, n'est jamais atténuée.
// La dernière ligne (Epitech, stage) ouvre le parcours.
// Repli (sans support, écran bas, animations réduites) : phrase affichée d'un bloc, en apparition simple.
export function ManifestoSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const words = t.brief.introLead.split(" ");
  // Les mots s'allument sur les 80 premiers % de la traversée.
  const step = 80 / words.length;

  return (
    <section id="manifeste" className="pin-track" aria-labelledby="manifeste-titre">
      <div className="pin-stage">
        <div className="shell py-[clamp(5rem,12vh,8rem)]">
          <h2 id="manifeste-titre" className="manifesto fade-in">
            {words.map((word, i) => (
              <span
                key={i}
                className="on-scroll inline-block"
                style={{ "--from": `${i * step}%`, "--to": `${(i + 1) * step}%` } as React.CSSProperties}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
          <div className="manifesto-aside fade-in">
            <Image
              src="/portrait.jpg"
              alt={`${t.hero.portraitAlt} ${profile.name}`}
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
            <p className="brief-text">{t.brief.introText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
