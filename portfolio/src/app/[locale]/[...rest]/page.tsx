import { notFound } from "next/navigation";

// Toute URL inconnue sous /fr ou /en affiche la page 404 du site, dans le layout de la langue.
export default function CatchAllPage() {
  notFound();
}
