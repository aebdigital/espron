"use client";

import { useState, type CSSProperties } from "react";
import { submitContact } from "@/lib/submit-contact";
import TurnstileWidget from "./TurnstileWidget";

export type BuilderContactField = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
  width?: "full" | "half";
};

type Props = {
  fields: BuilderContactField[];
  subject?: string;
  buttonText?: string;
  successTitle?: string;
  successMessage?: string;
  style?: CSSProperties;
};

type Row = BuilderContactField[];

function groupRows(fields: BuilderContactField[]): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];
    const next = fields[i + 1];
    if (f.width === "half" && next && next.width === "half") {
      rows.push([f, next]);
      i++;
    } else {
      rows.push([f]);
    }
  }
  return rows;
}

function findByName(fields: BuilderContactField[], names: string[]) {
  for (const n of names) {
    const f = fields.find((x) => x.name.toLowerCase() === n);
    if (f) return f;
  }
  return undefined;
}

export default function BuilderContactForm({
  fields,
  subject,
  buttonText,
  successTitle,
  successMessage,
  style,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const rows = groupRows(fields);

  function setValue(name: string, v: string) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const emailField = findByName(fields, ["email", "e-mail", "mail"]);
    const nameField = findByName(fields, ["name", "meno", "jmeno", "fullname"]);
    const phoneField = findByName(fields, ["phone", "telefon", "tel", "mobil"]);
    const messageField = findByName(fields, ["message", "sprava", "zprava", "text"]);

    const email = emailField ? (values[emailField.name] ?? "").trim() : "";
    if (!email) {
      setError("Zadajte prosím e-mail.");
      return;
    }

    const messageParts: string[] = [];
    if (messageField) {
      const m = (values[messageField.name] ?? "").trim();
      if (m) messageParts.push(m);
    }
    const extras: string[] = [];
    for (const f of fields) {
      if ([emailField?.name, nameField?.name, phoneField?.name, messageField?.name].includes(f.name)) {
        continue;
      }
      const v = (values[f.name] ?? "").trim();
      if (v) extras.push(`${f.label || f.name}: ${v}`);
    }
    if (extras.length > 0) {
      if (messageParts.length > 0) messageParts.push("");
      messageParts.push(...extras);
    }

    setSending(true);
    setError(null);
    const result = await submitContact({
      name: nameField ? values[nameField.name] : undefined,
      email,
      phone: phoneField ? values[phoneField.name] : undefined,
      subject: subject || "Správa z webu – ESPRON",
      message: messageParts.join("\n") || "(bez textu)",
      turnstileToken,
    });
    setSending(false);
    if (result.success) {
      setSent(true);
    } else {
      setError(result.error ?? "Odoslanie zlyhalo. Skúste nás kontaktovať priamo.");
    }
  }

  if (sent) {
    return (
      <div style={style} className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground">{successTitle || "Ďakujeme!"}</h3>
        <p className="max-w-sm text-sm text-foreground/60">
          {successMessage || "Správa bola odoslaná. Ozveme sa vám čo najskôr."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={style} className="space-y-5">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className={row.length === 2 ? "grid gap-5 sm:grid-cols-2" : ""}
        >
          {row.map((f) => (
            <div key={f.id}>
              <label className="mb-1.5 block text-sm font-medium text-foreground/70">
                {f.label || f.name}
                {f.required ? " *" : ""}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  rows={5}
                  required={!!f.required}
                  placeholder={f.placeholder ?? ""}
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValue(f.name, e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              ) : (
                <input
                  type={f.type}
                  required={!!f.required}
                  placeholder={f.placeholder ?? ""}
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValue(f.name, e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <TurnstileWidget onToken={setTurnstileToken} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={sending || !turnstileToken}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {sending ? "Odosiela sa…" : buttonText || "Odoslať správu"}
        {!sending && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </form>
  );
}
