import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { ManifestoPin, type ManifestoWord } from "@/components/ui/manifesto-pin";

// Découpe la phrase en mots et marque ceux qui appartiennent à un mot clé (1 = premier, 2 = second).
// Un mot clé absent de la phrase fait échouer le build : texte et mise en valeur restent cohérents.
function splitWords(sentence: string, keywords: string[]): ManifestoWord[] {
  const spans = keywords.map((keyword, k) => {
    const start = sentence.indexOf(keyword);
    if (start < 0) throw new Error(`Mot clé introuvable dans brief.introLead : « ${keyword} »`);
    return { start, end: start + keyword.length, key: (k + 1) as 1 | 2 };
  });
  let cursor = 0;
  return sentence.split(" ").map((text) => {
    const start = sentence.indexOf(text, cursor);
    cursor = start + text.length;
    const span = spans.find((s) => start < s.end && cursor > s.start);
    return { text, key: span ? span.key : 0 };
  });
}

// Manifeste : la promesse en une phrase, juste après le héros. La présentation, en petit texte, la suit.
export function ManifestoSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  return (
    <ManifestoPin
      words={splitWords(t.brief.introLead, t.brief.introKeywords)}
      intro={t.brief.introText}
      portraitAlt={`${t.hero.portraitAlt} ${profile.name}`}
    />
  );
}
