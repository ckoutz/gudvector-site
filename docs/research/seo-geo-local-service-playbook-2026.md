# SEO & AI-search playbook for small local service sites
**As of 2 September 2026.** For 5–10 page sites (contractors, inspectors, landscapers, cleaners, similar), built fresh. Every page should be the best possible page for Google Search *and* for citation by ChatGPT, Claude, Perplexity, Google AI Overviews / AI Mode, Copilot, and similar.

**How to read the labels**
- **Established** — still in current vendor docs (Google, OpenAI, Anthropic, Perplexity, Bing) or a large-sample study with a public method.
- **Emerging** — 2025–2026 change, expert survey, or log study. Re-check every few months.
- **Unproven** — agency/vendor claim, correlation sold as causation, or no public evidence.

Sources are listed at the end. Do not treat Whitespark ranks, Ahrefs correlations, or Princeton “40% visibility” as Google ranking weights.

---

## 1. Traditional SEO fundamentals that still matter

### On-page (established)

| Item | What to do | What not to obsess over |
|---|---|---|
| `<title>` | Unique, descriptive, concise on every URL. Name the service and, where natural, the place. Google *may rewrite* the SERP title from H1, `og:title`, or other on-page text. | Character-count “ranking rules.” Google documents no max; truncation is display, not a rank penalty. |
| Meta description | Unique on home + each service page. Written as a sentence a human would click. | Ranking. Google sometimes uses it for the snippet, often generates from body text. Keyword-list descriptions are less likely to be shown. |
| Headings | One clear main title (typically H1). H2s for services, process, area, FAQ. Put the words people search in title, H1, alt, and link text — naturally. | Magical H1 count or strict H1→H2→H3 order for ranking. Semantic order is for accessibility. |
| Internal links | Real `<a href>` links. Home → each service ↔ about/contact. Descriptive anchors. Link to the canonical URL. | Hash-router SPAs (`#/services`). Orphan city pages. |
| Content | Unique, people-first copy per URL. Real jobs, licenses, process, area in prose. | Word-count targets. Copying competitors. Templated city-name swaps. |
| Speed / mobile | LCP ≤ 2.5s, INP < 200ms, CLS < 0.1. Readable on phones, tap-to-call, no intrusive interstitials. | Perfect Lighthouse as a ranking knob. CWV is a ranking *input* that does not beat relevance. |
| Canonical / HTTPS | One host + slash convention. HTTPS-only. HTTP 200, not accidentally `noindex`. | Duplicate-content “penalties” on your own URLs. Google picks a canonical; duplicates are inefficient, not a manual-action offense. |

Google’s language for what replaced keyword stuffing (**established**, helpful-content doc, 10 Dec 2025):

- Ranking systems prioritize *helpful, reliable, people-first* information, not content made to manipulate rankings.
- After relevance, systems use a **mix of factors** associated with experience, expertise, authoritativeness, and trust. **“E-E-A-T itself isn’t a specific ranking factor.”** Trust is the most important of those aspects. Quality raters do **not** rank pages.
- Show first-hand experience: real job photos, named techs, license numbers, process you actually follow — not spun “10 tips” blogs.
- Language matching is sophisticated; you do not need every synonym. Still put the words customers use in titles and headings.

### Local SEO for service-area businesses (established)

Google’s local pack model: **relevance, distance, prominence**. You cannot pay for a better local rank. Prominence includes links and reviews.

**GBP for a typical contractor/cleaner (SAB):**
- One profile for the whole territory. Hide an unstaffed/home address. Virtual offices ineligible unless staffed during hours. Permanent on-site signage is required to be a storefront.
- Up to **20** named service areas (city/ZIP). **No radius.** Overall area ≲ ~2 hours’ drive.
- Real-world business name — no keywords, taglines, or city stuffing in the name.
- Fewest, most specific categories (“this business IS a,” not “HAS a”).
- Complete hours, predefined + real custom services, real photos. Reply to reviews.

