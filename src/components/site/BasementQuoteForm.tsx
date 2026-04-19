"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact } from "@/lib/submit-contact";
import TurnstileWidget from "./TurnstileWidget";

type FormData = {
  plocha: string;
  teren: string;
  pristup: string;
  lokalita: string;
  meno: string;
  email: string;
  telefon: string;
  sprava: string;
};

const STEPS = [
  "Veľkosť",
  "Terén",
  "Prístup",
  "Lokalita",
  "Kontakt – Meno",
  "Kontakt – Spojenie",
  "Správa",
  "Súhrn",
];

const empty: FormData = {
  plocha: "",
  teren: "",
  pristup: "",
  lokalita: "",
  meno: "",
  email: "",
  telefon: "",
  sprava: "",
};

export default function BasementQuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(empty);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

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
      `Veľkosť základovej dosky: ${data.plocha} m²`,
      `Terén pozemku: ${data.teren}`,
      `Prístup na pozemok: ${data.pristup}`,
      `Lokalita: ${data.lokalita}`,
      `Meno: ${data.meno}`,
      `Email: ${data.email}`,
      `Telefón: ${data.telefon}`,
      `Správa / Upresnenie: ${data.sprava}`,
    ];
    const result = await submitContact({
      name: data.meno,
      email: data.email,
      phone: data.telefon,
      subject: "Dopyt: Základová doska (SK)",
      message: lines.join("\n"),
      turnstileToken,
    });
    setSending(false);
    if (result.success) {
      setSent(true);
    } else {
      setError(result.error ?? "Odoslanie zlyhalo.");
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

      {/* Steps with Animation */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* ── Step 0: Veľkosť ──────────────────────────────────── */}
            {step === 0 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Aká je odhadovaná veľkosť základovej dosky?
                </h3>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="napr. 120"
                    autoFocus
                    value={data.plocha}
                    onChange={(e) => set("plocha", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && data.plocha && next()}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                  <span className="shrink-0 text-sm font-medium text-foreground/50">m²</span>
                </div>
                <p className="mt-3 text-xs text-foreground/40">
                  Orientačná hodnota stačí — presné nacenenie doladíme podľa projektu.
                </p>
              </div>
            )}

            {/* ── Step 1: Terén ────────────────────────────────────── */}
            {step === 1 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  V akom teréne sa pozemok nachádza?
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Rovinatý", "Kopcovitý"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        set("teren", t);
                        next();
                      }}
                      className={`rounded-2xl border px-5 py-5 text-left transition-all ${
                        data.teren === t
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/40 hover:bg-primary/3"
                      }`}
                    >
                      <p className="text-sm font-bold uppercase tracking-wide">{t}</p>
                      <p className="mt-1 text-[11px] text-foreground/50">
                        {t === "Rovinatý" ? "Pozemok bez výrazného prevýšenia" : "Pozemok vo svahu alebo kopci"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 2: Prístup ───────────────────────────────────── */}
            {step === 2 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Aký je prístup na pozemok?
                </h3>
                <p className="mb-4 text-sm text-foreground/60">
                  Uveďte, či je možné dostať sa na pozemok so stavebnou technikou (nákladné auto, domiešavač) alebo či existujú nejaké obmedzenia.
                </p>
                <input
                  type="text"
                  placeholder="napr. Bezproblémový, úzka príjazdová cesta…"
                  autoFocus
                  value={data.pristup}
                  onChange={(e) => set("pristup", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && data.pristup && next()}
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            )}

            {/* ── Step 3: Lokalita ──────────────────────────────────── */}
            {step === 3 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Lokalita realizácie
                </h3>
                <p className="mb-4 text-sm text-foreground/60">
                  Uveďte mesto a oblasť, kde sa bude projekt realizovať.
                </p>
                <input
                  type="text"
                  placeholder="napr. Spišská Nová Ves, Poprad, Prešov…"
                  autoFocus
                  value={data.lokalita}
                  onChange={(e) => set("lokalita", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && data.lokalita && next()}
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            )}

            {/* ── Step 4: Kontakt - Meno ───────────────────────────── */}
            {step === 4 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Ako sa voláte?
                </h3>
                <input
                  type="text"
                  placeholder="Vaše meno a priezvisko"
                  autoFocus
                  value={data.meno}
                  onChange={(e) => set("meno", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && data.meno && next()}
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            )}

            {/* ── Step 5: Kontakt - Spojenie ─────────────────────────── */}
            {step === 5 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Vaše kontaktné údaje
                </h3>
                <div className="space-y-4">
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

            {/* ── Step 6: Správa ───────────────────────────────────── */}
            {step === 6 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Máte nejaké upresnenia?
                </h3>
                <textarea
                  placeholder="Tu môžete uviesť ďalšie informácie o projekte…"
                  value={data.sprava}
                  onChange={(e) => set("sprava", e.target.value)}
                  className="h-32 w-full resize-none rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <p className="mt-3 text-xs text-foreground/40">
                  Nepovinné pole. Ak nič nechcete dopísať, prejdite na ďalší krok.
                </p>
              </div>
            )}

            {/* ── Step 7: Súhrn ───────────────────────────────────── */}
            {step === 7 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Súhrn vášho dopytu
                </h3>
                <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
                  {[
                    { label: "Plocha", value: data.plocha ? `${data.plocha} m²` : "—" },
                    { label: "Terén", value: data.teren || "—" },
                    { label: "Prístup", value: data.pristup || "—" },
                    { label: "Lokalita", value: data.lokalita || "—" },
                    { label: "Meno", value: data.meno || "—" },
                    { label: "E-mail", value: data.email || "—" },
                    { label: "Telefón", value: data.telefon || "—" },
                    { label: "Správa", value: data.sprava || "Bez upresnenia" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-3.5 bg-foreground/[0.01]">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">{row.label}</span>
                      <span className="text-right text-sm text-foreground/80">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-start gap-4 rounded-xl bg-primary/5 p-4">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs leading-5 text-foreground/60">
                    Už len krok k odoslaniu. Po obdržaní informácií vám pošleme cenovú ponuku <strong>do 1-2 pracovných dní</strong>.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {isLast && (
        <div className="mt-6">
          <div className="flex items-start gap-3 py-2">
            <input
              id="gdpr"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="gdpr" className="text-xs text-foreground/70 select-none cursor-pointer">
              Súhlasím so spracovaním osobných údajov
            </label>
          </div>
          <TurnstileWidget onToken={setTurnstileToken} className="mt-4" />
        </div>
      )}

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
            disabled={
              (step === 0 && !data.plocha) ||
              (step === 1 && !data.teren) ||
              (step === 2 && !data.pristup) ||
              (step === 3 && !data.lokalita) ||
              (step === 4 && !data.meno) ||
              (step === 5 && (!data.email || !data.telefon))
            }
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-40"
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
            disabled={sending || !turnstileToken || !agreed}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {sending ? "Odosiela sa…" : "Odoslať dopyt"}
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
