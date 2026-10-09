"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const { locale } = useParams<{ locale: string }>();
  const isFr = locale !== "en";

  return (
    <div className="max-w-5xl mx-auto px-[clamp(1rem,4vw,3rem)] py-20 sm:py-28">
      <p className="text-xs text-tertiary uppercase tracking-wider mb-3">404</p>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary mb-4">
        {isFr ? "Page introuvable" : "Page not found"}
      </h1>
      <Link
        href={`/${isFr ? "fr" : "en"}`}
        className="text-sm text-accent hover:underline underline-offset-4"
      >
        {isFr ? "Retour à l'accueil" : "Back to home"} &rarr;
      </Link>
    </div>
  );
}
