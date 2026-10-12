"use client";

import { useId, useState } from "react";
import dynamic from "next/dynamic";
import type { Locale, Project } from "@/types";
import { getTranslations } from "@/lib/i18n";

// Le code de la liste filtrable ne se charge qu'à l'ouverture : la page reste légère.
const ProjectFilter = dynamic(() => import("@/components/ui/project-filter").then((m) => m.ProjectFilter));

// Bouton « Voir tous les projets » : déplie les autres dépôts GitHub, avec filtres et tri.
export function OtherProjects({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = getTranslations(locale);
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <div className="mt-[clamp(4rem,10vh,7rem)] flex flex-col items-center gap-12">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="btn-ghost"
      >
        {open ? t.projects.hideOthers : t.projects.showOthers}{" "}
        <span className="arrow" aria-hidden="true">{open ? "↑" : "↓"}</span>
      </button>
      <div id={listId} className="w-full">
        {open && <ProjectFilter projects={projects} locale={locale} />}
      </div>
    </div>
  );
}
