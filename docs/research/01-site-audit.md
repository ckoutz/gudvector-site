# Güd Vector site audit

**Site:** https://gudvector.com (https://www.gudvector.com redirects to the apex)  
**Audited:** 2 Sep 2026, ~6:24 PM PT  
**Method:** WebFetch of homepage + linked/common paths; curl/Python for HTML, headers, sitemap, and 404/status probe. WebFetch of `/sitemap.xml` returned HTTP 500; the same URL returned HTTP 200 with a 3-URL sitemap via curl.  
**Rule:** Only claims that appear on the site or in the given company brief. Site-only claims are marked **site claim, not in brief**. Nothing below invents products, industries, or proof.

---

## Pages found (URL + 1-line purpose)

Indexed / public marketing surface is a **3-URL sitemap**. Nav items labeled About / Services / Contact are **in-page anchors on `/`**, not separate URLs.

| URL | Status | Purpose |
|---|---|---|
| https://gudvector.com/ | 200 | Single-page marketing home: positioning, two service pillars, 5-step process, about, email contact form. Canonical apex. |
| https://www.gudvector.com/ | 200 → https://gudvector.com/ | WWW hostname; resolves to the same home. |
| https://gudvector.com/privacy | 200 | Privacy notice for the site and customer portal (quotes, Google login, Stripe, Twilio). |
| https://gudvector.com/terms | 200 | Terms for using the site and portal (quotes, payment, accounts, SMS). |
| https://gudvector.com/robots.txt | 200 | Allows `/`; disallows `/portal/`, `/api/`, `/q/`; points at sitemap. |
| https://gudvector.com/sitemap.xml | 200 (curl); 500 (WebFetch) | Lists only `/`, `/privacy`, `/terms`. lastmod `2026-09-02T22:58:35.630Z` (2 Sep 2026, 3:58 PM PT). |
| https://gudvector.com/portal and `/portal/` | 200 → `/portal/login` | Live customer portal login (email/password, SMS code, Google). `noindex, nofollow`. Disallowed in robots.txt. |
| https://gudvector.com/portal/login | 200 | Portal login. Public email restated for new work. |
| https://gudvector.com/portal/signup | 200 | Portal account create. Copy: accept/reject quote, then pay on this site. `noindex, nofollow`. |
| https://gudvector.com/portal/register and `/portal/create` | 200 → `/portal/login` | Aliases that land on login. |

**404s probed (custom page: “That page is not on this site.”; robots `noindex`):**  
`/about`, `/about-us`, `/services`, `/contact`, `/pricing`, `/work`, `/blog`, `/portfolio`, `/projects`, `/case-studies`, `/clients`, `/industries`, `/faq`, `/legal`, `/privacy-policy`, `/terms-of-service`, `/login`, `/signup`, `/book`, `/booking`, `/schedule`, `/quote`, `/q`, `/q/`, `/api`, `/how-it-works`, `/process`, `/team`, `/careers`, `/news`, `/resources`, `/web-design`, `/ai`, `/automation`, `/llms.txt`, `/humans.txt`, `/manifest.json`.

**robots.txt (verbatim):**
```
User-Agent: *
Allow: /
Disallow: /portal/
Disallow: /api/
Disallow: /q/

Host: https://gudvector.com
Sitemap: https://gudvector.com/sitemap.xml
```

`/q/` and `/api/` exist as disallowed prefixes (quote-link and API conventions) but the bare `/q` and `/api` paths 404. No public quote-demo URL was found.

**Footer / in-page links actually present on `/`:** `#main` (skip), `/#top`, `/#services`, `/#how-it-works`, `/#about`, `/#contact`, `/portal`, `/privacy`, `/terms`. Primary CTAs all point at `/#contact` except “See how it works” → `/#how-it-works` and the header “Customer portal” → `/portal`.

---

## Current positioning in their own words (quoted)

**Title / brand line**

> “Güd Vector | Websites & Systems for Bay Area Service Businesses”  
> — `<title>` and `og:title` on https://gudvector.com/

**Eyebrow / motto (matches brief; uses “sending”)**

> “San Francisco Bay Area”  
> “Güd Vector — sending your company in the right direction.”  
> — https://gudvector.com/ (hero)

**H1**

