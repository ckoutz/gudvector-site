---
name: Local service site build spec
description: >-
  use this when building or specifying a real 5–10 page Next.js site for a local
  service business (contractor, inspector, home-service) — stack, design, forms,
  CWV/a11y, SEO read-layer, and optional WebMCP. Not for outreach one-pager HTML
  previews.
---
# Local service site build spec

Use this for **real published sites** (GitHub, crawlable HTML/SSR). Do not use this for email-outreach one-pager previews — that is [Local website draft for outreach](sand-workflow:local-website-draft-for-outreach).

Research baseline: 2 September 2026. Re-check WebMCP if Chrome 157 has shipped or Gemini in Chrome consumes tools. Confirm Formspree / Calendly Standard / Acuity prices and Cal.com Atoms × Next 16 at implementation.

## Hard rules

- Do not invent services, years in business, awards, licenses, or review counts
- No fake Google reviews or scraped review widgets (Places Details is the paid official path)
- No “AI quoting” or similar product claim unless the product actually does it
- Do not block launch on WebMCP
- Do not start on unpatched Next.js (16.3.3+ or 15.5.24+ as of 25 Aug 2026)
- GVAS/Devin owns backend automation; this spec is the public site

## Stack

- Next.js 16.3.3+ App Router, TypeScript, Turbopack
- Tailwind CSS v4; CSS Modules only when utilities are not enough
- shadcn/ui on **Base UI** (July 2026 default). Radix is fine if the repo already uses it — do not migrate for sport
- `next/font` (self-host; no Google Fonts CDN `<link>`)
- `next/image` with `priority` on the LCP hero; remote via `remotePatterns` (`images.domains` is deprecated)
- Unique `generateMetadata` per page
- LocalBusiness (and Service) JSON-LD in a Server Component — Metadata API does not replace it
- Mostly static pages + a few Server Actions. Cache Components are not required on day one
- Skip Bootstrap, MUI Material, and Chakra as the visual system

## Design (custom vs theme)

First screen in ~5 seconds: what you do, where, why trust you, what to do next.

- Type chosen for the business — not leftover Geist, Inter, Roboto, or Poppins
- Color from trucks, uniforms, or a job-site photo: one brand, one accent, neutrals. Not indigo SaaS gradients
- Real crew / van / job photos, cropped consistently. Phone photos beat stock handshake/clipboard
- Uneven service hierarchy — primary service gets more space than a six-equal-icon grid
- One still hero: photo + one sentence + one filled CTA. **No slider, no autoplay video, no parallax**
- CTAs are verb + outcome (`Call now`, `Request a quote`, `Schedule inspection`). Not `Learn more`
- Proof next to the decision (license, insurance, years, rating **with a number**), not only on Reviews
- Short top nav + always-visible `tel:` on mobile (header and/or sticky bar). Footer repeats NAP
- Body ≥16px, contrast 4.5:1, one filled primary button style site-wide
- Sticky mobile bar: one row, Call | Request quote, must not cover focused controls (WCAG 2.4.11)
- Typical pages: Home; 2–5 services; About; Work/gallery; Reviews (or a strong reused block); Contact; optional service-area, FAQ, privacy

## Forms and booking

- Default: native `<form>` + Zod + Server Action + **Resend** (or **Formspark** if you do not want mail infra)
- Conform if you want FormData-native blur/input errors on App Router
- React Hook Form only for heavier client quote forms; TanStack Form v1 only for typed multi-step wizards
- First form is short: name, phone or email, service, message
- Validate on blur, revalidate on input after first error; `aria-invalid` + visible text; **always validate on the server**
- Spam: honeypot + rate limit, then Cloudflare Turnstile. Not visible reCAPTCHA v2
- Hosted builders (Tally Pro / Fillout Pro) only for extra surveys you will not code — not the homepage contact form. Skip Typeform for contractor contact
- Booking on a dedicated `/book` or `/schedule` route, lazy-loaded, **never in the root layout**. Cal.com (confirm Atoms × current Next) or a lazy Calendly iframe if the owner already lives there. Only if they keep a calendar

## Components

Prefer headless primitives you style.

