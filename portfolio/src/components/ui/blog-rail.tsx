"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { scrub } from "@/lib/motion";

// Rangée d'articles qui traverse l'écran de droite à gauche pendant que la section défile
// (transform seulement). Sous 768 px ou avec « réduire les animations », le CSS (.blog-rail) la remplace
// par une rangée glissable à la main, sans mouvement imposé.
export function BlogRail({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, scrub);
  const x = useTransform(smooth, [0, 1], ["38vw", "-38vw"]);

  return (
    <div ref={ref} className="blog-viewport">
      <motion.ul className="blog-rail" style={{ x }}>
        {children}
      </motion.ul>
    </div>
  );
}
