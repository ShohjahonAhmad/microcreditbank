"use client";

import { useState, type FormEvent } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";

type ContactFormContent = Dictionary["contact"]["form"];

type ContactFormProps = {
  content: ContactFormContent;
};

export function ContactForm({ content }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-full-name"
          label={content.fullNameLabel}
          placeholder={content.placeholders.fullName}
          name="fullName"
          autoComplete="name"
          required
        />
        <Field
          id="contact-email"
          label={content.emailLabel}
          placeholder={content.placeholders.email}
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-phone"
          label={content.phoneLabel}
          placeholder={content.placeholders.phone}
          name="phone"
          type="tel"
          autoComplete="tel"
        />
        <Field
          id="contact-subject"
          label={content.subjectLabel}
          placeholder={content.placeholders.subject}
          name="subject"
        />
      </div>

      <label className="grid gap-2" htmlFor="contact-message">
        <span className="text-sm font-medium text-slate-700">{content.messageLabel}</span>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder={content.placeholders.message}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100"
        />
      </label>

      <p
        role="status"
        aria-live="polite"
        className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600"
      >
        {submitted ? content.success : content.note}
      </p>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        {content.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  placeholder,
  type = "text",
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100"
      />
    </label>
  );
}
