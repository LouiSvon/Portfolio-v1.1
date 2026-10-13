"use client";

import { Fragment } from "react";
import Image from "next/image";
import { PinTrack } from "@/components/ui/pin-track";

export type ManifestoWord = { text: string; key: 0 | 1 | 2 };

// Accroche épinglée : la phrase s'allume mot à mot au rythme du défilement, les mots clés prennent leur couleur.
// Le texte complet est rendu côté serveur, dans l'ordre (moteurs, lecteurs d'écran) ; seule l'opacité varie,
// avec un plancher (--dim) qui garde le grand texte lisible. Hors épinglage (petit écran bas, animations
// réduites) : phrase entièrement allumée, sans mouvement.
export function ManifestoPin({
  words,
  intro,
  portraitAlt,
}: {
  words: ManifestoWord[];
  intro: string;
  portraitAlt: string;
}) {
  return (
    <PinTrack id="manifeste" labelledBy="manifeste-titre" steps={words.length} lead={8} step={6} tail={40} mode="all">
      {({ active }) => (
        <div className="shell">
          <h2 id="manifeste-titre" className="manifesto">
            {words.map((word, i) => (
              <Fragment key={i}>
                <span
                  className="mw"
                  data-on={i <= active || undefined}
                  data-key={word.key || undefined}
                  data-text={word.key ? word.text : undefined}
                >
                  <span className="mw-base">{word.text}</span>
                </span>
                {i < words.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h2>
          <div className="manifesto-aside step" data-on={active >= words.length - 1 || undefined}>
            <Image src="/portrait.jpg" alt={portraitAlt} width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover" />
            <p className="brief-text">{intro}</p>
          </div>
        </div>
      )}
    </PinTrack>
  );
}
