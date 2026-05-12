# LC Education Consulting — Website

The LC Education Consulting website is a fully accessible, production-grade static site built with Eleventy, Sass, and esbuild. It prioritizes accessibility, security, performance, and SEO at every layer of the build, not as an afterthought.

**Site Owner:** Laura Cantagallo (`lauracantagallo` on GitHub)  
**Maintainer:** Mikey Ilagan (`mikeyil` on GitHub)

For a detailed breakdown of the accessibility, security, performance, SEO, and documentation decisions behind this build, see [docs/ABOUT_BUILD.md](docs/ABOUT_BUILD.md).

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
│   │       ├── dom.js             # toggleClass, setAria, onEscape, handleFocusTrap helpers
│   │       └── form.js            # formatPhoneNumber helper
│   ├── img/                       # Source images (JPG + generated WebP)
│   ├── static/
│   │   ├── robots.txt
│   │   └── fonts/                 # Self-hosted Lato woff2 files
│   ├── admin/                     # Decap CMS (staging only — not deployed to lcec-prod)
│   │   ├── index.njk              # CMS admin shell
│   │   ├── config.yml             # Backend and collections config
│   │   ├── custom.css             # CMS UI overrides (branding + centering)
│   │   └── guide.md              # In-app Getting Started guide
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

Stylelint runs with the [`@a11yfred/neighbor`](https://www.npmjs.com/package/@a11yfred/neighbor) plugin, which enforces three accessibility rules: no `outline: none/0` without a replacement, no `forced-colors: none`, and flagging user preference overrides (`prefers-reduced-motion`, `prefers-contrast`).

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
| `lcec-prod` | Production | `https://www.lceducationconsulting.com` (custom domain) |
| `lcec-dev` | Staging | `https://lauracantagallo.github.io/lcec-dev/` |

**`lcec-prod`** deploys automatically on push to `main`. **`lcec-dev`** deploys on push to `dev` (the default branch; `main` does not exist on this repo). The `PATH_PREFIX` is set per-repo as a GitHub Actions repository variable so the same workflow file serves both repos.


The `lcec-dev` staging repo also includes Decap CMS for content editing. The CMS is not deployed to `lcec-prod`. Laura can edit content directly via the CMS at `https://lauracantagallo.github.io/lcec-dev/admin/` (GitHub OAuth required).

For the complete deployment setup, repository configuration, and content workflow, see:

- [`docs/setup-github.md`](docs/setup-github.md) — Deployment and OAuth setup
- [`docs/workflow.md`](docs/workflow.md) — Content editing and change request workflow

## Before Launch

Critical items that must be completed before going live:

- [ ] **Contact form testing** — Submit a test entry and verify Laura receives the email with correct reply-to address (requires `WEB3FORMS_KEY` GitHub Actions secret in both repos)

- [ ] **Screen reader testing** — Test core user flows with NVDA, JAWS, VoiceOver, and TalkBack
- [ ] **Custom domain setup** — Configure DNS (CNAME/A record), then set `PATH_PREFIX: /` in `lcec-prod` repo variable so asset paths resolve correctly
- [ ] **GA4 configuration** — Add tracking ID to `gaId` in `src/_data/site.json`
- [ ] **GA4 consent mode** — Implement GA4 Consent Mode or delay `gtag` initialization until cookie consent is accepted

See [`docs/TODO.md`](docs/TODO.md) for the full checklist (Blockers, Before Launch, Security, Optimization, etc.).

## Content Updates & Collaboration

Laura can request site changes in two ways:

1. **Content edits** (text, images, page copy) — Edit directly in the CMS at `https://lauracantagallo.github.io/lcec-dev/admin/`
2. **Code changes** (design, layout, new features, bug fixes) — Open an issue on the production repo at [`github.com/lauracantagallo/lcec-prod/issues`](https://github.com/lauracantagallo/lcec-prod/issues)

See [`docs/workflow.md`](docs/workflow.md) for detailed instructions.

## Documentation

The `docs/` directory is maintained as a first-class part of the project:

| File | Purpose |
| ---- | ------- |
| [`docs/TODO.md`](docs/TODO.md) | Prioritized task list — Blockers, Before Launch, Security, Optimization, AT Testing, Nice to Have |
| [`docs/CHANGELOG.md`](docs/CHANGELOG.md) | Technical change log — every meaningful code change with file references |
| [`docs/UPDATES.md`](docs/UPDATES.md) | Plain-language site updates — written for non-technical stakeholders (Laura) |
| [`docs/CONTENT_SUGGESTIONS.md`](docs/CONTENT_SUGGESTIONS.md) | Copy review — grammar, accuracy, jargon, ESL/readability flags, with Laura's feedback |
| [`docs/ABOUT_BUILD.md`](docs/ABOUT_BUILD.md) | Technical deep-dive — accessibility, security, performance, SEO, and documentation decisions |
| [`docs/setup-github.md`](docs/setup-github.md) | Deployment setup — GitHub repos, Pages config, OAuth app, Cloudflare Worker, push workflow |
| [`docs/workflow.md`](docs/workflow.md) | Collaboration guide — how Laura requests edits, changes, and features via GitHub and CMS |
| [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) | Periodic maintenance checklist — CSS, JS, templates, a11y, content, SEO, docs, dependencies |

## Implementation Notes

- `site.url` in `src/_data/site.json` must match the live domain
- When `lcec-prod` is pointed at a custom domain, set the `PATH_PREFIX` repo variable to `/` (not `/lcec-prod/`)
- `WEB3FORMS_KEY` must be added as a GitHub Actions secret in both repos before the contact form will work
- A pull request template lives at `.github/pull_request_template.md` — includes accessibility and SEO checklist items
- Pre-commit hooks (Husky + lint-staged) run ESLint and Stylelint on staged files before each commit
