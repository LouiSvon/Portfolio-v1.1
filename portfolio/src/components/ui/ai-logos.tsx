"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";

// Logos (Lobe Icons, licence MIT) dans public/logos/ai : version monochrome, et en couleur quand elle existe.
// Positions en % du héros sur grand écran (--x/--y), hors de la zone du texte centré. Sur mobile : rangée (CSS).
const LOGOS = [
  { id: "claude", name: "Claude", color: true, x: "9%", y: "30%", dur: 7 },
  { id: "codex", name: "Codex", color: true, x: "27%", y: "15%", dur: 8.5 },
  { id: "ollama", name: "Ollama", color: false, x: "89%", y: "26%", dur: 6.5 },
  { id: "huggingface", name: "Hugging Face", color: true, x: "15%", y: "72%", dur: 9 },
  { id: "deepseek", name: "DeepSeek", color: true, x: "83%", y: "68%", dur: 7.5 },
  { id: "antigravity", name: "Antigravity", color: true, x: "70%", y: "88%", dur: 8 },
] as const;

const RADIUS = 220; // portée de la souris, en pixels
const PUSH = 64; // écart maximal
const spring = { stiffness: 160, damping: 13, mass: 0.7 };

type Target = { el: HTMLElement; x: MotionValue<number>; y: MotionValue<number>; near: MotionValue<number> };

// Petits logos de modèles et d'outils d'IA qui flottent autour du nom et s'écartent de la souris.
// Décoratifs (aria-hidden). Avec « réduire les animations », ils restent immobiles.
export function AiLogos() {
  const targets = useRef(new Set<Target>());
  const reduce = useReducedMotion();

  const register = useCallback((t: Target) => {
    targets.current.add(t);
    return () => {
      targets.current.delete(t);
    };
  }, []);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let px = -1e4;
    let py = -1e4;

    const update = () => {
      frame = 0;
      targets.current.forEach(({ el, x, y, near }) => {
        // Centre de l'ancre fixe (pas de l'élément qui bouge), pour éviter toute oscillation.
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - px;
        const dy = r.top + r.height / 2 - py;
        const d = Math.hypot(dx, dy) || 1;
        const k = d < RADIUS ? 1 - d / RADIUS : 0;
        x.set((dx / d) * k * k * PUSH);
        y.set((dy / d) * k * k * PUSH);
        near.set(k);
      });
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Le défilement déplace les logos sous une souris immobile : on recalcule aussi.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      px = py = -1e4;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <div className="ai-logos" aria-hidden="true">
      {LOGOS.map((logo, i) => (
        <AiLogo key={logo.id} logo={logo} index={i} register={register} />
      ))}
    </div>
  );
}

function AiLogo({
  logo,
  index,
  register,
}: {
  logo: (typeof LOGOS)[number];
  index: number;
  register: (t: Target) => () => void;
}) {
  const anchor = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const near = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const sn = useSpring(near, { stiffness: 200, damping: 25 });
  const rotate = useTransform(sx, [-PUSH, PUSH], [-16, 16]);
  const scale = useTransform(sn, [0, 1], [1, 1.18]);
  const colorOpacity = useTransform(sn, [0, 0.6], [0, 1]);
  const monoOpacity = useTransform(sn, [0, 1], [0.5, 1]);

  useEffect(() => {
    if (!anchor.current) return;
    return register({ el: anchor.current, x, y, near });
  }, [register, x, y, near]);

  // Au doigt (pas de survol) : un tap fait sauter le logo et montre sa couleur et son nom un instant.
  const tapTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(tapTimer.current), []);
  const onTap = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === "mouse") return;
    clearTimeout(tapTimer.current);
    near.set(1);
    y.set(-24);
    tapTimer.current = setTimeout(() => {
      near.set(0);
      y.set(0);
    }, 1200);
  };

  const vars = {
    "--x": logo.x,
    "--y": logo.y,
    "--dur": `${logo.dur}s`,
    "--delay": `${-index * 1.3}s`,
  } as React.CSSProperties;
  const mask = `url(/logos/ai/${logo.id}.svg)`;

  return (
    <div ref={anchor} className="ai-logo" style={vars}>
      <div className="ai-float">
        <motion.div className="ai-tile" style={{ x: sx, y: sy, rotate, scale }} onPointerDown={onTap}>
          <motion.span
            className="ai-mono"
            style={{ WebkitMaskImage: mask, maskImage: mask, opacity: logo.color ? undefined : monoOpacity }}
          />
          {logo.color && (
            // eslint-disable-next-line @next/next/no-img-element -- SVG décoratif local, rien à optimiser
            <motion.img className="ai-color" src={`/logos/ai/${logo.id}-color.svg`} alt="" style={{ opacity: colorOpacity }} />
          )}
          <motion.span className="ai-name" style={{ opacity: colorOpacity }}>{logo.name}</motion.span>
        </motion.div>
      </div>
    </div>
  );
}
