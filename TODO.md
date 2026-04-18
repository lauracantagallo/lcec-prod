# Site TODO

- [x] Cleanup services subpages designs
- [x] Make mobile icon more prominent
- [x] Mobile menu current page indicator
- [x] Ensure invisible controls are not keyboard accessible
- [x] Ensure mobile menu traps keyboard
- [ ] Style 404 page
- [ ] Wire up umami
- [ ] Wire up contact form
- [ ] Add Decap CMS (?)
- [ ] Screen reader testing
- [x] Remove dead code
- [x] Fix ghost button focus style
- [ ] Add dynamic VCF contact card download?
- [x] Ensure WCAG text spacing is fully implemented
- Line height (line spacing) to at least 1.5 times the font size;
- Spacing following paragraphs to at least 2 times the font size;
- Letter spacing (tracking) to at least 0.12 times the font size;
- Word spacing to at least 0.16 times the font size.
- [ ] Implement all of the following DRY opportunities (ranked by impact):

## Critical — Data duplication in front matter

- **Phone/email/contact info** repeated in `contact.md` and `contact-success.md` front matter, when it's already in `_data/site.json`. Move to an `_data/office.json` and reference `office.phone` etc. in layouts.
- **CTA block** defined in 6 `.md` files (`accessibility-services`, `contact`, `contact-success`, `portfolio`, `webinars-and-training`, `why-choose-us`) with content nearly identical to `_data/cta.json`. Pages where the CTA matches the default can just drop the front matter block entirely — `cta.njk` already falls back to the global data.

## High — SCSS repeated patterns

- **Focus outline** (`outline: $focus-outline-stroke $color; outline-offset: $focus-outline-offset`) appears verbatim 12+ times across `_nav.scss`, `_footer.scss`, `_components.scss`, `_forms.scss`, `_cookie-banner.scss`. A `@mixin focus-outline($color)` eliminates all of it.
- `.form-input` and `.form-textarea` share 10 identical properties — background, border, color, display, font-family, margin, padding, transition, width, and the full `&:focus` block. A shared base style or `@extend` removes the duplication.

## Medium — Markup duplication

- **Contact block** (`<h2>`, phone `<p>`, email `<p>`) duplicated in `contact.njk` and `contact-success.njk`. Extracting to a `partials/contact-block.njk` would clean it up.
