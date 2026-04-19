# Changelog

All significant changes to the LC Education Consulting site, newest first.

---

## 2026-04-19 — Decap CMS setup, config audit, and UI fixes

### `src/admin/config.yml` *(new on dev branch)*

- Full collections config written from scratch: Getting Started, Settings (site, office, announcement, cta, navigation), Testimonials, Pages (all 9 content pages)
- **Audit fixes:**
  - Added `trainings_heading` field to webinars-and-training collection (was in frontmatter but missing from config — would have been silently dropped on CMS save)
  - Added missing `site.json` fields: `calendar_url` (position 3), `gaId`, `linkedinUrl`, `googleBusinessUrl`, `founderUrl`, `gscVerificationId`
  - Removed `cta_primary_url` from homepage hero (field does not exist in frontmatter)
  - All CTA `button_url` fields: set `required: false`; updated hint to clarify fallback behavior
  - Changed `announcement.body` from `widget: string` to `widget: text` (multiline)
  - Added HTML preservation warnings to our-story and why-choose-us body paragraph hints
- Added "Getting Started" as first collection with a single `guide.md` file entry

### `src/admin/guide.md` *(new)*

- CMS in-app guide: explains how to save, what each section does, tips for HTML-in-paragraphs fields, and developer contact
- `permalink: false` + `eleventyExcludeFromCollections: true` prevent Eleventy from rendering it as a page
- Body content is below the `---` delimiter (required for `widget: markdown` to read it)
- Copied to `lcec-prod/main` so the GitHub-backed CMS can read it

### `src/admin/custom.css` *(new on dev branch)*

- Branding overrides: replaces Decap's default blue with LC Education Consulting olive green (`#556b2f`)
- WCAG 2.2 AA focus indicators: `box-shadow` inset rings on buttons/links; white ring inside the olive header
- **Centering fix:** replaced broken class-wildcard selectors (`[class*="AppMainContainer"]` etc.) with `#nc-root` flex column layout — makes `#nc-root` a `flex-direction: column; align-items: center` container; first child (header) stays full-width; all subsequent children capped at 1200px

### `src/admin/index.njk` *(new on dev branch)*

- CMS admin shell: loads self-hosted `decap-cms.js` (copied from node_modules at build time)
- `<meta name="robots" content="noindex">` — excluded from search indexing

### `.eleventy.js`

- Added passthrough copies for `src/admin/config.yml`, `src/admin/custom.css`, and `node_modules/decap-cms/dist/decap-cms.js → admin/decap-cms.js`

### `src/_data/testimonials.json`

- Fixed structure from plain array `[...]` to `{ "items": [...] }` to match CMS config's `name: items` list mapping

### `.github/workflows/pages-main.yml` (lcec-dev)

- Changed trigger from `branches: ["main"]` to `branches: ["dev"]` — lcec-dev staging now deploys from the `dev` branch
- lcec-dev/main deleted to avoid confusion; `dev` is the default branch

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

- Removed Netlify; both `lcec-prod` and `lcec-dev` deploy via GitHub Pages + GitHub Actions
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
