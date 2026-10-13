import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { defaultLocale, getTranslations, isValidLocale, locales } from "@/lib/i18n";
import { profile } from "@/data/profile";

// Aperçu du lien partagé (LinkedIn, messageries, email), généré au build dans chaque langue :
// qui je suis, ce que je fais, ce que je cherche. Mêmes textes que la première vue du site.
// Texte alternatif sans langue : le même fichier sert le français et l'anglais.
export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  const portrait = await readFile(join(process.cwd(), "public", "portrait.jpg"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 72px",
          background: "radial-gradient(circle at 85% 15%, #1b1740 0%, #08080a 55%)",
          color: "#f3f0ea",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${portrait}`}
          width={260}
          height={260}
          alt=""
          style={{ borderRadius: 999, objectFit: "cover", border: "2px solid #2a2a33" }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ marginTop: 22, fontSize: 32, color: "#8b7dff" }}>{t.hero.role}</div>
          <div style={{ marginTop: 14, fontSize: 30, color: "#aaa69e" }}>{t.hero.what}</div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: 40,
              padding: "12px 26px",
              border: "2px solid #2a2a33",
              borderRadius: 999,
              fontSize: 24,
              whiteSpace: "nowrap",
            }}
          >
            {t.hero.available}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
