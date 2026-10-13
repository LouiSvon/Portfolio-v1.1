import path from "node:path";
import type { NextConfig } from "next";
// Anciennes pages devenues des sections de la page unique (page -> ancre). Partagé avec
// scripts/build-netlify-drop.mjs, qui en tire le fichier _redirects de l'export statique.
import oldPages from "./old-pages.json";

const isStaticExport = process.env.NEXT_OUTPUT_EXPORT === "1";

const nextConfig: NextConfig = {
  // Racine explicite : un autre package-lock.json existe plus haut (dans le dossier personnel) ; sans cela,
  // Next le prend pour la racine du workspace et l'annonce par un avertissement à chaque build.
  turbopack: { root: path.join(__dirname) },
  outputFileTracingRoot: path.join(__dirname),
  // sceneImage() lit public/scenes au rendu : le dossier doit suivre la page quand elle est recalculée.
  outputFileTracingIncludes: { "/*": ["./public/scenes/**/*"] },
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
