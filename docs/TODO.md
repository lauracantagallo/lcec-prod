# Site TODO

## Before Launch — Blockers

- [ ] **Configure Web3Forms** — create a free account at web3forms.com (use Laura's email), get the access key, then add it as a GitHub Actions secret named `WEB3FORMS_KEY` in both `lcec-prod` and `lcec-dev` repos (Settings → Secrets and variables → Actions)
- [ ] **Configure GA4** — get tracking ID from Google Analytics, set `"gaId": "G-XXXXXXXXXX"` in `src/_data/site.json`
- [ ] **GA4 consent gating** — GA4 fires before cookie consent is acknowledged; implement GA4 Consent Mode or delay `gtag` init until the accept button is clicked
- [ ] **Custom domain on `lcec-prod`** — configure DNS (CNAME/A record pointing to `lauracantagallo.github.io`), then set the `PATH_PREFIX` repo variable to `/` in `lcec-prod` so asset paths resolve correctly
- [ ] **Test contact form end-to-end** — submit a real entry and confirm Laura receives the email with correct reply-to (requires Web3Forms key above)

## Before Launch — Should Do

- [ ] **Google Business Profile** — create a profile for LC Education Consulting, then paste the URL into `site.json` → `"googleBusinessUrl"`; it will automatically appear in the business schema `sameAs` array
- [ ] **Laura's personal LinkedIn** — if she has one, add the URL to the `Person` schema `sameAs` in `head.njk` (or add a `founderLinkedinUrl` field to `site.json`)
- [ ] **Business hours** — confirm with Laura, then add `openingHoursSpecification` to the `ProfessionalService` schema in `head.njk`
- [ ] Review `contact-success` page — visual check that it renders cleanly and has a clear next step for the user
- [ ] Style 404 page
- [ ] Screen reader testing

## Nice to Have

- [ ] **`og:image`** — currently uses a generic `/img/og-image.png`; a real branded image (1200×630) would improve link previews on LinkedIn, Slack, and iMessage
- [ ] **Web3Forms `from_name`** — JS snippet to sync the `your_name` field into the hidden `from_name` input before submit, so Laura's inbox shows the submitter's name instead of "LC Education Consulting"
- [ ] **Review schema** — once Google Business reviews exist, add `AggregateRating` to the `ProfessionalService` schema for potential star rating rich results

## Code Quality

- [x] Fix `storageGet`/`storageSet` infinite recursion — both functions called themselves instead of `localStorage`; cookie consent, announcement, and footer nav state never persisted
- [x] Fix unclosed `<a>` tag in `footer.njk` footer brand link
- [x] Dereference hardcoded phone in `header.njk` — now uses `{{ office.phone_href }}` / `{{ office.phone }}`
- [x] Extract `makeCollapseToggle` factory in `main.js` — shared by `initAnnouncementToggle` and `initFooterNavToggle`
- [x] Replace `innerHTML` SVG injection in `initExternalLinks` with `createElementNS` DOM API calls

## DRY Opportunities

- [x] **Calendar URL** repeated 4× — centralized in `site.json` as `calendar_url`; templates use `{{ cta.button_url or site.calendar_url }}`
- [x] **`.heading--section` / `.detail-heading`** — shared `%heading-section-base` placeholder in `_typography.scss`; classes now only override the mobile `font-size`
- [x] **Phone/email in front matter** — never was; layouts already reference `office.*` from `_data/office.json`
- [x] **`.form-input` / `.form-textarea`** — `%form-field-base` placeholder already existed in `_forms.scss`
- ~~**Contact block partial**~~ — `contact.njk` and `contact-success.njk` use different section classes and link styles throughout; a partial would require too many parameters to be cleaner than the current two small blocks

---

## Resolved

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

## Obsolete

- ~~Wire up Umami~~ — removed; GA4 added in its place (see Configure GA4 above)
