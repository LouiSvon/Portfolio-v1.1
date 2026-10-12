import { ProjectScene, type Scene, type SceneLabels } from "@/components/ui/project-scene";

// Projets phares en cartes empilées (desktop) : chaque carte s'épingle (CSS sticky), la suivante glisse
// par-dessus et la précédente recule. Sans JavaScript : chaque carte expose sa timeline de vue
// (--card-i, rendue visible à toute la pile par timeline-scope) et la carte précédente l'utilise pour
// reculer et s'assombrir (CSS lié au défilement). Repli (navigateur sans support, moins de 1024 px,
// écran bas, animations réduites) : pile ou liste simple, sans recul.
export function ProjectStack({ scenes, labels }: { scenes: Scene[]; labels: SceneLabels }) {
  const names = scenes.map((_, i) => `--card-${i}`);

  return (
    <ol className="stack" style={{ "--scope": names.join(", ") } as React.CSSProperties}>
      {scenes.map((scene, i) => {
        const last = i === scenes.length - 1;
        return (
          <li
            key={scene.key}
            className="stack-card"
            data-recede={last ? undefined : ""}
            style={{ "--i": i, "--self": names[i], "--next": last ? "none" : names[i + 1] } as React.CSSProperties}
          >
            <ProjectScene scene={scene} index={i} labels={labels} />
            <span className="stack-shade" aria-hidden="true" />
          </li>
        );
      })}
    </ol>
  );
}