| Need | Use | Do not use |
| --- | --- | --- |
| FAQ | shadcn Accordion; copy in the HTML | Client-fetched FAQ bodies; accordion as the only service detail |
| Gallery | Embla, manual controls; lightbox on click only | Owl/Slick/Revolution; autoplay hero |
| Reviews | 6–12 curated quotes in CMS/MDX + GBP link + optional Review JSON-LD if genuine | Elfsight-as-design-system; scraped Google reviews |
| Call | `tel:` in header, hero, sticky bar, footer; 24px min targets (44px for primary) | Call-tracking that swaps numbers without reserved width |
| Map | Google Maps Embed iframe on Contact, reserved height, `loading=lazy` (unlimited free as of 1 Sep 2026) | Maps JS for one pin; map in the hero; Leaflet 2 alpha |
| Chrome | Lucide; Vaul for mobile nav; Sonner for “sent”; Base UI Dialog — do not auto-open on load | Chat + cookie + map + popup on first paint |

Senja only if you need a collection workflow (Starter to drop branding). Review widgets, if any, lazy below the fold on Reviews/Contact only.

## Performance (CWV, field p75)

Thresholds unchanged as of 2 Sep 2026: **LCP ≤2.5s, INP ≤200ms, CLS ≤0.1**. Do not plan to an unpublished 2.0s LCP.

- One hero image with `priority` and reserved aspect-ratio
- Server Components by default; client islands only for forms, menus, carousels
- `next/script`: analytics `afterInteractive`; widgets `lazyOnload`. Never scheduler/chat/reviews/maps in root layout
- Third-party budget: one analytics, Turnstile on the form page, maybe one embed on Contact or Reviews
- No FID — INP replaced it in March 2024

## Accessibility

Engineer to **WCAG 2.2 AA**. WCAG 3.0 is a Working Draft (3 Mar 2026) — do not put it in contracts. Private business sites are ADA Title III, not Title II.

Must-handle 2.2 additions: 2.4.11 focus not obscured, 2.5.8 24px targets, 3.2.6 consistent help (phone stays put), 3.3.7 no re-asking name/email on step 2.

Also: visible focus, real labels (not placeholder-as-label), associated errors, skip link, heading order, keyboard accordion/menu/dialog, `prefers-reduced-motion`.

## SEO / AI read layer (required)

Crawlable HTML/SSR, not a JS app-shell. This is how humans and agents **find** the business.

- Unique title (~50–60 chars) and meta description per page
- LocalBusiness JSON-LD; service pages with real copy
- Honest `llms.txt` if you ship one — no invented capabilities
- NAP consistency with Google Business Profile
- FAQ and reviews in the HTML, not only in widgets

## WebMCP (optional, not a launch gate)

WebMCP is a W3C Community Group **draft** (not a standard). Tools run in the **open tab**. They do not help ranking or discovery.

**Do this only if cost is low** (existing quote/availability APIs):

1. Feature-detect `document.modelContext.registerTool` in a Client Component on contact/book (never during SSR)
2. Register 2–4 tools wrapping **existing** APIs: `get_service_info` (readOnly), `check_availability`, `start_quote_request`, `book_appointment`
3. Re-validate every argument in `execute`. Prefer filling the visible form over silent POST. Keep CSRF, honeypot, rate limit, confirm steps
4. Pass an AbortController; abort on unmount / route change
5. Optional declarative `toolname` / `tooldescription` on the same forms (Chrome only; ChatGPT Site tools ignore this). Do not use `toolautosubmit` on send/book
6. Test in Chrome (`chrome://flags/#enable-webmcp-testing`) and ChatGPT desktop Site tools if available. Origin-trial token for production Chrome before 157

**Do not:** `tools.json`, `/.well-known/webmcp` as if they were spec, declarative-only, mcp-b polyfill as production, Cloudflare WebMCP packs as the booking strategy, or any claim that WebMCP improves rankings.

If agents need to act **without** an open tab, that is a remote MCP server around the booking/CRM — a different product, not this spec.

## Definition of done

- Looks like this business, not an unmodified theme or leftover create-next-app
- Phone is tappable on mobile from the first screen
- Contact form works without a third-party themed iframe
- Lighthouse/lab is a check, not the gate; field CWV and 2.2 AA are the gate
- No invented claims; no WebMCP launch blocker
