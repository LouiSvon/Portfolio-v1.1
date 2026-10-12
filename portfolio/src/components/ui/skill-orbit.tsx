"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { SectionHeading } from "@/components/ui/section-heading";

export type OrbitGroup = { title: string; items: { name: string; logo?: string }[] };

// Anneaux : les premiers outils sur l'anneau intérieur, le reste sur l'extérieur.
function rings(items: OrbitGroup["items"]) {
  const inner = Math.max(2, Math.round(items.length * 0.4));
  return [items.slice(0, inner), items.slice(inner)];
}

// Compétences en orbite : une famille à la fois, ses outils gravitent autour de son nom.
// Grand écran : la scène reste épinglée et la famille change au fil du défilement (le clic sur un nom y
// amène). Ailleurs (petit écran, écran bas, animations réduites) : pas d'épinglage, on choisit au toucher.
// Toutes les familles restent dans la page (celles qui ne sont pas montrées sont masquées avec `hidden`).
export function SkillOrbit({
  id,
  title,
  groups,
  countLabel,
}: {
  id: string;
  title: string;
  groups: OrbitGroup[];
  countLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  // Vrai quand la piste est plus haute que l'écran, c'est-à-dire quand la scène est épinglée.
  const pinned = () => {
    const track = trackRef.current;
    const stage = stageRef.current;
    return !!track && !!stage && track.offsetHeight > stage.offsetHeight * 1.5;
  };

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!pinned()) return;
    setActive(Math.min(groups.length - 1, Math.max(0, Math.floor(progress * groups.length * 0.999))));
  });

  const select = (index: number) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (track && stage && pinned()) {
      const top = track.getBoundingClientRect().top + window.scrollY;
      const range = track.offsetHeight - stage.offsetHeight;
      window.scrollTo({ top: top + (range * (index + 0.5)) / groups.length });
    } else {
      setActive(index);
    }
  };

  return (
    <section id={id} className="orbit-track" aria-labelledby={`${id}-titre`}>
      <div ref={trackRef} className="orbit-pin">
        <div ref={stageRef} className="orbit-stage">
          <div className="shell orbit-grid">
            <div>
              <SectionHeading id={`${id}-titre`} title={title} />
              <ol className="orbit-domains" role="group" aria-label={title}>
                {groups.map((group, i) => (
                  <li key={group.title}>
                    <button
                      type="button"
                      className="orbit-domain"
                      aria-pressed={i === active}
                      onClick={() => select(i)}
                    >
                      <span className="orbit-domain-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      <span className="orbit-domain-name">{group.title}</span>
                      <span className="orbit-domain-count">{group.items.length} {countLabel}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="orbit">
              <span className="orbit-halo" aria-hidden="true" />
              {groups.map((group, g) => (
                <div key={group.title} className="orbit-set" hidden={g !== active}>
                  <p className="orbit-core" aria-hidden="true">
                    <span>{group.title}</span>
                  </p>
                  {rings(group.items).map((ring, r) => (
                    <ul key={r} className={`orbit-ring${r ? " is-outer" : ""}`} aria-label={r ? undefined : group.title}>
                      {ring.map((item, i) => {
                        const index = r ? i + rings(group.items)[0].length : i;
                        return (
                          <li
                            key={item.name}
                            className="orbit-item"
                            style={{ "--a": `${(360 / ring.length) * i + (r ? 360 / ring.length / 2 : 0)}deg`, "--i": index } as React.CSSProperties}
                          >
                            <span className="orbit-upright">
                              <span className="orbit-tile">
                                {item.logo ? (
                                  <span className="orbit-logo" style={{ "--logo": `url(${item.logo})` } as React.CSSProperties} aria-hidden="true" />
                                ) : (
                                  <span aria-hidden="true">{item.name[0]}</span>
                                )}
                              </span>
                              <span className="orbit-name">{item.name}</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
