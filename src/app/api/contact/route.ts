import { NextResponse } from "next/server";

export const runtime = "nodejs";

/*
 * Contact form → Microsoft Graph sendMail
 *
 * Required environment variables:
 *   GRAPH_TENANT_ID     — Entra tenant ID (GUID)
 *   GRAPH_CLIENT_ID     — App registration (client) ID
 *   GRAPH_CLIENT_SECRET — Client secret value
 *   GRAPH_SENDER        — UPN of the mailbox that sends (e.g. info@telepathit.com)
 *   CONTACT_RECIPIENT   — Where submissions are delivered (e.g. info@telepathit.com)
 * Optional:
 *   BOOKING_URL         — Microsoft Bookings page; if set, included in the auto-reply
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

async function sendGraphMail(token: string, sender: string, mail: object): Promise<Response> {
  return fetch(
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
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_METHODS = ["email", "phone", "either"] as const;

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
  const preferredRaw = String(payload.preferred ?? "").trim().toLowerCase();
  const preferred = (CONTACT_METHODS as readonly string[]).includes(preferredRaw) ? preferredRaw : "";

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

  if (preferred === "phone" && !phone) {
    return NextResponse.json(
      { ok: false, error: "Please provide a phone number since it's your preferred contact method." },
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

  const preferredLabel =
    preferred === "email" ? "Email" :
    preferred === "phone" ? "Phone" :
    preferred === "either" ? "Either email or phone" : "—";

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Company", company || "—"],
    ["Preferred contact", preferredLabel],
  ];

  const internalHtml = `
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

  const internalMail = {
    message: {
      subject: `Telepath inquiry from ${name}${company ? ` (${company})` : ""}`,
      body: { contentType: "HTML", content: internalHtml },
      toRecipients: [{ emailAddress: { address: recipient } }],
      replyTo: [{ emailAddress: { address: email, name } }],
    },
    saveToSentItems: true,
  };

  try {
    const token = await getGraphToken();
    const res = await sendGraphMail(token, sender, internalMail);

    if (res.status !== 202) {
      const detail = await res.text();
      console.error(`Graph sendMail failed: ${res.status} ${detail}`);
      return NextResponse.json(
        { ok: false, error: "Your message could not be sent. Please email us directly." },
        { status: 502 },
      );
    }

    // Auto-reply to the submitter. Best-effort: its failure never fails the request.
    try {
      const bookingUrl = process.env.BOOKING_URL;
      const bookingBlock = bookingUrl
        ? `<p style="margin: 20px 0;">
             If you'd like to skip the back-and-forth, you can book a free 30-minute discovery call directly on our calendar:
           </p>
           <p style="margin: 0 0 20px;">
             <a href="${escapeHtml(bookingUrl)}" style="display: inline-block; background: #1D9E75; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600;">Book a Discovery Call</a>
           </p>`
        : "";

      const autoReplyHtml = `
        <div style="font-family: Segoe UI, Arial, sans-serif; font-size: 14px; color: #2C2C2A; max-width: 600px;">
          <h2 style="color: #0F6E56; margin: 0 0 16px;">Thanks for reaching out, ${escapeHtml(name)}.</h2>
          <p style="margin: 0 0 16px;">
            Your message has been received and you'll hear back from Telepath Technology Solutions within one business day.
          </p>
          ${bookingBlock}
          <p style="margin: 0 0 8px; color: #636e72;">For your records, here's what you sent:</p>
          <blockquote style="margin: 0 0 20px; padding: 12px 16px; border-left: 3px solid #9FE1CB; background: #f8faf9; white-space: pre-wrap;">${escapeHtml(message)}</blockquote>
          <p style="margin: 0;">
            Talk soon,<br/>
            <strong>Telepath Technology Solutions</strong><br/>
            <a href="https://telepathit.com" style="color: #1D9E75;">telepathit.com</a>
          </p>
        </div>`;

      const autoReply = {
        message: {
          subject: "We received your message — Telepath Technology Solutions",
          body: { contentType: "HTML", content: autoReplyHtml },
          toRecipients: [{ emailAddress: { address: email, name } }],
        },
        saveToSentItems: true,
      };

      const replyRes = await sendGraphMail(token, sender, autoReply);
      if (replyRes.status !== 202) {
        console.error(`Auto-reply failed: ${replyRes.status} ${await replyRes.text()}`);
      }
    } catch (autoErr) {
      console.error("Auto-reply error:", autoErr);
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
