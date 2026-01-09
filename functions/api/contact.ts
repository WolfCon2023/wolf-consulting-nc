/// <reference types="@cloudflare/workers-types" />

import { z } from "zod";

type Env = {
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  /** Resend API key (recommended for Cloudflare Pages) */
  RESEND_API_KEY?: string;
};

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(50).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
  companyWebsite: z.string().optional().or(z.literal("")), // honeypot
  turnstileToken: z.string().optional().or(z.literal("")),
});

function jsonResponse(
  body: unknown,
  init?: Omit<ResponseInit, "headers"> & { headers?: Record<string, string> },
) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

async function verifyTurnstile(args: {
  secret: string;
  token: string;
  ip?: string | null;
}) {
  const form = new FormData();
  form.set("secret", args.secret);
  form.set("response", args.token);
  if (args.ip) form.set("remoteip", args.ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form },
  );
  if (!res.ok) return { ok: false as const, error: "turnstile_unavailable" };
  const json = (await res.json().catch(() => null)) as
    | { success?: boolean; "error-codes"?: string[] }
    | null;
  if (!json?.success) {
    return {
      ok: false as const,
      error: "turnstile_failed",
      codes: json?.["error-codes"] ?? [],
    };
  }
  return { ok: true as const };
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendViaMailChannels(args: {
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
}) {
  const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: args.to }] }],
      from: { email: args.from, name: "Wolf Consulting Group Website" },
      reply_to: args.replyTo ? { email: args.replyTo } : undefined,
      subject: args.subject,
      content: [
        { type: "text/plain", value: args.text },
        { type: "text/html", value: args.html },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false as const, status: res.status, body };
  }

  return { ok: true as const };
}

async function sendViaResend(args: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
}) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${args.apiKey}`,
      },
      body: JSON.stringify({
        from: `Wolf Consulting Group <${args.from}>`,
        to: [args.to],
        subject: args.subject,
        reply_to: args.replyTo,
        text: args.text,
        html: args.html,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false as const, status: res.status, body };
    }

    return { ok: true as const };
  } catch (e) {
    const message = e instanceof Error ? e.message : "resend_error";
    return { ok: false as const, status: 0, body: message };
  }
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonResponse(
      { error: "Invalid input.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot: if filled, treat as spam.
  if (parsed.data.companyWebsite && parsed.data.companyWebsite.trim().length > 0) {
    return jsonResponse({ ok: true }, { status: 200 });
  }

  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;
  if (!to || !from) {
    return jsonResponse(
      { error: "Server is not configured for email delivery." },
      { status: 500 },
    );
  }

  // Optional Turnstile verification
  if (env.TURNSTILE_SECRET_KEY) {
    const token = parsed.data.turnstileToken?.trim();
    if (!token) {
      return jsonResponse({ error: "Turnstile verification required." }, { status: 400 });
    }
    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for") ??
      null;
    const verified = await verifyTurnstile({
      secret: env.TURNSTILE_SECRET_KEY,
      token,
      ip,
    });
    if (!verified.ok) {
      return jsonResponse({ error: "Turnstile verification failed." }, { status: 400 });
    }
  }

  const subject = `New website inquiry — ${parsed.data.name}`;
  const safeMessage = escapeHtml(parsed.data.message);

  const text = [
    `New website inquiry`,
    ``,
    `Name: ${parsed.data.name}`,
    `Email: ${parsed.data.email}`,
    parsed.data.phone ? `Phone: ${parsed.data.phone}` : `Phone: (not provided)`,
    ``,
    `Message:`,
    parsed.data.message,
  ].join("\n");

  const html = `
    <h2>New website inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(parsed.data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p>
    <p><strong>Phone:</strong> ${
      parsed.data.phone ? escapeHtml(parsed.data.phone) : "(not provided)"
    }</p>
    <hr />
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${safeMessage}</pre>
  `;

  const resendKey = env.RESEND_API_KEY?.trim();

  const sent = resendKey
    ? await sendViaResend({
        apiKey: resendKey,
        from,
        to,
        subject,
        replyTo: parsed.data.email,
        text,
        html,
      })
    : await sendViaMailChannels({
        from,
        to,
        subject,
        replyTo: parsed.data.email,
        text,
        html,
      });

  if (!sent.ok) {
    return jsonResponse(
      {
        error: "Email delivery failed.",
        status: sent.status,
      },
      { status: 502 },
    );
  }

  return jsonResponse({ ok: true }, { status: 200 });
};