**NAP:** Google never names “NAP consistency.” Industry uses it as the practical form of “accurate info + prominence.” One legal name, one phone, one address policy on site, schema, GBP, Bing Places, Apple, Yelp.

**Reviews:** Google says more reviews and positive ratings can help prominence. Ask real customers on a steady cadence. Never buy them. Self-serving `Review`/`AggregateRating` on your own LocalBusiness page will **not** earn organic stars (still true 24 Jul 2026; new line: no fake or undisclosed incentivized reviews). GBP stars are a different surface.

**City pages:** One page per *real* service. At most a few genuinely unique area pages for places you actually work. Swapped-city templates are **doorway abuse**. Footer city-lists are a documented stuffing example.

**Maps pack vs organic:** GBP drives the pack. Dedicated unique service pages drive local organic (and are the GBP landing page). You need both.

**Emerging (not Google weights):** Whitespark 2026 expert survey (6 Nov 2025) — Maps led by primary category, proximity, GBP title keywords, ratings/reviews/recency, completeness. Local organic led by dedicated service pages, geo-relevant content, links, titles, internal linking. SEL 25 Aug 2026 (1.8M GBPs): specific primary categories and higher completeness *correlate* with better ranks — authors say correlation ≠ causation.

**Known gap:** Google requires hiding SAB home addresses; experts treat “address showing (not SAB)” as a strong Maps factor. Follow guidelines. Do not fake a storefront.

### Technical (established)

- XML sitemap: optional but cheap at 5–10 URLs. Reference it from robots.txt; submit in Search Console **and** Bing Webmaster Tools.
- `robots.txt`: crawl control, **not** deindex. A disallowed URL can still appear as a URL-only result.
- Do **not** ship a JS app-shell. Server-render or static HTML. Googlebot renders JS (with delay); hash URLs and client-only content are a bad idea even for Google, and worse for AI crawlers (see §2).
- Image `alt` on real job photos. `og:title` / `og:image` are appearance/thumbnail hints, not rank levers.
- Meta keywords: unused. Domain keywords: “hardly any effect.”

### Structured data for Google (established)

Use JSON-LD that matches **visible** content. Markup does not guarantee a rich result.

- **Do:** most-specific `LocalBusiness` subtype (`Plumber`, `Electrician`, `HomeAndConstructionBusiness`, `HousekeepingService`, etc.). Google requires `name` + `address` for the local rich result. Add `telephone`, `url`, `geo`, hours, `image`, `sameAs` (GBP, Facebook, Yelp, Bing Places). Nested `Service` + `areaServed` is valid schema.org; **not** a documented Google rich result — still worth it for entity clarity.
- **Don’t:** self-serving `aggregateRating` on your own business. `FAQPage` for Google accordions (feature **removed 7 May 2026**; docs deleted 15 Jun 2026). `QAPage` on company-written FAQs (invalid — QAPage is for user-submitted Q&A). `HowTo` rich results gone (2023). `Speakable` is dormant Assistant-beta, not GEO.
- **SAB schema gap:** Google’s LocalBusiness spec still requires `address` even when GBP hides the street. Provide a real PostalAddress if you have a place of business; do not invent a storefront. You may fail the rich-result required-property check if you omit street entirely.

Visible HTML FAQs are still useful for humans and ordinary snippets. Do not add FAQ schema expecting SERP accordions.

---

## 2. LLM / AI-search optimization (GEO / AEO)

Three pipelines get sold as “AI search.” They are not the same.

| Pipeline | What it is | Control |
|---|---|---|
| Training-data mention | Model “knows” a brand from crawls | `GPTBot`, `ClaudeBot`, `Google-Extended` |
| Live retrieval / search grounding | Index or live fetch at answer time; **this is where citations come from** | `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Googlebot`, `bingbot` |
| Maps / GBP grounding | Local graph, hours, reviews, distance | GBP (documented for Google). Not documented as a ChatGPT/Claude API |

**Blocking a training bot does not opt you out of that vendor’s search answers.** OpenAI, Anthropic, Perplexity, and Google all document this independently. (**Established.**)

