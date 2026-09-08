# Part 1 — Design and tooling research for small-business service sites (as of 2 September 2026)

**Scope:** 5-10 page sites for local/home-service businesses (contractors, inspectors, similar). Stack lean is Next.js. Goal is professional, custom-feeling, trustworthy — not flashy, not unmodified-theme.

**How to read this file:** Every named tool and standard is tied to a source URL and a date (publication, last-updated, or fetched). Claims without a primary source are marked. This is research, not a client-facing report.

**Research date:** 2 September 2026.

---


## Recommended Next.js / React / CSS stack (brief, dated)

For a new 5-10 page marketing site in this class, the current default stack is:

| Layer | Current default | Notes | Dated source |
| --- | --- | --- | --- |
| Framework | Next.js 16 App Router | App Router is create-next-app default. Active LTS as of late Aug 2026 is 16.3.3. | Next.js 16, 21 Oct 2025; blog 25 Aug 2026 |
| React | React 19.2 / App Router canary | View Transitions, useEffectEvent, Activity. Declare react and react-dom. | Next.js 16 blog |
| Bundler | Turbopack (default) | Opt out with --webpack. | Next.js 16 blog, 21 Oct 2025 |
| Styling | Tailwind CSS v4 | tailwindcss + @tailwindcss/postcss; @import tailwindcss. CSS Modules for scoped custom CSS. | Next.js CSS docs, fetched 2 Sep 2026 |
| Components | shadcn/ui on Base UI | July 2026 default. Radix via shadcn init -b radix. Copy-in components you own. | shadcn changelog July 2026 |
| Images | next/image | Local import gives width/height/blur. Remote: remotePatterns (images.domains deprecated in Next 16). Default quality 75. Docs say WebP; AVIF-as-default is a secondary blog claim, unverified against getting-started. | Next.js image docs, fetched 2 Sep 2026 |
| Fonts | next/font (google or local) | Self-hosts; no runtime Google Fonts CDN request. Apply via className on html. Variable fonts preferred. | Next.js font docs, fetched 2 Sep 2026 |
| Forms (default) | Native form plus Zod plus Server Action | Conform if you want FormData-native client validation. RHF for heavier client forms. See section 2. | See section 2 |
| Email | Resend (or Formspark) | Resend has official Next.js 16 examples. Formspark is 25 USD one-time with no mail infra. See section 2. | See section 2 |
| Metadata | metadata / generateMetadata | Server Component only. File-based OG. Streaming since 15.2. | Next.js generateMetadata docs |
| Animation | Motion (motion/react, formerly Framer Motion) | Use sparingly. Motion 13.x through Aug 2026. Motion UI 23 Jul 2026. Gate with prefers-reduced-motion. | motion.dev fetched 2 Sep 2026 |
| Icons | Lucide (shadcn default) | SVG; no widget JS. Confirm in components.json. | shadcn ecosystem |

**App Router status:** Stable since Next.js 13.4 (4 May 2023). In 2026 it is not experimental; it is the documented default. Next.js 16 (21 Oct 2025) made Turbopack the default bundler and introduced Cache Components as the successor to experimental PPR. For a mostly-static 5-10 page marketing site, use static pages plus a few Server Actions for the contact form. You do not need Cache Components on day one.
**Tailwind vs CSS Modules vs other:** Next.js official CSS docs (fetched 2 Sep 2026) recommend Tailwind for most styling and CSS Modules when utilities are not enough. They warn that global CSS imported outside the root can conflict across navigations. CSS-in-JS is still documented but is the wrong default for this class of site (runtime cost, RSC friction). Do not reach for Bootstrap, Material UI, or Chakra as the visual system; they read as a kit.
**Security note (must-patch):** Next.js blog, 25 August 2026: upgrade to 16.3.3 (Active LTS) or 15.5.24 (Maintenance LTS) for two critical-severity issues. Do not start a new project on an unpatched 16.3.x.

### Sources — stack

- https://nextjs.org/blog/next-16 — 21 October 2025 (Next.js 16 GA)
- https://nextjs.org/blog — 25 August 2026 (16.3.3 security); 3 August 2026 (16.3); 18 March 2026 (16.2)
- https://nextjs.org/docs/app/getting-started/installation — fetched 2 Sep 2026
- https://nextjs.org/docs/app/getting-started/css — fetched 2 Sep 2026
- https://nextjs.org/docs/app/getting-started/images — fetched 2 Sep 2026
- https://nextjs.org/docs/app/getting-started/fonts — fetched 2 Sep 2026
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata — fetched 2 Sep 2026
- https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default — July 2026
- https://base-ui.com/ — fetched 2 Sep 2026
- https://github.com/mui/base-ui/releases/tag/v1.6.0 — 18 June 2026
- https://www.npmjs.com/package/@base-ui/react — 1.7.0, updated 4 August 2026
- https://tailwindcss.com/docs/installation/using-vite — fetched 2 Sep 2026
- https://motion.dev/ — fetched 2 Sep 2026 (Motion 13.1.1, 18 Aug 2026; Motion UI, 23 Jul 2026)

**Confidence:** High on Next.js / Tailwind / shadcn / Base UI (official docs). Medium on Lucide as the shadcn default (not re-fetched from lucide.dev).

---

## 1. Visual design trends that hold up

### 1.1 What actually holds up in 2026 (not seasonal trends)

Agency 2026-trends posts exist in volume. The ones that survive contact with a contractor or home-inspector site are clarity, proof, speed, and mobile contact paths — not 3D blobs, glassmorphism, or AI-generated hero illustrations.

Tocayo (18 June 2026) states the highest-return work is: clearer page hierarchy, mobile-first contact paths, faster loading, accessible text and controls, visible proof, simple forms, and CTAs that match the customer decision. First-screen test: what you do, where you operate, why to trust you, what to do next — in about five seconds.
Fernside Studio (31 March 2026) checklist: professional appearance, mobile-first, consistent branding, clear hierarchy, minimum 16px body text, high-quality imagery (not pixelated stock), intentional whitespace.

Design-it-Right and Codivox 2026 guides (agency; treat as practice notes, not peer-reviewed): homepage must answer who / what / where above the fold; one conversion path per page; proof next to the decision, not only on a Reviews page.

What this means for a 5-10 page service site: a custom-feeling site is mostly content, photography, type, spacing, and one distinctive color story, not a new layout invention.

### 1.2 What separates custom-built from unmodified theme

These are the tells. None require a unique layout system.

- Theme tell: Inter, Roboto, or Poppins everywhere, or the default Geist-on-white create-next-app look left unthemed. Custom: one display face plus one text face (or one variable family with a real optical range), loaded via next/font. Pairing should be chosen, not leftover.

