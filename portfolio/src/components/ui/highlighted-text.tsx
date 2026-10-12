import { Fragment } from "react";

// Vérifie qu'une phrase clé figure bien dans le texte : appelée au rendu serveur, elle fait échouer le build
// en cas d'écart (texte retouché sans mettre à jour ses phrases clés).
export function assertPhrases(text: string, phrases: string[], where: string) {
  for (const phrase of phrases) {
    if (!text.includes(phrase)) throw new Error(`Phrase clé introuvable (${where}) : « ${phrase} »`);
  }
}

// Texte dont les phrases clés ressortent (couleur d'accent). Le texte reste identique, mot pour mot.
export function HighlightedText({ text, phrases }: { text: string; phrases: string[] }) {
  if (!phrases.length) return <>{text}</>;
  const pattern = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        phrases.includes(part) ? (
          <strong key={i} className="key-phrase">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
