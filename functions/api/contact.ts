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
  source: z.enum(["contact", "questionnaire"]).optional(),
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

function formatDateTime(d: Date) {
  // Human-friendly UTC timestamp (works consistently in Workers)
  return `${d.toISOString().replace("T", " ").replace("Z", " UTC")}`;
}

function buildInternalEmail(args: {
  referenceId: string;
  source: "contact" | "questionnaire";
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
  pageUrl?: string;
  userAgent?: string;
  ip?: string | null;
}) {
  const safeMessage = escapeHtml(args.message);
  const safeName = escapeHtml(args.name);
  const safeEmail = escapeHtml(args.email);
  const safePhone = escapeHtml(args.phone || "");
  const safeUA = escapeHtml(args.userAgent || "");
  const safeUrl = escapeHtml(args.pageUrl || "");
  const safeIp = escapeHtml(args.ip || "");

  const title =
    args.source === "questionnaire" ? "Website Questionnaire" : "New Website Inquiry";

  const subjectPrefix = args.source === "questionnaire" ? "Questionnaire" : "Inquiry";

  const subject = `[WCG Website] ${subjectPrefix} — ${args.name}`;

  const text = [
    `${title}`,
    `Reference: ${args.referenceId}`,
    `Submitted: ${args.submittedAt}`,
    ``,
    `Name: ${args.name}`,
    `Email: ${args.email}`,
    `Phone: ${args.phone ? args.phone : "(not provided)"}`,
    args.pageUrl ? `Page: ${args.pageUrl}` : `Page: (unknown)`,
    args.ip ? `IP: ${args.ip}` : `IP: (unknown)`,
    args.userAgent ? `User-Agent: ${args.userAgent}` : `User-Agent: (unknown)`,
    ``,
    `Message:`,
    args.message,
  ].join("\n");

  const html = `<!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#0b0f19;color:#0b0f19;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f19;padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:94vw;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
              <tr>
                <td style="padding:18px 22px;background:linear-gradient(135deg,#111827,#0b1220);color:#ffffff;">
                  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.78);">
                    Wolf Consulting Group, LLC
                  </div>
                  <div style="margin-top:6px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;">
                    ${escapeHtml(title)}
                  </div>
                  <div style="margin-top:8px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;color:rgba(255,255,255,.78);">
                    Reference <strong style="color:#fff;">${escapeHtml(args.referenceId)}</strong> • ${escapeHtml(args.submittedAt)}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 22px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid #eef2f7;">
                        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;">From</div>
                        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#111827;">${safeName}</div>
                        <div style="margin-top:2px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;color:#111827;">
                          <a href="mailto:${safeEmail}" style="color:#111827;text-decoration:underline;">${safeEmail}</a>
                          ${args.phone ? ` • <span style="color:#111827;">${safePhone}</span>` : ""}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #eef2f7;">
                        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;">Details</div>
                        <div style="margin-top:6px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;color:#111827;line-height:1.5;">
                          <div><strong>Source:</strong> ${escapeHtml(args.source)}</div>
                          ${args.pageUrl ? `<div><strong>Page:</strong> <a href="${safeUrl}" style="color:#111827;text-decoration:underline;">${safeUrl}</a></div>` : ""}
                          ${args.ip ? `<div><strong>IP:</strong> ${safeIp}</div>` : ""}
                          ${args.userAgent ? `<div><strong>User-Agent:</strong> ${safeUA}</div>` : ""}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:14px 0;">
                        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;">Message</div>
                        <div style="margin-top:8px;background:#0b1220;color:#e5e7eb;border-radius:12px;padding:14px 14px;border:1px solid rgba(17,24,39,.25);font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:12.5px;line-height:1.6;white-space:pre-wrap;">${safeMessage}</div>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top:10px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;">
                    Tip: reply directly to this email to respond to the inquirer (Reply-To is set to their address).
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #eef2f7;">
                  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;">
                    Wolf Consulting Group, LLC • Website Contact Form
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;

  return { subject, text, html };
}

function buildAutoReplyEmail(args: {
  referenceId: string;
  source: "contact" | "questionnaire";
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  contactEmail: string;
  contactPhone: string;
  hours: string;
  websiteUrl: string;
}) {
  const safeName = escapeHtml(args.name);
  const safeMessage = escapeHtml(args.message);

  const title =
    args.source === "questionnaire"
      ? "We received your questionnaire"
      : "We received your message";

  const subject =
    args.source === "questionnaire"
      ? `We received your questionnaire — Wolf Consulting Group`
      : `We received your message — Wolf Consulting Group`;

  const text = [
    `Hi ${args.name},`,
    ``,
    `Thanks for reaching out to Wolf Consulting Group, LLC.`,
    `We’ve received your ${args.source === "questionnaire" ? "questionnaire" : "message"} and a member of our team will reach out shortly (typically within 1 business day).`,
    ``,
    `Reference: ${args.referenceId}`,
    `Submitted: ${args.submittedAt}`,
    ``,
    `If you need to follow up, reply to this email or contact us at:`,
    `Email: ${args.contactEmail}`,
    `Phone: ${args.contactPhone}`,
    `Hours: ${args.hours}`,
    ``,
    `Copy of your submission:`,
    args.message,
    ``,
    `Website: ${args.websiteUrl}`,
  ].join("\n");

  const html = `<!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#f3f4f6;color:#111827;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:94vw;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
              <tr>
                <td style="padding:18px 22px;background:#111827;color:#ffffff;">
                  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;">
                    Wolf Consulting Group, LLC
                  </div>
                  <div style="margin-top:6px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:800;">
                    ${escapeHtml(title)}
                  </div>
                  <div style="margin-top:8px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;color:rgba(255,255,255,.78);">
                    Reference <strong style="color:#fff;">${escapeHtml(args.referenceId)}</strong> • ${escapeHtml(args.submittedAt)}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827;">
                    Hi ${safeName},
                  </p>
                  <p style="margin:12px 0 0 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827;">
                    Thanks for reaching out. We’ve received your submission and a member of our team will reach out shortly
                    <strong>(typically within 1 business day)</strong>.
                  </p>

                  <div style="margin-top:14px;padding:12px 14px;border:1px solid #e5e7eb;border-radius:12px;background:#f8fafc;">
                    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;">
                      Need anything sooner?
                    </div>
                    <div style="margin-top:6px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;color:#111827;line-height:1.6;">
                      <div><strong>Email:</strong> <a href="mailto:${escapeHtml(args.contactEmail)}" style="color:#111827;text-decoration:underline;">${escapeHtml(args.contactEmail)}</a></div>
                      <div><strong>Phone:</strong> <a href="tel:${escapeHtml(args.contactPhone)}" style="color:#111827;text-decoration:underline;">${escapeHtml(args.contactPhone)}</a></div>
                      <div><strong>Hours:</strong> ${escapeHtml(args.hours)}</div>
                    </div>
                  </div>

                  <div style="margin-top:16px;">
                    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;">
                      Copy of your submission
                    </div>
                    <div style="margin-top:8px;border-radius:12px;border:1px solid #e5e7eb;background:#0b1220;color:#e5e7eb;padding:14px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:12.5px;line-height:1.6;white-space:pre-wrap;">${safeMessage}</div>
                  </div>

                  <p style="margin:14px 0 0 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7280;">
                    Please don’t email sensitive information (passwords, SSNs, or payment details).
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #eef2f7;">
                  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;">
                    Sent from ${escapeHtml(args.websiteUrl)}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;

  return { subject, text, html };
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

  const source = parsed.data.source ?? "contact";
  const referenceId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}`;
  const submittedAt = formatDateTime(new Date());

  const pageUrl = request.headers.get("referer") ?? undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for") ??
    null;

  const internal = buildInternalEmail({
    referenceId,
    source,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    message: parsed.data.message,
    submittedAt,
    pageUrl,
    userAgent,
    ip,
  });

  const autoresponder = buildAutoReplyEmail({
    referenceId,
    source,
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    submittedAt,
    contactEmail: to,
    contactPhone: "704-803-0934",
    hours: "Monday – Saturday, 9:00 AM EST to 6:00 PM EST",
    websiteUrl: "https://www.wolfconsultingnc.com",
  });

  const resendKey = env.RESEND_API_KEY?.trim();

  const sent = resendKey
    ? await sendViaResend({
        apiKey: resendKey,
        from,
        to,
        subject: internal.subject,
        replyTo: parsed.data.email,
        text: internal.text,
        html: internal.html,
      })
    : await sendViaMailChannels({
        from,
        to,
        subject: internal.subject,
        replyTo: parsed.data.email,
        text: internal.text,
        html: internal.html,
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

  // Best practice: send an acknowledgement email to the inquirer (Resend only).
  let autoReplySent = false;
  if (resendKey) {
    const reply = await sendViaResend({
      apiKey: resendKey,
      from,
      to: parsed.data.email,
      subject: autoresponder.subject,
      replyTo: to, // replies go to your inbox
      text: autoresponder.text,
      html: autoresponder.html,
    });
    autoReplySent = reply.ok;
  }

  return jsonResponse({ ok: true, referenceId, autoReplySent }, { status: 200 });
};