- Theme tell: purple/indigo SaaS gradients and generic quality-you-can-trust copy. Custom: color drawn from trucks, uniforms, or a job-site photo. One brand, one accent, neutrals.

- Theme tell: stock handshake / clipboard photos. Custom: real crew, vans, jobs. Phone photos, color-corrected and cropped consistently, beat stock.
- Theme tell: equal-weight card grids of six services with identical icons. Custom: uneven hierarchy; the primary service gets more space.

- Theme tell: hero slider / rotating banners. Custom: one still hero — photo, one sentence, one filled CTA.

- Theme tell: Learn more buttons. Custom: verb plus outcome (Call now, Request a quote, Schedule inspection, Get directions).

- Theme tell: cookie banner plus chat widget plus review carousel plus map fighting the first screen. Custom: proof and phone in the header/hero; chat deferred or omitted; map below the fold or on Contact only.

- Theme tell: identical py-16 rhythm on every block. Custom: larger section padding, real margins around type.
- Theme tell: icon-row why-us (lightning, shield, clock). Custom: specific claims — licensed in X, serving Y counties, N years, insured, Google rating with a number.

Tocayo (18 Jun 2026) is explicit: generic slogans and oversized images that push facts below the fold are poor UX. Real photos, reviews, licenses, insurance, years in business belong near decision points, not only in the footer.

### 1.3 Concrete visual / UX patterns

**Type.** Body at least 16px (Fernside, 31 Mar 2026). WCAG contrast 4.5:1 for body. Prefer 1-2 families. Variable fonts via next/font. Geist is the create-next-app default — change it if you do not want every Next marketing site face. Line length about 65-75 characters for service copy. Avoid icon fonts; use SVG (Lucide or custom).

**Color.** One brand color with enough contrast for filled CTAs. Do not use color alone for form errors (Tocayo; WCAG 1.4.1). Dark sections as a single band (footer or proof strip), not dark-mode-for-its-own-sake on a trades site.
**Photography.** Hero is usually the LCP element — one optimized still, not a slider. Use next/image with explicit width/height or fill plus a sized parent; priority on the hero. Gallery: real jobs, consistent crop, captions that name the service and city. Team/about: faces with names. Local E-E-A-T is this is a real company.

**Spacing.** Generous vertical rhythm between sections; tight rhythm inside a card or form. Mobile: do not shrink type to fit; stack. Sticky bars must not cover the primary CTA or form fields (Tocayo).

**Motion.** Small, transform/opacity only. Accordion open, mobile menu, form step transition. No scroll-jacking, no parallax hero, no auto-playing background video (Techradiant 2026; Pixeld 14 May 2026). Honor prefers-reduced-motion. WCAG 2.2 still requires pause/stop for auto-updating content (2.2.2).
**Nav.** Short top nav: Services, About, Reviews/Work, FAQ, Contact, plus a persistent Call and Quote/Book. Phone is a tel: link, always visible on mobile (header and/or bottom bar). Tocayo: tappable numbers, large enough buttons. Do not use a desktop hamburger as the only nav (Techradiant lists hamburger-on-desktop as a conversion-hurting pattern). Footer repeats NAP (name, address, phone) and licenses.

**CTAs.** One primary filled button style site-wide. Ghost/outline only for secondary. Repeat the primary CTA after proof. Sticky mobile CTA is fine if it does not cover content (Tocayo). Keep it one row: Call | Request quote. Avoid competing CTAs of equal weight on the same screen.

**Page structure that reads as a real company (5-10 pages):** Home (offer, area, proof, top services, how it works, FAQ teaser, CTA); 2-5 service pages (who it is for, process, pricing context, area, proof, FAQ, CTA); About (people, credentials, insurance); Work/gallery; Reviews (or a strong block reused from Home); Contact (form + tel + address + lazy map); optional service area, FAQ, privacy.

### 1.4 Confidence / recency

High on the practices (hierarchy, mobile CTA, proof placement, no sliders) because they are repeated by 2026 practitioners and lined up with Google page-experience docs and WCAG. Low on numbered conversion stats in agency posts (for example 40 percent higher conversion, 96 percent use mobile, click-through under 3 percent) unless the post cites a named study. Pixeld slider CTR figures cite Erik Runyon / Notre Dame and Nielsen Norman Group — those studies are older than 2025; the 2026 argument is that CWV, a11y, and AI-overview extraction made sliders worse, not that new CTR research was published.

### Sources — visual design

- https://tocayo.me/resources/website-ux-design-small-business-2026 — Riza Ingalls, 18 June 2026
- https://fernsidestudio.com/blog/small-business-website-checklist-2026/ — Liam Orrill, 31 March 2026
- https://www.pixeld.com.au/do-homepage-sliders-work/ — Nathan George, 14 May 2026
- https://techradiant.co/resources/web-design-trends-hurting-conversions/ — title stamped 2026; treat as secondary
- https://randlemedia.com/blog/website-design-small-business-guide-2026 — 2026 agency guide (secondary)
- https://codivox.com/blog/small-business-website-development-guide-2026/ — 2026 agency guide (secondary)
- https://design-it-right.com/small-business-website-design-2026/ — 2026 agency guide (secondary)
- https://developers.google.com/search/docs/appearance/page-experience — Google Search Central, fetched 2 Sep 2026
- https://www.w3.org/WAI/standards-guidelines/wcag/ — W3C WAI, fetched 2 Sep 2026

---

## 2. Contact forms and lead-capture tools

Rule of thumb for this class of site: own the look of the form (native markup styled with Tailwind/shadcn). Use a backend that does not inject a themed iframe. Keep the first form short (name, phone or email, service, message). Multi-step is useful for quote qualification, not for asking name as step one.

### 2.1 Native / custom (best design consistency and performance)

