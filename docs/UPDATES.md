# Site Updates

A plain-language record of what has changed on the site — features, content, and user-facing improvements. For technical implementation details see `CHANGELOG.md`.

---

## April 21, 2026 — Visual fixes and accessibility improvements

### Link colors on blue sections

Links inside the blue introduction banners (for example, on the Our Story page) were appearing in olive green, which did not meet minimum color contrast requirements against the blue background. They now appear in the light green used elsewhere on dark backgrounds, which has a contrast ratio of nearly 8:1 — well above the required 4.5:1.

### Focus indicators

Three buttons — "Book a Free 30-Minute Discovery Call," "See Our Services," and the ADA Title II resource link — were showing dark green focus outlines against dark backgrounds, making them hard to see. These now display white focus outlines, consistent with the rest of the site's dark-section buttons.

When pressing Tab to reach the Map, Call Now, or Email buttons on the Contact page, the button border now turns dark green to match the filled background — previously the border stayed light green while the fill changed, making the focused state look mismatched.

### Heading sizes

Several section headings had the wrong visual size. The following headings now match the style used by "Featured Projects" on the Portfolio page: Our Philosophy, Professional Background, Why LC Education Consulting, Training Topics, Start a Conversation, and Contact Us.

### Spacing

- The image on the Webinars & Training page now has proper top spacing, so it no longer appears pushed up against the top of its section.
- Service cards on the Accessibility Services page now have proper spacing below the grid.
- The Contact page form section starts closer to the blue intro banner above it, eliminating the extra gap.

---

## April 18, 2026 — Accessibility fixes and page improvements

### Accessibility fixes

- **Placeholder text in forms is now readable for low-vision users.** The light gray placeholder text in the contact form fields did not meet the minimum contrast ratio required by WCAG. It has been replaced with a darker shade that passes the standard.
- **The Webinars & Training page heading structure was incorrect.** The section heading "Training Topics" and the page title were both labeled at the same level, which confuses screen reader navigation. This is now fixed.

### Page links

- The **Our Story** page now links directly to the Accessibility Services and Webinars & Training pages where those services are mentioned in the text.
- The **Why Choose Us** page now links to Accessibility Services where digital accessibility is mentioned.

### Faster image loading

- The Webinars & Training page photo now loads in a modern image format (WebP) for browsers that support it, with a JPEG fallback for older browsers. This reduces the image file size and improves page load time.
- Dimension hints have been added to the Webinars & Training and Why Choose Us photos so the browser can reserve the correct space before the images load, preventing the page from jumping around (layout shift) while loading.

---

## April 18, 2026

### Search appearance improvements

- Page titles in Google search results now lead with the page name — for example, "Contact | LC Education Consulting" instead of "LC Education Consulting - Contact." This makes individual pages easier to identify when scanning results.
- Google can now connect the business to its LinkedIn profile, which helps build authority for the LC Education Consulting brand in search.
- Laura now has her own presence in Google's knowledge graph — searches for "Laura Cantagallo" can surface her name, title, and portfolio alongside the business.
- The sitemap now tells Google how often each page is likely to change (weekly for the homepage, monthly for others), helping it prioritize when to re-crawl the site.

### Bug fixes

- **Cookie banner, announcement bar, and footer nav preferences were not saving between visits.** A bug caused the site to forget your choices as soon as you left the page. This is now fixed — the cookie banner stays dismissed, and the announcement bar and footer nav remember whether you collapsed them.

### Accessibility

- The site now respects your device's accessibility settings:
  - If you have "reduce motion" turned on (iOS, macOS, Windows), animations and transitions are disabled.
  - If you have high contrast enabled, borders and fills are adjusted to match.
  - On Windows with forced colors mode active, icons and decorative elements adapt automatically.

---

## April 17, 2026

### Content corrections

- **Homepage stat updated.** The 98% figure for web accessibility failures was from an older WebAIM report. Updated to 95.9% per the 2026 WebAIM Million report.
- **ADA Title II deadlines corrected.** The previous dates were superseded by a DOJ rule extending the deadlines by one year. The site now shows the correct dates: April 2027 for large entities and April 2028 for smaller entities.

### Search snippets

- Each page now has its own description that appears below the page title in Google search results. Previously all pages shared the same generic description.

### Contact form

- When Laura replies to a contact form submission, her reply now goes directly to the person who submitted — not back to her own inbox.
- Spam protection added (invisible honeypot field).
- After a successful submission, visitors are now redirected to a confirmation page instead of seeing a blank result.

---

## March 26, 2026

### Mobile navigation

- Smoother open/close animation with a backdrop overlay.
- Close button visible inside the open menu.
- Current page highlighted in the menu so visitors always know where they are.
- Full keyboard and screen reader support: focus is trapped inside the open menu, and pressing Escape closes it.

### Visual polish

- Hero section height and background color corrected.
- Header layout and hamburger icon made more prominent on small screens.
- Focus indicators (the outline visible when tabbing through the page) improved throughout for keyboard users.

---

## March 24, 2026

### Site rebuilt on a modern platform

The site was fully rebuilt from the ground up and moved to new hosting. The previous GoDaddy version was a manually edited static file — the new version is a proper content management setup that is easier to update and maintain.

### New features added in this rebuild

- **Cookie consent banner** — notifies visitors that the site uses cookies and records their preference for one year.
- **LinkedIn exit notice** — when a visitor clicks the LinkedIn link, a brief modal appears letting them know they're leaving the site and opening LinkedIn in a new tab.
- **Announcement bar** — collapsible bar at the top of the page for time-sensitive notices (currently showing ADA Title II deadline information). State is remembered between visits.
- **Contact form** — full form with real-time field validation, phone number formatting, and clear error messages for screen readers.
- **External link indicators** — links to outside websites automatically open in a new tab and show a small icon so visitors know they're leaving the site.
- **Skip navigation link** — a hidden link at the top of every page that lets keyboard and screen reader users jump directly to the main content, bypassing the navigation on every page load.
- **Each page has its own title, description, and social preview image** — when the site is shared on LinkedIn, Slack, or iMessage it shows the correct page title and description.
- **Sitemap and search indexing directives** — tells Google which pages to index and which to ignore (e.g., the contact success page).
