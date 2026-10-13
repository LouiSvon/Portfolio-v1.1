"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { getTranslations, isValidLocale } from "@/lib/i18n";

export default function NotFound() {
  const { locale } = useParams<{ locale: string }>();
  const lang = isValidLocale(locale) ? locale : "fr";
  const t = getTranslations(lang);

  return (
    <div className="max-w-6xl mx-auto px-[clamp(1rem,4vw,3rem)] pb-24 sm:pb-32">
      <PageHeader eyebrow={<span className="proj-num-inline">404</span>} title={t.notFound.title}>
        <Link href={`/${lang}`} className="btn-pill">
          {t.notFound.back} <span className="arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </PageHeader>
    </div>
  );
}
