import type { Metadata } from "next";
import { defaultLocale, isValidLocale, getTranslations } from "@/lib/i18n";

const CV_FILE_NAME = "Louis_Savon_CV.pdf";
const CV_HREF = `/${CV_FILE_NAME}`;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return {
    title: t.cv.title,
    description: t.cv.subtitle,
  };
}

export default async function CVPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.cv.title}
        </h1>
        <p className="text-sm text-secondary mt-2">{t.cv.subtitle}</p>
      </header>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={CV_HREF}
            download={CV_FILE_NAME}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            {t.cv.download} &darr;
          </a>
          <a
            href={CV_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors duration-150"
          >
            {t.cv.open} &rarr;
          </a>
        </div>

        <div className="border border-border rounded-lg overflow-hidden mt-6 hover:border-accent transition-colors duration-150">
          <iframe
            src={CV_HREF}
            className="w-full h-[80vh]"
            title={t.cv.title}
          />
        </div>
      </div>
    </div>
  );
}
