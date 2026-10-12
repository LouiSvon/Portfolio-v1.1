"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { pop } from "@/lib/motion";
import { HighlightedText } from "@/components/ui/highlighted-text";

export type TimelineItem = {
  key: string;
  typeLabel: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  tags: { label: string; tech: boolean }[];
  links: { label: string; url: string }[];
  images: { src: string; alt: string }[];
  // Phrases clés de la description (sous-chaînes exactes) et durée calculée depuis les dates.
  highlights: string[];
  duration?: { amount: string; unit: string }[];
};

// Frise du parcours (petit et moyen écran) : la ligne se remplit en bleu au fil du défilement (CSS lié au
// défilement, sans JavaScript ; repli : ligne pleine) et chaque point s'allume quand son étape passe au
// centre de l'écran (IntersectionObserver de Motion). « Réduire les animations » : ligne pleine (CSS).
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      <span className="timeline-track" aria-hidden="true" />
      <span className="timeline-fill" aria-hidden="true" />
      {items.map((item) => (
        <motion.li
          key={item.key}
          className="timeline-item"
          initial="off"
          whileInView="on"
          viewport={{ margin: "0px 0px -45% 0px" }}
        >
          <motion.span
            className="timeline-dot"
            aria-hidden="true"
            variants={{
              off: { scale: 0.7, opacity: 0.5 },
              on: { scale: 1, opacity: 1, transition: pop },
            }}
          />
          <article className="panel">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="chip">{item.typeLabel}</span>
              <time className="text-xs text-tertiary">{item.period}</time>
              {item.duration && (
                <span className="timeline-duration">{item.duration.map((p) => `${p.amount} ${p.unit}`).join(" ")}</span>
              )}
            </div>
            <h3 className="panel-title">{item.role}</h3>
            <p className="mb-3 text-sm text-secondary">
              {item.companyUrl ? (
                <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-accent hover:underline">
                  {item.company} <span aria-hidden="true">&#8599;</span>
                </a>
              ) : (
                item.company
              )}
            </p>
            <p className="text-sm leading-relaxed text-secondary">
              <HighlightedText text={item.description} phrases={item.highlights} />
            </p>

            {item.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) =>
                  tag.tech ? (
                    <li key={tag.label} className="badge badge-technology" data-tech={tag.label}>{tag.label}</li>
                  ) : (
                    <li key={tag.label} className="chip">{tag.label}</li>
                  ),
                )}
              </ul>
            )}

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
        </motion.li>
      ))}
    </ol>
  );
}
