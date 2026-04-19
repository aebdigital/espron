"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          size?: "normal" | "compact" | "flexible" | "invisible";
          theme?: "light" | "dark" | "auto";
          language?: string;
          callback: (token: string) => void;
          "error-callback": () => void;
          "expired-callback": () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile is only available in the browser."));
  }
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById("cf-turnstile-script") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Turnstile failed to load.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed to load."));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

type Props = {
  onToken: (token: string | null) => void;
  className?: string;
};

export default function TurnstileWidget({ onToken, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onTokenRef = useRef(onToken);
  const [failed, setFailed] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    let widgetId: string | null = null;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          size: "flexible",
          theme: "light",
          language: "sk",
          callback: (token) => onTokenRef.current(token),
          "error-callback": () => {
            onTokenRef.current(null);
            setFailed(true);
          },
          "expired-callback": () => onTokenRef.current(null),
        });
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // ignore
        }
      }
    };
  }, [siteKey]);

  if (!siteKey) {
    return (
      <p className={`text-xs text-foreground/50 ${className ?? ""}`}>
        (Turnstile nie je nakonfigurovaný)
      </p>
    );
  }

  return (
    <div className={className}>
      <div ref={containerRef} />
      {failed && (
        <p className="mt-2 text-xs text-red-600">
          Bezpečnostné overenie sa nepodarilo načítať.
        </p>
      )}
    </div>
  );
}
