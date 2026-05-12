# Site TODO

Category tags: `[a11y]` `[seo]` `[optimization]` `[security]` `[content]`

---

## Before Launch — Blockers

- [ ] **Custom domain on `lcec-prod`** `[seo]` — configure DNS (CNAME/A record pointing to `lauracantagallo.github.io`), then confirm `PATH_PREFIX` repo variable is `/` in `lcec-prod`
- [ ] **Test contact form end-to-end** `[content]` — submit a real entry and confirm Laura receives the email with correct reply-to
- [ ] **Style 404 page** `[content]`
- [ ] **Screen reader testing** `[a11y]`

---

## Before Launch — Should Do

- [ ] **Google Search Console** `[seo]` — verify ownership by pasting the GSC verification code into `site.json` → `"gscVerificationId"`; then submit the sitemap
- [ ] **`og:image`** `[seo]` — currently uses a generic `/img/og-image.png`; a real branded image (1200×630) would improve link previews on LinkedIn, Slack, and iMessage
- [ ] **Laura's personal LinkedIn** `[seo]` — if she has one, add the URL to the `Person` schema `sameAs` in `head.njk` (or add a `founderLinkedinUrl` field to `site.json`)
- [ ] **Business hours** `[seo]` — confirm with Laura, then add `openingHoursSpecification` to the `ProfessionalService` schema in `head.njk`
- [ ] **Review `contact-success` page** `[content]` — visual check that it renders cleanly and has a clear next step for the user

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

- [ ] **Test CMS end-to-end on staging** — log in to `mikeyil.github.io/lcec-dev/admin`, make a small edit (e.g. announcement bar text), save, confirm the site rebuilds and the change appears on the staging URL within ~3 minutes.

---

## Post-Launch — Content

