"use client";

import { useState } from "react";
import { submitContact } from "@/lib/submit-contact";
import TurnstileWidget from "./TurnstileWidget";

type FormData = {
  meno: string;
  email: string;
  telefon: string;
  sprava: string;
};

const empty: FormData = { meno: "", email: "", telefon: "", sprava: "" };

export default function KontaktForm() {
  const [data, setData] = useState<FormData>(empty);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  function set<K extends keyof FormData>(key: K, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const result = await submitContact({
      name: data.meno,
      email: data.email,
      phone: data.telefon,
      subject: "Kontaktný formulár – ESPRON",
      message: data.sprava,
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
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground">Ďakujeme!</h3>
        <p className="max-w-sm text-sm text-foreground/60">
          Správa bola odoslaná. Ozveme sa vám čo najskôr.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/70">
            Meno a priezvisko
          </label>
          <input
            type="text"
            placeholder="Ján Novák"
            value={data.meno}
            onChange={(e) => set("meno", e.target.value)}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/70">
            Telefón
          </label>
          <input
            type="tel"
            placeholder="+421 9xx xxx xxx"
            value={data.telefon}
            onChange={(e) => set("telefon", e.target.value)}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground/70">
          E-mail
        </label>
        <input
          type="email"
          required
          placeholder="jan.novak@example.com"
          value={data.email}
          onChange={(e) => set("email", e.target.value)}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground/70">
          Správa
        </label>
        <textarea
          rows={5}
          required
          placeholder="Opíšte váš projekt alebo otázku…"
          value={data.sprava}
          onChange={(e) => set("sprava", e.target.value)}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>
      <TurnstileWidget onToken={setTurnstileToken} />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={sending || !turnstileToken}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {sending ? "Odosiela sa…" : "Odoslať správu"}
        {!sending && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </form>
  );
}
