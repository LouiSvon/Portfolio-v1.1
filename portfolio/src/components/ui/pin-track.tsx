"use client";

import { useCallback, useEffect, useState } from "react";

// Ligne de lecture : une bande fine à 45 % de la hauteur de l'écran (même réglage que la navigation).
const LINE = 45;

export type PinMode = "all" | "md" | "wide";

// Mêmes conditions que le CSS (.pin-all, .pin-md, .pin-wide dans globals.css) : à garder synchronisées.
const QUERIES: Record<PinMode, string> = {
  all: "(prefers-reduced-motion: no-preference) and (min-height: 600px)",
  md: "(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 600px)",
  wide: "(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 700px)",
};

export type PinApi = {
  // Étape courante (0 à steps - 1). Elle ne change qu'au passage d'une frontière, jamais à chaque frame.
  active: number;
  // Amène la page sur une étape (clic, onglet) ; hors épinglage, change l'étape directement.
  goTo: (index: number) => void;
};

// Section épinglée commune à tout le site. La piste mesure 100svh + `lead` + `steps` x `step` + `tail` (en svh) ;
// la scène reste collée en haut (sticky) pendant la traversée, puis le défilement reprend vers la suite.
// Le défilement reste natif : aucune écoute de scroll. Des capteurs invisibles pavent la piste et un
// IntersectionObserver dit lequel croise la ligne de lecture ; l'étape change seulement à ce moment-là.
// `lead` réserve un temps avant la première étape (ouverture animée en CSS, par exemple).
// Épinglage selon `mode` : partout ("all"), dès 768 px ("md") ou dès 1024 px ("wide") ; jamais sur un écran
// trop bas ni avec « réduire les animations » : la section s'affiche alors en entier, dans le flux (CSS).
// Le contenu des étapes inactives reste dans la page (lecteurs d'écran) et focalisable ; un focus clavier
// dans une étape (élément [data-step]) ramène la page sur cette étape.
export function PinTrack({
  id,
  labelledBy,
  steps,
  lead = 0,
  step = 40,
  tail = 30,
  mode = "wide",
  className = "",
  stageClassName = "",
  children,
}: {
  id?: string;
  labelledBy?: string;
  steps: number;
  lead?: number;
  step?: number;
  tail?: number;
  mode?: PinMode;
  className?: string;
  stageClassName?: string;
  // Fonction (composant client) ou contenu direct (composant serveur) : dans ce second cas, les éléments
  // marqués data-from="k" s'allument dès l'étape k et ceux marqués data-at="k" à l'étape k seulement
  // (data-past une fois l'étape k dépassée).
  children: ((api: PinApi) => React.ReactNode) | React.ReactNode;
}) {
  // Refs de rappel gardées en état : goTo peut être transmise au rendu sans lire de ref pendant celui-ci.
  const [track, setTrack] = useState<HTMLElement | null>(null);
  const [stage, setStage] = useState<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  // Épinglée ou non (data-pinned) : les styles des étapes inactives ne s'appliquent que dans ce cas.
  const [isPinned, setIsPinned] = useState(false);
  const count = Math.max(steps, 1);

  const goTo = useCallback(
    (index: number) => {
      if (!track || !stage || !window.matchMedia(QUERIES[mode]).matches) {
        setActive(index);
        return;
      }
      // 1svh en pixels : la scène épinglée mesure 100svh.
      const unit = stage.offsetHeight / 100;
      const top = track.getBoundingClientRect().top + window.scrollY;
      // La ligne de lecture se place au milieu du capteur de l'étape (capteur i : LINE + lead + i x step).
      window.scrollTo({ top: top + (lead + (index + 0.5) * step) * unit });
    },
    [track, stage, lead, step, mode],
  );

  useEffect(() => {
    const query = window.matchMedia(QUERIES[mode]);
    const update = () => setIsPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [mode]);

  useEffect(() => {
    if (!track || !("IntersectionObserver" in window)) return;
    const sensors = track.querySelectorAll<HTMLElement>(":scope > .pin-sensor");
    const crossing = new Set<number>();
    // Aucun capteur sur la ligne alors qu'ils pavent la piste : la ligne est avant ou après la piste. La scène
    // montre alors la première ou la dernière étape (sinon, après un saut, elle garderait une étape périmée).
    const settle = () => {
      if (crossing.size || !window.matchMedia(QUERIES[mode]).matches) return;
      const rect = track.getBoundingClientRect();
      const line = (window.innerHeight * LINE) / 100;
      if (rect.bottom <= line) setActive(count - 1);
      else if (rect.top >= line) setActive(0);
    };
    // Plusieurs capteurs peuvent changer dans un même rappel (défilement rapide, arrivée par une ancre) :
    // on garde l'ensemble de ceux qui croisent la ligne et on retient le plus avancé.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.i);
          if (entry.isIntersecting) crossing.add(index);
          else crossing.delete(index);
        }
        if (crossing.size) setActive(Math.max(...crossing));
        else settle();
      },
      { rootMargin: `-${LINE}% 0px -${99 - LINE}% 0px` },
    );
    sensors.forEach((sensor) => io.observe(sensor));

    // Scène hors écran : ses animations décoratives se mettent en pause (CSS, [data-offscreen]). Retour à
    // l'écran sans capteur traversé (saut par-dessus la piste) : l'étape est recalée avant d'être vue.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        track.removeAttribute("data-offscreen");
        settle();
      } else track.setAttribute("data-offscreen", "");
    });
    visibility.observe(track);

    return () => {
      io.disconnect();
      visibility.disconnect();
    };
  }, [track, count, mode]);

  // Contenu direct : l'allumage des éléments marqués se fait ici, une fois par changement d'étape.
  useEffect(() => {
    if (!stage || typeof children === "function") return;
    stage.querySelectorAll<HTMLElement>("[data-from], [data-at]").forEach((el) => {
      const from = el.dataset.from;
      const on = from !== undefined ? Number(from) <= active : Number(el.dataset.at) === active;
      el.toggleAttribute("data-on", on);
      // data-at déjà dépassé : data-past (sens de sortie, ex. vers la gauche).
      if (from === undefined) el.toggleAttribute("data-past", Number(el.dataset.at) < active);
    });
  }, [stage, active, children]);

  const onFocus = (event: React.FocusEvent) => {
    const owner = (event.target as HTMLElement).closest<HTMLElement>("[data-step]");
    if (!owner || !isPinned) return;
    const index = Number(owner.dataset.step);
    if (Number.isFinite(index) && index !== active) goTo(index);
  };

  // Capteurs : le premier part du haut de la piste, le dernier va jusqu'au bout (remontée, arrivée directe).
  const sensors = Array.from({ length: count }, (_, i) => {
    const start = i === 0 ? 0 : LINE + lead + i * step;
    const end = i === count - 1 ? 100 + lead + count * step + tail : LINE + lead + (i + 1) * step;
    return { top: `${start}svh`, height: `${end - start}svh` };
  });

  return (
    <section
      ref={setTrack}
      id={id}
      aria-labelledby={labelledBy}
      className={`pin pin-${mode} ${className}`}
      data-pinned={isPinned || undefined}
      style={{ "--range": `${lead + count * step + tail}svh` } as React.CSSProperties}
    >
      {sensors.map((s, i) => (
        <span key={i} className="pin-sensor" data-i={i} style={s} aria-hidden="true" />
      ))}
      <div ref={setStage} className={`pin-stage ${stageClassName}`} onFocus={onFocus}>
        {typeof children === "function" ? children({ active, goTo }) : children}
      </div>
    </section>
  );
}
