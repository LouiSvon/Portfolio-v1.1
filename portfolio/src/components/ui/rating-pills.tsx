"use client";

import { useState } from "react";

export function RatingPills({
  name,
  label,
  labelMin,
  labelMax,
}: {
  name: string;
  label: string;
  labelMin: string;
  labelMax: string;
}) {
  const [value, setValue] = useState(3);

  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-medium text-secondary uppercase tracking-wider">
        {label}
      </legend>
      <div className="flex items-center gap-3">
        <span className="text-xs text-tertiary shrink-0">{labelMin}</span>
        <div className="flex gap-2" role="group">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValue(n)}
              aria-pressed={value === n}
              className={`w-10 h-10 rounded-full border text-sm font-medium transition-all duration-150 ${
                value === n
                  ? "bg-accent border-accent text-background scale-[1.08]"
                  : "border-border bg-transparent text-secondary hover:border-accent hover:text-accent hover:scale-[1.08]"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="text-xs text-tertiary shrink-0">{labelMax}</span>
      </div>
      <input type="hidden" name={name} value={value} />
    </fieldset>
  );
}
