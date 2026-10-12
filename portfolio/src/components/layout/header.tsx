import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { navItems } from "@/lib/sections";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { MobileNavigation } from "@/components/ui/mobile-navigation";
import { SectionNav } from "@/components/ui/section-nav";

export function Header({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const items = navItems(t);

  return (
    <header className="sticky top-0 z-50">
      <nav aria-label={t.nav.sections} className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-[clamp(1rem,4vw,3rem)]">
        <Link
          href={`/${locale}`}
          className="nav-pill flex !p-0 h-11 w-11 justify-center font-[family-name:var(--font-archivo)] text-sm font-extrabold tracking-tight text-primary"
        >
          <span aria-hidden="true">LS</span>
          <span className="sr-only">{t.nav.home}</span>
        </Link>

        <div className="nav-pill hidden md:flex">
          <SectionNav items={items} locale={locale} />
        </div>

        <div className="nav-pill hidden md:flex">
          <LanguageSwitch locale={locale} />
        </div>

        <MobileNavigation
          closeLabel={t.nav.close}
          items={items}
          locale={locale}
          menuLabel={t.nav.menu}
        />
      </nav>
    </header>
  );
}
