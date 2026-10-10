"use client";

import { useEffect, useRef } from "react";

const GAP = 22;
const RADIUS = 170; // rayon d'influence du pointeur, en pixels CSS
const BASE = [243, 240, 234]; // --foreground
const LIT = [77, 141, 255]; // --accent

// Trame de points du héros : une vague lente la traverse et les points proches du pointeur s'allument en bleu.
// Purement décorative. Ne tourne que visible à l'écran ; image fixe si le visiteur réduit les animations.
export function DotGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    // Pointeur cible et position lissée, hors écran au départ.
    const target = { x: -9999, y: -9999 };
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      pointer.x += (target.x - pointer.x) * 0.12;
      pointer.y += (target.y - pointer.y) * 0.12;
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;
      const offsetX = (width % GAP) / 2;
      const offsetY = (height % GAP) / 2;

      for (let x = offsetX; x < width; x += GAP) {
        for (let y = offsetY; y < height; y += GAP) {
          const wave = still ? 0 : (Math.sin(x * 0.012 + y * 0.008 - t * 0.9) + 1) / 2;
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          const near = d < RADIUS ? 1 - d / RADIUS : 0;
          const glow = near * near;
          const r = BASE[0] + (LIT[0] - BASE[0]) * glow;
          const g = BASE[1] + (LIT[1] - BASE[1]) * glow;
          const b = BASE[2] + (LIT[2] - BASE[2]) * glow;
          const alpha = 0.1 + wave * 0.12 + glow * 0.75;
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1 + glow * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!still && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };

    resize();
    draw(0);
    if (still) {
      const onResize = () => {
        resize();
        draw(0);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", start);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    start();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