Native form plus Next.js Server Actions (no form library). Next.js 16 App Router: a Server Function as action, FormData in, useActionState for errors. Official Resend docs show this pattern for sending mail. Splitforms 2026 Next.js form roundup argues this is enough for 1-4 field contact forms. JS weight: zero extra library. A11y: wire labels, aria-invalid, error text, or use shadcn Field primitives. Progressive enhancement: works without JS if you do not preventDefault. Best for the standard 3-5 field contractor contact form.
React Hook Form (RHF). Official site: tiny, no dependencies, uncontrolled inputs, isolates re-renders. Thoughtworks Technology Radar: adopted since 2025 (stated on react-hook-form.com, fetched 2 Sep 2026). The official resolvers package (hookform resolvers 5.9.1) was updated 17 Aug 2026; Zod resolver is first-class. shadcn Form recipe has historically been RHF. Next.js fit: excellent as a client component; you still POST to a Server Action or Route Handler. Not FormData-native the way Conform is. Best for multi-field quote forms with live validation. Not for treating the server as source of truth / no-JS submit.
Conform (packages: conform-to/react and conform-to/zod). Official Next.js integration at conform.guide/integration/nextjs: parseWithZod in a Server Action, submission.reply(), client useForm synced via lastResult plus useFormState/useActionState, shouldValidate onBlur, shouldRevalidate onInput. Designed around native FormData and progressive enhancement. Next.js fit: best library fit for App Router Server Actions. JS weight: small, headless. Best for contact and quote forms on Next 16 when you want blur/input validation and server-returned field errors. Caveat: Conform docs snippet still showed useFormState from react-dom (pre-rename). In React 19 the hook is useActionState. Verify against current Conform docs at implementation time.
TanStack Form v1 (package tanstack/react-form). Stable announced 3 March 2025. Headless, inferred types, Standard Schema (Zod/Valibot/ArkType), async validators with debounce/AbortSignal, SSR helpers including Next.js. Next.js fit: good, but heavier conceptual API than Conform for a simple contact form. Best for complex multi-step wizards with typed nested state. Not the default for a 4-field inspector contact form.

Zod (schema). De facto validation layer for all of the above. Infer types; reuse on server. Zod v4 coerce/input-vs-output types can break naive useForm generics with RHF (GitHub resolvers issue 781); omit the generic or pass input/output separately.
Resend (email delivery, not a form builder). Official Next.js guide: install the resend package, store the API key in an environment variable, verify the sending domain, then send from a Server Action or Route Handler. Supports React Email components. Official examples repo uses Next.js 16. Pricing official, fetched 2 Sep 2026: Free plan 3,000 emails per month with a 100 per day cap; Pro from 20 USD per month for 50,000 emails. All plans: SOC 2 Type II, GDPR, DKIM/SPF/DMARC. Next.js fit: native. No iframe, no extra frontend JS. Best for notifying the owner from a custom form. Official docs: do not use the resend.dev test from-address in production.
Formspark (form backend; you keep your HTML). Official pricing fetched 2 Sep 2026: Free 250 submissions, 10 forms, 5 seats; Upgrade 25 USD one-time (listed as 25, was 50) for 50,000 submissions, 100 forms. Bundles do not expire. Terms of Service effective 20 August 2026: no recurring fees. Spam options: Botpoison, hCaptcha, reCAPTCHA, Turnstile, honeypot. Webhooks, Slack, Zapier, Sheets, Notion on paid workspace. REST API on paid. Next.js fit: POST from your own form (Server Action can proxy, or native form action). Zero visual branding if you do not use their hosted thank-you. Best for custom-designed forms when you do not want to run mail infra, and volume is modest or seasonal.
Formspree (form backend plus React helper). Official homepage fetched 2 Sep 2026: form backend, API, email; HTML form action to a formspree.io endpoint; ajax helper; React useForm hook. SOC 2 Type II, GDPR/CCPA. Next.js platform guide exists. Formshield spam plus optional reCAPTCHA. Vendor claim: 5 million submissions last month. Pricing: official /plans page did not return usable HTML in this research pass. Multiple independent 2026 checks of formspree.io/plans (Toolradar 24 Jun 2026; Un-static 17 Aug 2026; Form Plume Jul 2026) converge on Free 50/mo, Personal 15 USD/mo (200), Professional 30 USD/mo (2,000, webhooks/API), Business 90 USD/mo (20,000); annual about 10 months. Treat as secondary until re-checked on formspree.io/plans. Next.js fit: good as a client hook. Still a third-party POST. Best for teams that want a dashboard plus plugins without hosting mail.
Other form backends (2026, verify if you shortlist): Web3Forms, Basin, Getform, splitforms appear in 2026 comparisons as cheaper or higher-free-tier backends. Not fetched from official pricing pages in this pass — do not treat their prices as verified here.

### 2.2 Hosted form builders (embeds — design and performance tradeoff)

These are faster for non-dev edits and multi-step logic. They almost always mean an iframe or a third-party script, a different type ramp, and branding on free tiers.

Tally. Official pricing fetched 2 Sep 2026: Free — unlimited forms and submissions (fair use), conditional logic, payments, signatures, uploads, Sheets/Notion/Airtable/Zapier/Make, webhooks. Pro 24 USD/mo — remove Tally branding, custom domain, custom CSS, partial submissions, drop-off analytics, collaboration. Business 74 USD/mo — retention controls, email verification. GDPR, data in EU (Belgium). Next.js fit: iframe/embed, not a FormData backend for your own markup. Free tier shows Tally branding. Pro unlocks custom CSS. Best for extra surveys or multi-step intake you do not want to code, if you pay Pro to drop branding. Not for the primary homepage contact form if you care about pixel-matching the site.
Fillout. Official pricing fetched 2 Sep 2026: Free 0 USD — unlimited forms/seats, 1,000 responses/mo, multi-page, embedding, payments, scheduling forms, PDFs, conditional logic, 20 MB uploads. Branding: badge on Free, light branding on Starter, none on Pro and above. Starter 15 USD/mo annual (180 USD/yr), Pro 40 USD/mo annual, Business 75 USD/mo annual. CAPTCHA starts Starter. Custom CSS on Pro. Calendly scheduling starts Starter. Vendor: SOC II. Custom domains on Business. Next.js fit: embed. Stronger workflow (Airtable/Notion/HubSpot) than Tally. Scheduling built in — can replace a simple Calendly for pick-a-slot on the quote form. Look: themable but still reads as Fillout unless you invest in Pro custom CSS. Best for multi-step quote plus scheduling without writing a wizard.
Typeform. Official pricing schema on typeform.com/pricing fetched 2 Sep 2026: Basic 28 USD, Plus 56 USD, Business 91 USD, Talent 119 USD, Growth Pro 266 USD. Conversational one-question-at-a-time UI. Next.js fit: iframe plus their JS. Heaviest designed-by-someone-else look. Volume: 2026 comparisons report a very tight free tier (on the order of 10 responses/mo — secondary; confirm on their pricing page). Not a good default for a live lead form. Best for branded quizzes where the Typeform aesthetic is the experience. Avoid for contractor contact — cost, branding, and the long one-question flow fights just-call-us.

### 2.3 Scheduling / booking widgets

For inspectors and contractors, booking is often request-a-window not pick-a-15-min-sales-demo. Still, embedded scheduling converts if the business actually keeps a calendar.

