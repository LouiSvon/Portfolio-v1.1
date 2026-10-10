"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Révèle les éléments .fade-in quand ils entrent dans l'écran, pas avant :
// c'est ce qui donne du mouvement au défilement.
export function FadeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".fade-in");

    // Navigateur sans IntersectionObserver : tout afficher d'emblée.
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    // Réinitialise pour rejouer les apparitions après une navigation.
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
