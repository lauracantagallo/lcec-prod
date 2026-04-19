# Site TODO

Category tags: `[a11y]` `[seo]` `[optimization]` `[security]` `[content]`

---

## Before Launch — Blockers

- [ ] **Configure Web3Forms** `[security]` — create a free account at web3forms.com (use Laura's email), get the access key, then add it as a GitHub Actions secret named `WEB3FORMS_KEY` in both `lcec-prod` and `lcec-dev` repos (Settings → Secrets and variables → Actions)
- [ ] **Configure GA4** `[seo]` — get tracking ID from Google Analytics, set `"gaId": "G-XXXXXXXXXX"` in `src/_data/site.json`
- [ ] **GA4 consent gating** `[security]` — GA4 fires before cookie consent is acknowledged; implement GA4 Consent Mode or delay `gtag` init until the accept button is clicked
- [ ] **Custom domain on `lcec-prod`** `[seo]` — configure DNS (CNAME/A record pointing to `lauracantagallo.github.io`), then set the `PATH_PREFIX` repo variable to `/` in `lcec-prod` so asset paths resolve correctly
- [ ] **Test contact form end-to-end** `[content]` — submit a real entry and confirm Laura receives the email with correct reply-to (requires Web3Forms key above)

---

## Before Launch — Should Do

- [ ] **Fix Accessibility Services page bottom spacing** `[content]` — excess or missing space below the page content; audit padding/margin on the last section and align with other pages
- [ ] **Google Business Profile** `[seo]` — create a profile for LC Education Consulting, then paste the URL into `site.json` → `"googleBusinessUrl"`; it will automatically appear in the business schema `sameAs` array
- [ ] **Google Search Console** `[seo]` — verify ownership by pasting the GSC verification code into `site.json` → `"gscVerificationId"`; then submit the sitemap
- [ ] **`og:image`** `[seo]` — currently uses a generic `/img/og-image.png`; a real branded image (1200×630) would improve link previews on LinkedIn, Slack, and iMessage
- [ ] **Laura's personal LinkedIn** `[seo]` — if she has one, add the URL to the `Person` schema `sameAs` in `head.njk` (or add a `founderLinkedinUrl` field to `site.json`)
- [ ] **Business hours** `[seo]` — confirm with Laura, then add `openingHoursSpecification` to the `ProfessionalService` schema in `head.njk`
- [ ] Review `contact-success` page `[content]` — visual check that it renders cleanly and has a clear next step for the user
- [ ] Style 404 page `[content]`
- [ ] Screen reader testing `[a11y]`

---

## Security

- [ ] **npm audit in CI** `[security]` — add `npm audit --audit-level=high` to the GitHub Actions workflow so dependency vulnerabilities fail the build
- [ ] **Content Security Policy** `[security]` — add `<meta http-equiv="Content-Security-Policy">` or a `_headers` file to restrict script/style sources; GA4, Web3Forms, and fonts are the main allowed origins
- [ ] **Referrer-Policy** `[security]` — add `<meta name="referrer" content="strict-origin-when-cross-origin">` to `head.njk`
- [ ] **SRI hash on GA4 script** `[security]` — add `integrity` attribute to the Google Tag Manager `<script>` once the GA4 tracking ID is configured

---

## Optimization

- [ ] **PurgeCSS** `[optimization]` — strip unused CSS at build time; must carefully safelist JS-toggled classes (`.is-open`, `.nav-open`, `.has-error`, `.is-visible`, `.is-collapsed`, `.modal-open`) to avoid stripping active-state styles
- [ ] **Touch target sizes** `[a11y]` `[optimization]` — `.mobile-nav-toggle` and `.mobile-nav__close` currently have `padding: 0` with 24×24px SVGs (meets WCAG 2.5.8 minimum exactly). Consider adding `padding: 8px` to push tap target toward the 44×44px WCAG 2.5.5 AAA recommendation

---

## Assistive Technology Testing

> **AI-generated items — not yet manually vetted.** The following were suggested by an AI assistant and should be reviewed and confirmed by a human accessibility specialist before marking complete.

- [ ] **`aria-modal` JAWS compatibility** `[a11y]` — confirm the exit modal dialog is announced correctly by JAWS; `aria-modal` is not fully supported in older JAWS versions and may require a scroll-lock fallback
- [ ] **`aria-live` JAWS test** `[a11y]` — verify contact form `aria-live` error regions are read aloud by JAWS on field blur and form submit
- [ ] **Heading navigation** `[a11y]` — test all pages with NVDA/JAWS heading navigation (H key) to ensure heading hierarchy is logical and complete
- [ ] **Landmark navigation** `[a11y]` — verify `<header>`, `<main>`, `<nav>`, `<footer>`, and any `<section>` elements are reachable and correctly labeled when navigating by landmark
- [ ] **TalkBack (Android)** `[a11y]` — test core user flows (nav, contact form, CTA links) with TalkBack enabled on Android
- [ ] **VoiceOver iOS** `[a11y]` — test core user flows with VoiceOver on iPhone; pay attention to modal focus and swipe navigation
- [ ] **Reflow at 400% zoom** `[a11y]` — verify no content is lost or requires horizontal scrolling when the browser is set to 400% zoom (WCAG 1.4.10)
- [ ] **Text resize at 200%** `[a11y]` — verify layout does not break when browser font size is set to 200% (WCAG 1.4.4)
- [ ] **Dark mode** `[a11y]` — check that text contrast and image legibility hold in OS-level dark mode; the site does not currently declare a `color-scheme`
- [ ] **Focus visibility at 200% DPI scale** `[a11y]` — test focus outlines remain visible on Windows with display scaling at 200%
- [ ] **No-JS nav fallback** `[a11y]` — the mobile nav toggle requires JavaScript; confirm the navigation is still reachable without JS (at minimum the desktop nav should be visible)

---

## CMS

- [ ] **Wire `testimonials.json` to templates** — CMS edits to Testimonials currently don't appear on the site; templates still pull quotes from page frontmatter. To fix: update `testimonial.njk` and the why-choose-us / homepage layouts to read from `testimonials.items` instead of hardcoded frontmatter fields.
- [ ] **Test CMS end-to-end on staging** — log in to `lauracantagallo.github.io/lcec-dev/admin`, make a small edit (e.g. announcement bar text), save, confirm the site rebuilds and the change appears on the staging URL within ~3 minutes.

---

## Nice to Have

- [ ] **Web3Forms `from_name`** `[content]` — JS snippet to sync the `your_name` field into the hidden `from_name` input before submit, so Laura's inbox shows the submitter's name instead of "LC Education Consulting"
- [ ] **Review schema** `[seo]` — once Google Business reviews exist, add `AggregateRating` to the `ProfessionalService` schema for potential star rating rich results

---

## Code Quality

- [x] Fix `storageGet`/`storageSet` infinite recursion — both functions called themselves instead of `localStorage`; cookie consent, announcement, and footer nav state never persisted
- [x] Fix unclosed `<a>` tag in `footer.njk` footer brand link
- [x] Dereference hardcoded phone in `header.njk` — now uses `{{ office.phone_href }}` / `{{ office.phone }}`
- [x] Extract `makeCollapseToggle` factory in `main.js` — shared by `initAnnouncementToggle` and `initFooterNavToggle`
- [x] Replace `innerHTML` SVG injection in `initExternalLinks` with `createElementNS` DOM API calls
- [x] Remove dead `.social-link--vcard` handler from `main.js` (dev-branch contamination)

## DRY Opportunities

- [x] **Calendar URL** repeated 4× — centralized in `site.json` as `calendar_url`; templates use `{{ cta.button_url or site.calendar_url }}`
- [x] **`.heading--section` / `.detail-heading`** — shared `%heading-section-base` placeholder in `_typography.scss`; classes now only override the mobile `font-size`
- [x] **Phone/email in front matter** — never was; layouts already reference `office.*` from `_data/office.json`
- [x] **`.form-input` / `.form-textarea`** — `%form-field-base` placeholder already existed in `_forms.scss`
- ~~**Contact block partial**~~ — `contact.njk` and `contact-success.njk` use different section classes and link styles throughout; a partial would require too many parameters to be cleaner than the current two small blocks

---

## Resolved

- [x] Internal links added to Our Story and Why Choose Us body copy — links to `/accessibility-services/` and `/webinars-and-training/`; `| safe` filter added to both layout templates to render anchor tags in frontmatter strings
- [x] Heading hierarchy fix — Webinars & Training page was rendering the same text at both `<h1>` and `<h2>`; fixed by adding `trainings_heading: "Training Topics"` to front matter
- [x] Placeholder text contrast — `#a9a9a9` (~2.35:1 on white, WCAG fail) replaced with `$color-placeholder: #6b6b6b` (~5.3:1 on white, WCAG AA pass)
- [x] Removed `twitterHandle` from `site.json` and `twitter:site` meta tag from `head.njk` — Laura does not use Twitter
- [x] `loading="lazy"` — added to `webinars-and-training.njk` image (already present on all other below-fold images)
- [x] Image `width`/`height` attributes — added `width="600" height="400"` to `webinars-and-training.njk` and `why-choose-us.njk` career photo to prevent layout shift (CLS)
- [x] `<picture>` WebP wrapper — `webinars-and-training.njk` now serves `.webp` with `.jpg` fallback; career and Laura headshot images already serve `.webp` directly (no `.jpg` originals exist)
- [x] Google Search Console verification — conditional `<meta name="google-site-verification">` tag added; populate `"gscVerificationId"` in `site.json` to activate
- [x] `robots.txt` sitemap URL verified — points to `https://www.lceducationconsulting.com/sitemap.xml`, matches `site.url`; correct for production
- [x] `<meta name="description">` per page — all pages have unique `description` in front matter; `head.njk` uses it with a site-level fallback
- [x] Sitemap `priority` and `changefreq` — homepage `1.0`/`weekly`, all other pages `0.8`/`monthly`
- [x] Decap CMS — implemented on `lcec-dev` only; not part of `main`/`lcec-prod` (see `CHANGELOG.md`)
- [x] Move `web3formsKey` out of `site.json` — now injected at build time via `src/_data/env.js`; secret stored in GitHub Actions as `WEB3FORMS_KEY`
- [x] SEO enhancements — page-first titles, `sameAs`, Person schema, structured `areaServed`, removed dead preconnect (see `CHANGELOG.md`)
- [x] Replace Netlify Forms with Web3Forms — `contact.njk` updated; access key via `{{ env.web3formsKey }}`
- [x] Add axe-core a11y linting — `npm run lint:a11y` scans all built HTML in `dist/` using axe-core + jsdom
- [x] Web3Forms reply-to — email field `name="replyto"`; `from_name` set to "LC Education Consulting"
- [x] Pre-launch checklist documented — set `PATH_PREFIX: /` in workflow, replace GA4 + Web3Forms key placeholders, verify `robots.txt` sitemap URL matches domain
- [x] Cleanup services subpages designs
- [x] Make mobile icon more prominent
- [x] Mobile menu current page indicator
- [x] Ensure invisible controls are not keyboard accessible
- [x] Ensure mobile menu traps keyboard
- [x] Remove dead code
- [x] Fix ghost button focus style
- [x] Ensure WCAG text spacing is fully implemented (line height 1.5×, paragraph spacing 2×, letter spacing 0.12em, word spacing 0.16em)
- [x] Focus outline mixin — `@mixin focus-outline($color)` implemented in `src/scss/_variables.scss`
- [x] `prefers-reduced-motion`, `prefers-contrast`, `forced-colors` — all respected in CSS

---

## Obsolete

- ~~Wire up Umami~~ — removed; GA4 added in its place (see Configure GA4 above)
