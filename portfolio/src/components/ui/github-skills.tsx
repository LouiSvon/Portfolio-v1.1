const COMPETENCES = [
  {
    category: "Langages",
    items: ["JavaScript", "Python", "Swift"],
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M7 5l-4 5 4 5M13 5l4 5-4 5M11.5 3l-3 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "React"],
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="2" y="3" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js"],
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="2" y="3.5" width="16" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="12" width="16" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15" cy="5.75" r="1" fill="currentColor"/>
        <circle cx="15" cy="14.25" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    category: "Bases de données",
    items: ["MySQL", "PostgreSQL"],
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <ellipse cx="10" cy="5" rx="7" ry="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 5v5c0 1.1 3.1 2 7 2s7-.9 7-2V5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 10v5c0 1.1 3.1 2 7 2s7-.9 7-2v-5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    category: "DevOps & Outils",
    items: ["Docker", "Git"],
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M15 5.5a3.5 3.5 0 00-3.5 4.2L4 17a1.5 1.5 0 002 2l7.5-7.5A3.5 3.5 0 1015 5.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 8l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    category: "IA / LLM",
    items: ["Prompt Engineering", "API IA", "Ollama"],
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="6" y="6" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 6V3.5M12 6V3.5M9 14v2.5M12 14v2.5M6 9H3.5M6 12H3.5M14 9h2.5M14 12h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function GitHubSkills() {
  return (
    <div className="competences-grid">
      {COMPETENCES.map(({ category, items, icon }) => (
        <div key={category} className="skill-card">
          <div className="skill-card-header">
            <span className="skill-icon">{icon}</span>
            <span className="skill-categorie">{category}</span>
          </div>
          <div className="skill-items">
            {items.map((item) => (
              <span key={item} className="tag">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
