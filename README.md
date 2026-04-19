# LC Education Consulting — Website

Source repository for the LC Education Consulting website, built with Eleventy, Sass, and esbuild.

**Developer:** Mikey Ilagan

---

## About This Build

Most small static sites are assembled quickly with a focus on getting something live. This build treats a small professional services site with the same rigor applied to larger production systems. The sections below describe the specific choices made across accessibility, security, performance, SEO, and documentation — all of which are implemented and verifiable in the codebase.

### Accessibility

Accessibility is enforced at multiple layers, not bolted on at the end.

- **Automated scanning at build time** — `npm run lint:a11y` runs an axe-core scan against every compiled HTML page in `dist/`. WCAG violations fail before deployment.
- **OS accessibility settings respected** — CSS responds to `prefers-reduced-motion` (disables animations), `prefers-contrast` (adjusts borders and fills), and `forced-colors` (adapts icons for Windows high contrast mode).
- **WCAG 2.1 text spacing** — line height 1.5×, paragraph spacing 2×, letter spacing 0.12em, word spacing 0.16em — implemented across all body text.
- **Focus management** — Mobile nav and exit modal both trap keyboard focus while open and return focus to the triggering element on close. Hidden nav elements have `tabindex="-1"` applied programmatically so they are invisible to keyboard navigation when closed.
- **Keyboard support** — Escape key closes nav and modal. Tab/Shift+Tab cycle within focus traps. All interactive elements are reachable and operable by keyboard alone.
- **Screen reader support** — `aria-expanded`, `aria-hidden`, and `aria-label` are toggled in sync with visible state. Form errors use `aria-live="polite"` and `aria-invalid` so screen readers announce validation feedback without a page reload.
- **Skip link** — A visually hidden skip-to-main-content link appears on keyboard focus, allowing screen reader and keyboard users to bypass navigation on every page.
- **Consistent focus indicators** — A `focus-outline` mixin in `_variables.scss` produces uniform, WCAG-compliant focus rings sitewide.

### Security

- **No `innerHTML`** — External link icons are built with `createElementNS` DOM API calls rather than `innerHTML`, eliminating the XSS surface in that code path.
- **API keys out of the repository** — The Web3Forms access key is injected at build time via a GitHub Actions secret (`WEB3FORMS_KEY → src/_data/env.js`). It is never committed to the repo.
- **External link hardening** — All `target="_blank"` links have `rel="noopener noreferrer"` applied automatically by `initExternalLinks()`.
- **Contact form spam protection** — A honeypot `botcheck` checkbox (hidden from users, visible to bots) is included in the form submission.
- **Admin page excluded from indexing** — The Decap CMS admin shell carries `<meta name="robots" content="noindex">` and is blocked in `robots.txt`.
- **Pre-commit linting** — Husky + lint-staged run ESLint and Stylelint before every commit. Unlinted code cannot be committed.

### Performance

- **Self-hosted fonts** — Lato 400 and 700 are served from `src/static/fonts/` as woff2 files. No Google Fonts round-trip, no third-party DNS lookup, no privacy-related preconnect needed.
- **Inline `@font-face`** — Font-face declarations live in a `<style>` block in `<head>` so the browser resolves font URLs immediately, without waiting for an external stylesheet.
- **`font-display: swap`** — Text renders in a fallback font instantly; the custom font swaps in when loaded, with no invisible text flash.
- **Preload hints** — `<link rel="preload">` is set for both font files and the main CSS file so the browser fetches them at the highest priority.
- **Build pipeline** — HTML is minified by `html-minifier-terser` (comments, whitespace, inline CSS/JS all compressed). CSS is compiled and compressed by Sass. JS is bundled and minified by esbuild. Source maps are only generated in dev mode.
- **WebP images** — `build/images.js` uses Sharp to convert source JPGs to WebP automatically.
- **DNS prefetch** — `<link rel="dns-prefetch" href="https://www.linkedin.com">` pre-resolves the LinkedIn domain before a user clicks the link.

