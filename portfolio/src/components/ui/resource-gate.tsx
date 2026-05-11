"use client";

import { useState } from "react";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";

type GateState = "idle" | "submitting" | "success" | "error";

export function ResourceGate({
  locale,
  resourceTitle,
  filename,
}: {
  locale: Locale;
  resourceTitle: string;
  filename: string;
}) {
  const t = getTranslations(locale);
  const [state, setState] = useState<GateState>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resource: resourceTitle }),
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded border border-border p-6">
        <p className="text-sm font-medium text-primary mb-1">
          {t.resources.successTitle}
        </p>
        <p className="text-sm text-secondary mb-4">{t.resources.successMessage}</p>
        <a
          href={`/resources/${filename}`}
          download
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          {t.resources.downloadLink} &darr;
        </a>
      </div>
    );
  }

  return (
    <div className="rounded border border-border p-6">
      <p className="text-sm font-medium text-primary mb-1">{t.resources.gateTitle}</p>
      <p className="text-sm text-secondary mb-4">{t.resources.gateDescription}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.resources.emailPlaceholder}
          className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-tertiary focus:border-accent focus:outline-none transition-colors duration-150"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="shrink-0 rounded border border-border px-4 py-2 text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors duration-150 disabled:opacity-50"
        >
          {state === "submitting" ? t.resources.submitting : t.resources.submit}
        </button>
      </form>
      {state === "error" && (
        <p className="mt-2 text-xs text-accent-warm">
          {locale === "fr" ? "Une erreur est survenue. Réessayez." : "Something went wrong. Please try again."}
        </p>
      )}
      <p className="mt-3 text-xs text-tertiary">{t.resources.noSpam}</p>
    </div>
  );
}
