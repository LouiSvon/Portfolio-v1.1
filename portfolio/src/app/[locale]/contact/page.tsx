import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return {
    title: t.contact.title,
    description: t.contact.subtitle,
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    locale === "fr"
      ? "Contact depuis le portfolio"
      : "Contact from portfolio"
  )}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.contact.title}
        </h1>
        <p className="text-sm text-secondary mt-2">{t.contact.subtitle}</p>
      </header>

      <section className="pb-10 border-b border-border">
        <p className="text-base text-secondary leading-relaxed max-w-lg">
          {t.contact.intro}
        </p>
        <a
          href={emailHref}
          className="inline-flex mt-6 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          {t.contact.email} &rarr;
        </a>
      </section>

      <section className="py-10 border-b border-border">
        <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
          {t.contact.availability}
        </h2>
        <p className="text-sm text-secondary leading-relaxed">
          {t.contact.availabilityText}
        </p>
      </section>

      <section className="pt-10">
        <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
          {t.contact.channels}
        </h2>
        <div>
          {socials.map((social) => {
            const isEmail = social.url.startsWith("mailto:");

            return (
              <a
                key={social.name}
                href={isEmail ? emailHref : social.url}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className="group flex flex-col gap-1 border-b border-border py-4 first:pt-0 last:border-b-0 hover:border-accent transition-colors duration-150 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between min-[420px]:gap-4"
              >
                <span className="text-sm font-medium text-primary">
                  {social.name}
                </span>
                <span className="max-w-full break-all text-left text-sm text-secondary transition-colors duration-150 group-hover:text-accent min-[420px]:text-right">
                  {social.label} &rarr;
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
