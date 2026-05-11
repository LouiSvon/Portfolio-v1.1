"use client";

import { useState } from "react";

const EMOJIS = ["😕", "😐", "🙂", "😊", "🤩"] as const;

export function EmojiSlider({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const [value, setValue] = useState(3);

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-medium text-secondary uppercase tracking-wider">
        {label}
      </label>

      <div className="flex justify-between px-0.5">
        {EMOJIS.map((emoji, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="transition-all duration-150 select-none"
            style={{
              fontSize: value === i + 1 ? "1.75rem" : "1.25rem",
              opacity: value === i + 1 ? 1 : 0.35,
              lineHeight: 1,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <input
        type="range"
        min={1}
        max={5}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="accent-range w-full cursor-pointer"
        aria-valuetext={EMOJIS[value - 1]}
      />

      <input type="hidden" name={name} value={value} />
    </div>
  );
}
