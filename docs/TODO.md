# Site TODO

## Before Launch — Blockers

- [ ] Configure Web3Forms — get free access key at web3forms.com (use Laura's email), set `"web3formsKey"` in `src/_data/site.json`
- [ ] Configure GA4 — get tracking ID from Google Analytics, set `"gaId": "G-XXXXXXXXXX"` in `src/_data/site.json`
- [ ] GA4 consent gating — GA4 currently fires before cookie consent is checked; implement GA4 Consent Mode or delay script load until accept is clicked (GDPR concern)
- [ ] Test contact form end-to-end — submit a real entry and confirm Laura receives the email with correct reply-to

## Before Launch — Should Do

- [ ] Review `contact-success` page — visual check that it renders cleanly and has a clear next step for the user
- [ ] Style 404 page
- [ ] Screen reader testing

## Nice to Have

- [ ] Web3Forms `from_name` — use a JS snippet to sync the `your_name` field into the hidden `from_name` input before submit so Laura's inbox shows the submitter's name instead of "LC Education Consulting"
- [ ] Add dynamic VCF contact card download?
- [ ] Add Decap CMS (?)

## DRY Opportunities

- [x] **Calendar URL** repeated 4× — centralized in `site.json` as `calendar_url`; templates use `{{ cta.button_url or site.calendar_url }}`
- [x] **`.heading--section` / `.detail-heading`** — shared `%heading-section-base` placeholder in `_typography.scss`; classes now only override the mobile `font-size`
- [x] **Phone/email in front matter** — never was; layouts already reference `office.*` from `_data/office.json`
- [x] **`.form-input` / `.form-textarea`** — `%form-field-base` placeholder already existed in `_forms.scss`
- ~~**Contact block partial**~~ — `contact.njk` and `contact-success.njk` use different section classes and link styles throughout; a partial would require too many parameters to be cleaner than the current two small blocks

---

## Resolved

- [x] Replace Netlify Forms with Web3Forms — `contact.njk` updated; access key stored in `site.web3formsKey`
- [x] Add axe-core a11y linting — `npm run lint:a11y` scans all built HTML in `dist/` using axe-core + jsdom
- [x] Web3Forms reply-to — email field renamed to `name="replyto"`; `from_name` set to "LC Education Consulting"
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

## Obsolete

- ~~Wire up Umami~~ — removed; GA4 added in its place (see Configure GA4 above)
