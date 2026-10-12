"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ProjectScene, type Scene, type SceneLabels } from "@/components/ui/project-scene";
import { distance, scrub } from "@/lib/motion";

// Projets phares en cartes empilées (desktop) : chaque carte s'épingle (CSS sticky), la suivante
// glisse par-dessus et la précédente recule. Motion lit la progression du défilement sur la pile
// et n'anime que l'échelle de la carte et l'opacité d'un voile ; le défilement reste natif.
// Pourquoi Motion ici : une carte épinglée ne bouge plus, sa propre timeline CSS (view()) s'arrête ;
// il faut la progression de la pile entière, que Motion fournit dans tous les navigateurs.
// Sous 1024 px, écran bas ou « réduire les animations » : simple liste, le CSS annule l'effet.
export function ProjectStack({ scenes, labels }: { scenes: Scene[]; labels: SceneLabels }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, scrub);

  return (
    <ol ref={ref} className="stack">
      {scenes.map((scene, i) => (
        <StackCard key={scene.key} index={i} total={scenes.length} progress={progress}>
          <ProjectScene scene={scene} index={i} labels={labels} />
        </StackCard>
      ))}
    </ol>
  );
}

function StackCard({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  // La carte recule pendant que la suivante monte ; la dernière ne recule pas.
  const span = 1 / Math.max(total - 1, 1);
  const range = [index * span, (index + 1) * span];
  const last = index === total - 1;
  const scale = useTransform(progress, range, [1, last ? 1 : distance.scale]);
  // La carte reste opaque (rien ne transparaît d'en dessous) ; un voile l'assombrit en reculant.
  const shade = useTransform(progress, range, [0, last ? 0 : 1 - distance.dim]);

  return (
    <motion.li className="stack-card" style={{ scale, "--i": index } as never}>
      {children}
      <motion.span className="stack-shade" style={{ opacity: shade }} aria-hidden="true" />
    </motion.li>
  );
}
