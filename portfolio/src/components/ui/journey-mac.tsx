"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { scrub } from "@/lib/motion";
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

// Phases du défilement : l'ordinateur s'ouvre et grandit jusqu'à remplir l'écran (0 à 0,17),
// puis le marcheur parcourt les étapes (0,17 à 0,97).
const OPEN_END = 0.17;
const WALK_END = 0.97;

const year = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

export type Walker = { src: string; portrait: boolean; alt: string };

// Parcours en scène épinglée : un Mac qui s'ouvre et grandit au défilement jusqu'à occuper tout l'écran ;
// dedans, un chemin que le marcheur parcourt d'étape en étape pendant que la carte de l'étape change.
// Grand écran seulement (le repli, la frise, est affiché sinon : voir .journey-lite dans le CSS).
export function JourneyMac({
  title,
  subtitle,
  items,
  walker,
  wallpaper,
  host,
  backdrop,
}: {
  title: string;
  subtitle: string;
  items: TimelineItem[];
  walker: Walker;
  wallpaper?: string;
  host: string;
  backdrop: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = items.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, scrub);

  // Ouverture : le Mac se redresse et grandit ; l'habillage (cadre, socle) s'efface quand l'écran remplit la scène.
  const scale = useTransform(p, [0, OPEN_END], [0.5, 1]);
  const tilt = useTransform(p, [0, OPEN_END], [26, 0]);
  const lift = useTransform(p, [0, OPEN_END], ["7svh", "0svh"]);
  const chrome = useTransform(p, [0.05, OPEN_END], [1, 0]);
  const headOpacity = useTransform(p, [0, 0.09], [1, 0]);
  const headY = useTransform(p, [0, 0.09], [0, -48]);

  // Marche : q va de 0 (première étape) à 1 (dernière).
  const q = useTransform(p, [OPEN_END, WALK_END], [0, 1]);
  const walkerLeft = useTransform(q, (v) => `${(xAt(v) / VB_W) * 100}%`);
  const walkerTop = useTransform(q, (v) => `${(yAt(v) / VB_H) * 100}%`);
  const walkedWidth = useTransform(q, (v) => xAt(v));

  useMotionValueEvent(q, "change", (v) => setActive(Math.round(v * (count - 1))));

  const goTo = (index: number) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - stage.offsetHeight;
    const target = OPEN_END + (WALK_END - OPEN_END) * (count > 1 ? index / (count - 1) : 0);
    window.scrollTo({ top: top + range * target });
  };

  return (
    <div ref={trackRef} className="journey-track">
      <div ref={stageRef} className="journey-stage has-backdrop">
        {backdrop}

        <motion.div className="journey-head" style={{ opacity: headOpacity, y: headY }}>
          <h2 id="parcours-titre" className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </motion.div>

        <motion.div className="mac" style={{ scale, rotateX: tilt, y: lift }}>
          <motion.span className="mac-bezel" style={{ opacity: chrome }} aria-hidden="true" />
          <div className="mac-screen" style={wallpaper ? ({ "--wallpaper": `url(${wallpaper})` } as React.CSSProperties) : undefined}>
            <div className="mac-bar" aria-hidden="true">
              <span className="mac-dots"><i /><i /><i /></span>
              <span className="mac-url">{host}</span>
              <span className="mac-count">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
            </div>

            <div className="mac-body">
              <ol className="mac-cards">
                {items.map((item, i) => (
                  <li key={item.key} className="mac-card" data-active={i === active || undefined} inert={i !== active}>
                    <div className="mac-card-main">
                      <p className="mac-meta">
                        <span className="chip">{item.typeLabel}</span>
                        <time>{item.period}</time>
                      </p>
                      <h3 className="mac-role">{item.role}</h3>
                      <p className="mac-company">
                        {item.companyUrl ? (
                          <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-accent hover:underline">
                            {item.company} <span aria-hidden="true">&#8599;</span>
                          </a>
                        ) : (
                          item.company
                        )}
                      </p>
                      <p className="mac-desc">{item.description}</p>
                      {item.tags.length > 0 && (
                        <ul className="mac-tags">
                          {item.tags.map((tag) =>
                            tag.tech ? (
                              <li key={tag.label} className="badge badge-technology" data-tech={tag.label}>{tag.label}</li>
                            ) : (
                              <li key={tag.label} className="chip">{tag.label}</li>
                            ),
                          )}
                        </ul>
                      )}
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
                ))}
              </ol>

              <div className="mac-path" aria-hidden="false">
                <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="mac-path-svg" fill="none" aria-hidden="true">
                  <defs>
                    <clipPath id="mac-walked">
                      <motion.rect x="0" y="0" height={VB_H} width={walkedWidth} />
                    </clipPath>
                  </defs>
                  <path d={PATH} className="mac-path-rest" />
                  <path d={PATH} className="mac-path-done" clipPath="url(#mac-walked)" />
                </svg>

                <ol className="mac-stops">
                  {items.map((item, i) => {
                    const t = count > 1 ? i / (count - 1) : 0;
                    return (
                      <li
                        key={item.key}
                        className="mac-stop"
                        data-passed={i <= active || undefined}
                        data-current={i === active || undefined}
                        style={{ left: `${(xAt(t) / VB_W) * 100}%`, top: `${(yAt(t) / VB_H) * 100}%` }}
                      >
                        <button type="button" onClick={() => goTo(i)} className="mac-stop-btn" aria-current={i === active ? "step" : undefined}>
                          <span className="mac-stop-dot" />
                          <span className="mac-stop-label">
                            <b>{item.company}</b>
                            <span>{year(item.period)}</span>
                          </span>
                          <span className="sr-only">{item.role}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>

                <motion.span className={`mac-walker${walker.portrait ? " is-portrait" : ""}`} style={{ left: walkerLeft, top: walkerTop }} aria-hidden="true">
                  <Image src={walker.src} alt="" width={96} height={96} className="mac-walker-img" unoptimized={!walker.portrait} />
                </motion.span>
              </div>
            </div>
          </div>
          <motion.span className="mac-base" style={{ opacity: chrome }} aria-hidden="true" />
        </motion.div>
      </div>
    </div>
  );
}