> “If they can't find you, they call someone else.”  
> — https://gudvector.com/

**Hero subhead**

> “We build fast, mobile-first websites for local service businesses, plus simple systems to make sure leads, quotes, and follow-ups don't slip through the cracks.”  
> — https://gudvector.com/

**Meta description (also schema `description`)**

> “Fast, mobile-first websites and simple business systems for local service companies in the San Francisco Bay Area. Email info@gudvector.com.”  
> — `<meta name="description">` on https://gudvector.com/

**Two pillars (H2 “Two pillars.”)**

> “Website building for small business”  
> “For businesses with no site, or one that isn't pulling its weight. Clean, mobile-first pages with real copy, local SEO, click-to-call, and previews you approve before anything goes live.”

> “Automating business systems”  
> “Practical systems for leads, follow-up, and simple workflows — not enterprise software. Send a quote, and your customer gets a portal to review it, set up service, pay, or pause and cancel — no phone tag, no spreadsheets.”  
> — https://gudvector.com/#services

**Who it’s for (H2)**

> “One site, one system, less to manage.”  
> “Business owners who want running their business to be simple. If you're chasing quotes, hunting for leads, or juggling separate tools for payments and follow-up, this is for you — one site, one system, less to manage.”  
> — https://gudvector.com/

**About (H2)**

> “A San Francisco Bay Area shop.”  
> “Güd Vector Consulting Services is a San Francisco Bay Area shop. Our motto: sending your company in the right direction. We build websites for local service businesses and set up the practical systems that keep leads from going cold — real copy, phone-ready pages, quotes and payments through Stripe, and a customer portal for setup, payment, and cancellation.”  
> — https://gudvector.com/#about

**Contact**

> “Get in touch.”  
> “The only public contact is email. Say whether you need a website, help automating business systems, or both.”  
> — https://gudvector.com/#contact

**JSON-LD type:** `ProfessionalService`, name `Güd Vector Consulting Services`, alternateName `Güd Vector`, `areaServed` “San Francisco Bay Area”, `knowsAbout` “Website building for small businesses” and “Automating business systems”.

**Word-choice check vs brief:** Motto uses **“sending”** (not “putting”). The word **“ops”** does not appear. The word **“AI”** (whole word) does not appear anywhere on the homepage HTML.

---

## Claims inventory (quoted, with URL)

### A. On-brief claims (also on the site)

| Claim (quoted) | URL | Notes |
|---|---|---|
| Name “Güd Vector” / “Güd Vector Consulting Services” | `/`, schema, footer, legal | Matches brief. |
| Motto “sending your company in the right direction.” | `/` hero and About | Matches brief. |
| Bay Area / “San Francisco Bay Area shop” | `/`, schema `addressRegion` CA | Region only; no city/street. |
| Builds websites for local/small service businesses | `/` hero, pillar 1, About | Matches brief. |
| Customer portal: review quote, set up service, pay, pause/cancel | `/` pillar 2, step 04, About | Matches brief portal scope. |
| Quote drafting/send: “You send the quote. Your customer reviews it…” | `/` step 04 | Owner *sends* a quote; site does not say AI drafts it. |
| Target: business owners who want running the business to be simple | `/` “Who it’s for” | Matches brief simplicity pitch. |
| Pain: no/weak site, follow-up falling through, phone tag, spreadsheets | `/` steps 01, pillar 2 | Matches brief. |
| Not a big packaged platform: “not enterprise software” | `/` pillar 2 | Adjacent to brief “not self-serve SaaS”; wording differs. |
| Email-only public contact | `/#contact` | “The only public contact is email.” |

### B. Site claims **not in brief** (flagged; quoted, not invented by this audit)

