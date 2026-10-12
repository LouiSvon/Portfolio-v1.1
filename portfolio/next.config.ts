import type { NextConfig } from "next";
// Anciennes pages devenues des sections de la page unique (page -> ancre). Partagé avec
// scripts/build-netlify-drop.mjs, qui en tire le fichier _redirects de l'export statique.
import oldPages from "./old-pages.json";

const isStaticExport = process.env.NEXT_OUTPUT_EXPORT === "1";

const nextConfig: NextConfig = {
  // Redirection permanente vers l'ancre. Les articles (/blog/<slug>) restent des pages.
  // L'export statique ne gère pas les redirections : _redirects prend le relais.
  async redirects() {
    if (isStaticExport) return [];
    return Object.entries(oldPages).map(([page, section]) => ({
      source: `/:locale(fr|en)/${page}`,
      destination: `/:locale#${section}`,
      permanent: true,
    }));
  },
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
