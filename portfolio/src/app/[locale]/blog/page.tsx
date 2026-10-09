import type { Metadata } from "next";
import { alternatesFor } from "@/lib/site";
import { defaultLocale, isValidLocale, getTranslations, locales } from "@/lib/i18n";
import { articles } from "@/data/articles";
import { BlogList } from "@/components/ui/blog-list";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return {
    title: t.blog.title,
    description: t.blog.subtitle,
    alternates: alternatesFor(locale, "/blog"),
    openGraph: { title: t.blog.title, description: t.blog.subtitle, type: "website" },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  return (
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)] py-12 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.blog.title}
        </h1>
        <p className="text-sm text-secondary mt-2">{t.blog.subtitle}</p>
      </header>

      <BlogList articles={articles} locale={locale} />
    </div>
  );
}
