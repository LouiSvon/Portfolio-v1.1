// Compétences, classées par domaine.
// logo : chemin d'un SVG monochrome dans public/logos (Simple Icons CC0, Lobe Icons MIT) ; absent = initiale.
// color : couleur officielle de la marque (Simple Icons 13.21.0), appliquée au logo. Absente = logo blanc :
// marque noire ou trop sombre (contraste sous 3:1 sur la tuile : OpenAI, Next.js, Ollama, NumPy, pandas,
// LangChain...) ou sans couleur unique publiée (LlamaIndex, vLLM, MCP, Cursor, Codex, Antigravity).
export type SkillItem = { name: string; logo?: string; color?: string };
export type SkillGroup = { title: { fr: string; en: string }; items: SkillItem[] };

const ai = (id: string) => `/logos/ai/${id}.svg`;
const tech = (id: string) => `/logos/tech/${id}.svg`;

export const skillGroups: SkillGroup[] = [
  {
    title: { fr: "IA et LLM", en: "AI and LLMs" },
    items: [
      { name: "Hugging Face", logo: ai("huggingface"), color: "#FFD21E" },
      { name: "Ollama", logo: ai("ollama") },
      { name: "N8N" },
    ],
  },
  {
    title: { fr: "Machine learning et données", en: "Machine learning and data" },
    items: [
      { name: "Python", logo: tech("python"), color: "#3776AB" },
      { name: "PyTorch", logo: tech("pytorch"), color: "#EE4C2C" },
      { name: "scikit-learn", logo: tech("scikitlearn"), color: "#F7931E" },
      { name: "NumPy", logo: tech("numpy") },
      { name: "Pandas", logo: tech("pandas") },
      { name: "Jupyter", logo: tech("jupyter"), color: "#F37626" },
    ],
  },
  {
    title: { fr: "Web et back-end", en: "Web and back-end" },
    items: [
      { name: "TypeScript", logo: tech("typescript"), color: "#3178C6" },
      { name: "Next.js", logo: tech("nextdotjs") },
      { name: "React", logo: tech("react"), color: "#61DAFB" },
      { name: "PostgreSQL", logo: tech("postgresql"), color: "#4169E1" },
    ],
  },
  {
    title: { fr: "Infra et outils", en: "Infra and tools" },
    items: [
      { name: "Docker", logo: tech("docker"), color: "#2496ED" },
      { name: "Git", logo: tech("git"), color: "#F05032" },
      { name: "Claude Code", logo: ai("claudecode"), color: "#D97757" },
      { name: "Cursor", logo: ai("cursor") },
      { name: "Codex", logo: ai("codex") },
      { name: "Antigravity", logo: ai("antigravity") },
    ],
  },
];
