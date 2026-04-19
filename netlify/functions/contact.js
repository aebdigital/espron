exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  const { name, email, phone, subject, message, turnstileToken } = body;

  if (!email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email a správa sú povinné." }),
    };
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    console.error("Missing env var: TURNSTILE_SECRET_KEY");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  if (!turnstileToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Bezpečnostné overenie zlyhalo." }),
    };
  }

  const remoteIp = event.headers["client-ip"] || event.headers["x-forwarded-for"]?.split(",")[0]?.trim();
  const verificationBody = new URLSearchParams({
    secret: turnstileSecret,
    response: turnstileToken,
  });
  if (remoteIp) verificationBody.set("remoteip", remoteIp);

  try {
    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verificationBody,
    });
    const verification = await turnstileRes.json();

    if (!verification.success) {
      console.warn("Turnstile verification failed:", JSON.stringify(verification["error-codes"] ?? []));
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Bezpečnostné overenie zlyhalo." }),
      };
    }
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Bezpečnostné overenie momentálne nefunguje." }),
    };
  }

  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!apiKey || !sender || !recipient) {
    console.error("Missing env vars: SMTP2GO_API_KEY, SMTP2GO_SENDER or CONTACT_FORM_RECIPIENT");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  const lines = [
    name ? `Meno: ${name}` : null,
    `Email: ${email}`,
    phone ? `Telefón: ${phone}` : null,
    "",
    "Správa:",
    message,
  ].filter((l) => l !== null);

  const textBody = lines.join("\n");
  const htmlBody = lines.map((l) => (l === "" ? "<br>" : `<p>${l}</p>`)).join("");

  try {
    const res = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        to: [recipient],
        sender: sender,
        subject: subject || "Správa z kontaktného formulára – ESPRON",
        text_body: textBody,
        html_body: htmlBody,
      }),
    });

    const result = await res.json();

    if (result.data?.succeeded === 1) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    }

    console.error("SMTP2GO error:", JSON.stringify(result));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email sa nepodarilo odoslať." }),
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Interná chyba servera." }),
    };
  }
};
