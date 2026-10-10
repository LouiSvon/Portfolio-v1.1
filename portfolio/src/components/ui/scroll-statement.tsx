"use client";

import { useEffect, useRef } from "react";

type Part = { highlight: string; text: string };

// Grande phrase qui s'allume mot à mot pendant le défilement.
// Le texte complet est rendu côté serveur : sans JavaScript ou avec « réduire les animations », il reste lisible.
export function ScrollStatement({ parts }: { parts: Part[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = [...el.querySelectorAll<HTMLElement>("[data-w]")];
    el.classList.add("is-scrubbing");
    let frame = 0;
    const render = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Commence quand le haut du texte atteint 85 % de l'écran, finit quand son bas atteint 45 %.
      const start = vh * 0.85;
      const end = vh * 0.45;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));
      const lit = progress * words.length;
      words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
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
    <p ref={ref} className="statement">
      {parts.map((part, p) => (
        <span key={p}>
          {part.highlight.split(" ").map((w, i) => (
            <span key={`h${i}`} data-w className="statement-hl">{w} </span>
          ))}
          {part.text.split(" ").filter(Boolean).map((w, i) => (
            <span key={`t${i}`} data-w>{w} </span>
          ))}
        </span>
      ))}
    </p>
  );
}
