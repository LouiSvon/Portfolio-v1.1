"use client";

import Image from "next/image";
import { HighlightedText } from "@/components/ui/highlighted-text";

export type TimelineItem = {
  key: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  links: { label: string; url: string }[];
  images: { src: string; alt: string }[];
  // Phrases clés de la description (sous-chaînes exactes) et durée calculée depuis les dates.
  highlights: string[];
  duration?: { amount: string; unit: string }[];
};

// Frise du parcours (petit et moyen écran) : la ligne se remplit en violet au fil du défilement et un point
// la mène (CSS lié au défilement, sans JavaScript ; repli et « réduire les animations » : ligne pleine).
// Par expérience : le poste domine, puis l'entreprise et la période, puis la description (une ou deux
// phrases clés en couleur).
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      <span className="timeline-rail" aria-hidden="true">
        <span className="timeline-track" />
        <span className="timeline-fill" />
        <span className="timeline-head" />
      </span>
      {items.map((item) => (
        <li key={item.key} className="timeline-item">
          <span className="timeline-dot" aria-hidden="true" />
          <article className="panel">
            <h3 className="panel-title">{item.role}</h3>
            <p className="mb-3 mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-secondary">
              {item.companyUrl ? (
                <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline-offset-4 hover:underline">
                  {item.company} <span aria-hidden="true">&#8599;</span>
                </a>
              ) : (
                <span className="font-medium text-foreground">{item.company}</span>
              )}
              <time className="text-tertiary">
                {item.period}
                {item.duration && ` · ${item.duration.map((p) => `${p.amount} ${p.unit}`).join(" ")}`}
              </time>
            </p>
            <p className="text-sm leading-relaxed text-secondary">
              <HighlightedText text={item.description} phrases={item.highlights} />
            </p>

            {item.images.length > 0 && (
              <ul className="timeline-photos mt-4">
                {item.images.map((img) => (
                  <li key={img.src}>
                    <Image src={img.src} alt={img.alt} width={320} height={200} className="h-full w-full object-cover" />
                  </li>
                ))}
              </ul>
            )}

            {item.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="btn-ghost !h-10 !px-4 !text-sm">
                    {link.label} <span className="arrow" aria-hidden="true">&#8599;</span>
                  </a>
                ))}
              </div>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
