# GitHub Setup

This documents the GitHub setup for the LCEC website.

---

## Repositories

Both repositories are on Laura's GitHub account (`lauracantagallo`):

| Repo | Purpose | URL |
| ---- | ------- | --- |
| `lcec-prod` | Production site | `github.com/lauracantagallo/lcec-prod` |
| `lcec-dev` | Staging site | `github.com/lauracantagallo/lcec-dev` |

---

## GitHub Pages

GitHub Pages is enabled on both repos under **Settings → Pages → Source: GitHub Actions**.

Each repo has a repository variable `PATH_PREFIX` set under **Settings → Variables → Actions**:

- `lcec-prod` → `PATH_PREFIX = /lcec-prod/`
- `lcec-dev` → `PATH_PREFIX = /lcec-dev/`

---

## Decap CMS OAuth App

A GitHub OAuth App is registered under Laura's account for Decap CMS authentication:

- **App name:** LCEC CMS
- **Homepage URL:** `https://lauracantagallo.github.io/lcec-prod`
- **Callback URL:** `https://lcec-cms-auth.royal-queen-bb70.workers.dev/callback`
- The Client ID and Secret are stored in the Cloudflare Worker (`lcec-cms-auth`)

To regenerate the secret: **github.com/settings/developers** → LCEC CMS → Generate a new client secret → update the Cloudflare Worker code.

---

## Developer Remotes

The developer (`mikeyil`) has the following git remotes configured locally:

```bash
origin      https://github.com/mikeyil/lcec-a11y-rebuild.git  # personal backup
lcec-prod   https://github.com/lauracantagallo/lcec-prod.git  # production
lcec-dev    https://github.com/lauracantagallo/lcec-dev.git   # staging
```

### Push workflow

```bash
git push lcec-prod main       # production
git push lcec-dev dev         # staging (lcec-dev deploys from dev branch)
git push origin dev           # personal backup (dev branch)
```

---

## Decap CMS

The CMS lives on `lcec-dev` only. It is not deployed to `lcec-prod`.

| File | Purpose |
| ---- | ------- |
| `src/admin/config.yml` | Backend config, collections, and field definitions |
| `src/admin/custom.css` | UI branding overrides (olive green theme, WCAG focus rings) |
| `src/admin/guide.md` | In-app Getting Started guide — committed to both dev and `lcec-prod/main` |
| `src/admin/index.njk` | Admin shell page — loads self-hosted `decap-cms.js` |

**CMS backend:** reads and writes `lcec-prod/main` directly via the GitHub API.

**OAuth:** GitHub OAuth App "LCEC CMS" under Laura's account. Callback goes through a Cloudflare Worker (`lcec-cms-auth`) that holds the Client ID and Secret.

**lcec-dev branch:** `dev` is the default and deploy branch. `main` was deleted to avoid confusion.

### Local development with the CMS

Run two processes in parallel:

```bash
npm run dev          # Eleventy dev server
npx decap-server     # Local CMS backend (reads/writes local files)
```

Then open `http://localhost:8080/admin/`. The local backend bypasses GitHub OAuth — no login needed locally.
