"use client";

import { memo } from "react";
import Image from "next/image";
import { PinTrack } from "@/components/ui/pin-track";
import { HighlightedText } from "@/components/ui/highlighted-text";
import type { TimelineItem } from "@/components/ui/timeline";

// Le chemin : une vague douce dans un cadre fixe de 1000 x 140. Le marcheur, les repères et le tracé
// parcouru lisent la même fonction, donc restent alignés quelle que soit la taille de l'écran.
const VB_W = 1000;
const VB_H = 140;
const X0 = 50;
const X1 = 950;
const yAt = (t: number) => 70 + 34 * Math.sin(t * Math.PI * 2.6 + 0.5);
const xAt = (t: number) => X0 + t * (X1 - X0);
const PATH = Array.from({ length: 121 }, (_, i) => {
  const t = i / 120;
  return `${i ? "L" : "M"}${xAt(t).toFixed(1)} ${yAt(t).toFixed(1)}`;
}).join("");

// Durées de la piste (svh) : ouverture du Mac, puis une étape par expérience, puis un temps de lecture.
// L'ouverture occupe donc LEAD / (LEAD + n x STEP + TAIL) de la traversée (variable CSS --open).
const LEAD = 60;
const STEP = 45;
const TAIL = 25;

const year = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

export type Walker = { src: string; portrait: boolean; alt: string };

// Parcours, grand écran : un Mac s'ouvre et grandit au défilement jusqu'à remplir l'écran (CSS lié au
// défilement, repli : Mac déjà ouvert). Dedans, un chemin que le marcheur parcourt d'étape en étape ;
// l'étape change aux frontières de la piste (PinTrack), le marcheur glisse d'un repère à l'autre (transform).
// Les sept expériences restent dans la page, dans l'ordre, focalisables. Ailleurs : la frise (.journey-lite).
export function JourneyMac({
  title,
  subtitle,
  items,
  walker,
  host,
}: {
  title: string;
  subtitle: string;
  items: TimelineItem[];
  walker: Walker;
  host: string;
}) {
  const count = items.length;
  const open = LEAD / (LEAD + count * STEP + TAIL);

  return (
    <PinTrack steps={count} lead={LEAD} step={STEP} tail={TAIL} mode="wide" className="journey-pin" stageClassName="journey-stage">
      {({ active, goTo }) => {
        // Une seule valeur de progression (--walked, animée en CSS) : marcheur, trait et repères la lisent.
        const t = count > 1 ? active / (count - 1) : 0;
        const walkerPos = { "--walked": t, "--open": open } as React.CSSProperties;

        return (
          <div className="journey-scene" style={walkerPos}>
            <div className="journey-head">
              <h2 id="parcours-titre" className="section-title">{title}</h2>
              <p className="section-subtitle">{subtitle}</p>
            </div>

            <div className="mac">
              <span className="mac-bezel" aria-hidden="true" />
              <div className="mac-screen">
                <div className="mac-bar" aria-hidden="true">
                  <span className="mac-lights"><i /><i /><i /></span>
                  <span className="mac-url">{host}</span>
                  <span className="mac-count">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
                </div>

                <div className="mac-body">
                  <ol className="mac-cards">
                    {items.map((item, i) => (
                      <MacCard key={item.key} item={item} index={i} on={i === active} />
                    ))}
                  </ol>

                  <div className="mac-path">
                    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="mac-path-svg" fill="none" aria-hidden="true">
                      <defs>
                        <clipPath id="mac-walked">
                          <rect className="mac-walked-rect" x="0" y="0" width={X1} height={VB_H} />
                        </clipPath>
                      </defs>
                      <path d={PATH} className="mac-path-rest" />
                      <path d={PATH} className="mac-path-done" clipPath="url(#mac-walked)" />
                    </svg>

                    <ol className="mac-stops">
                      {items.map((item, i) => (
                        <MacStop key={item.key} item={item} index={i} count={count} current={i === active} goTo={goTo} />
                      ))}
                    </ol>

                    <div className="mac-layer" aria-hidden="true">
                      <span className={`mac-walker pause-offscreen${walker.portrait ? " is-portrait" : ""}`}>
                        <Image src={walker.src} alt="" width={96} height={96} className="mac-walker-img" unoptimized={!walker.portrait} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="mac-base" aria-hidden="true" />
            </div>
          </div>
        );
      }}
    </PinTrack>
  );
}

// Carte d'une expérience. Mémoïsée : à chaque changement d'étape, seules les deux cartes dont l'état change
// sont rendues à nouveau (le coût se concentre aux frontières, pas à chaque frame).
const MacCard = memo(function MacCard({ item, index, on }: { item: TimelineItem; index: number; on: boolean }) {
  return (
    <li className="mac-card step" data-step={index} data-on={on || undefined}>
      <div className="mac-card-main">
        <h3 className="mac-role">{item.role}</h3>
        <p className="mac-sub">
          {item.companyUrl ? (
            <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="mac-company underline-offset-4 hover:underline">
              {item.company} <span aria-hidden="true">&#8599;</span>
            </a>
          ) : (
            <span className="mac-company">{item.company}</span>
          )}
          <time className="mac-period">
            {item.period}
            {item.duration && ` · ${item.duration.map((part) => `${part.amount} ${part.unit}`).join(" ")}`}
          </time>
        </p>
        <p className="mac-desc">
          <HighlightedText text={item.description} phrases={item.highlights} />
        </p>
        {item.links.length > 0 && (
          <div className="mac-links">
            {item.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="btn-ghost !h-9 !px-4 !text-sm">
                {link.label} <span className="arrow" aria-hidden="true">&#8599;</span>
              </a>
            ))}
          </div>
        )}
      </div>
      {item.images.length > 0 && (
        <ul className="mac-photos">
          {item.images.slice(0, 2).map((img) => (
            <li key={img.src}>
              <Image src={img.src} alt={img.alt} width={320} height={200} className="h-full w-full object-cover" />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});

// Repère du chemin : clic = aller à l'étape. Il s'allume quand le trait l'atteint (CSS, --walked). Mémoïsé.
const MacStop = memo(function MacStop({
  item,
  index,
  count,
  current,
  goTo,
}: {
  item: TimelineItem;
  index: number;
  count: number;
  current: boolean;
  goTo: (index: number) => void;
}) {
  const ti = count > 1 ? index / (count - 1) : 0;
  return (
    <li
      className="mac-stop"
      data-current={current || undefined}
      style={{ left: `${(xAt(ti) / VB_W) * 100}%`, top: `${(yAt(ti) / VB_H) * 100}%`, "--ti": ti } as React.CSSProperties}
    >
      <button type="button" onClick={() => goTo(index)} className="mac-stop-btn" aria-current={current ? "step" : undefined}>
        <span className="mac-stop-dot" />
        <span className="mac-stop-label">
          <b>{item.company}</b>
          <span>{year(item.period)}</span>
        </span>
        <span className="sr-only">{item.role}</span>
      </button>
    </li>
  );
});
