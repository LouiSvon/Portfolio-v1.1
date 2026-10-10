"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/types";
import type { Highlight } from "@/data/highlights";

type Labels = {
  carousel: string;
  prev: string;
  next: string;
  goTo: string;
  viewCode: string;
};

// Carrousel à défilement natif (glisser sur mobile, flèches et points sur ordinateur).
// Sans JavaScript, la piste reste défilable : les boutons ne font qu'aider.
export function ProjectCarousel({
  projects,
  github,
  locale,
  labels,
}: {
  projects: Highlight[];
  github: string;
  locale: Locale;
  labels: Labels;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
    const items = [...track.children] as HTMLElement[];
    const left = track.getBoundingClientRect().left;
    let best = 0;
    let bestDist = Infinity;
    items.forEach((el, i) => {
      const d = Math.abs(el.getBoundingClientRect().left - left);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(track.scrollLeft >= max - 4 ? items.length - 1 : best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const item = track?.children[i] as HTMLElement | undefined;
    if (!track || !item) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.carousel}>
      <ul ref={trackRef} className="carousel-track scrollbar-none">
        {projects.map((project, i) => (
          <li
            key={project.repo}
            className="carousel-item"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${projects.length}`}
          >
            <article className="card card-accent flex h-full flex-col gap-3 rounded border border-border p-5">
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-medium text-primary leading-snug">{project.title[locale]}</h3>
              <p className="text-sm text-secondary leading-relaxed">{project.summary[locale]}</p>
              <ul className="flex flex-wrap gap-1.5 mt-auto">
                {project.stack.map((tech) => (
                  <li key={tech} className="text-xs text-tertiary bg-badge-bg px-2 py-0.5 rounded">
                    {tech}
                  </li>
                ))}
              </ul>
              <a
                href={`https://github.com/${github}/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline underline-offset-4"
              >
                {labels.viewCode} &rarr;
              </a>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {projects.map((project, i) => (
            <button
              key={project.repo}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${labels.goTo} ${i + 1}`}
              aria-current={active === i ? "true" : undefined}
              className={`carousel-dot${active === i ? " is-active" : ""}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={atStart}
            aria-label={labels.prev}
            className="carousel-btn"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(projects.length - 1, active + 1))}
            disabled={atEnd}
            aria-label={labels.next}
            className="carousel-btn"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