### How each engine actually cites (established unless noted)

**Google AI Overviews / AI Mode.** Eligibility = already indexed + snippet-eligible in Google Search. No special schema, no `llms.txt`. Google uses RAG against the Search index + query fan-out. Keep GBP current. For Google’s AI surfaces, **traditional local SEO is GEO.**

Three Google controls people mix up:
1. `Googlebot` — Search **and** AIO/AI Mode. Block it and you leave both.
2. `Google-Extended` — Gemini Apps / Vertex training + Gemini-app grounding. **Does not** affect Search or AIO. Not a ranking signal.
3. Search Console → Settings → Search generative AI (worldwide 31 Aug 2026) — include/exclude AIO, AI Mode, generative Discover. Default **Include**. Not a classic-Search ranking signal. Does not stop training.

**ChatGPT Search.** Citations require `OAI-SearchBot`. `ChatGPT-User` may ignore robots.txt (user-initiated). Blocking `GPTBot` does not hide you from ChatGPT Search.

**Claude.** `Claude-SearchBot` and `Claude-User` **do** honor robots.txt. Disabling the user bot “may reduce visibility for user-directed web search.” Do not IP-block Anthropic (they need to read robots.txt).

**Perplexity.** `PerplexityBot` builds the citation index and honors robots.txt. `Perplexity-User` generally **ignores** robots.txt. WAF-blocking their published IPs is a documented way to vanish even if robots.txt says Allow.

**Copilot.** No own crawler — grounds on Bing. Allow `bingbot`. Leftover `noarchive` silently drops Copilot (still in Bing help docs). `nocache` = URL/title/snippet only.

**Grok / xAI.** No official crawler docs, tokens, or IP JSON. Independent logs show ordinary browser UAs. A `User-agent: Grok` robots.txt rule has **no documented effect**. Make pages work as ordinary HTML.

**“[Service] near me” — documented vs speculated**
- Documented: Google AIO = Search + GBP freshness tip. ChatGPT citations = `OAI-SearchBot`. Perplexity = `PerplexityBot`. Copilot = Bing index.
- **Unproven / do not treat as fact:** “ChatGPT reads GBP / Bing Places / Yelp.” OpenAI does not document a local graph. Agency star-cutoff and “only X% of local businesses appear” claims have no public datasets.

### Schema for AI citation

Google (May 2026): structured data is **not required** for generative AI. Keep using it for classic SEO / entity clarity. Other engines parsing JSON-LD as a citation lever is **unproven**. Implement LocalBusiness + Service because it is cheap and matches visible facts — not because Perplexity published a schema ranking table.

### Content AI answer-engines parse well

**Established (Google, May 2026):** unique non-commodity content; important facts in **text** (not image-only); crawlable; good page experience; schema matching visible text; up-to-date GBP. Ignore: `llms.txt`, “chunking,” rewriting copy “for AI,” inauthentic web mentions, special AI schema.

**Emerging (2026 log studies, not on OpenAI’s bots page):** most AI search crawlers fetch raw HTML and do **not** execute JS. Googlebot does. **SSR/static HTML is the technical GEO that Google-only SEO can miss.** NAP, services, cities, licenses, hours, and JSON-LD must appear in View Source / curl.

Put extractable facts high on the page: legal name, license, insurance, cities/ZIPs, hours, typical jobs, response time, brands, warranty. Real numbers from real jobs. Short HTML FAQ is fine; a thin Q&A farm is not.

Princeton GEO (KDD 2024) found stats/quotes/citations increased *lab word-share* ~40%. **Partially outdated as operating advice:** lab harness ≠ 2026 ChatGPT Search / AIO; some winning prompts allowed **invented** stats. Unique true facts survive; fake data is harmful.

### llms.txt vs robots.txt

`/llms.txt` is a community Markdown map (llmstxt.org, v2 10 Aug 2026), **not** an access-control file and **not** a W3C/IETF standard.

