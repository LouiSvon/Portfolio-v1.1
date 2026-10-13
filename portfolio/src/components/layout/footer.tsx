import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/sections";
import { DocIcon, externalProps, socialLinks } from "@/components/ui/social-links";

const year = new Date().getFullYear();

export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const navLinks = navItems(t).map((item) => ({ href: `/${locale}#${item.id}`, label: item.label }));

  const legalLinks = [
    { href: `/${locale}/legal`, label: t.footer.mentionsLegales },
    { href: `/${locale}/privacy`, label: t.footer.privacy },
  ];

  return (
    <footer className="mt-auto overflow-hidden">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,3rem)] pt-14 pb-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="eyebrow mb-3">{t.footer.aboutTitle}</p>
            <p className="max-w-xs text-sm leading-relaxed text-secondary">{t.footer.aboutText}</p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? externalProps : {})}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-secondary hover:border-accent hover:text-accent"
                >
                  <Icon />
                </a>
              ))}
              {/* CV rappelé en fin de page : le recruteur n'a pas à remonter jusqu'au haut de page. */}
              <a
                href={`/${profile.cvFile}`}
                download={profile.cvDownloadName}
                className="ml-1 inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-secondary hover:border-accent hover:text-accent"
              >
                <DocIcon />
                {t.footer.cv}
              </a>
            </div>
          </div>

          <nav aria-label={t.footer.navigationTitle} className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {[...navLinks, ...legalLinks].map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-secondary hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="wordmark mt-16" aria-hidden="true">{profile.name}</p>

        <div className="footer-bottom mt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {t.footer.copyright}</p>
          <a href={`mailto:${profile.email}`} className="hover:text-accent">{profile.email}</a>
        </div>
      </div>
    </footer>
  );
}
