# Site Workflow

How LC Education Consulting website changes are requested, reviewed, and deployed.

**Site owner:** Laura Cantagallo (`lauracantagallo` on GitHub)
**Maintainer:** Mikey Ilagan (`mikeyil` on GitHub)

---

## Two kinds of changes

| Type | Who does it | How |
| ---- | ----------- | --- |
| **Content edits** — text, images, page copy | Laura (self-service) | Decap CMS on the staging site |
| **Everything else** — design, layout, new features, bug fixes, structural changes | Mikey | GitHub Issue → dev branch → reviewed → deployed |

---

## Content edits — Laura can do these herself

The staging site has a content management system (CMS) at:

```
https://lauracantagallo.github.io/lcec-dev/admin/
```

Log in with your GitHub account. From there you can edit any page's text, headings, stats, and images without touching code.

**How it works:**
1. Log in to the CMS
2. Make your edits and click Save
3. The change is committed to the staging repo automatically
4. The staging site rebuilds and you can preview it at `https://lauracantagallo.github.io/lcec-dev/`
5. When you're happy with it, let Mikey know and he will push the change to production

> The CMS is available on staging only. Changes do not go to the live site automatically — Mikey reviews and deploys them.

---

## Everything else — open a GitHub Issue

For anything that requires code changes (design updates, new sections, bug reports, feature requests), open an issue on the production repo:

**→ [github.com/lauracantagallo/lcec-prod/issues/new](https://github.com/lauracantagallo/lcec-prod/issues/new)**

### What to include in your issue

The more detail you give, the faster the work gets done. A useful issue has:

- **What** — a short title that describes the change in plain terms
  - Good: *"Add a FAQ section to the Accessibility Services page"*
  - Too vague: *"Update the services page"*
- **Where** — which page or section of the site is affected
- **Why** — what problem it solves or what the goal is
- **What it should look like** — a description, a screenshot, a sketch, or a reference to another site you like
- **Priority** — is this urgent, or a nice-to-have?

### Issue types

Use these titles to help categorize the request:

| Prefix | Use for |
| ------ | ------- |
| `[content]` | Text changes, stat updates, new copy blocks |
| `[design]` | Visual changes — colors, layout, spacing, new sections |
| `[feature]` | New functionality — a form field, a new page, an interactive element |
| `[bug]` | Something is broken or not working as expected |
| `[a11y]` | An accessibility problem — something is hard to use with a keyboard or screen reader |
| `[seo]` | A search-related change — page title, description, schema |

**Example issue title:** `[content] Update the portfolio page with ACP project outcomes`

---

## How changes move from request to live

```
Issue opened
    ↓
Mikey reviews and asks any clarifying questions
    ↓
Work is built on the dev branch and deployed to staging
    ↓
Laura reviews on the staging site
    ↓
Approved → pushed to production (lcec-prod)
    ↓
Issue closed
```

**Staging URL:** `https://lauracantagallo.github.io/lcec-dev/`
**Production URL:** custom domain (TBD) or `https://lauracantagallo.github.io/lcec-prod/`

---

## What Mikey needs from Laura to do his job

Some changes require information only Laura can provide. This is the most common reason for delays.

| Change | What Laura needs to provide |
| ------ | -------------------------- |
| New testimonial | The quote text, client name, and their title or organization |
| New portfolio project | Project description, what the client needed, what was done, outcome, and a photo if available |
| Webinar topics | A list of past or available session titles per training category |
| Updated credentials | Exact credential name, granting institution, and year |
| New service | Service name, description, and bullet features |
| Updated phone or email | The correct value to replace the current one |
| Google Business Profile | The URL once the profile is created |

---

## Checking the status of a request

All open requests are visible at:

**→ [github.com/lauracantagallo/lcec-prod/issues](https://github.com/lauracantagallo/lcec-prod/issues)**

If an issue has no activity after a few days, leave a comment on it. Avoid sending changes by email or text — keeping everything in GitHub means there is a clear record and nothing gets lost.

---

## Reporting something urgent

If something on the live site is clearly broken (wrong phone number, form not working, page returning an error), mark the issue title with `[bug]` and add the word **URGENT** at the start:

`URGENT [bug] Contact form is not submitting`

For anything critical, contact Mikey directly and link him to the issue.
