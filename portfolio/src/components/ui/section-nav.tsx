"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
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

// Liens du dock de navigation. Une pastille glisse d'un lien à l'autre (layoutId, sans rebond) et marque la
// section courante. Sur une page intérieure (article, mentions), un lien « Accueil » ouvre la rangée.
export function SectionNav({ items, locale, homeLabel }: { items: NavItem[]; locale: Locale; homeLabel: string }) {
  const isHome = useIsHome(locale);
  const active = useActiveSection(isHome);

  return (
    <>
      {!isHome && (
        <Link href={`/${locale}`} className="nav-link">
          <span aria-hidden="true">&larr; </span>
          {homeLabel}
        </Link>
      )}
      {items.map((item) => (
        <SectionLink
          key={item.id}
          id={item.id}
          locale={locale}
          isHome={isHome}
          current={active === item.id}
          className="nav-link"
        >
          {active === item.id && (
            <motion.span
              layoutId="nav-active"
              className="nav-active"
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
              aria-hidden="true"
            />
          )}
          <span className="relative">{item.label}</span>
        </SectionLink>
      ))}
    </>
  );
}
