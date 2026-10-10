"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/types";
import { LanguageSwitch } from "@/components/ui/language-switch";

type NavigationLink = {
  href: string;
  label: string;
};

type MobileNavigationProps = {
  closeLabel: string;
  links: NavigationLink[];
  locale: Locale;
  menuLabel: string;
};

export function MobileNavigation({
  closeLabel,
  links,
  locale,
  menuLabel,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
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
        onClick={() => setIsOpen((current) => !current)}
        className="nav-pill h-11 px-4 font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.12em] text-primary"
      >
        {isOpen ? closeLabel : menuLabel}
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute inset-x-3 top-16 rounded-3xl border border-border bg-[var(--surface)] px-3 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
        >
          <div className="mx-auto flex max-w-2xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 font-[family-name:var(--font-archivo)] text-2xl font-bold tracking-tight text-primary [font-stretch:125%] transition-colors duration-150 hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </Link>
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
