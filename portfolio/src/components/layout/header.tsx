import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { MobileNavigation } from "@/components/ui/mobile-navigation";

export function Header({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-[clamp(1rem,4vw,3rem)]">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium text-primary transition-colors duration-150 hover:text-accent sm:hidden"
        >
          LS
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
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
        <div className="hidden sm:block">
          <LanguageSwitch locale={locale} />
        </div>
        <MobileNavigation
          closeLabel={t.nav.close}
          links={links}
          locale={locale}
          menuLabel={t.nav.menu}
        />
      </nav>
    </header>
  );
}
