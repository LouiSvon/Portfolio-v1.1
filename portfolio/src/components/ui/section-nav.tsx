"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";
import { SECTION_IDS, type NavItem } from "@/lib/sections";

// Vrai sur la page unique (/fr, /en), où les ancres se suivent sans changer de page.
export function useIsHome(locale: Locale) {
  const pathname = usePathname();
  return pathname === `/${locale}` || pathname === `/${locale}/`;
}

// Section qui traverse le milieu de l'écran. Ne tourne que sur la page unique.
export function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !("IntersectionObserver" in window)) return;
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    // Une ligne fine au milieu de l'écran : la section qui la croise est la section courante.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

// Lien vers une section : ancre native sur la page unique (défilement fluide du navigateur),
// lien Next depuis une autre page (article, mentions légales).
export function SectionLink({
  id,
  locale,
  isHome,
  className,
  current,
  onClick,
  children,
}: {
  id: string;
  locale: Locale;
  isHome: boolean;
  className?: string;
  current?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  const shared = { className, onClick, "aria-current": current ? ("true" as const) : undefined };
  return isHome ? (
    <a href={`#${id}`} {...shared}>{children}</a>
  ) : (
    <Link href={`/${locale}#${id}`} {...shared}>{children}</Link>
  );
}

// Liens de la pilule de navigation, avec la section courante mise en évidence.
export function SectionNav({ items, locale }: { items: NavItem[]; locale: Locale }) {
  const isHome = useIsHome(locale);
  const active = useActiveSection(isHome);

  return (
    <>
      {items.map((item) => (
        <SectionLink
          key={item.id}
          id={item.id}
          locale={locale}
          isHome={isHome}
          current={active === item.id}
          className="nav-link"
        >
          {item.label}
        </SectionLink>
      ))}
    </>
  );
}
