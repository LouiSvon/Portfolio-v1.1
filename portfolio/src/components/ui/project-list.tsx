"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Locale } from "@/types";
import type { Highlight } from "@/data/highlights";

// Projets phares en colonne : tout se voit en descendant, sans geste horizontal.
// Chaque carte apparaît au défilement (.fade-in, coupé si animations réduites) ; son grand numéro dérive avec Motion.
export function ProjectList({
  projects,
  github,
  locale,
  viewCode,
}: {
  projects: Highlight[];
  github: string;
  locale: Locale;
  viewCode: string;
}) {
  return (
    <ul className="proj-list">
      {projects.map((project, i) => (
        <ProjectRow
          key={project.repo}
          project={project}
          index={i}
          href={`https://github.com/${github}/${project.repo}`}
          locale={locale}
          viewCode={viewCode}
        />
      ))}
    </ul>
  );
}

function ProjectRow({
  project,
  index,
  href,
  locale,
  viewCode,
}: {
  project: Highlight;
  index: number;
  href: string;
  locale: Locale;
  viewCode: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numberY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -36]);
  const colors = { "--c1": project.colors[0], "--c2": project.colors[1] } as React.CSSProperties;

  return (
    <li ref={ref} className="fade-in">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`proj-card${index % 2 ? " is-flipped" : ""}`}
        style={colors}
      >
        <div className="proj-body">
          <h3 className="proj-title">{project.title[locale]}</h3>
          <p className="proj-tagline">{project.tagline[locale]}</p>
          <ul className="proj-chips">
            {project.stack.map((tech) => (
              <li key={tech} className="proj-chip">{tech}</li>
            ))}
          </ul>
          <span className="proj-cta">
            {viewCode} <span className="arrow" aria-hidden="true">&rarr;</span>
          </span>
        </div>
        <div className="proj-visual">
          <span className="proj-dots" aria-hidden="true" />
          <span className="eyebrow proj-kind">{project.kind[locale]}</span>
          <motion.span className="proj-num" style={{ y: numberY }} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>
      </a>
    </li>
  );
}
