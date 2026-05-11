"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/types";
import { Badge } from "@/components/ui/badge";

const GITHUB_USERNAME = "LouiSvon";
const NEW_LANG_KEY = "github_langs_seen";
const NEW_LANG_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const BASE_COMPETENCES: Record<string, string[]> = {
  Langages: ["JavaScript", "Python", "Swift"],
  Frontend: ["HTML", "CSS", "React"],
  Backend: ["Node.js", "Express.js"],
  "Bases de données": ["MySQL", "PostgreSQL"],
  "DevOps & Outils": ["Docker", "Git"],
  "IA / LLM": ["Prompt Engineering", "Intégration d'API IA", "Ollama"],
};

async function fetchGithubLanguages(): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
    if (!res.ok) return [];
    const repos: { languages_url: string }[] = await res.json();

    const langCounts: Record<string, number> = {};
    await Promise.all(
      repos.map(async (repo) => {
        try {
          const r = await fetch(repo.languages_url, {
            headers: { Accept: "application/vnd.github.v3+json" },
          });
          if (!r.ok) return;
          const langs: Record<string, number> = await r.json();
          Object.entries(langs).forEach(([lang, bytes]) => {
            langCounts[lang] = (langCounts[lang] || 0) + bytes;
          });
        } catch {
          // ignore individual repo failures
        }
      })
    );

    return Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang);
  } catch {
    return [];
  }
}

function getNewLangsSeen(): Record<string, number> {
  try {
    const raw = localStorage.getItem(NEW_LANG_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveNewLangsSeen(data: Record<string, number>) {
  try {
    localStorage.setItem(NEW_LANG_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function GitHubSkills({ fetching }: { fetching: string }) {
  const [competences, setCompetences] = useState(BASE_COMPETENCES);
  const [newLangs, setNewLangs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGithubLanguages().then((githubLangs) => {
      const allBaseValues = Object.values(BASE_COMPETENCES).flat().map((s) => s.toLowerCase());
      const incoming = githubLangs.filter(
        (lang) => !allBaseValues.includes(lang.toLowerCase())
      );

      if (incoming.length === 0) {
        setLoading(false);
        return;
      }

      const seen = getNewLangsSeen();
      const now = Date.now();
      const updatedSeen = { ...seen };
      const toMark = new Set<string>();

      incoming.forEach((lang) => {
        if (!seen[lang]) {
          updatedSeen[lang] = now;
          toMark.add(lang);
        } else if (now - seen[lang] < NEW_LANG_TTL_MS) {
          toMark.add(lang);
        }
      });

      saveNewLangsSeen(updatedSeen);

      setCompetences((prev) => ({
        ...prev,
        Langages: [...new Set([...prev.Langages, ...incoming])],
      }));
      setNewLangs(toMark);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading && (
        <p className="text-xs text-tertiary mb-6">{fetching}</p>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(competences).map(([category, skills]) => (
          <div key={category}>
            <p className="text-xs font-medium text-tertiary uppercase tracking-wider mb-3">
              {category}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center gap-1">
                  <Badge variant="technology" data-tech={skill}>{skill}</Badge>
                  {newLangs.has(skill) && (
                    <span className="text-[10px] font-medium text-accent border border-accent rounded px-1 py-px leading-none">
                      NEW
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
