---
name: Real site build rules
description: >-
  use this when building or shipping a real Güd Vector company or client website
  (not a one-pager outreach HTML preview)
---
# Real site build rules

Use for any **published** company or client website. Do **not** apply the full checklist to a one-pager outreach HTML preview.

## Ownership
- Frontend / website: the website builder agent
- Backend automation (quotes, portal APIs, field notes, SMS): GVAS / Devin
- New website repos: **GitHub**, not Origin
- Existing live gudvector.com currently deploys from Origin to Vercel; do not silently migrate production

## Always (SEO checklist 1–8)
1. Guidelines-compliant Google Business Profile (SAB vs storefront, real name, specific category, realistic service areas, hours, photos).
2. Indexable HTTPS mobile **HTML in the initial response** — SSR or static, not a JS app-shell. Crawlable `<a href>` nav. NAP, services, and JSON-LD in View Source.
3. Allow search/retrieval crawlers (Googlebot, bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User). No accidental `noindex`.
4. One unique, people-first page per **real** service. No swapped-city doorway pages.
5. Real Google reviews, earned and replied to. Never buy them. No self-serving `AggregateRating`.
6. Unique `<title>`, H1, and meta description per URL.
7. NAP/entity consistency across site, schema, GBP, Bing Places, Apple, Yelp.
8. `LocalBusiness` subtype JSON-LD matching visible text (`name`, telephone, url, hours, `sameAs`, `areaServed`). No FAQPage schema (Google removed it). Visible HTML FAQs are fine.

## Claims
- Do not advertise AI quoting (or other unbuilt features) until the live product actually does that.
- Do not invent services, years in business, licenses, awards, or reviews.

## Optional / do not block launch
- WebMCP is in-tab actuation, not SEO. Skip unless explicitly requested.
- `llms.txt` is optional and unproven.

## Inputs to consume
Pull current findings from SEO (playbook), Marketing (positioning/claims), Design (stack; prefer SSR Next.js if used), and per-lead Research. Recheck SEO/GEO playbooks if they are older than ~2–3 months.