| Quoted claim | URL | Flag |
|---|---|---|
| “quotes and payments through **Stripe**” | https://gudvector.com/#about | **site claim, not in brief** |
| “Payment is processed by **Stripe**.” | https://gudvector.com/terms | **site claim, not in brief** |
| “Take payment through **Stripe**” | https://gudvector.com/privacy | **site claim, not in brief** |
| “Send quote links and one-time login codes by SMS through **Twilio Verify**” | https://gudvector.com/privacy | **site claim, not in brief** |
| “We use **Twilio** to send quote links and one-time login codes.” | https://gudvector.com/terms | **site claim, not in brief** |
| Google sign-in for portal accounts (“Let you sign in with Google”) | `/privacy`, `/terms`, `/portal/login` | **site claim, not in brief** |
| “Clean, mobile-first pages with real copy, **local SEO**, **click-to-call**” | `/` pillar 1 | **site claim, not in brief** (local SEO / click-to-call as named deliverables) |
| “**not enterprise software**” | `/` pillar 2 | **site claim, not in brief** (brief says not self-serve SaaS; site does not use “SaaS”) |
| “The website and customer portal at gudvector.com are how **we** quote work, set up service, and take payment.” | https://gudvector.com/terms | **site claim, not in brief** — describes the portal as **Güd Vector’s own** quoting/payment path, not only a client system. |
| “After you sign up you can **accept or reject your quote**, then pay on this site.” | https://gudvector.com/portal/signup | **site claim, not in brief** — accept/reject language; same dual-use portal. |
| Phone mockup CTA **“Book now”** under “What a customer sees on their phone” | https://gudvector.com/ | **site claim, not in brief** — demo of a *client* phone UI, not a Güd Vector booking product page. Site never uses the words “scheduling” or “booking” as a service name. |
| Keywords meta includes “**Stripe quotes**” | homepage `<meta name="keywords">` | **site claim, not in brief** |
| Schema `hasOfferCatalog` names only the two pillars above | JSON-LD on `/`, `/privacy`, `/terms` | Catalog is two offers only; no AI, no industries. |

### C. Brief items **not claimed on the site**

Do **not** treat these as site copy. They are in the given company profile only:

- Bespoke **AI** system under the site; quote **drafting** as AI; owner-**approval flows** as a named product.
- **Scheduling/booking** as a named product (only a mock “Book now” button in a phone frame).
- Verticals: environmental testing, home services, inspection/trade.
- Competitive set: Jobber, ServiceTitan, Housecall Pro, QuoteIQ, generic AI-agent tools.
- “Custom site + custom system vs templates they must adapt to” as explicit contrast copy.
- “Not self-serve SaaS” as an explicit phrase (site says “not enterprise software”).

### D. Process claims (homepage “Five short steps.”)

Quoted from https://gudvector.com/#how-it-works:

1. **Tell us what's missing** — “No site, a weak one, or follow-up that keeps falling through.”
2. **Get a clear plan** — “See the pages and workflows before we build anything.”
3. **Approve on your phone** — “Every preview is phone-ready, because that's how your customers will see it.”
4. **Quote to setup, in one place** — “You send the quote. Your customer reviews it, sets up service, and pays — all through a simple portal. They can pause or cancel the same way.”
5. **Go live** — “Launch a site and systems your team can actually run day to day.”

Phone-frame bullets (same URL): “Your actual services, listed clearly”; “Built for a phone, not a desktop leftover”; “A way to reach you without hunting.”

### E. Legal / data claims

From https://gudvector.com/privacy (H1 “How we use your information.”; “Updated August 2026.”):

- Collects “name, email, and phone number you give us when you contact us, open a quote, or create a portal account.”
- Uses it to send quotes, run portal accounts, Google sign-in, Stripe payment, Twilio Verify SMS.
- “We do not sell this information.”
- Keeps quote, account, and payment records “while we work with you, and as needed for bookkeeping.”

From https://gudvector.com/terms (H1 “Using this site.”; “Updated August 2026.”):

- “A quote is an offer. Work starts after you accept.”
- “If your service can be paused or canceled, that happens in the portal.”
- “Email, Google, and phone sign-in create a customer account, **not a shop login**.”
- “Do not use the portal to open someone else’s quotes.”

### F. CTAs (exact)

| Text | Destination | Where |
|---|---|---|
| Get in touch | `/#contact` | Header, hero (×2), implied primary |
| See how it works | `/#how-it-works` | Hero |
| Customer portal | `/portal` | Header |
| Book now | `#contact` (anchor on the phone mock) | Phone mockup, labeled as customer-phone UI |
| Send | contact form submit | `/#contact` |
| Privacy / Terms | `/privacy`, `/terms` | Footer |
| Back home / Get in touch | `/` and `/#contact` | 404 page |

