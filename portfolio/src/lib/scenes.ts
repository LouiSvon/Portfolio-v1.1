import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["webp", "avif", "jpg", "png"];

// Image facultative (carte d'article, marcheur du parcours) : public/scenes/<nom>.<ext>. Cherchée au build (ou à chaque
// requête en développement) : on dépose le fichier, il apparaît sans toucher au code. Sans fichier : undefined.
// Voir docs/images-a-generer.md.
export function sceneImage(name: string): string | undefined {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "scenes", `${name}.${ext}`))) return `/scenes/${name}.${ext}`;
  }
  return undefined;
}
