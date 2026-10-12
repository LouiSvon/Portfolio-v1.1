// Vocabulaire de mouvement unique du site : mêmes courbes, durées et amplitudes partout.
// Une seule source : Motion lit ces constantes, le CSS les reçoit en variables posées sur <html>.

const cubic = (p: readonly [number, number, number, number]) => `cubic-bezier(${p.join(", ")})`;

export const ease = {
  // Sortie franche puis arrivée douce : apparitions, survols, titres.
  out: [0.16, 1, 0.3, 1],
  // Fondu enchaîné symétrique : ce qui part et ce qui arrive en même temps.
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.2, // couleur au survol, à l'appui
  nudge: 0.4, // petit déplacement au survol (flèche, carte)
  base: 0.6, // apparition d'un bloc
  slow: 0.9, // grand titre
} as const;

export const distance = {
  y: 24, // décalage vertical d'une apparition (px)
  scale: 0.96, // échelle de départ ou de recul
  dim: 0.5, // opacité plancher d'un texte qui s'allume au défilement : reste lisible
  veil: 0.1, // voile maximal d'une carte qui recule : le petit texte garde 4,5:1
} as const;

export const stagger = 0.06; // décalage entre éléments d'un même groupe (s)

// Lissage des effets liés au défilement (Motion) : ressort amorti, sans rebond.
export const scrub = { stiffness: 120, damping: 30, mass: 0.4 } as const;

// Allumage d'un point de la frise : léger rebond, seule exception voulue (effet validé par le propriétaire).
export const pop = { type: "spring", stiffness: 300, damping: 18 } as const;

// Variables CSS correspondantes, posées sur <html> par le layout.
export const motionCssVars = {
  "--ease-out": cubic(ease.out),
  "--ease-in-out": cubic(ease.inOut),
  "--dur-fast": `${duration.fast}s`,
  "--dur-nudge": `${duration.nudge}s`,
  "--dur-base": `${duration.base}s`,
  "--dur-slow": `${duration.slow}s`,
  "--reveal-y": `${distance.y}px`,
  "--reveal-scale": `${distance.scale}`,
  "--dim": `${distance.dim}`,
  "--stagger": `${stagger}s`,
} as React.CSSProperties;
