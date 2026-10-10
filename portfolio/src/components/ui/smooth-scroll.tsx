"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Défilement lissé (Lenis). Désactivé si le visiteur demande moins d'animations.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      // Les ancres (#cv, #parcours…) défilent en douceur ; Lenis respecte déjà scroll-margin et scroll-padding.
      anchors: true,
      // Le carrousel garde son défilement horizontal natif.
      allowNestedScroll: true,
    });

    return () => lenis.destroy();
  }, [pathname]);

  return null;
}
