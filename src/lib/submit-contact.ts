export async function submitContact(data: {
  name?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  turnstileToken?: string | null;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!data.turnstileToken) {
      return {
        success: false,
        error: "Potvrďte, prosím, bezpečnostné overenie.",
      };
    }

    const res = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        turnstileToken: data.turnstileToken,
      }),
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
