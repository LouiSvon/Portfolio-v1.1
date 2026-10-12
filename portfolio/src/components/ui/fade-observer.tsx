"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Apparitions au défilement, une seule fois par élément : tout .fade-in reçoit .visible en entrant
// dans l'écran (le CSS joue le fondu, aux durées du module de mouvement).
// Les éléments montés plus tard (liste dépliée, chargement à la demande) sont suivis aussi.
// Sans IntersectionObserver ou avec « réduire les animations » : tout est affiché d'emblée (CSS).
export function FadeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(".fade-in").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const watch = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".fade-in:not(.visible)").forEach((el) => observer.observe(el));
    };

    // Rejoue les apparitions après une navigation.
    document.querySelectorAll(".fade-in.visible").forEach((el) => el.classList.remove("visible"));
    watch(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(".fade-in:not(.visible)")) observer.observe(node);
          watch(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
