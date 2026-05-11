import Link from "next/link";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { AccentPicker } from "@/components/ui/accent-picker";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.51.47-3.16-.63-3.36-1.2-.11-.29-.6-1.2-1.02-1.44-.35-.19-.85-.66-.01-.67.79-.01 1.35.74 1.54 1.05.9 1.55 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.11.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.29 9.29 0 0 1 12 6.98c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.05.36.32.68.93.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M6.94 8.98H3.78v10.04h3.16V8.98ZM5.36 4a1.83 1.83 0 1 0 0 3.66 1.83 1.83 0 0 0 0-3.66Zm13.86 9.33c0-3.03-1.62-4.44-3.78-4.44a3.26 3.26 0 0 0-2.95 1.62h-.04V8.98H9.43v10.04h3.16v-4.96c0-1.31.25-2.58 1.87-2.58 1.6 0 1.62 1.5 1.62 2.66v4.88h3.14v-5.69Z" />
    </svg>
  );
}

const year = new Date().getFullYear();

export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const navLinks = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  const legalLinks = [
    { href: `/${locale}/legal`, label: t.footer.mentionsLegales },
    { href: `/${locale}/privacy`, label: t.footer.privacy },
  ];

  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-5xl px-[clamp(1rem,4vw,3rem)] pt-10 pb-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Navigation */}
          <div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-4">
              {t.footer.navigationTitle}
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-tertiary hover:text-accent transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-4">
              {t.footer.legalTitle}
            </p>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-tertiary hover:text-accent transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-4">
              {t.footer.aboutTitle}
            </p>
            <p className="text-sm text-tertiary leading-relaxed mb-4">
              {t.footer.aboutText}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-secondary hover:text-accent transition-colors duration-150 break-all"
            >
              {profile.email}
            </a>
            <div className="flex items-center gap-2 mt-4">
              {[
                { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
                { href: `https://github.com/${profile.github}`, label: "GitHub", Icon: GitHubIcon, external: true },
                { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon, external: true },
              ].map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-border text-secondary hover:text-accent hover:border-accent hover:bg-accent-soft transition-colors duration-150"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Accent picker */}
        <div className="mt-8 pt-6 border-t border-border">
          <AccentPicker label={t.footer.accentLabel} />
        </div>

        {/* Barre inférieure */}
        <div className="footer-bottom mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {t.footer.copyright}</p>
          <p>{t.footer.madeWithCare}</p>
        </div>
      </div>
    </footer>
  );
}
