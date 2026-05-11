"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function FadeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".fade-in");

    // Reset state so elements entering the viewport re-animate on navigation
    elements.forEach((el) => el.classList.remove("visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    // Safeguard: force-show any element still invisible after 800ms
    const safeguard = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".fade-in:not(.visible)").forEach((el) => {
        el.classList.add("visible");
      });
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(safeguard);
    };
  }, [pathname]);

  return null;
}
