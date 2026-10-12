"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

// Bandeau qui défile tout seul en boucle, sans pause (CSS pur).
// Le serveur n'envoie la liste qu'une fois (page plus légère) ; le navigateur ajoute ensuite les trois
// copies masquées aux lecteurs d'écran qui rendent la boucle continue, puis lance le défilement.
export function Marquee({
  items,
  label,
  reverse = false,
  accent = false,
}: {
  items: string[];
  label: string;
  reverse?: boolean;
  // Rangée mise en avant (outils IA) : texte bleu.
  accent?: boolean;
}) {
  // Faux au rendu serveur et à l'hydratation, vrai ensuite : pas d'écart d'hydratation.
  const ready = useSyncExternalStore(noop, () => true, () => false);

  return (
    <div className={`marquee${reverse ? " reverse" : ""}${accent ? " accent" : ""}`}>
      <div className="marquee-track" data-ready={ready || undefined}>
        <ul aria-label={label} className="marquee-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {ready &&
          [1, 2, 3].map((copy) => (
            <ul key={copy} aria-hidden="true" className="marquee-list">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  );
}
