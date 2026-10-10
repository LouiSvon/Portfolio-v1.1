"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";

export default function NotFound() {
  const { locale } = useParams<{ locale: string }>();
  const isFr = locale !== "en";

  return (
    <div className="max-w-6xl mx-auto px-[clamp(1rem,4vw,3rem)] pb-24 sm:pb-32">
      <PageHeader eyebrow={<span className="proj-num-inline">404</span>} title={isFr ? "Page introuvable" : "Page not found"}>
        <Link href={`/${isFr ? "fr" : "en"}`} className="btn-pill">
          {isFr ? "Retour à l'accueil" : "Back to home"} <span className="arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </PageHeader>
    </div>
  );
}