Cal.com. Official pricing fetched 2 Sep 2026: Individuals Free forever — 1 user, unlimited event types and calendars, payments (Stripe/PayPal), 100-plus apps, Salesforce/HubSpot sync, Calendly import. Teams 12 USD/user/mo yearly (page shows yearly; about 25 percent off vs monthly — Cal.com blog 10 Aug 2026 also quotes 16 USD/user/mo monthly). Organizations 28 USD/user/mo yearly. Remove branding on Teams and above. Embed plus Atoms React SDK for in-product Booker (Cal.com blog 10 Aug 2026). Atoms docs listed React 18/19 and Next.js 14/15 — confirm Next 16 support before committing.
Cal.com Next.js fit: best of this set if you want React components and CSS classes instead of a Calendly iframe. Self-host option exists but is ops-heavy. JS weight: Atoms is real React, not a tiny snippet. Prefer a dedicated /book route and lazy-load the Booker rather than mounting it in the global layout. Best for Next.js sites that want scheduling to look native, or teams that dislike Calendly branding.

Calendly. Official pricing fetched 2 Sep 2026: Free — 1 event type, 1 calendar, unlimited meetings. Teams 16 USD/seat/mo yearly. Enterprise from 15k USD/yr, 50-seat minimum. Standard price was not clearly numeric in the fetched page. Calendly Help Choose the right plan, updated 1 Sep 2026: Free, Standard, Standard Plus, Teams, Teams Plus, Enterprise. Independent 2026 writeups put Standard at 10 USD/seat/mo annual / 12 monthly. Confirm Standard on calendly.com/pricing. Official embed: inline widget, popup, or raw iframe; one auto-resize embed per page.
Calendly Next.js fit: iframe or next/script plus react-calendly. Always client-only. Lazy-load on click or when the booking section scrolls into view. Do not put widget.js in the root layout of every page. Branding: removable on paid; color customization for embeds (vendor). Best for: the owner already lives in Calendly. Lowest training cost. Design: always looks like Calendly unless heavily parameterized. Fine on a /schedule page; clumsy in a custom hero.

SavvyCal. Official pricing fetched 2 Sep 2026: Basic 10 USD/user/mo, Premium 17 USD/user/mo (annual toggle: save 2 months). Unlimited calendars/links, team scheduling on Basic. Premium: custom domains, paid bookings, remove branding, delegate. Website embedding listed. Next.js fit: embed (iframe-class). Design-forward overlay UX is the product pitch (third-party 2026 comparisons). Best for consultative businesses that send a link. API is intentionally small (APIScout 2026). Not the thing you build a product on.
Acuity / Squarespace Scheduling. Squarespace acquired Acuity (2019). 2026 third-party pricing roundups (Talkspresso, Koalendar) list Starter 20 USD/mo or 16 yearly-equivalent, Standard 34 / 27, Premium 61 / 49, no free plan, 7-day trial, unlimited appointments. Official Squarespace page was not successfully fetched in this pass — re-verify. Next.js fit: embed. Natural if the business already runs Squarespace payments/packages. Best for appointment businesses that sell packages/memberships (more spa/clinic than emergency plumber). Not a design-system citizen. Same iframe caveats as Calendly.

### 2.4 Inline validation patterns (current)

Regardless of library: validate on blur, revalidate on input after first error (Conform documented default; also the RHF mode onTouched pattern). Associate errors with aria-describedby plus aria-invalid. Visible text, not color-only (Tocayo; WCAG 3.3.1 / 1.4.1). Use correct type / autocomplete / inputmode (tel, email). Server-side validation is mandatory even with a perfect client schema. Prefer Cloudflare Turnstile over visible reCAPTCHA for human checks: official docs last updated 14 Aug 2026, WCAG 2.2 AA claim, managed/non-interactive/invisible widgets, works without putting the whole site on Cloudflare CDN.

### 2.5 Comparison snapshot (this class of site)

- 3-5 field contact, custom look: native form + Zod + Server Action + Resend or Formspark. No iframe, full visual control, tiny JS. You own a11y and spam.
- Same, with nicer field errors: Conform + Zod + Server Action. FormData-native, blur/input UX. Confirm useActionState vs old useFormState in current docs.
- Multi-field quote, client-heavy: RHF + Zod + shadcn Form. Ecosystem, performance. Client JS; glue to Server Actions.
- Typed multi-step wizard: TanStack Form v1. Types, async validators. Overkill for simple leads.
- Non-dev-editable multi-step: Fillout Pro (to drop branding) or Tally Pro. Logic/payments without code. Embed look plus third-party JS.
- Conversational survey: Typeform. Best-in-class one-at-a-time UX. Price, branding, slow for call-us.
- Booking, Next-native: Cal.com hosted; Atoms if you need components. Free single user; React path. Confirm Atoms times Next 16.
- Booking, owner already using it: Calendly, lazy iframe on /schedule. Familiar. Script weight, looks like Calendly.
- Design-forward personal links: SavvyCal. Overlay UX. Embed still third-party.
- Packages / memberships: Squarespace Scheduling (Acuity). Feature fit. No free tier (third-party 2026).

### 2.6 Confidence / recency

High: Tally, Fillout, Formspark, Resend, Cal.com, SavvyCal, Calendly Teams price, Turnstile, RHF existence, Conform Next.js pattern, TanStack Form v1 date. Medium: Formspree dollar amounts (official plans page failed to parse); Calendly Standard dollar amount; Acuity 2026 prices; Cal.com Atoms on Next 16. Low: Typeform free-tier response cap; any JS KB gzipped figures not measured in this pass.

### Sources — forms and scheduling

- https://react-hook-form.com/ — fetched 2 Sep 2026
- https://www.npmjs.com/package/@hookform/resolvers — 5.9.1, updated 17 Aug 2026
- https://conform.guide/integration/nextjs — fetched 2 Sep 2026
- https://tanstack.com/blog/announcing-tanstack-form-v1 — 3 March 2025
- https://resend.com/docs/send-with-nextjs — fetched 2 Sep 2026
- https://resend.com/pricing — fetched 2 Sep 2026
- https://tally.so/pricing — fetched 2 Sep 2026
- https://www.fillout.com/pricing — fetched 2 Sep 2026
- https://www.typeform.com/pricing — fetched 2 Sep 2026
- https://formspark.io/pricing/ — fetched 2 Sep 2026
- https://formspark.io/legal/terms-of-service/ — effective 20 August 2026
- https://formspree.io/ — fetched 2 Sep 2026
- https://formspree.io/plans — fetch returned almost no plan HTML (failed primary); secondary: https://un-static.com/alternative/formspree/ (checked 17 Aug 2026), https://toolradar.com/tools/formspree (24 Jun 2026)
- https://cal.com/pricing — fetched 2 Sep 2026
- https://cal.com/blog/react-scheduler-component-libraries — 10 Aug 2026
- https://calendly.com/pricing — fetched 2 Sep 2026
- https://calendly.com/help/choose-the-right-calendly-plan-for-your-team — updated 1 Sep 2026
- https://calendly.com/help/advanced-calendly-embed-for-developers — fetched 2 Sep 2026
- https://savvycal.com/pricing — fetched 2 Sep 2026
- https://developers.cloudflare.com/turnstile/ — last updated 14 Aug 2026
- https://splitforms.com/blog/best-nextjs-form-library-2026 — 2026 (secondary)
- https://www.pkgpulse.com/guides/tanstack-form-vs-react-hook-form-vs-conform-react-forms-2026 — 2026 (secondary)
- Acuity prices: https://talkspresso.com/blog/acuity-scheduling-cost — 2026 (secondary; not official)

