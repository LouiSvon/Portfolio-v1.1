"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

// 50 outils d'IA, du grand public à l'expert (Lobe Icons, licence MIT, version monochrome dans public/logos/ai).
const LOGOS = [
  "openai", "claude", "anthropic", "gemini", "mistral", "meta", "deepseek", "qwen", "grok", "perplexity",
  "copilot", "githubcopilot", "cursor", "claudecode", "codex", "antigravity", "windsurf", "v0", "lovable", "replit",
  "midjourney", "dalle", "stability", "runway", "elevenlabs", "suno", "notebooklm", "huggingface", "ollama", "lmstudio",
  "langchain", "langgraph", "langsmith", "llamaindex", "crewai", "n8n", "mcp", "vllm", "groq", "together",
  "replicate", "openrouter", "nvidia", "wandb", "unsloth", "comfyui", "cohere", "vertexai", "bedrock", "colab",
];

// Teintes volontairement sombres : un détail qu'on ne voit qu'en regardant bien.
const BALL_LIGHT = "#1b1b1f";
const BALL_DARK = "#0c0c0e";
const BALL_EDGE = "#202024";
const LOGO_TINT = "#3a3a41";

const PUSH_RADIUS = 80; // portée de la souris, en pixels
const PUSH_FORCE = 0.0035;

// Piscine à balles du héros : petites balles sombres portant chacune un logo, empilées en bas,
// que la souris (ou le doigt) fait rouler. Décorative. Image figée si le visiteur réduit les animations.
export function BallPit() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { Engine, Bodies, Body, Composite, Sleeping } = Matter;
    let cancelled = false;
    let engine: Matter.Engine | null = null;
    let balls: { body: Matter.Body; sprite: HTMLCanvasElement; r: number }[] = [];
    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let sprites: HTMLImageElement[] = [];
    const pointer = { x: -1e4, y: -1e4, active: false };

    // Une balle = un petit canvas pré-dessiné (dégradé « plastique » + logo teinté), tourné au rendu.
    const makeSprite = (img: HTMLImageElement, r: number) => {
      const size = Math.ceil(r * 2 * dpr);
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const g = c.getContext("2d")!;
      g.scale(dpr, dpr);
      const grad = g.createRadialGradient(r * 0.7, r * 0.6, r * 0.1, r, r, r);
      grad.addColorStop(0, BALL_LIGHT);
      grad.addColorStop(1, BALL_DARK);
      g.beginPath();
      g.arc(r, r, r - 0.5, 0, Math.PI * 2);
      g.fillStyle = grad;
      g.fill();
      g.strokeStyle = BALL_EDGE;
      g.lineWidth = 1;
      g.stroke();
      // Logo noir teinté en gris via un calque intermédiaire.
      const s = r * 1.05;
      const t = document.createElement("canvas");
      t.width = t.height = Math.ceil(s * dpr);
      const tg = t.getContext("2d")!;
      tg.drawImage(img, 0, 0, t.width, t.height);
      tg.globalCompositeOperation = "source-in";
      tg.fillStyle = LOGO_TINT;
      tg.fillRect(0, 0, t.width, t.height);
      g.drawImage(t, r - s / 2, r - s / 2, s, s);
      return c;
    };

    const build = () => {
      if (engine) {
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      }
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 1;
      const wall = { isStatic: true, friction: 0.2 };
      Composite.add(engine.world, [
        Bodies.rectangle(width / 2, height + 50, width * 2, 100, wall),
        Bodies.rectangle(-50, height / 2, 100, height * 3, wall),
        Bodies.rectangle(width + 50, height / 2, 100, height * 3, wall),
      ]);

      // Taille et nombre selon l'écran : couche de balles d'environ 90 px (60 px sur mobile).
      const small = width < 768;
      const rMin = small ? 6 : 7;
      const rMax = small ? 8 : 10;
      const layer = small ? 60 : 90;
      const rAvg = (rMin + rMax) / 2;
      const count = Math.min(340, Math.round((width * layer * 0.8) / (Math.PI * rAvg * rAvg)));

      balls = [];
      for (let i = 0; i < count; i++) {
        const r = rMin + Math.random() * (rMax - rMin);
        const body = Bodies.circle(
          r + Math.random() * (width - 2 * r),
          height - layer * 2.2 + Math.random() * layer * 2,
          r,
          { restitution: 0.35, friction: 0.05, frictionAir: 0.012, density: 0.002, sleepThreshold: 40 },
        );
        Body.setAngle(body, Math.random() * Math.PI * 2);
        Composite.add(engine.world, body);
        balls.push({ body, r, sprite: makeSprite(sprites[i % sprites.length], r) });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const { body, sprite, r } of balls) {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.drawImage(sprite, -r, -r, r * 2, r * 2);
        ctx.restore();
      }
    };

    const stir = () => {
      if (!pointer.active) return;
      for (const { body } of balls) {
        const dx = body.position.x - pointer.x;
        const dy = body.position.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d > PUSH_RADIUS || d === 0) continue;
        const k = 1 - d / PUSH_RADIUS;
        Sleeping.set(body, false);
        // Écarte la balle du pointeur, avec un léger rebond vers le haut.
        Body.applyForce(body, body.position, {
          x: (dx / d) * k * PUSH_FORCE * body.mass,
          y: ((dy / d) * k - 0.6 * k) * PUSH_FORCE * body.mass,
        });
      }
    };

    const loop = () => {
      if (!engine) return;
      stir();
      Engine.update(engine, 1000 / 60);
      draw();
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!still && !frame && visible && !document.hidden && engine) frame = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let lastWidth = 0;
    const settleAndDraw = () => {
      build();
      if (still && engine) {
        // Pas d'animation : on laisse la pile se poser hors écran, puis une seule image.
        for (let i = 0; i < 300; i++) Engine.update(engine, 1000 / 60);
      }
      draw();
      lastWidth = width;
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Le clavier mobile ou la barre d'adresse changent la hauteur : on ne reconstruit que si la largeur change.
        if (Math.abs(canvas.clientWidth - lastWidth) < 2) return;
        cancelAnimationFrame(frame);
        frame = 0;
        settleAndDraw();
        start();
      }, 200);
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
      // Ordre mélangé pour que les logos se répartissent au hasard.
      sprites = images.filter((img): img is HTMLImageElement => img !== null).sort(() => Math.random() - 0.5);
      if (!sprites.length) return;
      settleAndDraw();
      window.addEventListener("resize", onResize);
      if (still) return;
      observer.observe(canvas);
      document.addEventListener("visibilitychange", start);
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerdown", onPointer, { passive: true });
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
      window.removeEventListener("pointerdown", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (engine) {
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      }
    };
  }, []);

  return <canvas ref={ref} className="ball-pit" aria-hidden="true" />;
}
