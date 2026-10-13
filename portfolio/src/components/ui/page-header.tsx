import type { ReactNode } from "react";

// En-tête commun des pages intérieures : grand titre d'affichage qui monte à l'arrivée,
// sous-titre et actions facultatives, halo bleu en fond (même langage que le héros de l'accueil).
export function PageHeader({
  title,
  subtitle,
  eyebrow,
  children,
  compact = false,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  children?: ReactNode;
  // Titre plus petit pour les intitulés longs (articles).
  compact?: boolean;
}) {
  return (
    <header className="page-header">
      <div className="page-glow" aria-hidden="true" />
      {eyebrow && (
        <div className="reveal-soft mb-6" style={{ "--d": "0s" } as React.CSSProperties}>
          {eyebrow}
        </div>
      )}
      <h1 className={`page-title text-primary${compact ? " is-compact" : ""}`}>
        <span className="reveal-line"><span style={{ "--d": "0.05s" } as React.CSSProperties}>{title}</span></span>
      </h1>
      {subtitle && (
        <p className="page-subtitle reveal-soft" style={{ "--d": "0.25s" } as React.CSSProperties}>
          {subtitle}
        </p>
      )}
      {children && (
        <div className="reveal-soft mt-8 flex flex-wrap gap-3" style={{ "--d": "0.4s" } as React.CSSProperties}>
          {children}
        </div>
      )}
    </header>
  );
}
