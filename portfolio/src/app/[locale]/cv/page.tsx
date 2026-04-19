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
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {t.cv.title}
        </h1>
        <p className="text-sm text-secondary mt-2">{t.cv.subtitle}</p>
      </header>

      <div className="space-y-6">
        <div className="grid gap-3 min-[420px]:flex min-[420px]:flex-wrap min-[420px]:items-center min-[420px]:gap-4">
          <a
            href={CV_HREF}
            download={CV_FILE_NAME}
            className="inline-flex min-h-10 items-center justify-center rounded border border-accent px-3 text-sm font-medium text-accent transition-colors duration-150 hover:bg-accent-soft min-[420px]:min-h-0 min-[420px]:justify-start min-[420px]:border-0 min-[420px]:px-0 min-[420px]:hover:bg-transparent min-[420px]:hover:underline min-[420px]:underline-offset-4"
          >
            {t.cv.download} &darr;
          </a>
          <a
            href={CV_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded border border-border px-3 text-sm text-secondary transition-colors duration-150 hover:border-accent hover:text-accent min-[420px]:min-h-0 min-[420px]:justify-start min-[420px]:border-0 min-[420px]:px-0"
          >
            {t.cv.open} &rarr;
          </a>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-border transition-colors duration-150 hover:border-accent">
          <iframe
            src={`${CV_HREF}#view=Fit`}
            className="block aspect-[1/1.414] h-auto w-full"
            title={t.cv.title}
          />
        </div>
      </div>
    </div>
  );
}
