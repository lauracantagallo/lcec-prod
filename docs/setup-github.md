# GitHub Setup

This documents the GitHub setup for the LCEC website.

---

## Repositories

| Repo | Owner | Purpose | URL |
| ---- | ----- | ------- | --- |
| `lced-dev` | `mikeyil` | Staging / development | `github.com/mikeyil/lced-dev` |
| `lced-prod` | `lauracantagallo` | Production site | `github.com/lauracantagallo/lced-prod` |

---

## Branches

| Branch | Purpose |
| ------ | ------- |
| `dev` | Active development; deploys to mikeyil GitHub Pages (staging) |
| `main` | Clean release branch; kept in sync with `lauracantagallo/lced-prod/main` |

`dev` is the default branch on `mikeyil/lced-dev`. `main` is never committed to directly — changes are cherry-picked from `dev` or PRs are merged into it before pushing to production.

---

## GitHub Pages

| Repo | URL | PATH_PREFIX |
| ---- | --- | ----------- |
| `mikeyil/lced-dev` | `https://mikeyil.github.io/lced-dev/` | `/lced-dev/` |
| `lauracantagallo/lced-prod` | custom domain `lceducationconsulting.com` | `/` |

GitHub Pages is enabled on both repos under **Settings → Pages → Source: GitHub Actions**.

Each repo has a repository variable `PATH_PREFIX` set under **Settings → Secrets and variables → Actions → Variables tab**.

---

## Decap CMS OAuth App

A GitHub OAuth App is registered under Laura's account for Decap CMS authentication:

- **App name:** LCEC CMS
- **Homepage URL:** `https://mikeyil.github.io/lced-dev`
- **Callback URL:** `https://lcec-cms-auth.royal-queen-bb70.workers.dev/callback`
- The Client ID and Secret are stored in the Cloudflare Worker (`lcec-cms-auth`)

To regenerate the secret: **github.com/settings/developers** → LCEC CMS → Generate a new client secret → update the Cloudflare Worker code.

---

## Developer Remotes

The developer (`mikeyil`) has the following git remotes configured locally:

```bash
origin      https://github.com/mikeyil/lced-dev.git       # staging / dev
lced-prod   https://github.com/lauracantagallo/lced-prod.git  # production
```

### Push workflow

```bash
git push origin dev           # staging (triggers mikeyil GitHub Pages build)
git push lced-prod main       # production (triggers lauracantagallo Pages build)
```

To ship a fix to both at once, cherry-pick the commit from `dev` onto `main` then push both:

```bash
git checkout main
git cherry-pick <commit-hash>
git push lced-prod main
git checkout dev
```

---

## Decap CMS

The CMS lives on `mikeyil/lced-dev` (staging) only. It is not deployed to `lced-prod`.

| File | Purpose |
| ---- | ------- |
| `src/admin/config.yml` | Backend config, collections, and field definitions |
| `src/admin/custom.css` | UI branding overrides (olive green theme, WCAG focus rings) |
| `src/admin/guide.md` | In-app Getting Started guide |
| `src/admin/index.njk` | Admin shell page — loads self-hosted `decap-cms.js` |

**CMS backend:** reads and writes `lauracantagallo/lced-prod/main` directly via the GitHub API.

**OAuth:** GitHub OAuth App "LCEC CMS" under Laura's account. Callback goes through a Cloudflare Worker (`lcec-cms-auth`) that holds the Client ID and Secret.

### Local development with the CMS

Run two processes in parallel:

```bash
npm run dev          # Eleventy dev server
npx decap-server     # Local CMS backend (reads/writes local files)
```

Then open `http://localhost:8080/admin/`. The local backend bypasses GitHub OAuth — no login needed locally.
