# LC Education Consulting - Website

A locally-hosted version of the LC Education Consulting website with all assets included for offline functionality.

## Project Structure

```
lcec/
├── fonts/                       # 21 Google Fonts WOFF2 files
│   ├── cabin-*.woff2
│   ├── lato-*.woff2
│   ├── bitter-*.woff2
│   └── lobster-two-*.woff2
├── images/                      # SVG graphics + legacy raster files
│   ├── favicon.svg              # Favicon in SVG format
│   ├── lc-logo.svg              # Company logo in SVG format
│   ├── background-pattern.svg   # Decorative background pattern
│   ├── avatar-placeholder.svg   # Profile image placeholder
│   └── LC LOGO-3adc54b.jpg      # Legacy raster logo (not in use)
├── index.html                   # Homepage
├── contact.html                 # Contact page
├── our-story.html               # About/company history page
├── why-choose-us.html           # Value proposition page
├── accessibility-services.html  # Services page
├── portfolio.html               # Project portfolio page
├── webinars-&-training.html     # Training/webinar offerings
├── manifest.webmanifest         # PWA manifest
├── sw.js                        # Service Worker for offline support
├── README.md                    # This file
└── lcec.code-workspace          # VS Code workspace configuration
```

## Asset Inventory

### Fonts
- **Source**: Google Fonts CDN (https://fonts.googleapis.com)
- **Families**: Cabin, Lato, Bitter, Lobster Two
- **Variants**: All weights (100, 300, 400, 700, 900) with italic options
- **Benefits**: CDN delivery, automatic updates, no storage needed

### Images (5 files)
- **favicon.svg** (335 bytes) - Scalable favicon with "LC" initials
- **lc-logo.svg** (453 bytes) - Brand logo with circular background
- **background-pattern.svg** (1,101 bytes) - Decorative gradient and shapes
- **avatar-placeholder.svg** (490 bytes) - Generic user profile avatar
- **LC LOGO-3adc54b.jpg** (139,392 bytes) - Legacy raster logo (archived)
- **Location**: `public/assets/images/`

## Serving the Website

### Option 1: Simple HTTP Server (Python)
```powershell
python -m http.server 8000
# Visit http://localhost:8000 in your browser
```

### Option 2: Simple HTTP Server (Node.js)
```powershell
npx http-server
```

### Option 3: Local IIS
Point your web server's root to the root `lcec/` directory.

### Option 4: Development with VS Code Live Server
Install the Live Server extension and right-click `index.html` → "Open with Live Server"

## Key Features

- **Offline Support**: Every asset is included locally; service worker enables offline viewing
- **PWA Manifest**: `manifest.webmanifest` enables installation as a progressive web app
- **Vector Graphics**: All images are SVG format for crisp display at any resolution
- **Google Fonts**: All 21 font files available locally with fallback support
- **No External Dependencies**: Completely self-contained; no CDN calls required

## Development Workflow

### To Update Asset References
If you modify HTML files and add new assets:

1. **Add fonts**: Place WOFF2 files in `public/assets/fonts/`
2. **Add images**: Place SVG files in `public/assets/images/` (or use utilities in `scripts/`)
3. **Update HTML**: Reference using relative paths:
   - Fonts: `<link rel="stylesheet" href="/assets/fonts/...">`
   - Images: `<img src="/assets/images/..." alt="...">`

### Utility Scripts (in `scripts/`)
- Run from the root directory (`lcec/`)
- Use `./scripts/scriptname.ps1` in PowerShell
- Scripts handle bulk URL replacement and asset management

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **WOFF2 Fonts**: Supported in all modern browsers; fallback to system fonts if unsupported
- **SVG Images**: Full support in all modern browsers
- **Service Worker**: Requires HTTPS in production; works with localhost during development

## Notes

- The `docs/` folder contains HTTrack cache artifacts and backups for reference
- All external CDN URLs have been replaced with local file paths
- The website is fully functional offline
- Original source: https://lceducationconsulting.com (downloaded with HTTrack)

---

**Last Updated**: March 2026  
**Project**: LC Education Consulting Static Website  
**Status**: Fully localized with offline support