---

## 3. Plugins / components worth using

Principle: prefer headless primitives you style over hosted widgets that bring their own UI, fonts, and JS. Hosted widgets are acceptable when they save a real integration (live Google reviews) and are lazy-loaded below the fold.

Headless primitive (Base UI, Radix, Embla): behavior plus a11y; you bring markup/CSS. Full design control. Low CWV cost if tree-shaken and client-islands only.

Copy-in kit (shadcn/ui): pre-styled source in your repo. Full control because you edit the source. Low CWV cost.

Hosted embed (Elfsight, EmbedSocial, Senja script, Calendly iframe): data plus UI plus updates. Theme knobs, vendor look. High CWV cost if loaded globally.

### 3.1 Headless vs copy-in vs hosted

The three paragraphs above are the taxonomy. Use them when choosing a FAQ, gallery, map, or reviews widget.

### 3.2 UI kit and primitives

shadcn/ui copies component source into the project rather than locking you to a package. July 2026 default primitive layer is Base UI; Radix remains supported. Includes Accordion, Dialog, Navigation Menu, Sheet, Tabs, form pieces, and Carousel (Embla). Official accordion docs fetched 2 Sep 2026 describe the WAI-ARIA pattern, multiple open items, disabled items, and RTL.
Base UI (site base-ui.com) is MUI unstyled primitives built to WAI-ARIA APG and WCAG 2.2. Official site fetched 2 Sep 2026.
GitHub release 1.6.0 dated 18 June 2026. Registry listing 1.7.0 updated 4 August 2026. MIT.
Includes Accordion, Dialog, Menu, Tabs, Tooltip, Form, and Number Field. You style everything. New shadcn projects should start here.
Existing Radix plus shadcn apps should not migrate for sport (shadcn July 2026 changelog). Do not use MUI Material (the styled kit) as the visual system; it reads as a kit.

Radix UI primitives remain fully supported via shadcn init with a radix base flag. Same idea: a11y behavior, your CSS. Use if the project is already on Radix or a needed primitive is not in Base UI yet.

### 3.3 FAQ / accordion

Use shadcn Accordion on Base UI (or Radix). Content must exist in the HTML for SEO; do not client-fetch FAQ bodies. Tocayo: accordions are fine for scanning; primary facts should still be in mobile HTML. Avoid jQuery accordion plugins and accordion-as-the-only-place-service-details-live.

### 3.4 Image galleries / carousels / lightbox

Embla Carousel is official lightweight, plugin-based, and SSR-friendly. This is what shadcn Carousel wraps (ui.shadcn.com carousel docs). Use for galleries and testimonial strips with manual controls, not homepage heroes, not autoplay.

yet-another-react-lightbox is a widely used React lightbox (zoom, thumbnails, video plugins). Not re-fetched from official docs in this pass; verify current package version at implementation. Pair with next/image in the grid; open the lightbox only on click (no preload of all full-size images).

Avoid Owl Carousel, Slick, Revolution Slider, Swiper-as-hero-with-autoplay, and any gallery that loads a second copy of every image up front.

### 3.5 Testimonials / reviews display

Best visual/performance path for a custom site: store 6-12 curated quotes (and star rating) in your CMS or MDX and render them with your type. Add Review / AggregateRating JSON-LD yourself if the reviews are genuine and eligible. No third-party script.

Senja. Official pricing fetched 2 Sep 2026: Free 0 USD — 15 video/text testimonials, collection form, import from 18 sources, unlimited widgets and Walls of Love (Senja branding). Starter 29 USD/mo — unlimited testimonials, 3 forms, 1 project, 2 seats, own branding, custom domains, Zapier, API. Pro 59 USD/mo — unlimited forms, 5 projects (plus 10 USD/mo extra), 5 seats (plus 5 USD), rich snippets, translation. Embed via script (help center). Stronger at collecting video/text than at being an invisible Google-reviews ticker.
EmbedSocial. Official Google Reviews widget page: GBP sync, multi-source (Facebook, Trustpilot, Tripadvisor, Yelp), layouts (slider/grid/badge), schema claim. Pricing not captured from an official table here; third-party 2026 posts start around 29 USD/mo. Expect an embed script and a default look you will fight with CSS.

Elfsight. Huge widget supermarket (reviews, Instagram, maps, chats). Third-party 2026 pieces: view-based metering, branding on free, about 96 apps. High risk of template feel plus JS weight. If used at all: one widget, lazy, paid to remove badge — and still second-best to curated native quotes.

Testimonial.to, Trustmary, Taggbox, Trustindex, JustReview appear in 2026 roundups. Not primary-sourced here. Same embed caveats.

Google itself: Places API Place Details Enterprise is how you fetch Google reviews officially — 1,000 free then 20 USD per 1,000 (Google Maps pricing, last updated 1 Sep 2026). There is no first-party free Google reviews carousel. For a small site, curated quotes plus a Read us on Google link is cleaner.

### 3.6 Click-to-call

No plugin. Use a tel: link in header, hero, sticky mobile bar, and footer. Display the human-readable number. Track with analytics events if needed, not a call-tracking script that swaps numbers and causes CLS — if you use call tracking, reserve the text width.

WCAG 2.5.8 Target Size (Minimum), Level AA: 24 by 24 CSS pixels (or spacing exception). Primary call buttons should be larger (44px is the AAA 2.5.5 enhanced size; good mobile practice).

### 3.7 Maps

Default for one location: Google Maps Embed API (iframe). Official docs last updated 1 Sep 2026: iframe only, no JS required, loading=lazy, unlimited free usage. This is the right choice for a Contact page pin. Reserve height to avoid CLS. Do not load it in the global layout.