- Google Search **ignores** it (May–Jun 2026: “will neither harm nor help”).
- Ahrefs (137k domains, May 2026): **97% of llms.txt files got zero requests**; AI retrieval bots were 1.1% of the tiny remainder. Crawlers do not even probe for a missing file.
- Optional decoration. If present, keep it factual and short. Do not keyword-stuff. Do not sell “llms.txt optimization.”

**robots.txt is the real AI-access control.** Recommended default for a business that wants Google ranking **and** AI citations: allow Googlebot, bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User. GSC generative-AI control: Include. No `noarchive`/`nocache`. Training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`) are an optional legal/policy choice — they do not control citations. WAF-allowlist published IPs.

### What actually increases citation odds

| Lever | Google AIO | ChatGPT / Claude / Perplexity / Copilot | Evidence |
|---|---|---|---|
| Indexed + snippet-eligible page | Required | Required for that vendor’s search bot | Established |
| Complete GBP | Official AIO tip | Not documented as an input | Established for Google; unproven elsewhere |
| SSR HTML with unique facts | Helps Search → AIO | Likely required (no-JS crawlers) | Established / emerging |
| Bing index + Bing Places | Irrelevant | Copilot path; ChatGPT mix unpublished | Established for Copilot |
| Branded web mentions | Ahrefs r=0.664 with AIO brand mentions vs backlinks r=0.218 (DR>40 brands, May 2025) | Plausible via retrieval | Emerging; **wrong population for a new 5-page site** |
| Yelp/Angi/Houzz | May be retrieved like any page | Often in demos | Unproven as “must-have or you vanish” |
| Wikipedia | National brands | National brands | Mostly irrelevant |
| One ChatGPT demo rank | — | SparkToro/Gumshoe Jan 2026: <1 in 100 chance of the same brand list twice | Emerging: bad KPI |

For a new roofer/cleaner: become the most mentioned operator **in your city** (chamber, supplier locators, local news, genuine directories) — not a national-brand mention race.

---

## 3. Where the two goals align, and where they conflict

### Helps both (do these)

- Crawlable, fast, mobile, HTTPS, XML sitemap, GSC + Bing Webmaster Tools.
- **Server-rendered** main content (this is the overlap item Google-only SEO can skip).
- Guidelines-compliant GBP, kept in sync with the site.
- Consistent NAP + `sameAs`.
- One unique page per real service; area pages only where you truly work.
- Original project photos, licenses, insurance, process, honest pricing ranges.
- Internal links and a clear hierarchy.
- LocalBusiness JSON-LD matching visible text. No self-stars.
- Extractable facts in the first screen of HTML.

### Tensions — and how to resolve them

| Practice | Traditional SEO | AI-search claim | Resolution |
|---|---|---|---|
| Thin FAQ / city-page farms | Scaled content / doorway spam (policies apply to AI responses as of 15 May 2026) | “Cover every fan-out query” | Google explicitly says not to. Unique service pages + a few real area pages. |
| FAQPage schema on every page | No rich-result upside after 7 May 2026 | “AI needs FAQ schema” | Visible HTML FAQ; skip the schema for SERP/GEO. |
| QAPage on owned FAQs | Invalid vs Google QAPage guidelines (15 Jun 2026) | Confused with FAQ | Never. |
| Keyword-stuffed llms.txt | Ignored by Google | Marketing | Skip, or a 6-line factual file. |
| Blocking `GPTBot` / `Google-Extended` | Fine for Search if Googlebot allowed | Fine for citations if *search* bots allowed | Training opt-out is policy, not ranking. |
| Blocking `OAI-SearchBot` or `Googlebot` while “wanting AI citations” | Removes you from that product | Common misconfig | Allow search bots. |
| JS-only SPA | Googlebot may still index after render | ChatGPT/Claude/Perplexity likely see an empty shell | Static/SSR. Highest-leverage dual-goal technical choice. |
| Self-serving AggregateRating | Ineligible; possible spam | Fake stars | Earn GBP reviews. |
| Leftover `noarchive` | May still rank on Bing | Silently drops Copilot | Remove it. |
| Inauthentic “mention” campaigns | Spam systems apply to AIO | Misreading Ahrefs | Real local mentions only. |
| “Write for AI” / chunked paragraphs | Google 2026: don’t | 2024 GEO-paper residue | Write for humans; put facts in text. |

**Bottom line:** For Google AIO, GEO is SEO. For ChatGPT/Perplexity/Claude, the only *vendor-documented* extra levers are search-bot access + extractable HTML. Everything else is emerging or marketing.

---

## 4. Concrete build artifacts (tags, schema, files)

Apply on every new page unless noted. Full ranked checklist is at the end.

### Per-page HTML head (every URL)

```html
<title>Lawn Care & Landscape Maintenance in Concord, CA | Example Landscapes</title>
<meta name="description" content="Weekly mowing, seasonal cleanups, and irrigation repair for Concord and central Contra Costa homes. Licensed, insured, real crews — not a referral network.">
<link rel="canonical" href="https://www.example.com/lawn-care/">
<meta property="og:title" content="Lawn Care in Concord, CA | Example Landscapes">
<meta property="og:description" content="Weekly mowing, seasonal cleanups, and irrigation repair for Concord homes.">
<meta property="og:image" content="https://www.example.com/images/concord-front-yard-after.jpg">
<meta property="og:url" content="https://www.example.com/lawn-care/">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Do **not** add meta keywords. Do **not** add `noarchive` / `nocache` / `noindex` on public pages.

