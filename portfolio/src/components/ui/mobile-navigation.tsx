"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/types";
import type { NavItem } from "@/lib/sections";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { SectionLink, useActiveSection, useIsHome } from "@/components/ui/section-nav";

type MobileNavigationProps = {
  closeLabel: string;
  items: NavItem[];
  locale: Locale;
  menuLabel: string;
};

export function MobileNavigation({
  closeLabel,
  items,
  locale,
  menuLabel,
}: MobileNavigationProps) {
  // Le menu retient la page où il a été ouvert : changer de page le referme sans effet.
  const pathname = usePathname();
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const isOpen = openedOn === pathname;
  const menuId = useId();
  const isHome = useIsHome(locale);
  const active = useActiveSection(isHome);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenedOn(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setOpenedOn(isOpen ? null : pathname)}
        className="nav-pill flex h-11 !px-4 text-sm font-medium text-primary"
      >
        {isOpen ? closeLabel : menuLabel}
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute inset-x-3 top-16 rounded-3xl border border-border bg-[var(--surface)] px-3 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
        >
          <div className="mx-auto flex max-w-2xl flex-col gap-1">
            {items.map((item) => (
              <SectionLink
                key={item.id}
                id={item.id}
                locale={locale}
                isHome={isHome}
                current={active === item.id}
                onClick={() => setOpenedOn(null)}
                className="rounded-2xl px-4 py-3 font-[family-name:var(--font-archivo)] text-2xl font-bold tracking-[-0.03em] text-primary transition-colors duration-(--dur-fast) hover:bg-accent-soft hover:text-accent aria-[current=true]:bg-accent-soft aria-[current=true]:text-accent"
              >
                {item.label}
              </SectionLink>
            ))}
            <div className="mt-2 border-t border-border px-3 pt-3">
              <LanguageSwitch locale={locale} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