Google Maps JavaScript API (Dynamic Maps). Official pricing last updated 1 Sep 2026: 10,000 free map loads/mo, then 7.00 USD per 1,000 (next band 5.60, etc.). Billing account required. Use only if you need custom markers, multi-location, or styled vector maps. The old blanket 200 USD/month credit was replaced in March 2025 by per-SKU free caps (reported by StoreRocket 2026; the current official table matches per-SKU caps, not a 200 USD credit).
MapLibre GL JS v6. Official docs fetched 2 Sep 2026 show maplibre-gl 6.7.0, ESM-only, WebGL vector maps, BSD-3, no Mapbox token. You still need a tile source (MapTiler, Stadia, self-hosted). Next.js/Turbopack needs a worker copy script (documented). Overkill for one office pin; correct for a service-area polygon or many job sites.

Leaflet. Official: about 42 KB JS, mobile-friendly, no dependency. 1.x is the production line. 2.0.0-alpha.1 announced 16 Aug 2025; GitHub issue 9869 (maintainers) says 2.0 target slipped, plugin compatibility incomplete — do not ship Leaflet 2 alpha on a client site. OSM tile usage has policies; do not hammer the public OSM tile server on a production business site without following OSM operations policy.

Mapbox GL JS is paid, token-based. Fine if you already pay for Mapbox Studio styles. MapLibre is the open fork.

Avoid Elfsight map widgets, iframe plus JS API double embeds, and putting a full interactive map in the hero.

### 3.8 Other components worth using

- Mobile drawer / bottom sheet: Vaul (shadcn Drawer). Use for mobile nav, not as a lead popup on first paint.
- Toasts: Sonner (common with shadcn). Form sent confirmation.
- Dialog / quote modal: Base UI Dialog via shadcn. Focus trap, ESC; do not auto-open on load (intrusive interstitial — Google page experience).
- Sticky mobile CTA: custom, few lines of CSS. tel plus quote; padding for home-indicator.
- Icons: Lucide. SVG, consistent with shadcn.
- Animation: Motion (motion/react). Tiny usage: menu, accordion. Respect prefers-reduced-motion.
- JSON-LD: LocalBusiness in a Server Component script tag. Next.js metadata does not replace JSON-LD.

### 3.9 Confidence / recency

High: shadcn/Base UI default, Embla as shadcn carousel engine, Google Embed unlimited plus Dynamic Maps pricing (official, 1 Sep 2026), MapLibre v6 docs, Leaflet weight plus 2.0 alpha status, Senja official pricing, Turnstile date. Medium: EmbedSocial/Elfsight prices and best-for. Low: yet-another-react-lightbox current version (not fetched); any widget is WCAG compliant vendor claim without an audit.

### Sources — components

- https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default — July 2026
- https://ui.shadcn.com/docs/components/base/accordion — fetched 2 Sep 2026
- https://ui.shadcn.com/docs/components/base/carousel — fetched 2 Sep 2026
- https://base-ui.com/ — fetched 2 Sep 2026
- https://www.embla-carousel.com/ — fetched 2 Sep 2026
- https://senja.io/pricing — fetched 2 Sep 2026
- https://embedsocial.com/google-reviews-widget/ — fetched 2 Sep 2026
- https://developers.google.com/maps/documentation/embed/get-started — last updated 1 Sep 2026
- https://developers.google.com/maps/billing-and-pricing/pricing — last updated 1 Sep 2026
- https://maplibre.org/maplibre-gl-js/docs/ — fetched 2 Sep 2026 (v6.7.0)
- https://leafletjs.com/ — fetched 2 Sep 2026; 2.0 alpha note 16 Aug 2025
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum — WCAG 2.2 SC 2.5.8
- https://motion.dev/ — fetched 2 Sep 2026

---

## 4. Performance and accessibility

### 4.1 Core Web Vitals in 2026 (thresholds unchanged)

Official Google Search Central Understanding Core Web Vitals (fetched 2 Sep 2026) and web.dev/articles/vitals (last updated 31 Oct 2024):

- LCP (loading): Good at or below 2.5 seconds; needs improvement 2.5-4.0s; poor above 4.0s.
- INP (responsiveness): Good at or below 200 milliseconds; needs improvement 200-500ms; poor above 500ms.
- CLS (visual stability): Good at or below 0.1; needs improvement 0.1-0.25; poor above 0.25.

Measurement: 75th percentile of real-user field data, mobile and desktop separately. A page passes only if all three are good at p75. Lab Lighthouse is not a substitute (Lighthouse cannot measure INP without interaction; TBT is a lab proxy). CrUX / Search Console / PageSpeed Insights / web-vitals JS library are the field path.
INP replaced FID in March 2024 and is a stable Core Web Vital. INP article last updated 2 Sep 2025. Guides that still list FID are outdated.

2026 rumor check: Some SEO blogs claimed a March 2026 tightening (LCP 2.0s). Candid Creative 2026 note (citing developers.google.com) says thresholds are unchanged. The live Google and web.dev pages fetched for this research still show 2.5s / 200ms / 0.1. Do not plan to a 2.0s LCP Google requirement that Google has not published.

### 4.2 How CWV affect ranking (sourced, not folklore)

Google page-experience doc (fetched 2 Sep 2026): Core Web Vitals are used by ranking systems. There is no single page experience signal. Other page-experience aspects (HTTPS, mobile-friendly, not excessive ads, no intrusive interstitials, distinguishable main content) do not directly rank the way CWV do, but they align with what ranking systems seek to reward. Evaluation is generally page-specific, with some site-wide assessments. Relevance still wins. A green CrUX report does not guarantee top rank. Practical implication for a plumber vs three other plumbers in the same city: passing CWV is table stakes; content, GBP, and reviews still decide.

### 4.3 Hitting the numbers without ugly design

LCP (usually the hero image or H1). One hero image, not a slider (Pixeld 14 May 2026: sliders preload multiple large images). next/image with priority on the LCP image; explicit sizes; width/height or reserved aspect-ratio box. Next.js 16 image default quality is 75 (blog 21 Oct 2025) — adequate for photos; raise per-image only if artifacts show. Self-host via next/font so the font is not a competing critical request. Keep TTFB low (static generation / CDN). Avoid hero background videos; if a brand video is required, use a poster image as LCP and load video on click (Techradiant 2026).
INP (usually third-party JS plus main-thread work). Default to Server Components; use client only for forms, menus, carousels. Do not load Calendly, review widgets, chat, or maps on every page. Facades plus next/script strategy lazyOnload (Vercel Academy third-party-scripts). Break long tasks; accordions/menus should paint the first frame immediately (web.dev INP accordion example). Auto-advancing carousels are a named INP footgun (Pixeld). Motion: prefer transform/opacity; skip large filter/layout animations on mobile.

