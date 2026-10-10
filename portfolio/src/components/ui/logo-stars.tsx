"use client";

import { useEffect, useRef } from "react";

// 50 outils d'IA, du grand public à l'expert (Lobe Icons, licence MIT, version monochrome dans public/logos/ai).
const LOGOS = [
  "openai", "claude", "anthropic", "gemini", "mistral", "meta", "deepseek", "qwen", "grok", "perplexity",
  "copilot", "githubcopilot", "cursor", "claudecode", "codex", "antigravity", "windsurf", "v0", "lovable", "replit",
  "midjourney", "dalle", "stability", "runway", "elevenlabs", "suno", "notebooklm", "huggingface", "ollama", "lmstudio",
  "langchain", "langgraph", "langsmith", "llamaindex", "crewai", "n8n", "mcp", "vllm", "groq", "together",
  "replicate", "openrouter", "nvidia", "wandb", "unsloth", "comfyui", "cohere", "vertexai", "bedrock", "colab",
];

const GAP = 38; // espacement de la trame, en pixels CSS
const SIZE = 7; // taille d'un logo au repos
const RADIUS = 160; // portée du pointeur
const TINT = "#f3f0ea"; // --foreground ; l'opacité garde l'ensemble très discret

type Star = { x: number; y: number; sprite: number; phase: number; speed: number };

// Ciel de petits logos d'IA en trame légèrement décalée : ils scintillent, une vague lente les traverse,
// et ceux proches du pointeur s'éclairent et grossissent un peu. Décoratif. Image fixe si animations réduites.
export function LogoStars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let stars: Star[] = [];
    let sprites: HTMLCanvasElement[] = [];
    const target = { x: -1e4, y: -1e4 };
    const pointer = { x: -1e4, y: -1e4 };

    // Logo noir (SVG monochrome) recoloré en clair, pré-rendu à sa taille maximale.
    const makeSprite = (img: HTMLImageElement, dpr: number) => {
      const c = document.createElement("canvas");
      c.width = c.height = Math.ceil(SIZE * 2 * dpr);
      const g = c.getContext("2d")!;
      g.drawImage(img, 0, 0, c.width, c.height);
      g.globalCompositeOperation = "source-in";
      g.fillStyle = TINT;
      g.fillRect(0, 0, c.width, c.height);
      return c;
    };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = [];
      // Trame décalée d'une demi-case une ligne sur deux, avec un léger jitter : un ciel, pas un quadrillage.
      let row = 0;
      for (let y = GAP / 2; y < height; y += GAP, row++) {
        for (let x = (row % 2 ? GAP : GAP / 2); x < width; x += GAP) {
          stars.push({
            x: x + (Math.random() - 0.5) * GAP * 0.5,
            y: y + (Math.random() - 0.5) * GAP * 0.5,
            sprite: Math.floor(Math.random() * sprites.length),
            phase: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 1.2,
          });
        }
      }
    };

    const draw = (time: number) => {
      pointer.x += (target.x - pointer.x) * 0.12;
      pointer.y += (target.y - pointer.y) * 0.12;
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;
      for (const s of stars) {
        const twinkle = still ? 0.5 : (Math.sin(t * s.speed + s.phase) + 1) / 2;
        const wave = still ? 0 : (Math.sin(s.x * 0.01 + s.y * 0.006 - t * 0.8) + 1) / 2;
        const d = Math.hypot(s.x - pointer.x, s.y - pointer.y);
        const near = d < RADIUS ? (1 - d / RADIUS) ** 2 : 0;
        const size = SIZE * (1 + near * 0.9);
        ctx.globalAlpha = 0.07 + twinkle * 0.08 + wave * 0.07 + near * 0.6;
        ctx.drawImage(sprites[s.sprite], s.x - size / 2, s.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!still && !frame && visible && !document.hidden && sprites.length) frame = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      target.x = target.y = -1e4;
    };
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        layout();
        draw(performance.now());
      }, 150);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });

    Promise.all(
      LOGOS.map(
        (id) =>
          new Promise<HTMLImageElement | null>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = `/logos/ai/${id}.svg`;
          }),
      ),
    ).then((images) => {
      if (cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sprites = images.filter((img): img is HTMLImageElement => img !== null).map((img) => makeSprite(img, dpr));
      if (!sprites.length) return;
      layout();
      draw(0);
      window.addEventListener("resize", onResize);
      if (still) return;
      observer.observe(canvas);
      document.addEventListener("visibilitychange", start);
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="logo-stars" aria-hidden="true" />;
}
