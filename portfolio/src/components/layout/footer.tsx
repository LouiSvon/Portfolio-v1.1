import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { socials } from "@/data/socials";

const iconClassName = "h-4 w-4";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClassName}
      aria-hidden="true"
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={iconClassName}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.51.47-3.16-.63-3.36-1.2-.11-.29-.6-1.2-1.02-1.44-.35-.19-.85-.66-.01-.67.79-.01 1.35.74 1.54 1.05.9 1.55 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.11.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.29 9.29 0 0 1 12 6.98c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.05.36.32.68.93.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={iconClassName}
      aria-hidden="true"
    >
      <path d="M6.94 8.98H3.78v10.04h3.16V8.98ZM5.36 4a1.83 1.83 0 1 0 0 3.66 1.83 1.83 0 0 0 0-3.66Zm13.86 9.33c0-3.03-1.62-4.44-3.78-4.44a3.26 3.26 0 0 0-2.95 1.62h-.04V8.98H9.43v10.04h3.16v-4.96c0-1.31.25-2.58 1.87-2.58 1.6 0 1.62 1.5 1.62 2.66v4.88h3.14v-5.69Z" />
    </svg>
  );
}

const socialIcons = {
  Email: MailIcon,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-xs text-tertiary">{t.footer.builtWith}</p>
        <div className="flex items-center gap-2">
          {socials.map((social) => {
            const Icon = socialIcons[social.name as keyof typeof socialIcons];
            const isEmail = social.url.startsWith("mailto:");

            if (!Icon) return null;

            return (
              <a
                key={social.name}
                href={social.url}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                aria-label={social.name}
                title={social.name}
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-border text-secondary hover:text-accent hover:border-accent hover:bg-accent-soft transition-colors duration-150"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
