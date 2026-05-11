"use client";

import { useState } from "react";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[1.4rem] h-[1.4rem] block"
    aria-hidden
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);

export function StarRating({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);

  const active = hovered || selected;

  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-medium text-secondary uppercase tracking-wider">
        {label}
      </legend>
      <div className="flex items-center gap-1" role="group">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            aria-pressed={selected === n}
            onClick={() => setSelected(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className={`p-0.5 border-none bg-transparent cursor-pointer transition-all duration-150 ${
              active >= n ? "text-accent" : "text-border"
            } hover:scale-[1.15]`}
          >
            <StarIcon filled={active >= n} />
          </button>
        ))}
      </div>
      <input type="hidden" name={name} value={selected} />
    </fieldset>
  );
}
