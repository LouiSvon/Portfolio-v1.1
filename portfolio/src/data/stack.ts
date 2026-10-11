// Bande de l'accueil (stack, puis outils d'IA), orientée IA : des plus connus aux outils d'ingénieur IA confirmé.
// Liste demandée par Louis le 11/10/2026.
export const stack: string[] = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "scikit-learn",
  "NumPy",
  "Pandas",
  "Jupyter",
  "CUDA",
  "FastAPI",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "TypeScript",
  "Git",
];

export const aiTools: string[] = [
  "OpenAI API",
  "Claude API",
  "Hugging Face",
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "Ollama",
  "vLLM",
  "MLflow",
  "Weights & Biases",
  "Pinecone",
  "MCP",
  "Claude Code",
  "Cursor",
  "Codex",
  "Antigravity",
];

// Compétences de la page À propos : mêmes outils que la bande de l'accueil, classés.
// logo : chemin d'un SVG monochrome dans public/logos (Simple Icons CC0, Lobe Icons MIT) ; absent = initiale.
export type SkillItem = { name: string; logo?: string };
export type SkillGroup = { title: { fr: string; en: string }; items: SkillItem[] };

const ai = (id: string) => `/logos/ai/${id}.svg`;
const tech = (id: string) => `/logos/tech/${id}.svg`;

export const skillGroups: SkillGroup[] = [
  {
    title: { fr: "IA et LLM", en: "AI and LLMs" },
    items: [
      { name: "OpenAI API", logo: ai("openai") },
      { name: "Claude API", logo: ai("claude") },
      { name: "Hugging Face", logo: ai("huggingface") },
      { name: "LangChain", logo: ai("langchain") },
      { name: "LangGraph", logo: ai("langgraph") },
      { name: "LlamaIndex", logo: ai("llamaindex") },
      { name: "Ollama", logo: ai("ollama") },
      { name: "vLLM", logo: ai("vllm") },
      { name: "MCP", logo: ai("mcp") },
    ],
  },
  {
    title: { fr: "Machine learning et données", en: "Machine learning and data" },
    items: [
      { name: "Python", logo: tech("python") },
      { name: "PyTorch", logo: tech("pytorch") },
      { name: "TensorFlow", logo: tech("tensorflow") },
      { name: "scikit-learn", logo: tech("scikitlearn") },
      { name: "NumPy", logo: tech("numpy") },
      { name: "Pandas", logo: tech("pandas") },
      { name: "Jupyter", logo: tech("jupyter") },
      { name: "CUDA", logo: tech("nvidia") },
      { name: "MLflow", logo: tech("mlflow") },
      { name: "Weights & Biases", logo: ai("wandb") },
      { name: "Pinecone" },
    ],
  },
  {
    title: { fr: "Web et back-end", en: "Web and back-end" },
    items: [
      { name: "TypeScript", logo: tech("typescript") },
      { name: "Next.js", logo: tech("nextdotjs") },
      { name: "React", logo: tech("react") },
      { name: "FastAPI", logo: tech("fastapi") },
      { name: "PostgreSQL", logo: tech("postgresql") },
    ],
  },
  {
    title: { fr: "Infra et outils", en: "Infra and tools" },
    items: [
      { name: "Docker", logo: tech("docker") },
      { name: "Kubernetes", logo: tech("kubernetes") },
      { name: "Git", logo: tech("git") },
      { name: "Claude Code", logo: ai("claudecode") },
      { name: "Cursor", logo: ai("cursor") },
      { name: "Codex", logo: ai("codex") },
      { name: "Antigravity", logo: ai("antigravity") },
    ],
  },
];
