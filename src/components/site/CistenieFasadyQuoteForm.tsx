"use client";

import { useState } from "react";
import { submitContact } from "@/lib/submit-contact";
import TurnstileWidget from "./TurnstileWidget";

type FormData = {
  typCistenia: string;
  typFasady: string;
  plocha: string;
  lokalita: string;
  fotografie: File[];
  meno: string;
  email: string;
  telefon: string;
};

const STEPS = [
  "Typ čistenia",
  "Typ fasády",
  "Plocha",
  "Lokalita",
  "Fotografie",
  "Kontakt",
  "Súhrn",
];

const empty: FormData = {
  typCistenia: "",
  typFasady: "",
  plocha: "",
  lokalita: "",
  fotografie: [],
  meno: "",
  email: "",
  telefon: "",
};

export default function CistenieFasadyQuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(empty);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const total = STEPS.length;
  const isLast = step === total - 1;

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, total - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setSending(true);
    setError(null);
    const lines = [
      `Typ čistenia: ${data.typCistenia}`,
      `Typ fasády: ${data.typFasady}`,
      `Plocha fasády: ${data.plocha} m²`,
      `Lokalita: ${data.lokalita}`,
      `Meno: ${data.meno}`,
      `Email: ${data.email}`,
      `Telefón: ${data.telefon}`,
    ];
    const result = await submitContact({
      name: data.meno,
      email: data.email,
      phone: data.telefon,
      subject: "Cenová ponuka – čistenie fasády",
      message: lines.join("\n"),
      turnstileToken,
    });
    setSending(false);
    if (result.success) { setSent(true); }
    else { setError(result.error ?? "Odoslanie zlyhalo."); }
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
          Cenovú ponuku vám pošleme do 1–2 pracovných dní.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-[2rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.07)] md:p-10">
      {/* Step indicator */}
      <div className="absolute right-8 top-8 flex items-center gap-1.5 md:right-10 md:top-10">
        <span className="text-lg font-extrabold text-primary">{step + 1}</span>
        <span className="text-sm text-foreground/30">/</span>
        <span className="text-sm font-medium text-foreground/40">{total}</span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      {/* Step label */}
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
        Krok {step + 1} — {STEPS[step]}
      </p>

      {/* ── Step 0: Typ čistenia ──────────────────────────────── */}
      {step === 0 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-foreground">
            O akú službu máte záujem?
          </h3>
          <div className="grid gap-3">
            {[
              { label: "Čistenie fasády", price: "5,5 – 9,5 EUR/m²" },
              { label: "Impregnácia fasády", price: "0,5 – 1,5 EUR/m²" },
              { label: "Čistenie + impregnácia", price: "Kombinovaná cena" },
            ].map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => { set("typCistenia", t.label); next(); }}
                className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                  data.typCistenia === t.label
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/40 hover:bg-primary/3"
                }`}
              >
                <p className="text-sm font-bold">{t.label}</p>
                <p className="mt-0.5 text-[11px] text-foreground/50">{t.price}</p>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-foreground/40">
            (Ak si nie ste istý, nevadí – doladíme neskôr.)
          </p>
        </div>
      )}

      {/* ── Step 1: Typ fasády ────────────────────────────────── */}
      {step === 1 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-foreground">
            Typ fasády
          </h3>
          <p className="mb-4 text-sm text-foreground/60">
            Z akého materiálu je vaša fasáda?
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Omietka", "Obklad", "Tehla / Kameň", "Iný materiál"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("typFasady", t)}
                className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all ${
                  data.typFasady === t
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Plocha ────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-foreground">
            Plocha fasády
          </h3>
          <p className="mb-4 text-sm text-foreground/60">
            Koľko m² fasády chcete očistiť?
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="napr. 200"
              value={data.plocha}
              onChange={(e) => set("plocha", e.target.value)}
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <span className="shrink-0 text-sm font-medium text-foreground/50">m²</span>
          </div>
          <p className="mt-3 text-xs text-foreground/40">
            Orientačná hodnota stačí — presné nacenenie doladíme pri obhliadke.
          </p>
        </div>
      )}

      {/* ── Step 3: Lokalita ──────────────────────────────────── */}
      {step === 3 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-foreground">
            Lokalita
          </h3>
          <p className="mb-4 text-sm text-foreground/60">
            V ktorom meste sa budú vykonávať čistiace práce?
          </p>
          <input
            type="text"
            placeholder="napr. Bratislava, Nitra, Košice…"
            value={data.lokalita}
            onChange={(e) => set("lokalita", e.target.value)}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
      )}

      {/* ── Step 4: Fotografie ────────────────────────────────── */}
      {step === 4 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-foreground">
            Fotografie fasády
          </h3>
          <p className="mb-4 text-sm text-foreground/60">
            Pripojte niekoľko fotografií fasády, aby sme mohli prispôsobiť cenovú ponuku aktuálnemu stavu.
          </p>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border px-6 py-10 transition-colors hover:border-primary/40">
            <svg className="h-8 w-8 text-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-foreground/50">
              {data.fotografie.length > 0
                ? `${data.fotografie.length} súbor(ov) vybratých`
                : "Kliknite pre výber fotografií"}
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => set("fotografie", Array.from(e.target.files ?? []))}
            />
          </label>
          <p className="mt-3 text-xs text-foreground/40">
            Fotografie môžete priložiť aj neskôr priamo e-mailom — tento krok môžete preskočiť.
          </p>
        </div>
      )}

      {/* ── Step 5: Kontakt ───────────────────────────────────── */}
      {step === 5 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-foreground">
            Vaše kontaktné údaje
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/70">Meno a priezvisko</label>
              <input
                type="text"
                placeholder="Ján Novák"
                value={data.meno}
                onChange={(e) => set("meno", e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/70">E-mail</label>
              <input
                type="email"
                placeholder="jan.novak@example.com"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/70">Telefón</label>
              <input
                type="tel"
                placeholder="+421 9xx xxx xxx"
                value={data.telefon}
                onChange={(e) => set("telefon", e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Step 6: Súhrn ────────────────────────────────────── */}
      {step === 6 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-foreground">
            Súhrn vašej požiadavky
          </h3>
          <div className="divide-y divide-border rounded-2xl border border-border">
            {[
              { label: "Typ čistenia", value: data.typCistenia || "—" },
              { label: "Typ fasády", value: data.typFasady || "—" },
              { label: "Plocha fasády", value: data.plocha ? `${data.plocha} m²` : "—" },
              { label: "Lokalita", value: data.lokalita || "—" },
              { label: "Fotografie", value: data.fotografie.length > 0 ? `${data.fotografie.length} súbor(ov)` : "Bez fotografií" },
              { label: "Meno", value: data.meno || "—" },
              { label: "E-mail", value: data.email || "—" },
              { label: "Telefón", value: data.telefon || "—" },
            ].map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-3.5">
                <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">{row.label}</span>
                <span className="text-right text-sm text-foreground/80">{row.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-foreground/45">
            Skontrolujte údaje a kliknite na „Odoslať". Cenovú ponuku vám pošleme do 1–2 pracovných dní.
          </p>
        </div>
      )}

      {isLast && <TurnstileWidget onToken={setTurnstileToken} className="mt-6" />}
      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-2 text-sm font-medium text-foreground/50 transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Späť
          </button>
        ) : (
          <div />
        )}

        {!isLast ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            Ďalej
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={sending || !turnstileToken}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {sending ? "Odosiela sa…" : "Odoslať"}
            {!sending && (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
