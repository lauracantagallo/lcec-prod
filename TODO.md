# Site TODO

## Open

- [ ] Style 404 page
- [ ] Wire up contact form — Netlify Forms is in place; needs end-to-end testing and confirmation email
- [ ] Add Decap CMS (?)
- [ ] Screen reader testing
- [ ] Add dynamic VCF contact card download?
- [ ] Configure GA4 — set `"gaId": "G-XXXXXXXXXX"` in `src/_data/site.json`

## DRY Opportunities

### Critical — Data duplication in front matter

- [ ] **Phone/email/contact info** repeated in `contact.md` and `contact-success.md` front matter; already in `_data/site.json`. Reference `site.phone` etc. in layouts instead.
- [ ] **CTA block** defined in 6 `.md` files with content nearly identical to `_data/cta.json`. Pages where the CTA matches the default can drop the front matter block entirely — `cta.njk` already falls back to the global data.

### High — SCSS

- [ ] **`.form-input` and `.form-textarea`** share 10 identical properties. A shared base style or `@extend` removes the duplication.

### Medium — Markup

- [ ] **Contact block** (`<h2>`, phone, email) duplicated in `contact.njk` and `contact-success.njk`. Extract to `partials/contact-block.njk`.

---

## Resolved

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
