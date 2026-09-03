# Güd Vector public website

Marketing frontend for [gudvector.com](https://gudvector.com). Next.js App Router, crawlable HTML, official logo PNG only.

## Boundaries

- **Do not** point production DNS or the live Vercel project for gudvector.com at this repo until Cameron signs off on cutover.
- Live production still deploys from Cursor Origin `cameron-koutz/tmp-e9b7b4e7dd738742`.
- Do **not** overwrite `ckoutz/gud-vector-agent-suite` (Python/GVAS backend).
- `/portal` is `noindex` and redirects to the existing live portal at https://gudvector.com/portal. Do not reimplement GVAS.
- Do not publish a public phone, Cameron’s name, or `cameron@gudvector.com`.

Research and brand assets live in `docs/` and `public/brand/`.

## Local

```bash
npm install
cp .env.example .env.local
# add RESEND_API_KEY after the sending domain is verified
npm run dev
```

Contact form: native `<form>` + Zod + Server Action + Resend, to `info@gudvector.com`.