### SEO

- **Page-first title format** — `<title>`, `og:title`, and `twitter:title` all render as `Page Name | LC Education Consulting`. Inner pages lead with what the page is about, not the brand name.
- **Per-page meta descriptions** — Every page has a unique `description` field in its frontmatter. A site-level fallback exists but is rarely used.
- **Canonical URLs** — Every page carries `<link rel="canonical">` pointing to its own URL.
- **Open Graph + Twitter Card** — Full `og:` and `twitter:` meta tags on every page, including image, image alt, dimensions, and locale.
- **Structured data (JSON-LD)**
  - `ProfessionalService` on every page — includes `sameAs` (LinkedIn), structured `areaServed`, `hasOfferCatalog`, and founding info
  - `Person` on every page — Laura Cantagallo with job title, portfolio URL, and `worksFor`
  - `BreadcrumbList` on all inner pages
  - `ItemList` (service catalog) on the services page, when service data is present
- **Sitemap** — Auto-generated at `/sitemap.xml` from `collections.all`. Includes `<lastmod>`, `<changefreq>`, and `<priority>` per URL. Homepage is marked `1.0`/`weekly`; inner pages `0.8`/`monthly`. `/admin/` and `/contact-success/` are excluded.
- **robots.txt** — Disallows `/admin/` and `/contact-success/`, includes sitemap URL.
- **PR template** — `.github/pull_request_template.md` includes an accessibility and SEO checklist that surfaces before every merge.

### Documentation

The `docs/` directory is maintained as a first-class part of the project, not an afterthought.

| File | Purpose |
| ---- | ------- |
| [`docs/TODO.md`](docs/TODO.md) | Prioritized task list — Blockers, Before Launch, Security, Optimization, AT Testing, Nice to Have |
| [`docs/CHANGELOG.md`](docs/CHANGELOG.md) | Technical change log — every meaningful code change with file references |
| [`docs/UPDATES.md`](docs/UPDATES.md) | Plain-language site updates — written for non-technical stakeholders (Laura) |
| [`docs/CONTENT_SUGGESTIONS.md`](docs/CONTENT_SUGGESTIONS.md) | Prioritized copy review — grammar, accuracy, jargon, ESL/readability flags |
| [`docs/setup-github.md`](docs/setup-github.md) | Deployment setup — GitHub repos, Pages config, OAuth app, Cloudflare Worker, push workflow |
| [`docs/workflow.md`](docs/workflow.md) | Collaboration guide — how Laura requests edits, changes, and features via GitHub |

---

## Tech Stack

