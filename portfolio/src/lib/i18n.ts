import type { Locale } from "@/types";
import fr from "@/i18n/fr";
import en from "@/i18n/en";
import type { Translations } from "@/i18n/fr";

const translations: Record<Locale, Translations> = { fr, en };

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale];
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr + "-01");
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatFullDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