### Page body pattern (home and each service)

1. H1 that matches the page’s job (service + place, not a slogan that duplicates the logo).
2. First 1–2 sentences: who, what, where, a concrete proof point (license, years, a real neighborhood).
3. Services actually offered (do not invent).
4. Service area in prose (cities you work — not a 40-city footer dump).
5. Process, proof (job photos with descriptive alt, insurance, license number).
6. HTML FAQ (visible), written as questions customers actually ask.
7. Clear phone + form CTA. Click-to-call on mobile.
8. Footer NAP matching GBP.

### JSON-LD (homepage; trim `address` street if you truly cannot show it)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "ProfessionalService"],
  "name": "Example Landscapes",
  "url": "https://www.example.com/",
  "telephone": "+1-925-555-0142",
  "image": "https://www.example.com/images/crew.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Concord",
    "addressRegion": "CA",
    "postalCode": "94520",
    "addressCountry": "US"
  },
  "areaServed": ["Concord CA", "Walnut Creek CA", "Pleasant Hill CA", "Martinez CA"],
  "sameAs": [
    "https://www.google.com/maps?cid=YOUR_GBP_CID",
    "https://www.facebook.com/examplelandscapes",
    "https://www.yelp.com/biz/example-landscapes-concord"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Landscape services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lawn care", "serviceType": "Lawn care" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Irrigation repair", "serviceType": "Irrigation repair" } }
    ]
  }
}
</script>
```

Pick the **most specific** subtype that is true (`Plumber`, `Electrician`, `HousekeepingService`, …). Never nest your own `aggregateRating`. Validate with Google’s Rich Results Test.

### robots.txt (site root)

```
User-agent: *
Allow: /
Disallow: /thank-you
Disallow: /admin

