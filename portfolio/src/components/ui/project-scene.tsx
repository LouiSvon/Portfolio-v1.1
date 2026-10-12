"use client";

import { motion } from "motion/react";
import { MediaSlot } from "@/components/ui/media-slot";
import { duration, ease, stagger } from "@/lib/motion";

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

const rise = { hidden: { y: "105%" }, show: { y: 0, transition: { duration: duration.slow, ease: ease.out } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

// Une carte de projet. Le titre monte mot à mot, puis l'accroche, les technos et le lien, quand
// la carte arrive à l'écran (IntersectionObserver de Motion) ; le grand numéro dérive pendant la
// traversée (CSS lié au défilement, transform seulement ; repli : immobile).
// « Réduire les animations » : le CSS (.showcase-anim, .proj-num) fige tout, contenu visible.
export function ProjectScene({ scene, index, labels }: { scene: Scene; index: number; labels: SceneLabels }) {
  const words = scene.title.split(" ");

  return (
    <article
      className={`proj-card showcase-card${index % 2 ? " is-flipped" : ""}`}
      style={{ "--c1": scene.colors[0], "--c2": scene.colors[1] } as React.CSSProperties}
    >
      <div className="proj-visual">
        <span className="proj-glow" aria-hidden="true" />
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
        <span className="proj-num" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <motion.div
        className="proj-body"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: stagger }}
      >
        <h3 className="proj-title showcase-title">
          {/* Lien étiré : toute la carte mène au dépôt. */}
          <a href={scene.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
            {words.map((word, w) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span className="showcase-anim inline-block" variants={rise}>
                  {word}
                  {w < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </a>
        </h3>
        {scene.tagline && (
          <motion.p className="proj-tagline showcase-anim" variants={fadeUp}>
            {scene.tagline}
          </motion.p>
        )}
        {scene.chips.length > 0 && (
          <ul className="proj-chips">
            {scene.chips.map((chip) => (
              <motion.li key={chip} className="proj-chip showcase-anim" variants={fadeUp}>
                {chip}
              </motion.li>
            ))}
          </ul>
        )}
        <motion.div className="showcase-anim flex flex-wrap items-center justify-between gap-3" variants={fadeUp}>
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
    </article>
  );
}
