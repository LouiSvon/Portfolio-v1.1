"use client";

import { useEffect, useRef } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: boolean;
}

function countUp(el: HTMLElement, target: number, decimals: boolean, duration = 1500) {
  const start = performance.now();
  const update = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = ease * target;
    el.textContent = decimals ? current.toFixed(1) : Math.floor(current).toLocaleString("fr-FR");
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = decimals ? target.toFixed(1) : target.toLocaleString("fr-FR");
    }
  };
  requestAnimationFrame(update);
}

export function CountUpStats({ stats }: { stats: Stat[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true;
          container.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
            const target = parseFloat(el.dataset.count!);
            const decimals = el.dataset.decimals === "true";
            countUp(el, target, decimals);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="fade-in text-center sm:text-left">
          <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
            <span
              data-count={stat.value}
              data-decimals={stat.decimals ? "true" : "false"}
            >
              {stat.decimals ? stat.value.toFixed(1) : stat.value.toLocaleString("fr-FR")}
            </span>
            <span className="text-accent">{stat.suffix}</span>
          </p>
          <p className="text-xs text-tertiary mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
