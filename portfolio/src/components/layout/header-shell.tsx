"use client";

import { useEffect, useState } from "react";

// Enveloppe de l'en-tête : il s'efface en descendant dans la page et revient dès qu'on remonte.
// Il reste affiché en haut de page, au clavier (focus à l'intérieur) et tant que le menu mobile est ouvert.
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6) last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className="site-header"
      data-hidden={hidden || undefined}
      onFocusCapture={() => setHidden(false)}
    >
      {children}
    </header>
  );
}
