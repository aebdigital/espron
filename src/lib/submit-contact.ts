export async function submitContact(data: {
  name?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const turnstileToken = await getTurnstileToken();
    if (!turnstileToken) {
      return {
        success: false,
        error: "Bezpečnostné overenie zlyhalo. Skúste to, prosím, znova.",
      };
    }

    const res = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, turnstileToken }),
    });

    if (res.ok) return { success: true };

    const json = await res.json().catch(() => ({}));
    return {
      success: false,
      error: (json as { error?: string }).error ?? "Odoslanie zlyhalo.",
    };
  } catch {
    return {
      success: false,
      error: "Odoslanie zlyhalo. Skúste nás kontaktovať priamo na info@espron.sk.",
    };
  }
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          size: "invisible";
          callback: (token: string) => void;
          "error-callback": () => void;
          "expired-callback": () => void;
        },
      ) => string;
      execute: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile is only available in the browser."));
  }

  if (window.turnstile) {
    return Promise.resolve();
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("cf-turnstile-script") as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Turnstile failed to load.")), { once: true });
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

  return turnstileScriptPromise;
}

async function getTurnstileToken(): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;

  try {
    await loadTurnstileScript();
  } catch {
    return null;
  }

  const turnstile = window.turnstile;
  if (!turnstile) return null;

  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.bottom = "0";
    document.body.appendChild(container);

    let widgetId: string | null = null;
    const cleanup = () => {
      if (widgetId) {
        turnstile.remove(widgetId);
      }
      container.remove();
    };

    widgetId = turnstile.render(container, {
      sitekey: siteKey,
      size: "invisible",
      callback: (token) => {
        cleanup();
        resolve(token);
      },
      "error-callback": () => {
        cleanup();
        resolve(null);
      },
      "expired-callback": () => {
        cleanup();
        resolve(null);
      },
    });

    turnstile.execute(widgetId);
  });
}
