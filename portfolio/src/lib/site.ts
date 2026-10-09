import type { Metadata } from "next";
import { defaultLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/types";

// URL publique du site. SITE_URL permet de passer à un domaine personnalisé sans toucher au code.
export const siteUrl = process.env.SITE_URL ?? "https://louis-savon.netlify.app";

// Canonical et hreflang d'une page. `path` commence par "/" ou vaut "" pour l'accueil.
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/${defaultLocale}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}
