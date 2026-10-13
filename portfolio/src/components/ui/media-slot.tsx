import Image from "next/image";

// Emplacement d'un média à fournir. Avec `src` : image optimisée (next/image), dimensions explicites
// pour éviter tout décalage de mise en page. Sans `src` : rien de visible en production, l'élément
// garde le fichier attendu dans data-media-slot ; en développement, un cadre pointillé le signale.
export function MediaSlot({
  src,
  alt,
  hint,
  width,
  height,
  sizes,
  className = "",
}: {
  src?: string;
  alt: string;
  hint: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`media-slot ${className}`}
      />
    );
  }

  return (
    <span
      className={`media-slot is-empty ${className}`}
      data-media-slot={`${hint} (${width}×${height})`}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden="true"
    >
      {process.env.NODE_ENV === "development" && (
        <span className="media-slot-label">
          {hint} · {width}×{height}
        </span>
      )}
    </span>
  );
}
