import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/ui/language-switch";

export function Header({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/experience`, label: t.nav.experience },
    { href: `/${locale}/cv`, label: t.nav.cv },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-secondary hover:text-accent transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <LanguageSwitch locale={locale} />
      </nav>
    </header>
  );
}
