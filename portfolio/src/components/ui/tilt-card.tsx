"use client";

import { useRef } from "react";

// Carte qui s'incline vers le pointeur (souris seulement, 8° au plus) pendant qu'un reflet suit le curseur.
// Les variables --mx, --my, --rx, --ry sont lues par le CSS (.cred-card) ; transform seulement.
// « Réduire les animations » : le CSS fige l'inclinaison.
export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--ry", `${(px - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 16}deg`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    for (const v of ["--mx", "--my", "--rx", "--ry"]) el.style.removeProperty(v);
  };

  return (
    <div ref={ref} className={className} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}
