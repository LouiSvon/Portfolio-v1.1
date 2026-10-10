"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
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
    <div className="fade-in" role="region" aria-roledescription="carousel" aria-label={labels.carousel}>
      <ul ref={trackRef} className="carousel-track scrollbar-none">
        {projects.map((project, i) => (
          <li
            key={project.repo}
            className="carousel-item"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${projects.length}`}
          >
            <article
              className="proj-card"
              style={{ "--c1": project.colors[0], "--c2": project.colors[1] } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="proj-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="eyebrow">{project.kind[locale]}</span>
              </div>
              <div className="mt-auto pt-16">
                <h3 className="proj-title">{project.title[locale]}</h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-secondary">{project.tagline[locale]}</p>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li key={tech} className="proj-chip">{tech}</li>
                    ))}
                  </ul>
                  <a
                    href={`https://github.com/${github}/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${labels.viewCode} : ${project.title[locale]}`}
                    className="proj-link shrink-0"
                  >
                    &rarr;
                  </a>
                </div>
              </div>
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
