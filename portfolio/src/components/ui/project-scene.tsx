"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { MediaSlot } from "@/components/ui/media-slot";

// Données d'une scène, communes aux projets phares (données du site) et aux dépôts GitHub.
export type Scene = {
  key: string;
  title: string;
  tagline?: string;
  kind?: string;
  chips: string[];
  href: string;
  colors: [string, string];
  featured?: boolean;
  stars?: number;
  updated?: string;
  demo?: string;
  // Capture du projet : sans fichier, l'emplacement reste vide et signalé (MediaSlot).
  media?: { src?: string; alt: string; hint: string };
};

export type SceneLabels = { viewCode: string; featured: string; demo: string };

const ease = [0.16, 1, 0.3, 1] as const;

// Une scène par projet : la carte se dévoile au fil du défilement (liée à la molette, Motion).
// Le panneau s'ouvre comme un rideau, le numéro dérive, le titre arrive mot à mot, puis les technos.
// « Réduire les animations » : le CSS .showcase-card neutralise tous ces effets (contenu visible et fixe).
export function ProjectScene({ scene, index, labels }: { scene: Scene; index: number; labels: SceneLabels }) {
  const ref = useRef<HTMLElement>(null);

  // Entrée : du bas de l'écran jusqu'au centre. Parallaxe : sur toute la traversée.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(enter, { stiffness: 140, damping: 30, mass: 0.4 });
  const y = useTransform(progress, [0, 1], [90, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const opacity = useTransform(progress, [0, 0.55], [0, 1]);
  const curtain = useTransform(
    progress,
    [0, 1],
    ["inset(22% 14% 22% 14% round 2.5rem)", "inset(0% 0% 0% 0% round 0rem)"],
  );
  const glow = useTransform(progress, [0, 1], [1.35, 1]);
  const numberY = useTransform(pass, [0, 1], [80, -80]);

  const words = scene.title.split(" ");

  return (
    <motion.article
      ref={ref}
      className={`proj-card showcase-card${index % 2 ? " is-flipped" : ""}`}
      style={{ "--c1": scene.colors[0], "--c2": scene.colors[1], y, scale, opacity } as never}
    >
      <motion.div className="proj-visual" style={{ clipPath: curtain }}>
        <motion.span className="proj-glow" style={{ scale: glow }} aria-hidden="true" />
        {scene.media && (
          <MediaSlot
            src={scene.media.src}
            alt={scene.media.alt}
            hint={scene.media.hint}
            width={1600}
            height={1000}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="proj-media"
          />
        )}
        <span className="proj-dots" aria-hidden="true" />
        {scene.kind && <span className="eyebrow proj-kind">{scene.kind}</span>}
        {scene.featured && <span className="chip proj-featured">{labels.featured}</span>}
        <motion.span className="proj-num" style={{ y: numberY }} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </motion.div>

      <motion.div
        className="proj-body"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.06 }}
      >
        <h3 className="proj-title showcase-title">
          {/* Lien étiré : toute la carte mène au dépôt. */}
          <a href={scene.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
            {words.map((word, w) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className="showcase-anim inline-block"
                  variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 0.8, ease } } }}
                >
                  {word}
                  {w < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </a>
        </h3>
        {scene.tagline && (
          <motion.p
            className="proj-tagline showcase-anim"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          >
            {scene.tagline}
          </motion.p>
        )}
        {scene.chips.length > 0 && (
          <ul className="proj-chips">
            {scene.chips.map((chip) => (
              <motion.li
                key={chip}
                className="proj-chip showcase-anim"
                variants={{ hidden: { opacity: 0, y: 10, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } } }}
              >
                {chip}
              </motion.li>
            ))}
          </ul>
        )}
        <motion.div
          className="showcase-anim flex flex-wrap items-center justify-between gap-3"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
        >
          <span className="proj-cta">
            {labels.viewCode} <span className="arrow" aria-hidden="true">&rarr;</span>
          </span>
          <span className="flex items-center gap-3 text-xs text-tertiary">
            {scene.stars ? <span>★ {scene.stars}</span> : null}
            {scene.updated && <span>{scene.updated}</span>}
            {scene.demo && (
              <a
                href={scene.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 text-secondary hover:text-accent"
              >
                {labels.demo} &rarr;
              </a>
            )}
          </span>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
