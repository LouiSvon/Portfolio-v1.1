"use client";

import { useState, useRef } from "react";
import type { Locale } from "@/types";
import { getTranslations } from "@/lib/i18n";
import { RatingPills } from "@/components/ui/rating-pills";

type FormState = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const [state, setState] = useState<FormState>("idle");
  const [messageError, setMessageError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const message = (data.get("message") as string) ?? "";
    if (message.trim().length < 50) {
      setMessageError(t.contact.formMessageHint);
      return;
    }
    setMessageError("");
    setState("submitting");

    try {
      const endpoint = FORMSPREE_ID
        ? `https://formspree.io/f/${FORMSPREE_ID}`
        : "/api/contact";

      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setState("success");
        form.reset();
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
        <p className="text-base font-medium text-primary mb-1">{t.contact.successTitle}</p>
        <p className="text-sm text-secondary">{t.contact.successMessage}</p>
        <button
          onClick={() => setState("idle")}
          className="mt-4 text-sm text-accent hover:underline underline-offset-4"
        >
          ← {locale === "fr" ? "Nouveau message" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-medium text-secondary uppercase tracking-wider">
            {t.contact.formName} <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="given-name"
            className="rounded border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-tertiary focus:border-accent focus:outline-none transition-colors duration-150"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-secondary uppercase tracking-wider">
            {t.contact.formEmail} <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-tertiary focus:border-accent focus:outline-none transition-colors duration-150"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-xs font-medium text-secondary uppercase tracking-wider">
          {t.contact.formSubject} <span className="text-accent">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="rounded border border-border bg-background px-3 py-2 text-sm text-primary focus:border-accent focus:outline-none transition-colors duration-150"
        >
          <option value="" disabled>{t.contact.subjectOptions.placeholder}</option>
          <option value="collaboration">{t.contact.subjectOptions.collaboration}</option>
          <option value="resource">{t.contact.subjectOptions.resource}</option>
          <option value="article">{t.contact.subjectOptions.article}</option>
          <option value="partnership">{t.contact.subjectOptions.partnership}</option>
          <option value="other">{t.contact.subjectOptions.other}</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-secondary uppercase tracking-wider">
          {t.contact.formMessage} <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={50}
          rows={6}
          onChange={() => messageError && setMessageError("")}
          className="rounded border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-tertiary focus:border-accent focus:outline-none transition-colors duration-150 resize-none"
        />
        {messageError ? (
          <p className="text-xs text-accent-warm">{messageError}</p>
        ) : (
          <p className="text-xs text-tertiary">{t.contact.formMessageHint}</p>
        )}
      </div>

      {/* Rating pills */}
      <RatingPills
        name="note_site"
        label={t.contact.ratingLabel}
        labelMin={locale === "fr" ? "Décevant" : "Disappointing"}
        labelMax={locale === "fr" ? "Excellent" : "Excellent"}
      />

      {state === "error" && (
        <p className="text-sm text-accent-warm">{t.contact.errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? t.contact.submitting : t.contact.submit}
      </button>
    </form>
  );
}
