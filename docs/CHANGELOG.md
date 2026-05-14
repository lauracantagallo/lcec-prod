# Changelog

All significant changes to the LC Education Consulting site, newest first.

---

## 2026-04-29 — Copyedit, factual accuracy, and plain-language improvements

### Content changes

#### `src/index.md`

- Hero subheading rewritten: "We work with organizations to remove barriers, improve compliance, and empower all users. Rooted in real experience with people who use assistive technology." (Previously identical to meta description; now benefit-focused and human.)
- Stats heading changed from "Most Organizations Don't Know They Have Accessibility Gaps" to "Most Organizations Don't Know Their Website Has Accessibility Problems" (insider language → plain language)
- CTA text changed from "Book a Free 30-Minute Discovery Call" to "Schedule a Free 30-Minute Introduction Call" (sales jargon → accessible language)
- Announcement body expanded DOJ: "The U.S. Department of Justice (DOJ) extended deadlines by one year" (acronym now defined on first use)

#### `src/content/our-story.md`

- Company founding year corrected from 2014 to 2017 (per Laura's confirmation)
- Mission statement rewritten from jargon-heavy ("remove barriers to access through digital accessibility, assistive technology, and inclusive training") to plain language ("make their websites, documents, and digital tools easier for everyone to use. This includes people with disabilities.")
- "Inclusive practice" changed to "inclusive practices" for consistency
- (Earlier update already addressed: "even more years" → "over a decade of hands-on experience")

#### `src/content/why-choose-us.md`

- AAC expanded: "AAC (Augmentative and Alternative Communication) devices" (already completed in earlier update)
- Added TalkBack credential: "TalkBack accessibility testing on Android devices"

#### `src/content/accessibility-services.md`

- VPAT service description grammar fixed: changed from "Documents supported, partially supported, and not supported criteria" to "Documents which accessibility criteria are supported, partially supported, or not supported"
- Case study label corrected: "Articulate 360 Courses" (not "360 Articulate"); changed dash to colon for consistency
- Digital Accessibility Audits description expanded LMS: "learning management system (LMS)"
- Added TalkBack to screen reader list: "Testing with NVDA, JAWS, VoiceOver, and TalkBack"
- VPAT description updated: "Accessibility Conformance Report (ACR/VPAT) documenting WCAG (Web Content Accessibility Guidelines) 2.1 or 2.2 AA conformance" (expanded both ACR/VPAT and WCAG terms)
- PDF & Document Remediation description clarified: "including readable by screen readers used by people who are blind or have low vision" (removed jargon, added context)

#### `src/content/webinars-and-training.md`

- Meta description changed from "professional development" to "training" (consistency with other changes)
- Intro subheading split from a 47-word sentence into four short sentences for readability:
  - "We offer customized training for K–12 schools, colleges, and organizations."
  - "Topics include assistive technology, digital accessibility, and inclusive practices."
  - "Sessions are available in-person in the New Jersey/Philadelphia area or online nationwide."
  - "Travel outside this area is available on request."
- "Professional development" changed to "training" in the "Inclusive Practices" heading description
- WCAG expanded: "WCAG (Web Content Accessibility Guidelines) principles"

#### `src/content/contact.md`

- Removed redundant third sentence from intro: "We're happy to schedule a free consultation" (duplicated the previous sentence's invitation)
- CTA text changed from "Book a Free 30-Minute Discovery Call" to "Schedule a Free 30-Minute Introduction Call"
- Meta description updated to match

#### `src/content/contact-success.md`

- CTA subheading changed from "Book a Free 30-Minute Discovery Call" to "Schedule a Free 30-Minute Introduction Call"
- Body text updated to match

#### `src/content/portfolio.md`

- Intro rewritten to lead with the work instead of "Welcome to" filler: "Each project here represents a practical, thoughtful approach to removing barriers. You'll find examples of..." (removed redundant phrasing)
- Project title changed: "Web Accessibility Evaluation Using VoiceOver: Articulate 360 Online Courses" (colon consistency; "Articulate 360" correct order)
- CTA subheading changed from "Book a Free 30-Minute Discovery Call" to "Schedule a Free 30-Minute Introduction Call"

#### `src/_includes/partials/footer.njk`

- Phone number updated from 302-750-7443 to 856-310-4483 (Laura's Google Voice number; removed outdated personal cell number)

### Style changes

- Removed emdashes (—) from all content pages; replaced with periods or reworded for clarity
  - Hero subheading: "...empower all users. Rooted in..." (was: "...all users — rooted...")
  - Mission statement: "...to use. This includes people..." (was: "...to use — including people...")
  - Digital Audits description: "...not just automated tools." (was: "...tools — not...")
  - PDF Remediation description: "...including readable by..." (was: "...readable — including...")
  - Portfolio intro: "...removing barriers. You'll find..." (was: "...barriers — from accessibility...")
  - Case study label: "Courses: VoiceOver" (was: "Courses – VoiceOver")

---

## 2026-04-21 — DRY pass, CMS-readiness, and README restructuring

### Templates

- `partials/header.njk`, `partials/footer.njk`, `layouts/contact.njk` — replaced hardcoded `"LC Education Consulting"` with `{{ site.name }}` in logo text, footer brand, copyright line, and Web3Forms `subject`/`from_name` hidden inputs

### SCSS

- `_variables.scss` — added `@mixin link-state-primary` (hover/focus on light backgrounds) and `@mixin link-state-on-dark` (hover/focus on dark backgrounds)
- `_nav.scss` — replaced four identical hover/focus blocks in `.nav__link`, `.nav__dropdown-btn`, `.nav__dropdown-link`, `.mobile-nav__link` with `@include link-state-primary`
- `_footer.scss` — replaced hover/focus blocks in `.footer-nav__link` and `.footer-brand, .footer-phone a` with `@include link-state-on-dark`

### Docs

- `README.md` — moved "About This Build" section (Accessibility, Security, Performance, SEO, Documentation) to `docs/ABOUT_BUILD.md`; replaced with a single-line link
- `docs/ABOUT_BUILD.md` — new file containing the full build methodology documentation

---

## 2026-04-21 — UI fixes, accessibility, and code consolidation

### Accessibility

- `_layout.scss` — Links inside `.section--blue p` now use `$color-primary-light` (#e3fcc2) — 7.9:1 contrast against the blue background; hover goes to white
- `_hero.scss` — `.btn--primary:focus` inside `.hero__actions` now uses a white outline (was dark green, low contrast against the olive background)
- `_components.scss` — `.btn--ghost:focus` now uses a white outline; `.btn--outline:focus` now fills with `$color-primary-dark` and sets `border-color` to match, consistent with hover

### Visual fixes

- `src/_includes/layouts/*.njk` — Six section headings across four pages (Our Philosophy, Professional Background, Why LC Education Consulting, Training Topics, Start a Conversation, Contact Us) changed to `content-blocks__heading text-uppercase` to match the "Featured Projects" reference style
- `_utilities.scss` — `.section--flush-top .content-blocks__heading` now has `margin-top: 0` so headings on flush sections (Why Choose Us, Contact) don't add unwanted top gap
- `_sections.scss` — `content-blocks__grid` spacing changed from `padding-bottom` to `margin-bottom: $space-32px` for consistent spacing below service grids
- `_sections.scss` — `credentials-layout__photo` now has `margin-top: $space-32px` at all sizes, aligning the photo with the heading on the text side
- `_forms.scss` — Removed top padding from `.contact-form-section`; added `.contact-office` block for spacing around the office/phone/email heading

### Data fixes

- `partials/social-section.njk` — LinkedIn URL was hardcoded; now uses `{{ site.linkedinUrl }}` from `site.json`

### CSS consolidation

- `_typography.scss` — Removed unused `%heading-section-base`, `.heading--section`, and `.detail-heading` (all templates migrated to `content-blocks__heading`)
- `_components.scss` — Removed unused `.card` class
- `_components.scss` — Removed redundant `padding` declaration from `.btn` desktop media query (identical to base)
- `_components.scss` — Moved floating `.section--blue .cta-block__subheading` rule inside `.cta-block` as a contextual modifier; simplified desktop padding shorthand
- `_forms.scss` — Submit button `:focus` now uses `@include focus-outline($color-primary, $radius: true)` instead of raw properties
- `_sections.scss` — Replaced five hard-coded spacing values (`1rem`, `1.5rem`, `0.5rem`) with `$space-*` tokens
- `_sections.scss` — Removed redundant `font-size: $font-size-base` in `bio-layout__body` desktop breakpoint (same as base value); `margin-top: 1rem` → `$space-16px`
- `_layout.scss` — Removed redundant `padding: $space-16px 0` from `.section--blue` (already provided by `.section`)

### JS consolidation

- `utils/dom.js` — Added `handleFocusTrap(container, event, selector?)` utility
- `main.js` — Both `initNavigation` and `initExitModal` now use `handleFocusTrap` instead of duplicated inline focus-trap logic

---

## 2026-04-18 — A11y fixes, content links, and image improvements

### `src/_includes/layouts/webinars-and-training.njk`

- Fixed duplicate heading text — `<h2>` was rendering `{{ intro.heading }}` ("Webinars and Training"), identical to the `<h1>` in the page wrapper; now renders `{{ trainings_heading }}` ("Training Topics")
- Added `<picture>` wrapper with `<source type="image/webp">` so browsers that support WebP receive the `.webp` version; `.jpg` remains as fallback
- Added `width="600" height="400"` to prevent cumulative layout shift (CLS)

### `src/content/webinars-and-training.md`

- Added `trainings_heading: "Training Topics"` front matter field to support the heading fix above

### `src/_includes/layouts/why-choose-us.njk`

- Added `width="600" height="400"` to the career photo (`about-career.webp`) to prevent CLS
- Added `| safe` filter to `{{ paragraph | safe }}` so HTML in frontmatter strings (e.g., anchor tags) renders correctly rather than being escaped

### `src/_includes/layouts/our-story.njk`

- Added `| safe` filter to `{{ paragraph | safe }}` for the same reason

### `src/content/our-story.md`

- Added internal links in body copy: "web accessibility evaluations" links to `/accessibility-services/`; "webinars and training" links to `/webinars-and-training/`

### `src/content/why-choose-us.md`

- Added internal link: "digital accessibility knowledge" links to `/accessibility-services/`

### `src/scss/_variables.scss`

- Added `$color-placeholder: #6b6b6b` — dedicated token for form placeholder text; ~5.3:1 contrast on white (WCAG AA pass). Previous value `$color-gray` (#a9a9a9) was ~2.35:1 (WCAG fail)

### `src/scss/_forms.scss`

- Changed `::placeholder` color from `$color-gray` to `$color-placeholder` in both `.form-input` and `.form-textarea`

### `src/_includes/partials/head.njk` — GSC

- Added conditional `<meta name="google-site-verification">` — renders only when `site.gscVerificationId` is set

---

## 2026-04-18 — SEO enhancements

### `src/_includes/partials/head.njk`

- Title format changed to page-first: `Page Name | LC Education Consulting` — applied to `<title>`, `og:title`, and `twitter:title`
- Business schema (`ProfessionalService`): added `sameAs` array with LinkedIn URL; `areaServed` upgraded from bare `"US"` string to structured `Country` type
- New `Person` JSON-LD block for Laura Cantagallo on every page (name, job title, portfolio URL, `worksFor`)
- Removed unused `<link rel="preconnect" href="https://calendar.app.google" />` (calendar is only an `<a>` link)

### `src/sitemap.njk`

- Added `<priority>` and `<changefreq>` to every URL entry — homepage `1.0`/`weekly`, inner pages `0.8`/`monthly`

### `src/_data/site.json`

- Added `linkedinUrl`, `googleBusinessUrl` (placeholder), and `founderUrl`

---

## 2026-04-18 — A11y, security, and optimization hardening

### `src/js/main.js`

- Replaced `innerHTML` SVG injection in `initExternalLinks` with `createElementNS` DOM API calls (eliminates XSS vector)
- Fixed `storageGet`/`storageSet` infinite recursion — both functions called themselves instead of `localStorage`; cookie consent, announcement bar, and footer nav state never persisted
- Extracted `makeCollapseToggle` factory shared by `initAnnouncementToggle` and `initFooterNavToggle`

### `src/scss/`

- `prefers-reduced-motion`: animations and transitions respect the OS setting
- `prefers-contrast`: high-contrast mode adjusts borders and fills
- `forced-colors`: SVG icons and decorative elements adapt to Windows forced-color mode

### Deployment

- Removed Netlify; both `lced-prod` and `lced-dev` deploy via GitHub Pages + GitHub Actions
- `PATH_PREFIX` moved to a per-repo GitHub Actions variable so the same workflow file serves both repos without modification
- Removed `netlify.toml` and `docs/setup-netlify.md`

---

## 2026-04-18 — Web3Forms key security

### `src/_data/env.js` *(new)*

- Reads `process.env.WEB3FORMS_KEY` at build time and exposes it to templates as `{{ env.web3formsKey }}`

### `src/_data/site.json` — Web3Forms

- Removed `web3formsKey` field — key no longer lives in the repository

### `src/_includes/layouts/contact.njk`

- Updated access key input to use `{{ env.web3formsKey }}`

### `.github/workflows/pages-main.yml`

- Added `WEB3FORMS_KEY: ${{ secrets.WEB3FORMS_KEY }}` to the build step environment

---

## 2026-04-17 — Content updates

### `src/index.md`

- Updated WebAIM Million stat from 98% to 95.9% — reflects the 2026 WebAIM Million report; label updated to include the year
- Updated ADA Title II deadlines per DOJ interim final rule extending them by one year: April 2027 (large entities, 50,000+ population), April 2028 (smaller entities)

### `src/content/*.md` — per-page meta descriptions

- Added unique `description` field to all content pages; `head.njk` uses it with a site-level fallback

---

## 2026-04-17 — SEO fixes and axe-core linting

### Content

### SEO / markup

- Removed `<meta name="keywords">` tag (no SERP value, potential spam signal)
- Fixed `tel:` href country code — now `tel:+18563104483` throughout
- Added `rel="noreferrer"` to all `target="_blank"` external links
- Added `<link rel="preconnect" href="https://api.web3forms.com" />`
- Fixed `pathToTitle` filter to skip minor words (a, an, the, of, and, etc.) in title case

### `npm run lint:a11y` *(new)*

- axe-core + jsdom scan of all built HTML in `dist/`; catches WCAG violations at build time

### Forms

- Web3Forms: email field renamed to `name="replyto"` so Laura's reply goes directly to the submitter
- `from_name` set to "LC Education Consulting" in the hidden field

---

## 2026-04-17 — Web3Forms integration

- Replaced Netlify Forms with Web3Forms for GitHub Pages compatibility
- Contact form posts to `https://api.web3forms.com/submit`
- Redirect to `/contact-success/` on successful submission
- Honeypot `botcheck` field added for spam prevention
- Access key stored in `src/_data/site.json` at this stage (later moved to GitHub Actions secret — see 2026-04-18)

---

## 2026-04-17 — DRY refactoring

- Calendar URL centralized in `site.json` as `calendar_url` — was repeated across 4 templates
- Section heading tokens — `%heading-section-base` Sass placeholder shared by `.heading--section` and `.detail-heading`
- Form field base — `%form-field-base` Sass placeholder shared by `.form-input` and `.form-textarea`
- Navigation phone and email dereferenced from hardcoded strings to `{{ office.phone_href }}` / `{{ office.phone }}`
- GitHub setup docs (`docs/setup-github.md`) and general README rewritten to reflect current architecture

---

## 2026-03-26 — Mobile UI, hero, and GitHub Actions

- Mobile nav: menu open/close animation, overlay, focus trap, Escape key support
- Hero section sizing and background color fixes
- Header layout and icon prominence improvements
- Mobile menu current-page indicator
- Ghost button focus style fix
- WCAG text spacing fully implemented (line height 1.5×, paragraph spacing 2×, letter spacing 0.12em, word spacing 0.16em)
- `@mixin focus-outline($color)` introduced for consistent focus rings
- Webmanifest moved to correct static path (fixes console error)
- GitHub Actions workflow added (`pages-main.yml`) for GitHub Pages deployment
- CSS and JS consolidated and optimized

---

## 2026-03-24 — Initial Eleventy migration

- Migrated from GoDaddy-hosted static HTML to Eleventy 3.x
- Nunjucks templates with shared layouts (`base.njk`, per-page layouts)
- Data-driven content via `src/_data/` JSON files (`site.json`, `office.json`, `navigation.json`, `testimonials.json`, etc.)
- Self-hosted Lato font (woff2) — removed Google Fonts dependency
- SVG favicon and PWA manifest
- JSON-LD schema markup: `ProfessionalService`, `BreadcrumbList`, `ItemList` (services)
- Open Graph and Twitter Card meta tags on every page
- Canonical URL on every page
- Cookie consent banner with localStorage persistence
- Exit modal for LinkedIn links
- Announcement bar with collapse toggle (localStorage state)
- Footer nav collapse toggle (localStorage state)
- Contact form with client-side validation, phone formatting, aria-live error messages
- External link decorator (opens in new tab, appends icon)
- Skip-to-main-content link
- Mobile nav with dropdown support
- `robots.txt` and `sitemap.xml` with production domain
