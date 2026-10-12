"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";

// Bascule FR / EN : un seul bouton, la langue courante est en clair, l'autre en retrait. Le nom accessible
// reprend le texte visible (FR EN) puis précise l'action.
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = getTranslations(locale);

  function switchLocale() {
    const newLocale = locale === "fr" ? "en" : "fr";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    router.push(newPath + window.location.hash);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="lang-switch cursor-pointer"
    >
      <span data-on={locale === "fr" || undefined}>FR</span>
      <span data-on={locale === "en" || undefined}>EN</span>
      <span className="sr-only">{t.language.label} : {t.language.switch}</span>
    </button>
  );
}
