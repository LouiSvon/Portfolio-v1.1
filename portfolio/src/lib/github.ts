import { projectsConfig } from "@/data/projects.config";
import type { GitHubRepo, Project } from "@/types";

const GITHUB_USERNAME = "LouiSvon";
const GITHUB_API = "https://api.github.com";

export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return getFallbackProjects();
    }

    const repos: GitHubRepo[] = await res.json();
    return transformRepos(repos);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return getFallbackProjects();
  }
}

function transformRepos(repos: GitHubRepo[]): Project[] {
  const { featured, hidden, overrides } = projectsConfig;

  return repos
    .filter((repo) => !repo.name.startsWith("."))
    .filter((repo) => !hidden.includes(repo.name))
    .map((repo) => {
      const override = overrides[repo.name];
      const isFeatured = featured.includes(repo.name);

      return {
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        customDescription: override?.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics,
        updatedAt: repo.updated_at,
        demo: override?.demo ?? repo.homepage ?? null,
        image: override?.image,
        featured: isFeatured,
        order: override?.order ?? (isFeatured ? 0 : 999),
      };
    })
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
}

function getFallbackProjects(): Project[] {
  const { featured, overrides } = projectsConfig;

  return featured.map((name, index) => {
    const override = overrides[name];
    return {
      name,
      url: `https://github.com/${GITHUB_USERNAME}/${name}`,
      description: null,
      customDescription: override?.description,
      language: null,
      stars: 0,
      forks: 0,
      topics: [],
      updatedAt: new Date().toISOString(),
      demo: override?.demo ?? null,
      image: override?.image,
      featured: true,
      order: override?.order ?? index,
    };
  });
}
