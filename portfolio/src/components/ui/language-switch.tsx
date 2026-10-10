"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = getTranslations(locale);

  function switchLocale() {
    const newLocale = locale === "fr" ? "en" : "fr";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      aria-label={`${t.language.switch} (${t.language.label})`}
      className="nav-link cursor-pointer"
    >
      {t.language.switch}
    </button>
  );
}
