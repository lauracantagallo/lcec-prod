
// ─── Utility Functions ───────────────────────────────────────────────────────
function toggleClass(el, className, force) {
  if (!el) return;
  if (typeof force === 'boolean') {
    el.classList.toggle(className, force);
  } else {
    el.classList.toggle(className);
  }
}

function setAria(el, attr, value) {
  if (el) el.setAttribute(attr, value);
}

function onEscape(callback) {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') callback(e);
  });
}

// ─── Navigation (Mobile & Dropdown) ─────────────────────────────────────────-
function initNavigation() {
  // Mobile Nav
  const toggle   = document.querySelector('.mobile-nav-toggle');
  const closeBtn = document.querySelector('.mobile-nav__close');
  const nav      = document.getElementById('mobile-nav');
  const overlay  = document.getElementById('mobile-nav-overlay');

  if (toggle && nav) {
    function openNav() {
      toggleClass(nav, 'is-open', true);
      setAria(nav, 'aria-hidden', 'false');
      toggleClass(overlay, 'is-visible', true);
      document.body.classList.add('nav-open');
      setAria(toggle, 'aria-expanded', 'true');
      setAria(toggle, 'aria-label', 'Close navigation menu');
      closeBtn && closeBtn.focus();

      // Focus trap: keep focus inside mobile nav
      function trapFocus(e) {
        if (!nav.classList.contains('is-open')) return;
        const focusable = nav.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
      nav.addEventListener('keydown', trapFocus);
      nav._trapFocusHandler = trapFocus;
    }
    function closeNav() {
      toggleClass(nav, 'is-open', false);
      setAria(nav, 'aria-hidden', 'true');
      toggleClass(overlay, 'is-visible', false);
      document.body.classList.remove('nav-open');
      setAria(toggle, 'aria-expanded', 'false');
      setAria(toggle, 'aria-label', 'Open navigation menu');
      toggle.focus();

      // Remove focus trap event
      if (nav._trapFocusHandler) {
        nav.removeEventListener('keydown', nav._trapFocusHandler);
        delete nav._trapFocusHandler;
      }
    }
    toggle.addEventListener('click', () => {
      nav.classList.contains('is-open') ? closeNav() : openNav();
    });
    closeBtn && closeBtn.addEventListener('click', closeNav);
    overlay  && overlay.addEventListener('click', closeNav);
    onEscape(e => { if (nav.classList.contains('is-open')) closeNav(); });
  }

  // Dropdowns (event delegation)
  document.addEventListener('click', e => {
    // Dropdown button
    const btn = e.target.closest('.nav__dropdown-btn');
    if (btn) {
      const dropdown = document.getElementById(btn.getAttribute('aria-controls'));
      if (!dropdown) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      setAria(btn, 'aria-expanded', String(!expanded));
      toggleClass(dropdown, 'is-open', !expanded);
      e.stopPropagation();
      return;
    }
    // Close all dropdowns if click outside
    document.querySelectorAll('.nav__dropdown-btn').forEach(b => {
      const d = document.getElementById(b.getAttribute('aria-controls'));
      setAria(b, 'aria-expanded', 'false');
      d && d.classList.remove('is-open');
    });
  });

  // Dropdown: close on Escape and focusout
  document.querySelectorAll('.nav__dropdown-btn').forEach(btn => {
    const dropdown = document.getElementById(btn.getAttribute('aria-controls'));
    if (!dropdown) return;
    dropdown.addEventListener('keydown', e => {
      if (e.key === 'Escape') { 
        setAria(btn, 'aria-expanded', 'false');
        dropdown.classList.remove('is-open');
        btn.focus();
      }
    });
    dropdown.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (!dropdown.contains(document.activeElement) && !btn.contains(document.activeElement)) {
          setAria(btn, 'aria-expanded', 'false');
          dropdown.classList.remove('is-open');
        }
      });
    });
  });
}

// ─── Cookie banner ───────────────────────────────────────────────────────────
const COOKIE_KEY   = 'lc_cookie_accepted';
const ONE_YEAR_MS  = 365 * 24 * 60 * 60 * 1000;

function cookieConsentAccepted() {
  const stored = localStorage.getItem(COOKIE_KEY);
  if (!stored) return false;
  try {
    const { expiry } = JSON.parse(stored);
    return Date.now() < expiry;
  } catch {
    // Legacy value ('1') or malformed — treat as expired
    return false;
  }
}

function initCookieBanner() {
  const banner    = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-banner-accept');
  if (!banner || !acceptBtn) return;
  if (!cookieConsentAccepted()) {
    banner.classList.add('is-visible');
  }
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ expiry: Date.now() + ONE_YEAR_MS }));
    banner.classList.remove('is-visible');
  });
}

// ─── Contact form placeholder ───────────────────────────────────────────────
function initContactForm() {
  const form   = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (status) {
      status.textContent = 'Form submission is not yet available. Please call or email us directly.';
    }
  });
}

// ─── External Links ──────────────────────────────────────────────────────────
function initExternalLinks() {
  const currentHost = location.hostname;
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.classList.contains('btn') || link.classList.contains('social-link')) return;
    if (!link.textContent.trim()) return;
    try {
      if (new URL(link.href).hostname === currentHost) return;
    } catch {
      return;
    }
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    const icon = document.createElement('span');
    icon.className = 'external-link-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
    link.appendChild(icon);
  });
}

// ─── Single Init Function ─────────────────────────────────────────────────--
function initUI() {
  initNavigation();
  initCookieBanner();
  initContactForm();
  initExternalLinks();
}

document.addEventListener('DOMContentLoaded', initUI);

// ─── Performance Suggestions (not implemented, for future consideration) ────
// 1. Defer non-critical JS: Add 'defer' to script tag in HTML for faster page load.
// 2. Minify JS for production (already handled if using a bundler/minifier).
// 3. Use passive event listeners for scroll/touch events if added in future.
// 4. Consider code splitting if JS grows larger.
// 5. Use IntersectionObserver for lazy-loading images or content if needed.
