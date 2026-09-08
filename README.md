# Güd Vector marketing site

Marketing/SEO frontend for Güd Vector Consulting Services (gudvector.com). Next.js 16 App
Router, React 19, Tailwind v4. This is the marketing site only — it does not implement the
customer portal, quotes, Stripe, or SMS. `/portal` redirects to the live production host.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | For the contact form to actually send email | Used in `src/app/contact/actions.ts` to email submissions to `info@gudvector.com` via [Resend](https://resend.com). Without it, the form still validates correctly but shows the visitor a graceful fallback message and logs the attempt server-side instead of sending — it will not crash or silently drop submissions, but no email goes out until this is set. |

Set `RESEND_API_KEY` in Vercel project settings (or a local `.env.local`, which is
git-ignored) once a Resend account and verified sending domain exist for gudvector.com.

## Structure

- `src/app/*` — one route per marketing page (App Router). `robots.ts` / `sitemap.ts` are
  the file-convention routes for `/robots.txt` and `/sitemap.xml`.
- `src/components/*` — shared UI (header, footer, page hero, FAQ accordion, comparison
  table, phone-frame mock, JSON-LD).
- `src/lib/site-config.ts` — single source of truth for nav links and brand constants
  (name, motto, email, area served).

## Deploying

Deploy as a separate Vercel project — do not attach the `gudvector.com` domain. Production
today serves the real product (portal, quotes, Stripe, Twilio) from a different repo; do
not cut DNS over without preserving `/portal`, `/api`, and `/q`.
