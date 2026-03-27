
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
    }
    function closeNav() {
      toggleClass(nav, 'is-open', false);
      setAria(nav, 'aria-hidden', 'true');
      toggleClass(overlay, 'is-visible', false);
      document.body.classList.remove('nav-open');
      setAria(toggle, 'aria-expanded', 'false');
      setAria(toggle, 'aria-label', 'Open navigation menu');
      toggle.focus();
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

// ─── Single Init Function ─────────────────────────────────────────────────--
function initUI() {
  initNavigation();
  initCookieBanner();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initUI);

// ─── Performance Suggestions (not implemented, for future consideration) ────
// 1. Defer non-critical JS: Add 'defer' to script tag in HTML for faster page load.
// 2. Minify JS for production (already handled if using a bundler/minifier).
// 3. Use passive event listeners for scroll/touch events if added in future.
// 4. Consider code splitting if JS grows larger.
// 5. Use IntersectionObserver for lazy-loading images or content if needed.
