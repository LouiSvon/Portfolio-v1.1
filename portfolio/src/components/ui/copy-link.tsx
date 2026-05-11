"use client";

import { useState } from "react";

export function CopyLink({
  label,
  copiedLabel,
}: {
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-secondary hover:text-accent transition-colors duration-150"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
