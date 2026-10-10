import type { ReactNode } from "react";

// Titre de section commun : trait d'accent qui se dessine à l'apparition (via .fade-in.visible),
// titre affirmé, sous-titre facultatif et action alignée à droite.
export function SectionHeading({
  title,
  subtitle,
  action,
  id,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-head fade-in">
      <div className="min-w-0">
        <span className="section-mark" aria-hidden="true" />
        <h2 id={id} className="section-title">
          {title}
        </h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