CLS. Always set image/video/iframe dimensions or aspect-ratio boxes (maps, Calendly height about 700px per their docs — reserve it). next/font size-adjusted fallbacks (font docs: no layout shift). Do not inject banners, cookie walls, or we-use-cookies bars that push the hero after hydration. Ads/embeds: never insert above existing content without reserved space.

Third-party budget. For a service site, a reasonable cap is: analytics (one), maybe Turnstile on the form page, maybe one embed on Contact or Reviews. Chat widgets, pixel packs, and three review scripts will lose INP on mid-range Androids — which is what CrUX p75 is.

### 4.4 Next.js Image / font / metadata practices (official)

Images (next/image getting-started, fetched 2 Sep 2026): local static import gives automatic width, height, blurDataURL. Remote: images.remotePatterns in config (images.domains is deprecated in Next 16). Prevents CLS; lazy loads offscreen; serves modern formats (docs say WebP). A March 2026 blog claimed AVIF-as-default in Next 16; that is not what the official getting-started page says — treat AVIF-default as unverified. placeholder=blur for heroes.

Fonts (next/font): google or local loaders. Self-hosted from your domain; no runtime Google Fonts request. Variable fonts recommended; otherwise set weight. Apply via className on html in root layout. Pair with Tailwind v4 at-theme inline if you want font-sans to point at the next/font CSS variable.

Metadata: export metadata or generateMetadata from Server Components only (since 13.2; streaming since 15.2). File-based opengraph-image, favicon, icon. Per-service unique titles (about 50-60 chars) and descriptions (Fernside checklist). JSON-LD for LocalBusiness is separate from the Metadata API.

Scripts: next/script with afterInteractive (analytics) or lazyOnload (chat, widgets). Never beforeInteractive except true polyfills.

### 4.5 WCAG 2.2 vs 2.1 vs 3.0 (status as of 2 Sep 2026)

WCAG 2.2 is a W3C Recommendation (5 Oct 2023; latest edited 12 Dec 2024). It is the current W3C web accessibility standard. W3C standardizes on 2.2 (WCAG 2 Overview, last updated 4 Aug 2026). ISO/IEC 40500:2025 adopts WCAG 2.2 Oct 2023. WCAG 2.1 latest is 6 May 2025 (still a Rec, superseded in practice by 2.2). WCAG 2.2 is backward compatible: 2.2 AA includes 2.1 AA plus new criteria.

WCAG 3.0 is a First Public Working Draft (3 Mar 2026). Not a Recommendation. W3C: WCAG 2 is the current standard; 3.0 is a future model. Do not write RFPs that require WCAG 3.0 conformance in 2026.

EN 301 549 (EU/public procurement) still references WCAG 2.1 AA as of W3C Overview 4 Aug 2026. US ADA Title III (private business websites) still does not name a WCAG version in statute. The 2024 ADA Title II rule (state/local government) requires WCAG 2.1 AA. DOJ IFR April 2026 extended those dates to 26 Apr 2027 (populations 50k+) and 26 Apr 2028 (smaller). Private contractors are not Title II entities unless they run a government site, but 2.1 AA is the floor any US lawyer will cite; 2.2 AA is the engineering target.
New 2.2 AA criteria that bite a service site (from the 2.2 spec and Understanding docs):

- 2.4.11 Focus Not Obscured (Minimum): sticky header or cookie bar must not cover the focused control. Sticky CTA bars need enough offset or hide-on-focus.
- 2.5.7 Dragging Movements: if a before/after slider is drag-only, provide buttons or a click alternative.
- 2.5.8 Target Size (Minimum): 24 by 24 CSS pixels, or spacing so a 24px circle around the target does not intersect another. Phone/email links, FAQ chevrons, gallery dots, footer socials. (2.5.5 Target Size 44px remains AAA.)
- 3.2.6 Consistent Help: if a phone or contact link is in the header on one page, keep it in the same relative place on others.
- 3.3.7 Redundant Entry: multi-step quote forms must not re-ask name/email/phone; autocomplete or carry state.
- 3.3.8 Accessible Authentication (Minimum): no copy-the-character CAPTCHA as the only login method. Contact forms are not logins, but Turnstile is closer to 3.3.8 spirit than reCAPTCHA v2 puzzles. Cloudflare docs updated 14 Aug 2026 claim WCAG 2.2 AA for Turnstile.

Also still required: 1.4.3 contrast 4.5:1 body / 3:1 large; 2.4.7 visible focus; labels (not placeholder-as-label); error text associated with fields; skip link; logical heading order; keyboard for accordion/menu/dialog (why Base UI / Radix exist).

### 4.6 Confidence / recency

High: CWV thresholds from Google Search Central and web.dev; INP as the responsiveness metric; Next.js font/image/script docs; WCAG 2.2 Rec dates; WCAG 3.0 WD 3 Mar 2026; Title II date extension via Deque 24 Apr 2026 citing DOJ IFR. Medium: AVIF-as-Next-16-default (secondary blog). Low: any 2026 ranking-algorithm leak not on developers.google.com.

### Sources — performance and accessibility

- https://developers.google.com/search/docs/appearance/core-web-vitals — fetched 2 Sep 2026
- https://developers.google.com/search/docs/appearance/page-experience — fetched 2 Sep 2026
- https://web.dev/articles/vitals — last updated 31 Oct 2024
- https://web.dev/articles/inp — last updated 2 Sep 2025
- https://nextjs.org/docs/app/getting-started/images — fetched 2 Sep 2026
- https://nextjs.org/docs/app/getting-started/fonts — fetched 2 Sep 2026
- https://nextjs.org/docs/app/getting-started/metadata-and-og-images — fetched 2 Sep 2026
- https://www.w3.org/TR/WCAG22/ — Rec 5 Oct 2023, edited 12 Dec 2024
- https://www.w3.org/WAI/standards-guidelines/wcag/ — last updated 4 Aug 2026
- https://www.w3.org/news/2026/first-public-working-draft-w3c-accessibility-guidelines-wcag-3-0/ — 3 Mar 2026
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ — last updated 19 Nov 2024
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum — SC 2.5.8
- https://www.deque.com/blog/doj-extends-ada-title-ii-web-and-mobile-app-accessibility-deadlines/ — 24 Apr 2026
- https://academy.vercel.com/vercel-composer/guides-and-best-practices/third-party-scripts — fetched 2 Sep 2026
- https://pixeld.com/blog/why-hero-sliders-hurt-seo-and-conversions-in-2026 — 14 May 2026

