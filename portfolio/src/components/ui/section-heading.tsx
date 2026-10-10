import type { ReactNode } from "react";

// Titre de section commun : petit libellé à chasse fixe, grand titre d'affichage,
// sous-titre facultatif et action alignée à droite. Apparaît au défilement (.fade-in).
export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  action,
  id,
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-head fade-in">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow section-eyebrow">{eyebrow}</p>}
        <h2 id={id} className="section-title">
          {title}
        </h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
