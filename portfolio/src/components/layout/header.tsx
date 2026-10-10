import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { MobileNavigation } from "@/components/ui/mobile-navigation";
import { NavLinks } from "@/components/ui/nav-links";

export function Header({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/about#cv`, label: t.nav.cv },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-[clamp(1rem,4vw,3rem)]">
        <Link
          href={`/${locale}`}
          className="nav-pill flex !p-0 h-11 w-11 justify-center font-[family-name:var(--font-archivo)] text-sm font-extrabold tracking-tight text-primary"
        >
          <span aria-hidden="true">LS</span>
          <span className="sr-only">{t.nav.home}</span>
        </Link>

        <div className="nav-pill hidden md:flex">
          <NavLinks links={links} />
        </div>

        <div className="nav-pill hidden md:flex">
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
