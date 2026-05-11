"use client";

const ACCENT_COLORS = [
  { name: "Bleu clair", hex: "#4A9EBF" },
  { name: "Vert sauge", hex: "#5C8A6E" },
  { name: "Terracotta", hex: "#C17A5A" },
  { name: "Violet doux", hex: "#7B6BA8" },
  { name: "Ardoise", hex: "#5A7089" },
] as const;

const STORAGE_KEY = "accent-color";

function setAccent(hex: string) {
  document.documentElement.style.setProperty("--accent", hex);
  try {
    localStorage.setItem(STORAGE_KEY, hex);
  } catch {}
}

export function AccentPicker({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs text-tertiary">{label} :</span>
      <div className="flex items-center gap-2">
        {ACCENT_COLORS.map((color) => (
          <button
            key={color.hex}
            onClick={() => setAccent(color.hex)}
            title={color.name}
            aria-label={color.name}
            className="h-5 w-5 rounded-full border-2 border-transparent hover:border-foreground/30 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
            style={{
              backgroundColor: color.hex,
            }}
          />
        ))}
      </div>
    </div>
  );
}