Contact form fields on `/`: Name (required), Email (required), Business name (optional), Need radios **Website / Automating business systems / Both**, Message (required). Hidden honeypot input `name="website"`. No phone field. No public form `action` URL in the HTML (client-side Next.js). No CAPTCHA script detected.

---

## Proof / social proof inventory

**None found on any public page.**

| Proof type | Present? | Evidence |
|---|---|---|
| Testimonials / named quotes | No | Zero “testimonial” strings; “review” only in “customer … review it” (quote portal). |
| Client logos / brand wall | No | Images: `/header-logo.png` alt “Güd Vector”; `/logo.png` alt “Güd Vector”; `/your-business-logo.png?v=2` alt “**Your business**” (placeholder in the phone mock). |
| Case studies / work / portfolio pages | No | `/work`, `/case-studies`, `/portfolio`, `/projects`, `/clients` all 404. Sitemap has no work URLs. |
| Metrics (leads recovered, sites shipped, years) | No | Not in homepage, schema, or legal copy. |
| Team / founder bios | No | `/team`, `/about` as a page 404. About is four sentences of shop copy. |
| Press / certifications / partner badges | No | Stripe, Twilio, Google named as **vendors used**, not as partner badges or logos. |
| Reviews (Google, Yelp, Clutch) | No | No widgets, no review schema (`Review` / `AggregateRating` absent). Schema type is `ProfessionalService` only. |
| Sample sites / live client URLs | No | Phone mock is generic (“Your business”). |
| Pricing as social proof (starting at, packages) | No | `/pricing` 404; no rates on `/`. |

**NAP (Name / Address / Phone)**

| Field | On site | Where |
|---|---|---|
| Name | Güd Vector; Güd Vector Consulting Services | Header, footer, schema, legal |
| Address | “San Francisco Bay Area” only. Schema: `addressLocality` “San Francisco Bay Area”, `addressRegion` “CA”, `addressCountry` “US”. **No street, city, ZIP.** | Hero, About, footer, JSON-LD |
| Phone | **None.** No `tel:` links, no phone pattern. Meta `format-detection` = `telephone=no, address=no`. Schema `contactPoint` is email only. | — |
| Email | info@gudvector.com | Contact, footer, schema, legal, 404, portal login |
| Service area | San Francisco Bay Area | Copy + schema `areaServed` |

Google search for `site:gudvector.com` returned no index hits in this environment’s search tool; a broader query did surface the homepage and `/terms` titles. No third-party directory listing for this firm was verified (other “Vector Consulting” entities in search results are unrelated).

---

## SEO snapshot

**Page count:** 3 public indexable URLs in sitemap (`/`, `/privacy`, `/terms`). Portal routes exist but are `noindex, nofollow` and robots-disallowed. Custom 404 is `noindex`.

**Hosting / stack (from response headers, not a product claim):** Vercel; Next.js (`x-nextjs-prerender: 1`, `x-matched-path`). Home was a cache HIT at fetch time.

### Title / meta (homepage)

- **Title:** `Güd Vector | Websites & Systems for Bay Area Service Businesses`
- **Description:** `Fast, mobile-first websites and simple business systems for local service companies in the San Francisco Bay Area. Email info@gudvector.com.`
- **Keywords:** `Güd Vector,Gud Vector,website building for small businesses,automating business systems,San Francisco Bay Area,customer portal,Stripe quotes`
- **Robots:** `index, follow`
- **Canonical:** `https://gudvector.com`
- **OG/Twitter:** title/description match; `og:image` `https://gudvector.com/opengraph-image?aec705bd12761539` (1200×630 PNG); alt “Güd Vector — If they can't find you, they call someone else.” `twitter:card` = `summary_large_image`. `og:locale` `en_US`. `og:site_name` `Güd Vector`.
- **Icons:** `/favicon.ico`, `/icon.svg`.
- **html lang:** `en`.
- **No hreflang.** No `apple-touch-icon` link observed. No `manifest.json` (404).

### Headings (homepage)

- H1 (one): If they can't find you, they call someone else.
- H2: Two pillars. / Five short steps. / One site, one system, less to manage. / A San Francisco Bay Area shop. / Get in touch.
- H3: Website building for small business; Automating business systems; the five step titles.

