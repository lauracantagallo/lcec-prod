# About This Build

Most small static sites are assembled quickly with a focus on getting something live. This build treats a small professional services site with the same rigor applied to larger production systems. The sections below describe the specific choices made across accessibility, security, performance, SEO, and documentation — all of which are implemented and verifiable in the codebase.

---

## Accessibility

Accessibility is enforced at multiple layers, not bolted on at the end.

- **Automated scanning at build time** — `npm run lint:a11y` runs an axe-core scan against every compiled HTML page in `dist/`. WCAG violations fail before deployment.
- **OS accessibility settings respected** — CSS responds to `prefers-reduced-motion` (disables animations), `prefers-contrast` (adjusts borders and fills), and `forced-colors` (adapts icons for Windows high contrast mode).
- **WCAG 2.1 text spacing** — line height 1.5×, paragraph spacing 2×, letter spacing 0.12em, word spacing 0.16em — implemented across all body text.
- **Focus management** — Mobile nav and exit modal both trap keyboard focus while open and return focus to the triggering element on close. Hidden nav elements have `tabindex="-1"` applied programmatically so they are invisible to keyboard navigation when closed.
- **Keyboard support** — Escape key closes nav and modal. Tab/Shift+Tab cycle within focus traps. All interactive elements are reachable and operable by keyboard alone.
- **Screen reader support** — `aria-expanded`, `aria-hidden`, and `aria-label` are toggled in sync with visible state. Form errors use `aria-live="polite"` and `aria-invalid` so screen readers announce validation feedback without a page reload.
- **Skip link** — A visually hidden skip-to-main-content link appears on keyboard focus, allowing screen reader and keyboard users to bypass navigation on every page.
- **Consistent focus indicators** — A `focus-outline` mixin in `_variables.scss` produces uniform, WCAG-compliant focus rings sitewide.

---

## Security

- **No `innerHTML`** — External link icons are built with `createElementNS` DOM API calls rather than `innerHTML`, eliminating the XSS surface in that code path.
- **API keys out of the repository** — The Web3Forms access key is injected at build time via a GitHub Actions secret (`WEB3FORMS_KEY → src/_data/env.js`). It is never committed to the repo.
- **External link hardening** — All `target="_blank"` links have `rel="noopener noreferrer"` applied automatically by `initExternalLinks()`.
- **Contact form spam protection** — A honeypot `botcheck` checkbox (hidden from users, visible to bots) is included in the form submission.
- **Admin page excluded from indexing** — The Decap CMS admin shell carries `<meta name="robots" content="noindex">` and is blocked in `robots.txt`.
- **Pre-commit linting** — Husky + lint-staged run ESLint and Stylelint before every commit. Unlinted code cannot be committed.

---

## Performance

- **Self-hosted fonts** — Lato 400 and 700 are served from `src/static/fonts/` as woff2 files. No Google Fonts round-trip, no third-party DNS lookup, no privacy-related preconnect needed.
- **Inline `@font-face`** — Font-face declarations live in a `<style>` block in `<head>` so the browser resolves font URLs immediately, without waiting for an external stylesheet.
- **`font-display: swap`** — Text renders in a fallback font instantly; the custom font swaps in when loaded, with no invisible text flash.
- **Preload hints** — `<link rel="preload">` is set for both font files and the main CSS file so the browser fetches them at the highest priority.
- **Build pipeline** — HTML is minified by `html-minifier-terser` (comments, whitespace, inline CSS/JS all compressed). CSS is compiled and compressed by Sass. JS is bundled and minified by esbuild. Source maps are only generated in dev mode.
- **WebP images** — `build/images.js` uses Sharp to convert source JPGs to WebP automatically.
- **DNS prefetch** — `<link rel="dns-prefetch" href="https://www.linkedin.com">` pre-resolves the LinkedIn domain before a user clicks the link.

---

## SEO

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

---

## Documentation

The `docs/` directory is maintained as a first-class part of the project, not an afterthought.

| File | Purpose |
| ---- | ------- |
| [`docs/TODO.md`](TODO.md) | Prioritized task list — Blockers, Before Launch, Security, Optimization, AT Testing, Nice to Have |
| [`docs/CHANGELOG.md`](CHANGELOG.md) | Technical change log — every meaningful code change with file references |
| [`docs/UPDATES.md`](UPDATES.md) | Plain-language site updates — written for non-technical stakeholders (Laura) |
| [`docs/CONTENT_SUGGESTIONS.md`](CONTENT_SUGGESTIONS.md) | Prioritized copy review — grammar, accuracy, jargon, ESL/readability flags |
| [`docs/setup-github.md`](setup-github.md) | Deployment setup — GitHub repos, Pages config, OAuth app, Cloudflare Worker, push workflow |
| [`docs/workflow.md`](workflow.md) | Collaboration guide — how Laura requests edits, changes, and features via GitHub |
| [`docs/MAINTENANCE.md`](MAINTENANCE.md) | Periodic maintenance checklist — CSS, JS, templates, a11y, content, SEO, docs, deps |