---

## 5. What to avoid

### 5.1 Dated visual / UX patterns (still common on contractor themes)

- Auto-rotating hero sliders. Pixeld 14 May 2026: extra LCP work, INP from auto-advance, conversion drag; NN/g-style research they cite is older but the 2026 mechanism (LCP+INP) is current. One still image plus a real headline.
- Autoplay background video in the hero. LCP, data, silent-video-with-captions issues, cheap look. Techradiant 2026: poster plus play if you must.
- Parallax, scroll-jacking, locomotive-scroll clones. Motion sickness, INP, prefers-reduced-motion ignored.
- Ghost-only CTAs (outline buttons everywhere). One filled primary.
- Desktop hamburger hiding four links. Extra tap, extra JS.
- Stock handshake / clipboard / smiling-headset plus We put you first. Instant template tell (Tocayo 18 Jun 2026).
- Inter fonts plus indigo-600 plus rounded-2xl cards plus three equal service columns. The 2023-2025 SaaS default; reads as AI-generated in 2026.
- Cookie banners plus live-chat plus map plus popup on first paint. CLS and INP; Google discourages intrusive interstitials.
- Infinite testimonial carousels that autoplay and hide quotes from the HTML (SEO plus a11y).

### 5.2 Bloated or mismatched tools

- WordPress + Elementor / Divi / WPBakery for a new 5-10 page Next.js-class site. Page-builder CSS/JS on every view is the opposite of the stack this brief assumes. Existing WP sites can stay; do not replicate that architecture in React.
- jQuery sliders (Slick, Owl, FlexSlider, Revolution). Extra library, extra CLS, extra INP. Use Embla or nothing.
- Google Fonts CDN <link> in the document instead of next/font. Extra RTT, GDPR gray area, CLS if fallbacks are wrong.
- next/legacy/image. Next 16 image docs: do not use.
- Recaptcha v2 checkbox as the default spam tool. Ugly, extra requests, a11y complaints. Prefer honeypot plus rate limit, then Turnstile.
- Formik for new work. Maintenance is quiet; RHF/Conform/TanStack are the 2025-2026 path (Thoughtworks Radar adopted RHF 2025).
- Loading Calendly widget.js or Tidio/Crisp/Intercom in the root layout. Kill INP on pages that never need them.
- Elfsight / EmbedSocial / Judge.me-style kits as the design system (reviews plus Instagram plus map plus FAQ from one vendor). Fast to launch, impossible to look custom, extra JS.
- Leaflet 2.0 alpha on production. 1.x only until 2.0 is stable.
- Maps JavaScript API for a single pin. Use Embed (unlimited free, last updated 1 Sep 2026).
- Unpatched Next.js below 16.3.3 (security 25 Aug 2026). Same for 15.x below 15.5.24 if you stay on 15.

### 5.3 Credibility and legal landmines

- Fake review counts or star sprites without a link to the real GBP/BBB page. Trust killer if a customer checks.
- Scraping Google reviews into your HTML against Google ToS. Places Details is the paid official path (pricing 1 Sep 2026).
- Citing WCAG 3.0 as the contract target. It is a WD (3 Mar 2026), not a Rec.
- Claiming ADA Title II dates apply to a private contractor site. Title II is state/local government; private is Title III (no named WCAG version). Engineer to 2.2 AA anyway.
- Chat-first as the only contact path. Many 50-plus homeowners will bounce; keep tel: and a form.

### 5.4 Confidence / recency

High on sliders/video/third-party JS as CWV risks (Google + Pixeld + Vercel). High on Elementor-class bloat as the wrong architecture for this stack (by definition). Medium on specific conversion percentages from agencies. High on Next 16.3.3 patch date (official blog 25 Aug 2026).

### Sources — what to avoid

- https://pixeld.com/blog/why-hero-sliders-hurt-seo-and-conversions-in-2026 — 14 May 2026
- https://developers.google.com/search/docs/appearance/page-experience — fetched 2 Sep 2026
- https://nextjs.org/blog — 25 Aug 2026 (16.3.3 / 15.5.24)
- https://nextjs.org/docs/app/getting-started/images — fetched 2 Sep 2026
- https://www.w3.org/news/2026/first-public-working-draft-w3c-accessibility-guidelines-wcag-3-0/ — 3 Mar 2026
- https://developers.google.com/maps/billing-and-pricing/pricing — 1 Sep 2026
- https://www.thoughtworks.com/radar/languages-and-frameworks/react-hook-form — Radar 2025 (RHF site cites it)

---

## Practical default for this class of site (2 Sep 2026)

If you are starting a 5-10 page contractor or inspector site today:

- Next.js 16.3.3 or newer, App Router, TypeScript, Turbopack.
- Tailwind CSS v4 plus CSS Modules only when utilities are not enough.
- next/font (self-hosted) and next/image with priority on the hero; unique generateMetadata per page.
- shadcn/ui on Base UI, with tokens (color, radius, type) changed so it does not look like the demo.
- Native contact form plus Zod plus a Server Action; Conform if you want blur validation on FormData. Deliver mail with Resend or Formspark.
- Cloudflare Turnstile if spam appears; skip visible reCAPTCHA v2 as the default.
- Booking on a dedicated route: Cal.com (React path) or a lazy Calendly iframe. Do not load scheduler JS site-wide.
- Reviews: curated native quotes plus a Google profile link. Senja only if you need a collection workflow. Skip Elfsight-as-design-system.
- Map: Google Maps Embed iframe on Contact, reserved height, loading lazy.
- FAQ: shadcn Accordion with content in HTML. Gallery: Embla, no autoplay hero. Click-to-call: tel links, 24px minimum targets.
- Accessibility target: WCAG 2.2 AA (not WCAG 3.0). Core Web Vitals: LCP 2.5s, INP 200ms, CLS 0.1 at field p75.
- Visual: real photos, one filled CTA, no sliders, no autoplay video, no desktop hamburger, type that is not leftover Geist or Inter.

### Confirm-at-implementation (secondary or failed primary)

- Formspree dollar amounts: official plans page did not return usable HTML in this pass.
- Calendly Standard dollar amount: Help page updated 1 Sep 2026 names the tier; dollar figure is third-party.
- Acuity / Squarespace Scheduling 2026 prices: third-party only.
- Cal.com Atoms docs listed Next 14/15, not 16.
- Typeform free-tier response cap.
- AVIF as Next.js 16 image default (blog vs official getting-started saying WebP).
- yet-another-react-lightbox current version (not re-fetched).
- Leaflet GitHub issue 9869 last-updated date not captured.
