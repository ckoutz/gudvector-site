# Güd Vector marketing site

Marketing/SEO frontend for Güd Vector Consulting Services (gudvector.com). Next.js 16 App
Router, React 19, Tailwind v4. This is the marketing site only — it does not implement the
customer portal, quotes, Stripe, or SMS. `/portal` redirects to the live production host.

- **Do not** point production DNS/Vercel at this repo until Cameron signs off on cutover.
- Live production still deploys from Cursor Origin `cameron-koutz/tmp-e9b7b4e7dd738742`.
- Do **not** overwrite `ckoutz/gud-vector-agent-suite` (Python/GVAS backend).
- `/portal` is a noindex route/redirect to the existing backend. Do not reimplement GVAS
  or the customer portal here.

Research and brand source assets for the rebuild are in `docs/` and `public/brand/`.

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
- `docs/research/*`, `docs/skills/*` — the marketing/SEO/design research and build-spec
  briefs this site was built from.

## Deploying

Deploy as a separate Vercel project — do not attach the `gudvector.com` domain. Production
today serves the real product (portal, quotes, Stripe, Twilio) from a different repo; do
not cut DNS over without preserving `/portal`, `/api`, and `/q`.