### Keyword targeting (obvious)

Primary: Bay Area + websites + systems + local service businesses / small business. Secondary: customer portal, quotes, Stripe. **No AI keywords. No industry keywords. No competitor keywords. No city-level pages (Oakland, San Jose, etc.).**

### Schema

JSON-LD `ProfessionalService` is present on `/`, `/privacy`, and `/terms` (same blob). Includes `hasOfferCatalog` with two `Service` offers. **Missing vs typical local SEO:** `telephone`, street `streetAddress`/`postalCode`, `geo`, `openingHours`, `sameAs` (no LinkedIn/Google Business/Facebook), `Review`/`AggregateRating`, `FAQPage`, `WebSite`/`SearchAction`, `LocalBusiness` subtype with a real address. `addressLocality` is the region name “San Francisco Bay Area”, not a city.

### Canonical / OG bugs

`/privacy` and `/terms` set **canonical, `og:url`, and `og:title` to the homepage**, not to themselves. Privacy title in `<title>` is “Privacy | Güd Vector” and terms is “Terms | Güd Vector”, but OG title is the home title. That collapses two legal URLs toward `/` for sharing and can confuse indexers.

Portal login/signup: canonical also `https://gudvector.com` while robots meta is `noindex, nofollow` (plus robots.txt Disallow `/portal/`).

### Blog / content

**No blog.** `/blog`, `/news`, `/resources`, `/guides` 404. Sitemap `changefreq` monthly on home, yearly on legal. No article schema.

### Local SEO

- Region named repeatedly (“San Francisco Bay Area”) — good for geo association.
- No NAP completeness (no phone, no street).
- No Google Business Profile / `sameAs` link on-site.
- No city or industry landing pages.
- Site sells “local SEO” for clients (**site claim, not in brief**) but does not demonstrate it for itself beyond region copy + schema areaServed.
- `format-detection` disables telephone/address detection on their own site.

### Technical notes

- Sitemap exists (3 URLs); WebFetch got 500, curl got 200 — treat sitemap as present but possibly fragile to some user-agents.
- robots.txt is valid and names Host + Sitemap.
- No analytics/tag-manager strings detected in homepage HTML (no gtag, GTM, Plausible, etc.).
- Contact form honeypot only; no visible CAPTCHA.
- Internal nav is hash links; crawlable URLs besides home are legal + portal.

### Indexation (this audit’s search tools)

- `site:gudvector.com` query: no results in the search tool.
- Broader “Güd Vector” / gudvector.com query: homepage and `/terms` titles appeared. Unrelated “Vector Consulting” firms dominate generic searches — **name collision risk**.

---

## Gaps vs the brief

Company profile (given, not contradicted): Güd Vector / Güd Vector Consulting Services; Bay Area; motto “Sending your company in the right direction.”; builds websites for local/small service businesses, then a **bespoke AI system** under the site (quote drafting + owner-approval, customer portal for payment and pause/cancel, scheduling/booking); not self-serve SaaS; built around how that specific business works; target owners in environmental testing, home services, inspection/trade who want simplicity; competes vs Jobber, ServiceTitan, Housecall Pro, QuoteIQ, generic AI-agent tools via custom site + custom system vs templates.

