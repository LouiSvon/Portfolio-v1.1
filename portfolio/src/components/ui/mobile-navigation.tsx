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
    <div className="sm:hidden">
      <button
        type="button"
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-9 items-center justify-center rounded border border-border px-3 text-sm font-medium text-primary transition-colors duration-150 hover:border-accent hover:text-accent"
      >
        {isOpen ? closeLabel : menuLabel}
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute inset-x-0 top-14 border-b border-border bg-background/95 px-4 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-2xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-3 py-2 text-sm text-secondary transition-colors duration-150 hover:bg-accent-soft hover:text-accent"
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