| Layer | Tool |
| ----- | ---- |
| Static site generator | [Eleventy 3.x](https://www.11ty.dev/) |
| Templating | Nunjucks (`.njk`) |
| CSS | Sass (SCSS) → compiled to `dist/css/main.css` |
| JavaScript | esbuild → compiled to `dist/js/main.js` |
| Forms | [Web3Forms](https://web3forms.com/) — key via GitHub Actions secret |
| Fonts | Self-hosted — Lato 400 & 700 (woff2) |
| Analytics | Google Analytics 4 (optional — set `gaId` in `src/_data/site.json`) |
| CMS | Decap CMS with GitHub OAuth via Cloudflare Worker (staging only) |

## Project Structure

```text
lcec/
├── src/
│   ├── _data/
│   │   ├── env.js                 # Build-time env vars (WEB3FORMS_KEY → web3formsKey)
│   │   ├── site.json              # Global site metadata (URL, phone, email, gaId, linkedinUrl)
│   │   ├── navigation.json        # Nav link data (desktop + mobile navs)
│   │   ├── cta.json               # Default CTA block content
│   │   ├── announcement.json      # Announcement bar text (empty string = hidden)
│   │   ├── office.json            # Office location, phone, email, map URL
│   │   └── testimonials.json      # Testimonial content
│   ├── _includes/
│   │   ├── layouts/               # Page-level Nunjucks layouts
│   │   │   ├── base.njk           # Base HTML shell
│   │   │   ├── index.njk          # Homepage
│   │   │   ├── our-story.njk
│   │   │   ├── why-choose-us.njk
│   │   │   ├── accessibility-services.njk
│   │   │   ├── portfolio.njk
│   │   │   ├── webinars-and-training.njk
│   │   │   ├── contact.njk
│   │   │   └── contact-success.njk
│   │   └── partials/              # Reusable Nunjucks partials
│   │       ├── head.njk           # <head> — SEO, OG, JSON-LD, preloads, fonts
│   │       ├── header.njk         # Site header and nav
│   │       ├── footer.njk         # Site footer
│   │       ├── cta.njk            # CTA banner (page cta data or _data/cta.json fallback)
│   │       ├── social-section.njk # "Connect With Us" LinkedIn section
│   │       ├── testimonial.njk    # Reusable testimonial block
│   │       ├── announcement-bar.njk
│   │       └── cookie-banner.njk  # Cookie consent banner
│   ├── scss/
│   │   ├── main.scss              # Entry point — imports all partials
│   │   ├── _variables.scss        # Design tokens + focus-outline mixin
│   │   ├── _reset.scss            # CSS reset and base element styles
│   │   ├── _layout.scss           # Page wrap, container, section modifiers
│   │   ├── _typography.scss       # Heading scale, body link styles
│   │   ├── _nav.scss              # Site header and navigation
│   │   ├── _hero.scss             # Homepage hero section
│   │   ├── _sections.scss         # Page section components
│   │   ├── _components.scss       # Buttons, cards, CTA blocks, social links
│   │   ├── _forms.scss            # Contact form styles
│   │   ├── _footer.scss           # Site footer
│   │   ├── _utilities.scss        # Utility classes and external link icon
│   │   └── _cookie-banner.scss    # Cookie banner styles
│   ├── js/
│   │   ├── main.js                # Nav, cookie banner, form validation, external links, exit modal
│   │   └── utils/
│   │       ├── dom.js             # toggleClass, setAria, onEscape helpers
│   │       └── form.js            # formatPhoneNumber helper
│   ├── img/                       # Source images (JPG + generated WebP)
│   ├── static/
│   │   ├── robots.txt
│   │   └── fonts/                 # Self-hosted Lato woff2 files
│   ├── admin/                     # Decap CMS (staging only — not deployed to lcec-prod)
│   │   ├── index.njk              # CMS admin shell
│   │   ├── config.yml             # Backend and collections config
│   │   └── custom.css             # CMS UI overrides
│   └── content/
│       ├── index.md               # Homepage content (frontmatter-driven)
│       ├── our-story.md
│       ├── why-choose-us.md
│       ├── accessibility-services.md
│       ├── portfolio.md
│       ├── webinars-and-training.md
│       ├── contact.md
│       ├── contact-success.md
│       └── 404.md
├── build/
│   ├── js.js                      # esbuild script (minifies on build, watches on dev)
│   ├── images.js                  # Sharp — converts src/img/ JPGs to WebP
│   ├── a11y.js                    # axe-core scanner — runs against built HTML in dist/
│   └── clean.js                   # Cleans dist/ before build
├── .github/
│   ├── workflows/
│   │   └── pages-main.yml         # GitHub Actions — build and deploy to GitHub Pages
│   └── pull_request_template.md   # PR checklist (accessibility + SEO)
├── docs/
│   ├── TODO.md                    # Prioritized task list
│   ├── CHANGELOG.md               # Technical change log
│   ├── UPDATES.md                 # Plain-language updates for non-technical stakeholders
│   ├── CONTENT_SUGGESTIONS.md     # Copy review — grammar, accuracy, jargon, readability
│   ├── setup-github.md            # Deployment and OAuth setup guide
│   └── workflow.md                # Collaboration guide for Laura and the maintainer
├── dist/                          # Compiled output (not committed)
├── .eleventy.js                   # Eleventy config (filters, HTML minification, passthrough)
├── eslint.config.js               # ESLint flat config (v9)
├── .stylelintrc.json              # Stylelint config (stylelint-config-standard-scss)
├── .husky/
│   └── pre-commit                 # Runs lint-staged on staged files before every commit
├── manifest.webmanifest           # PWA manifest
└── package.json
```

All page content (headings, body copy, CTA text, stats, etc.) lives in the frontmatter of the `.md` files in `src/content/`. Layouts read these values via Nunjucks template variables. To update copy, edit the relevant `.md` file — no template changes needed.

Pages that define a `cta:` block in their frontmatter use that content in the CTA banner. Pages without one fall back to the default in `src/_data/cta.json`.

Nav links (desktop and mobile) are defined once in `src/_data/navigation.json`.

Global data shared across all pages (site URL, phone, email, founder info, LinkedIn URL) is in `src/_data/site.json`. Build-time secrets (API keys) are in `src/_data/env.js`, which reads from environment variables — never hardcoded.

## Development

```bash
npm install
npm run dev
```

Runs three watchers in parallel:

- Eleventy dev server at `http://localhost:8080`
- Sass (expanded, with source maps)
- esbuild (unminified, with inline source maps)

## Production Build

```bash
npm run build
```

1. Cleans `dist/`
2. Eleventy compiles templates → minifies HTML (removes comments, collapses whitespace, minifies inline CSS/JS)
3. Sass compiles → compressed CSS
4. esbuild bundles → minified JS (no source maps)
5. Sharp converts `src/img/` JPGs → WebP (run `npm run build:images` separately when images change)

## Linting

```bash
npm run lint        # JS + CSS together
npm run lint:js     # ESLint (flat config v9) — src/js/ and build/
npm run lint:css    # Stylelint — src/scss/**/*.scss
npm run lint:a11y   # axe-core a11y scan — requires a fresh build first
```

Pre-commit hooks (Husky + lint-staged) run ESLint and Stylelint automatically on staged files before each commit.

## Design Tokens

All spacing, color, and typography values are defined as Sass variables in `src/scss/_variables.scss`.

| Token | Value | Usage |
| ----- | ----- | ----- |
| `$color-primary` | `#556b2f` | Olive green — buttons, links, headings |
| `$color-primary-dark` | `#364519` | Dark green — hover states |
| `$color-primary-light` | `#e3fcc2` | Light green — card backgrounds |
| `$color-accent` | `#1e4d7b` | Steel blue — banner sections |
| `$color-placeholder` | `#6b6b6b` | Form placeholder text — 5.3:1 on white (WCAG AA) |
| `$font-size-page-title` | `1.875rem` | Page/section title headings |
| `$space-24px` | `24px` | Standard component spacing |
| `$space-32px` | `32px` | Section-level spacing |
| `$space-48px` | `48px` | Large section padding |

## Deployment

Two repositories on Laura's GitHub account (`lauracantagallo`), both hosted on GitHub Pages:

| Repo | Purpose | URL |
| ---- | ------- | --- |
| `lcec-prod` | Production | Custom domain (TBD) |
| `lcec-dev` | Staging | `https://lauracantagallo.github.io/lcec-dev/` |

Both deploy automatically on push to `main` via `.github/workflows/pages-main.yml`. The `PATH_PREFIX` is set per-repo as a GitHub Actions repository variable so the same workflow serves both repos without modification.

The `lcec-dev` staging repo also includes Decap CMS for content editing. The CMS is not deployed to `lcec-prod`. See [`docs/setup-github.md`](docs/setup-github.md) for the full setup.

## Notes

- `site.url` in `src/_data/site.json` must match the live domain
- When `lcec-prod` is pointed at a custom domain, set the `PATH_PREFIX` repo variable to `/`
- `WEB3FORMS_KEY` must be added as a GitHub Actions secret in both repos before the contact form will work
- A pull request template lives at `.github/pull_request_template.md` — includes accessibility and SEO checklist items