| Gap | What’s on the site | What’s in the brief |
|---|---|---|
| **AI is absent** | Zero whole-word “AI”, no model/agent language. Quote flow is “You send the quote.” | Bespoke AI under the site; quote drafting. |
| **Owner-approval of quotes** | Customer reviews/accepts/rejects a quote. Website *previews* are owner-approved before go-live. | Owner-approval **flows** as part of the AI/quote system. |
| **Scheduling/booking** | Not named. Only a mock “Book now” on a phone frame. Copy says “set up service.” | Scheduling/booking is a product pillar. |
| **Industry pages / examples** | Generic “local service businesses” only. | Environmental testing, home services, inspection/trade. |
| **Competitive contrast** | “not enterprise software”; “one site, one system, less to manage”; “juggling separate tools.” No named competitors. | Explicit vs Jobber / ServiceTitan / Housecall Pro / QuoteIQ / generic AI agents; custom vs templates. |
| **Not-SaaS / bespoke** | Implies custom build (“see the pages and workflows before we build”; “systems your team can actually run”). Never says “not SaaS” or “built around how that specific business works.” | Core differentiator. |
| **Missing pages** | One long home + privacy + terms. About/Services/Contact are anchors. | Typical marketing set (about, services, contact, pricing, work, blog, case studies, industry) is not present as URLs. |
| **No proof** | No testimonials, logos, case studies, metrics, sample sites. Phone mock uses “Your business.” | Credibility for owners who already distrust software. |
| **No pricing** | `/pricing` 404; no retainers, project fees, or “talk to us for a quote” beyond email. | Not required by brief, but a buying-process gap. |
| **Thin local SEO for themselves** | Region name + incomplete PostalAddress. No phone, no street, no GBP/sameAs, no city pages. | Bay Area local firm selling local-service websites (and, on-site, “local SEO”). |
| **Portal dual-use confusion** | Terms/signup describe **gudvector.com portal as how Güd Vector quotes and gets paid**. Marketing describes the same portal pattern as what they **build for clients**. | Brief: a system **under the client’s site**, not Güd Vector’s own checkout as the hero. |
| **Oversell risk: low** | Copy is short and operational, not metric-heavy. No fake awards. | Overclaim risk is the **opposite**: under-explaining AI, verticals, and custom-vs-template. |
| **Vague claims** | “simple systems”, “practical systems”, “workflows”, “automating business systems” — no screenshot of *their* client system, no vertical, no before/after. | Brief is more specific than the site. |
| **Contact friction** | Email + on-page form only. No phone, no calendar. Form need-options are Website / Automating business systems / Both — no “AI” option. | Owners who “lose leads to missed calls” may expect a phone or bookable call. |
| **Legal pages exist** | Privacy + terms, updated August 2026. | Good vs many small shops; canonical/OG pointing at home is the issue. |

**Overselling check:** The site does **not** claim AI, does **not** claim named-client results, does **not** claim Jobber replacement by name. The stretch claims are vendor names (Stripe/Twilio/Google) and “local SEO” as a website deliverable. Dual-use portal copy could be read as “we already run the product on our domain,” which is a site claim, not in the brief.

**Do not add to messaging from this audit:** any industry, any competitor name, any AI feature, any scheduling product name, any testimonial, any price, any street address or phone — none of those are on the site.

---

## Source URLs

Fetched and used:

1. https://gudvector.com/ — homepage HTML, schema, nav, form, CTAs  
2. https://www.gudvector.com/ — 200, final URL https://gudvector.com/  
3. https://gudvector.com/privacy — privacy copy + reused home canonical/OG  
4. https://gudvector.com/terms — terms copy + reused home canonical/OG  
5. https://www.gudvector.com/privacy and https://www.gudvector.com/terms — same documents  
6. https://gudvector.com/robots.txt  
7. https://gudvector.com/sitemap.xml — 3 URLs (curl 200; WebFetch 500)  
8. https://gudvector.com/portal , `/portal/`, `/portal/login`, `/portal/signup`  
9. 404 sample: https://gudvector.com/about (and the 404 list in “Pages found”)  
10. Web search: `site:gudvector.com` (no hits in-tool); `"Güd Vector" OR "Gud Vector" OR gudvector.com "Bay Area"` (home + terms titles; unrelated Vector firms)

**Not used as Güd Vector sources:** vector.com consulting, Vector Consulting Inc (Georgia), studio gudrun, Golden Vector Stars Corporation, other LinkedIn “Vector” profiles.

---

## Appendix: exact homepage section map (for later copy work)

- Header: logo, Services, How it works, About, Contact, Customer portal, Get in touch  
- Hero: location, motto, H1, subhead, Get in touch, See how it works  
- Phone mock: “What a customer sees on their phone”, 9:41, Book now, three bullets, placeholder “Your business” logo  
- `#services` — Two pillars  
- `#how-it-works` — Five short steps  
- Who it’s for — One site, one system, less to manage  
- `#about` — A San Francisco Bay Area shop  
- `#contact` — Get in touch + form + info@gudvector.com  
- Footer: Güd Vector Consulting Services · gudvector.com · info@gudvector.com · Privacy · Terms  

*End of audit. No features invented. Site-only claims labeled.*
