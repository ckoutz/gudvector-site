# Güd Vector marketing site

Marketing/SEO frontend for Güd Vector Consulting Services (gudvector.com). Next.js 16 App
Router, React 19, Tailwind v4. This repo also hosts the public quote portal page (`/q/<token>`),
which is a thin frontend over the GVAS API — no database, auth, or Stripe SDK lives here.
`/portal` redirects to the live production host.

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
| `NEXT_PUBLIC_GVAS_API_URL` | For `/q/<token>` and the contact-form booking button | Base URL of the GVAS API (production: `https://web-production-9d848.up.railway.app`). Used by `src/lib/gvas.ts`. |
| `NEXT_PUBLIC_GVAS_BUSINESS_KEY` | Optional | Public key of the Güd Vector business in GVAS. When set, the contact form's success state fetches the booking link from `GET /v1/businesses/{key}/booking-link`. |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional | Fallback Calendly URL for the "Book your inspection" button when the business key is unset or the booking-link call fails. |
| `GVAS_MOCK` | Local dev only | Set to `1` to make `src/lib/gvas.ts` return an in-memory sample quote (tokens `sample`, `sample-paid`, `sample-declined`) and a fake booking link, so `/q/sample` and the contact success state render with no backend. Also skips the Resend send when `RESEND_API_KEY` is unset. Never set this on Vercel. |

Set these in Vercel project settings (or a local `.env.local`, which is git-ignored).
`RESEND_API_KEY` needs a Resend account and verified sending domain for gudvector.com.

Local dev without a backend:

```bash
GVAS_MOCK=1 npm run dev
# then open /q/sample, /q/sample-paid, /q/sample-declined, /q/anything-else (not found)
```

## Quote portal

The quoting backend is [GVAS](https://github.com/ckoutz/gud-vector-agent-suite). Flow:

1. The business owner approves a quote in GVAS (Slack or SMS).
2. GVAS emails/texts the customer a link to `https://gudvector.com/q/<claimToken>`.
3. `src/app/q/[token]/page.tsx` (server component) calls `GET /v1/quotes/{token}` and renders
   the line items, total, note, and status. Unknown tokens render a generic not-found state.
4. The client island (`quote-actions.tsx`) posts to `/accept` or `/decline` via server actions.
   Accept returns a Stripe Checkout `checkoutUrl` and the browser is redirected there.
5. Stripe redirects back to `/q/<token>?paid=1` on success (paid confirmation state) or
   `/q/<token>` on cancel.

The route is `noindex`, excluded from `sitemap.ts`, and disallowed in `robots.ts`.

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