- [ ] **Portfolio project outcomes** `[content]` — add optional `outcome` field to portfolio card template; Laura fills in 2–3 sentences per project via CMS (see CONTENT_SUGGESTIONS #23)
- [ ] **Webinar example topics** `[content]` — add optional `examples` sub-list to each training category in front matter; Laura supplies topic titles via CMS (see CONTENT_SUGGESTIONS #24)
- [ ] **Service deliverable lines** `[content]` — add optional `deliverable` field per service block; draft from standard consulting deliverables, refine with Laura (see CONTENT_SUGGESTIONS #25)
- [ ] **Additional testimonials** `[content]` — `testimonials.json` already supports multiple entries; add new ones via CMS as Laura collects them (see CONTENT_SUGGESTIONS #26)
- [ ] **FAQ section** `[content]` — add `src/_data/faq.json` and a `faq.njk` accordion partial using existing collapse-toggle JS; seed with 4 starter questions (see CONTENT_SUGGESTIONS #27)
- [ ] **Third hero CTA** `[content]` — add "Send Us a Message" link to hero as a low-commitment option for visitors not ready to book; no new assets needed (see CONTENT_SUGGESTIONS #28)

---

## Nice to Have

- [ ] **Dark mode / `color-scheme`** `[a11y]` `[optimization]` — declare `<meta name="color-scheme" content="light dark">` and a `prefers-color-scheme: dark` CSS block to opt the site into OS-level dark mode; design tokens make this straightforward but requires contrast checks on all color pairs in dark context
- [ ] **Web3Forms `from_name`** `[content]` — JS snippet to sync the `your_name` field into the hidden `from_name` input before submit, so Laura's inbox shows the submitter's name instead of "LC Education Consulting"
- [ ] **Review schema** `[seo]` — once Google Business reviews exist, add `AggregateRating` to the `ProfessionalService` schema for potential star rating rich results

---

## Resolved

- [x] **Configure Web3Forms** `[security]` — real key injected via `WEB3FORMS_KEY` GitHub Actions secret
- [x] **Configure GA4** `[seo]` — tracking ID `G-QX0EYR2295` set in `src/_data/site.json`
- [x] **GA4 consent gating** `[security]` — GA4 loads from JS only after cookie consent; `data-ga-id` on `<body>` passes the ID
- [x] **Confirm phone numbers with Laura** `[content]` — using `856-310-4483` (Google Voice) everywhere; removed old personal cell `302-750-7443`
- [x] **Google Business Profile** `[seo]` — URL confirmed in `site.json` → `"googleBusinessUrl"`
- [x] **Review CONTENT_SUGGESTIONS with Laura** `[content]` — items #2–22 resolved; #23–28 deferred to post-launch
- [x] **Wire `testimonials.json` to templates** — `testimonial.njk` reads `testimonials.items[0]`; homepage uses `short` field, why-choose-us uses full `text`
- [x] Fix `storageGet`/`storageSet` infinite recursion — cookie consent, announcement, and footer nav state now persist correctly
- [x] Fix unclosed `<a>` tag in `footer.njk` footer brand link
- [x] Dereference hardcoded phone in `header.njk` and `footer.njk` — now uses `{{ office.phone_href }}` / `{{ office.phone }}`
- [x] Extract `makeCollapseToggle` factory in `main.js` — shared by `initAnnouncementToggle` and `initFooterNavToggle`
- [x] Replace `innerHTML` SVG injection in `initExternalLinks` with `createElementNS` DOM API calls
- [x] Remove dead `.social-link--vcard` handler from `main.js`
- [x] `_reset.scss` refactor — removed dead rules, fixed `scroll-behavior` reduced-motion guard, removed `textarea:focus { outline: none }` a11y violation, cleared fieldset magic numbers
- [x] Wire `@a11yfred/neighbor` Stylelint plugin — `no-outline-none`, `no-forced-colors-none`, `user-preferences` rules active
- [x] **Calendar URL** — centralized in `site.json` as `calendar_url`
- [x] **`.heading--section` / `.detail-heading`** — removed from `_typography.scss`; templates migrated to `content-blocks__heading text-uppercase`
- [x] **`.form-input` / `.form-textarea`** — `%form-field-base` placeholder shared between both
- [x] Register `toWebP` filter in `.eleventy.js` — used by `our-story.njk` and `portfolio.njk` `<picture>` elements
- [x] Fix `site.url` mismatch — aligned `.eleventy.js` with `site.json` (`www.lceducationconsulting.com`)
- [x] npm audit fix — fast-uri path traversal vulnerabilities patched
- [x] Regenerate `package-lock.json` — resolved `npm ci` sync errors blocking CI builds
- [x] Accessibility Services page bottom spacing — `content-blocks__grid` uses `margin-bottom: $space-32px`
- [x] Footer nav driven from `navigation.json` — single source of truth; `hideFromFooter: true` skips Home
- [x] Social section on/off toggle — `showSocial` boolean and `socialHeading` in `site.json`
- [x] `handleFocusTrap` shared utility — extracted to `utils/dom.js`
- [x] Hardcoded `"LC Education Consulting"` replaced with `{{ site.name }}` sitewide
- [x] `@mixin link-state-primary` and `@mixin link-state-on-dark` — applied across nav and footer
- [x] Internal links added to Our Story, Why Choose Us, Portfolio, and Webinars & Training body copy
- [x] Heading hierarchy fix — Webinars & Training `<h2>` now renders `trainings_heading`
- [x] Placeholder text contrast — `$color-placeholder: #6b6b6b` (~5.3:1 on white, WCAG AA pass)
- [x] Removed `twitterHandle` from `site.json` and `twitter:site` meta tag
- [x] `loading="lazy"` on all below-fold images
- [x] Image `width`/`height` attributes on Webinars & Training and Why Choose Us photos
- [x] `<picture>` WebP wrapper on `webinars-and-training.njk`
- [x] Google Search Console verification meta tag — conditional on `site.gscVerificationId`
- [x] `robots.txt` sitemap URL verified — matches `site.url`
- [x] Per-page `<meta name="description">` — all pages have unique descriptions
- [x] Sitemap `priority` and `changefreq` per URL
- [x] Decap CMS — on `mikeyil/lcec-dev` staging only
- [x] Move `web3formsKey` out of `site.json` — injected at build time via `src/_data/env.js`
- [x] SEO enhancements — page-first titles, `sameAs`, Person schema, structured `areaServed`
- [x] Replace Netlify Forms with Web3Forms
- [x] axe-core a11y linting — `npm run lint:a11y`
- [x] Web3Forms reply-to — email field `name="replyto"`
- [x] Mobile nav animation, overlay, focus trap, Escape key, current-page indicator
- [x] Ghost button focus style fix
- [x] WCAG text spacing fully implemented
- [x] `@mixin focus-outline($color)` implemented
- [x] `prefers-reduced-motion`, `prefers-contrast`, `forced-colors` respected in CSS

---

## Obsolete

- ~~Wire up Umami~~ — removed; GA4 added in its place
- ~~Contact block partial~~ — `contact.njk` and `contact-success.njk` too divergent; partial not worth the parameters
