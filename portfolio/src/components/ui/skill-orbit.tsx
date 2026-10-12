"use client";

import { memo, useEffect, useRef } from "react";
import { PinTrack } from "@/components/ui/pin-track";
import { SectionHeading } from "@/components/ui/section-heading";

export type OrbitGroup = { title: string; items: { name: string; logo?: string }[] };

// Anneaux : les premiers outils sur l'anneau intérieur, le reste sur l'extérieur.
function rings(items: OrbitGroup["items"]) {
  const inner = Math.max(2, Math.round(items.length * 0.4));
  return [items.slice(0, inner), items.slice(inner)];
}

// Compétences en orbite, section épinglée : une famille à la fois, la famille change au fil du défilement
// (PinTrack, aux frontières seulement) ou au clic sur son nom. Le nom n'est écrit qu'une fois, à gauche ;
// au centre de l'orbite, le nombre d'outils de la famille. Les anneaux tournent en CSS (compositeur seul)
// et s'arrêtent quand la scène quitte l'écran. Toutes les familles restent dans la page ; celles qui ne sont
// pas montrées sont masquées (hidden) mais leurs noms restent dans la liste de gauche.
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
  return (
    <PinTrack id={id} labelledBy={`${id}-titre`} steps={groups.length} step={40} tail={20} mode="all">
      {({ active, goTo }) => (
        <div className="shell orbit-grid">
          <div>
            <SectionHeading id={`${id}-titre`} title={title} />
            <DomainTabs title={title} groups={groups} active={active} goTo={goTo} />
          </div>

          <div className="orbit pause-offscreen">
            {groups.map((group, g) => (
              <OrbitSet key={group.title} group={group} shown={g === active} countLabel={countLabel} />
            ))}
          </div>
        </div>
      )}
    </PinTrack>
  );
}

// Noms des familles. Petit écran : rangée qui défile d'elle-même jusqu'à la famille courante (horizontalement
// seulement, sans toucher au défilement de la page).
function DomainTabs({
  title,
  groups,
  active,
  goTo,
}: {
  title: string;
  groups: OrbitGroup[];
  active: number;
  goTo: (index: number) => void;
}) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.children[active] as HTMLElement | undefined;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const offset = tab.getBoundingClientRect().left - list.getBoundingClientRect().left;
    list.scrollTo({ left: list.scrollLeft + offset - 16 });
  }, [active]);

  return (
    <ol ref={listRef} className="orbit-domains" aria-label={title}>
      {groups.map((group, i) => (
        <li key={group.title}>
          <button type="button" className="orbit-domain" aria-pressed={i === active} onClick={() => goTo(i)}>
            <span className="orbit-domain-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="orbit-domain-name">{group.title}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

// Une famille en orbite. Mémoïsée : au changement de famille, seules la sortante et l'entrante sont rendues.
const OrbitSet = memo(function OrbitSet({ group, shown, countLabel }: { group: OrbitGroup; shown: boolean; countLabel: string }) {
  return (
    <div className="orbit-set" hidden={!shown}>
      <p className="orbit-core">
        <b>{group.items.length}</b>
        <span>{countLabel}</span>
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
  );
});