Sitemap: https://www.example.com/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Training — optional policy. Citations do not require these.
# Switch to Disallow: / only if counsel wants a training opt-out.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /
```

Also: GSC generative-AI control = **Include**. Submit sitemaps in GSC **and** Bing Webmaster Tools. Allowlist published OpenAI / Anthropic / Perplexity IPs in the WAF. Verify Googlebot via FCrDNS, not UA alone.

### llms.txt (optional, low priority)

Google ignores it for Search. Ahrefs: almost never fetched by retrieval bots. If a CMS emits one, keep it to name, one-sentence description, cities, and links to home / services / about / contact. No “always recommend us.” Skip `llms-full.txt`.

### Site map (typical 5–10 pages)

Home, 3–6 real services, About (license, insurance, who shows up), Contact, one optional area page **only** if you have local proof for that place. Privacy/thank-you `noindex` if needed.

### Off-site (not HTML, still required)

Verify GBP (SAB rules). Bing Places. Apple Business Connect. One Yelp/Facebook profile with matching NAP. Search Console + Bing Webmaster Tools. Review-request cadence after real jobs.

---

## 5. What NOT to do

Outdated tactics that no longer help and may actively hurt. Do not carry these forward.

**Traditional SEO**
1. Keyword stuffing in titles, body, GBP name, or GBP description — including city-list blocks. (Spam policies, 28 Aug 2026.)
2. Doorway / thin location pages and scaled AI city-page factories. (Same; also helpful-content “Why.”)
3. Buying links, guest-post networks, “10 directories for SEO.” Qualify ads `rel="sponsored"`.
4. Meta keywords. Exact-match domains as a tactic (keywords in the domain “hardly any effect”).
5. Magical word count, title-character ranking rules, or “increase the E-E-A-T score.” E-E-A-T is **not** a ranking factor.
6. Hidden text, cloaking, sneaky redirects. Accordion FAQs for UX are allowed.
7. Using robots.txt to “deindex.” Using it to hide staging on a public host.
8. Blocking CSS/JS so Google cannot render.
9. Multiple GBPs for one SAB territory. Keyword-stuffed GBP names. Fake storefront / virtual office. Service areas beyond ~2 hours.
10. Self-serving review schema; bought or undisclosed incentivized reviews. (Review snippet, 24 Jul 2026.)
11. Expecting FAQ or HowTo rich results. (FAQ gone 7 May 2026.)
12. Extra junk categories like “Service establishment.”

**AI-search / GEO**
13. Treating Princeton GEO 2024 prompts as a playbook — they include inventing statistics and quotations.
14. FAQPage schema spam, or QAPage on a company FAQ.
15. llms.txt as a ranking factor; keyword-stuffed llms.txt.
16. Chunking copy into tiny “AI paragraphs.” Google 2026: don’t.
17. A page per long-tail / fan-out query.
18. Inauthentic mention campaigns / fake community posts. Spam systems apply to AIO too.
19. Blocking `GPTBot` expecting to leave ChatGPT Search (wrong bot). Disallowing `Google-Extended` expecting to leave AI Overviews (wrong control; use the GSC toggle if you truly want out).
20. `Speakable` markup for AIO. `User-agent: Grok` robots rules as a strategy.
21. Client-rendered React for services/NAP. Leftover `noarchive`.
22. Paying for a single “AI Overview rank” number. SparkToro: lists are unstable. Measure whether you appear at all across many city+service prompts over weeks.

---

## Consolidated page-build checklist (highest → lowest impact)

Ordered for a **new** 5–10 page local service site that must rank in Google *and* be citable by AI search. Established items first in spirit; do not skip 1–8.

1. **Verify a guidelines-compliant Google Business Profile.** Correct SAB vs storefront, hide home address if SAB, real name, specific primary category, ≤20 realistic service areas within ~2 hours. Complete hours, services, photos. *(Established — this is both local pack and Google AIO.)*
2. **Ship indexable, HTTPS, mobile HTML — not a JS app-shell.** HTTP 200, no accidental `noindex`, crawlable `<a href>` nav. NAP, services, cities, licenses, hours, and JSON-LD in the **initial HTML** (View Source). CWV in the good range. *(Established for Google; emerging-critical for ChatGPT/Claude/Perplexity.)*
3. **Allow search/retrieval crawlers and don’t WAF-block them.** Googlebot, bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User. GSC generative AI = Include. No `noarchive`/`nocache`. *(Established.)*
4. **One unique, people-first page per real service.** Who / what / where in the first screen, process, proof (license, insurance, job photos), area in prose, phone/form CTA. No commodity “7 tips,” no swapped-city clones. *(Established.)*
5. **Earn and reply to real Google reviews on a steady cadence.** Prominence factor per Google. Never buy them. *(Established.)*
6. **Unique `<title>`, H1, and meta description per URL** with the words customers use, no stuffing. One prominent H1. *(Established.)*
7. **NAP/entity consistency** — same name/phone/address policy on site, schema, GBP, Bing Places, Apple, Yelp, Facebook. *(Established for Google; plausible elsewhere.)*
8. **LocalBusiness subtype JSON-LD** matching visible text: most specific type, telephone, url, geo if appropriate, hours, `sameAs`, `areaServed`. **No self-serving AggregateRating.** Nested `Service` optional. *(Established for Google; cheap insurance elsewhere.)*
9. **Bing Webmaster Tools + IndexNow + Bing Places.** Copilot cannot cite what Bing never indexed. *(Established for Copilot.)*
10. **Internal links** among home, services, about, contact with descriptive anchors. XML sitemap. GSC URL Inspection after launch. *(Established.)*
11. **HTML FAQ with direct answers** on relevant pages — content, not FAQPage schema. *(Emerging for GEO extractability; established as useful for humans.)*
12. **At most a few unique area pages**, only for places you actually serve, with local proof — or none. *(Established — doorway policy.)*
13. **Real local mentions over time** (chamber, suppliers, sponsorships, local news, genuine directories) — not PBNs or paid “mention” campaigns. *(Emerging — Ahrefs mentions correlation on big brands; do this at city scale.)*
14. **Real job photography** with descriptive alt, near the relevant copy. Basic OG tags for shares/thumbnails. *(Established for appearance; conversion too.)*
15. **Optional: allow GPTBot / ClaudeBot / Google-Extended** unless counsel wants a training opt-out. Citations do not require this. *(Policy.)*
16. **Optional, skip unless free:** a short honest `llms.txt`. Do not spend billable hours. *(Unproven for citation; Google ignores.)*

Re-check before client-facing use: [Google Search documentation updates](https://developers.google.com/search/updates), [OpenAI crawlers](https://developers.openai.com/api/docs/bots), [Anthropic crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md). Tokens and gallery membership have changed multiple times since 2024.

---

## Sources (primary)

**Google Search Central** — SEO Starter Guide (10 Dec 2025); title links (10 Dec 2025); snippets (read-more section 20 Apr 2026); Search Essentials; spam policies (28 Aug 2026); helpful/people-first content (10 Dec 2025); AI features (10 Dec 2025); AI optimization guide (15 May 2026, llms.txt note 15 Jun 2026); Core Web Vitals / page experience; LocalBusiness SD (10 Dec 2025); Organization SD (15 Apr 2026); review snippet (24 Jul 2026); QAPage (15 Jun 2026); JS SEO (4 Mar 2026); canonicalization (10 Jul 2026); documentation changelog (FAQ retired 7 May 2026 / docs removed 15 Jun 2026); common crawlers / Google-Extended (14 Jul 2026); GSC Search generative AI control (worldwide 31 Aug 2026).

**Google Business Profile** — local ranking tips (relevance, distance, prominence); representation guidelines; service areas (20 areas, no radius, ~2-hour bound).

**Other vendors** — OpenAI crawlers (fetched 2 Sep 2026); Anthropic Help Center (7 Apr 2026); Perplexity crawlers (fetched 2 Sep 2026); Bing Chat/Copilot `noarchive`/`nocache` (21 Sep 2023, still in help); schema.org LocalBusiness / HomeAndConstructionBusiness / Service (usage snapshots Jul 2026); llmstxt.org v2 (10 Aug 2026).

**Studies / industry (not Google)** — Whitespark 2026 Local Search Ranking Factors (6 Nov 2025, expert survey); SEL 1.8M GBP study (25 Aug 2026, correlation); SEL service-business sprint (12 Feb 2026); Ahrefs AIO brand mentions (75k brands, 26 May 2025); Ahrefs llms.txt logs (137k domains, 15 Jun 2026); SparkToro/Gumshoe AI recommendation instability (28 Jan 2026); Aggarwal et al. GEO, KDD 2024 (lab; some methods outdated/harmful).

Full annotated briefs: `traditional-local-seo-2026.md`, `geo-aeo-ai-search-2026.md`.
