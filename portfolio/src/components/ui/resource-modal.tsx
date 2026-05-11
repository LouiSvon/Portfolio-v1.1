"use client";

import { useState, useEffect } from "react";
import type { Locale, Resource } from "@/types";
import { getTranslations } from "@/lib/i18n";

type ModalState = "idle" | "submitting" | "success" | "error";

export function ResourceModal({
  resource,
  locale,
  onClose,
}: {
  resource: Resource;
  locale: Locale;
  onClose: () => void;
}) {
  const t = getTranslations(locale);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ModalState>("idle");

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent scroll on body while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resource: resource.title[locale] }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={resource.title[locale]}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm rounded border border-border bg-background p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xs text-tertiary hover:text-accent transition-colors duration-150"
          aria-label={t.resources.modalClose}
        >
          ✕
        </button>

        {state === "success" ? (
          <div>
            <p className="text-sm font-medium text-primary mb-1">{t.resources.successTitle}</p>
            <p className="text-sm text-secondary mb-4">{t.resources.successMessage}</p>
            {resource.filename && (
              <a
                href={`/resources/${resource.filename}`}
                download
                className="text-sm font-medium text-accent hover:underline underline-offset-4"
              >
                {t.resources.downloadLink} &darr;
              </a>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-primary mb-1 pr-6">
              {t.resources.gateTitle}
            </p>
            <p className="text-xs text-secondary mb-4">
              {resource.title[locale]}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.resources.emailPlaceholder}
                className="rounded border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-tertiary focus:border-accent focus:outline-none transition-colors duration-150"
              />
              <button
                type="submit"
                disabled={state === "submitting"}
                className="rounded border border-accent px-4 py-2 text-sm font-medium text-accent hover:bg-accent-soft transition-colors duration-150 disabled:opacity-50"
              >
                {state === "submitting" ? t.resources.submitting : t.resources.submit}
              </button>
              {state === "error" && (
                <p className="text-xs text-accent-warm">
                  {locale === "fr" ? "Erreur. Réessayez." : "Error. Please try again."}
                </p>
              )}
            </form>
            <p className="mt-3 text-xs text-tertiary">{t.resources.noSpam}</p>
          </>
        )}
      </div>
    </div>
  );
}
