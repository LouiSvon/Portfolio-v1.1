import Image from "next/image";
import { sceneImage } from "@/lib/scenes";

export type Motif = "topo" | "blueprint" | "orbits" | "horizon" | "waves" | "sunrise";
export type Tone = "blue" | "violet" | "warm" | "mix";

const W = 1440;
const H = 900;
const r1 = (n: number) => Math.round(n * 10) / 10;
const line = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${r1(x)} ${r1(y)}`).join("");

// Courbe de niveau : ellipse à rayon ondulé, fermée.
function contour(cx: number, cy: number, rx: number, ry: number, k: number) {
  const n = 72;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const wob = 1 + 0.1 * Math.sin(3 * a + k) + 0.07 * Math.sin(5 * a + k * 1.7) + 0.04 * Math.sin(9 * a + k * 0.6);
    pts.push([cx + rx * wob * Math.cos(a), cy + ry * wob * Math.sin(a)]);
  }
  return line(pts);
}

// Les six décors sont des dessins au trait (currentColor), très discrets : chaque section a sa forme.
const MOTIFS: Record<Motif, React.ReactNode> = {
  // Relief : courbes de niveau, comme une carte du chemin parcouru.
  topo: (
    <g>
      {Array.from({ length: 11 }, (_, i) => (
        <path key={`a${i}`} d={contour(1060, 300, 90 + i * 62, 60 + i * 42, i * 0.45)} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <path key={`b${i}`} d={contour(260, 720, 70 + i * 58, 50 + i * 38, 2 + i * 0.5)} />
      ))}
    </g>
  ),
  // Plan technique : trame, repères d'angle, cercle de cotation.
  blueprint: (
    <g>
      <defs>
        <pattern id="bp-fine" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" strokeWidth="0.6" />
        </pattern>
        <pattern id="bp-coarse" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M200 0H0V200" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#bp-fine)" stroke="none" />
      <rect width={W} height={H} fill="url(#bp-coarse)" stroke="none" />
      <circle cx="1040" cy="430" r="250" />
      <circle cx="1040" cy="430" r="170" strokeDasharray="3 9" />
      <path d="M1040 150V710M760 430H1320" strokeDasharray="14 10" />
      <path d="M96 150V96H150M1344 96H1290M1344 804V850H1290M96 804V850H150" strokeWidth="2" />
    </g>
  ),
  // Orbites inclinées : les compétences gravitent.
  orbits: (
    <g className="backdrop-spin">
      {Array.from({ length: 7 }, (_, i) => (
        <ellipse key={i} cx="720" cy="450" rx={150 + i * 105} ry={(150 + i * 105) * 0.4} transform="rotate(-20 720 450)" />
      ))}
      {[[0.9, 1], [3.4, 3], [5.5, 5], [2.2, 6]].map(([angle, ring]) => {
        const rx = 150 + ring * 105;
        const x = rx * Math.cos(angle);
        const y = rx * 0.4 * Math.sin(angle);
        const rot = (-20 * Math.PI) / 180;
        return (
          <circle
            key={`${angle}-${ring}`}
            cx={r1(720 + x * Math.cos(rot) - y * Math.sin(rot))}
            cy={r1(450 + x * Math.sin(rot) + y * Math.cos(rot))}
            r="5"
            className="backdrop-fill"
          />
        );
      })}
    </g>
  ),
  // Plan fuyant vers l'horizon : de quoi poser des projets.
  horizon: (
    <g>
      {Array.from({ length: 19 }, (_, i) => {
        const x = -900 + i * 150;
        return <path key={`v${i}`} d={`M720 380L${x} ${H}`} />;
      })}
      {Array.from({ length: 9 }, (_, i) => {
        const y = 380 + (H - 380) * ((i + 1) / 9) ** 2.2;
        return <path key={`h${i}`} d={`M0 ${r1(y)}H${W}`} />;
      })}
      <path d={`M0 380H${W}`} strokeWidth="1.5" />
    </g>
  ),
  // Ondes d'encre : l'écriture.
  waves: (
    <g>
      {Array.from({ length: 9 }, (_, i) => {
        const pts: [number, number][] = [];
        for (let x = 0; x <= W; x += 30) {
          pts.push([x, 200 + i * 62 + 46 * Math.sin(x / 190 + i * 0.55) + 22 * Math.sin(x / 71 - i)]);
        }
        return <path key={i} d={line(pts)} />;
      })}
    </g>
  ),
  // Lever de soleil : la porte de sortie vers le contact.
  sunrise: (
    <g>
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${720 - (130 + i * 85)} ${H}A${130 + i * 85} ${130 + i * 85} 0 0 1 ${720 + (130 + i * 85)} ${H}`} />
      ))}
      {Array.from({ length: 13 }, (_, i) => {
        const a = Math.PI * (0.08 + (i / 12) * 0.84);
        return <path key={i} d={`M${r1(720 - Math.cos(a) * 160)} ${r1(H - Math.sin(a) * 160)}L${r1(720 - Math.cos(a) * 900)} ${r1(H - Math.sin(a) * 900)}`} />;
      })}
    </g>
  ),
};

// Décor d'une section : lueurs de couleur, dessin au trait propre à la section, et l'image d'ambiance
// si elle existe (public/scenes/<name>.webp). Tout est décoratif (aria-hidden) et laisse passer les clics.
// La section parente doit porter .has-backdrop (position relative, calque isolé).
export function SectionBackdrop({ name, motif, tone = "blue" }: { name: string; motif: Motif; tone?: Tone }) {
  const image = sceneImage(name);
  return (
    <div className="backdrop" data-tone={tone} aria-hidden="true">
      <span className="backdrop-glow backdrop-glow-a" />
      <span className="backdrop-glow backdrop-glow-b" />
      <svg className="backdrop-art backdrop-drift" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth="1">
        {MOTIFS[motif]}
      </svg>
      {image && <Image src={image} alt="" fill sizes="100vw" className="backdrop-img backdrop-drift" />}
    </div>
  );
}
