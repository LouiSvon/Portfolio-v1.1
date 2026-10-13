import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { navItems } from "@/lib/sections";
import { HeaderShell } from "@/components/layout/header-shell";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { MobileNavigation } from "@/components/ui/mobile-navigation";
import { SectionNav } from "@/components/ui/section-nav";
import { externalProps, socialLinks } from "@/components/ui/social-links";

// Un seul « dock » en verre, centré : les sections (la courante est éclairée par une pastille qui glisse),
// puis la langue et les canaux de contact directs (email, GitHub, LinkedIn), à un clic de partout. Pas de logo : le nom ouvre la page. Sur une page intérieure, un lien d'accueil apparaît en tête.
export function Header({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const items = navItems(t);

  return (
    <HeaderShell>
      <nav aria-label={t.nav.sections} className="mx-auto flex h-16 max-w-6xl items-center justify-center px-[clamp(1rem,4vw,3rem)]">
        <div className="dock hidden lg:flex">
          <SectionNav items={items} locale={locale} homeLabel={t.nav.home} />
          <span className="dock-sep" aria-hidden="true" />
          <LanguageSwitch locale={locale} />
          <span className="dock-sep" aria-hidden="true" />
          {socialLinks.map(({ href, label, Icon, external }) => (
            <a key={label} href={href} {...(external ? externalProps : {})} aria-label={label} title={label} className="dock-icon">
              <Icon />
            </a>
          ))}
        </div>

        <MobileNavigation
          closeLabel={t.nav.close}
          homeLabel={t.nav.home}
          items={items}
          locale={locale}
          menuLabel={t.nav.menu}
        />
      </nav>
    </HeaderShell>
  );
}
