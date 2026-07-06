import { NextResponse } from "next/server";

export const runtime = "nodejs";

/*
 * Contact form → Microsoft Graph sendMail
 *
 * Required environment variables (Vercel → Project → Settings → Environment Variables,
 * and .env.local for local dev):
 *   GRAPH_TENANT_ID     — Entra tenant ID (GUID)
 *   GRAPH_CLIENT_ID     — App registration (client) ID
 *   GRAPH_CLIENT_SECRET — Client secret value
 *   GRAPH_SENDER        — UPN of the mailbox that sends (e.g. noreply@telepathit.com)
 *   CONTACT_RECIPIENT   — Where submissions are delivered (e.g. chris@telepathit.com)
 */

const TOKEN_URL = (tenant: string) =>
  `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;

async function getGraphToken(): Promise<string> {
  const tenant = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;
  if (!tenant || !clientId || !clientSecret) {
    throw new Error("Graph credentials are not configured");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const res = await fetch(TOKEN_URL(tenant), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Token request failed: ${res.status}`);
  }
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Token response missing access_token");
  }
  return data.access_token;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim().slice(0, 200);
  const email = String(payload.email ?? "").trim().slice(0, 200);
  const phone = String(payload.phone ?? "").trim().slice(0, 50);
  const company = String(payload.company ?? "").trim().slice(0, 200);
  const message = String(payload.message ?? "").trim().slice(0, 5000);
  const honeypot = String(payload.website ?? "").trim();

  // Honeypot: bots fill the hidden "website" field. Pretend success, send nothing.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const sender = process.env.GRAPH_SENDER;
  const recipient = process.env.CONTACT_RECIPIENT;
  if (!sender || !recipient) {
    console.error("Contact form: GRAPH_SENDER / CONTACT_RECIPIENT not configured");
    return NextResponse.json(
      { ok: false, error: "The contact form is temporarily unavailable." },
      { status: 500 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Company", company || "—"],
  ];

  const html = `
    <div style="font-family: Segoe UI, Arial, sans-serif; font-size: 14px; color: #2C2C2A;">
      <h2 style="color: #0F6E56; margin: 0 0 16px;">New inquiry via telepathit.com</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="font-weight: 600; padding-right: 16px; vertical-align: top;">${label}</td><td>${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="color: #0F6E56; margin: 20px 0 8px;">Message</h3>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>`;

  const mail = {
    message: {
      subject: `Telepath inquiry from ${name}${company ? ` (${company})` : ""}`,
      body: { contentType: "HTML", content: html },
      toRecipients: [{ emailAddress: { address: recipient } }],
      replyTo: [{ emailAddress: { address: email, name } }],
    },
    saveToSentItems: true,
  };

  try {
    const token = await getGraphToken();
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
        cache: "no-store",
      },
    );

    if (res.status !== 202) {
      const detail = await res.text();
      console.error(`Graph sendMail failed: ${res.status} ${detail}`);
      return NextResponse.json(
        { ok: false, error: "Your message could not be sent. Please email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: "Your message could not be sent. Please email us directly." },
      { status: 500 },
    );
  }
}
