# Wolf Consulting Group, LLC — Marketing Website

Modern, high-performance marketing site for **Wolf Consulting Group, LLC** built with **Vite + React 18 + TypeScript**, **Tailwind CSS**, **shadcn/ui (Radix primitives)**, and **Cloudflare Pages Functions**.

## Local development

Install dependencies:

```bash
npm install
```

Run the Vite dev server (frontend only):

```bash
npm run dev
```

## Contact form API (`POST /api/contact`)

This repo includes a Cloudflare Pages Function at `functions/api/contact.ts`.

### Environment variables (Cloudflare Pages / Wrangler)

Create a `.dev.vars` file locally (do not commit secrets) based on `.dev.vars.example`:

- `CONTACT_TO_EMAIL`: destination inbox (e.g., `contactWCG@wolfconsultingnc.com`)
- `CONTACT_FROM_EMAIL`: verified sender address on your domain (e.g., `support@wolfconsultingnc.com`)
- `TURNSTILE_SECRET_KEY` (optional): require Cloudflare Turnstile verification

### Local testing with Pages Functions

To run Pages Functions locally alongside Vite, use Wrangler’s Pages dev proxy:

```bash
npx wrangler pages dev --proxy 5173
```

## Deployment (Cloudflare Pages)

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Pages Functions**: automatically picked up from `functions/`
- **SPA routing**: handled by `public/_redirects`

### Required Cloudflare Pages environment variables

Set the same variables as above in your Cloudflare Pages project settings:

- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `TURNSTILE_SECRET_KEY` (optional)

### Email delivery note (SMTP vs Cloudflare Pages)

Cloudflare Pages Functions run on a Workers runtime that does **not** support raw TCP sockets, which means direct **SMTP (e.g., Nodemailer SMTP)** is generally not available.

This implementation sends emails via **MailChannels** over HTTPS from the Worker runtime. If you require direct SMTP via IONOS, you’ll need an external Node-based service (or a provider API like Postmark/Resend) and have `/api/contact` forward there.

## Domain migration (Squarespace → Cloudflare)

High-level steps:

1. Create a Cloudflare Pages project connected to this repo.
2. Add your custom domain `wolfconsultingnc.com` in Cloudflare Pages.
3. Move DNS to Cloudflare (or point your A/CNAME records to Cloudflare Pages as instructed).
4. In Squarespace, remove conflicting DNS records once Cloudflare is authoritative.
5. Verify HTTPS and redirects, then publish.

