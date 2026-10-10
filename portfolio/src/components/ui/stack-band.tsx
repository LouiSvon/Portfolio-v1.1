"use client";

import { useEffect, useRef } from "react";

// Bande de technologies qui glisse horizontalement au rythme du défilement vertical.
// La liste est doublée pour que la bande reste pleine ; la copie est masquée aux lecteurs d'écran.
export function StackBand({ items, label }: { items: string[]; label: string }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const render = () => {
      frame = 0;
      const rect = band.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 quand la bande entre par le bas, 1 quand elle sort par le haut
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const travel = track.scrollWidth / 2;
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={bandRef} className="stack-band">
      <div ref={trackRef} className="stack-track">
        <ul aria-label={label} className="stack-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className="stack-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
