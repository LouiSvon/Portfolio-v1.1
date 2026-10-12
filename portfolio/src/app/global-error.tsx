"use client";

import { defaultLocale, getTranslations, isValidLocale } from "@/lib/i18n";

// Erreur au niveau racine : hors du layout de langue, la langue se lit dans l'adresse (/fr, /en).
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const segment = typeof window === "undefined" ? "" : window.location.pathname.split("/")[1] ?? "";
  const locale = isValidLocale(segment) ? segment : defaultLocale;
  const t = getTranslations(locale);

  return (
    <html lang={locale}>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>{t.error.title}</h2>
          <button onClick={reset}>{t.error.retry}</button>
        </div>
      </body>
    </html>
  );
}
