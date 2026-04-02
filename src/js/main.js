
// ─── Utility Functions (imported) ─────────────────────────────────────────--
import { toggleClass, setAria, onEscape } from './utils/dom.js';
import { formatPhoneNumber } from './utils/form.js';

// ─── Navigation (Mobile & Dropdown) ─────────────────────────────────────────-
function initNavigation() {
  // Mobile Nav
  const toggle   = document.querySelector('.mobile-nav-toggle');
  const closeBtn = document.querySelector('.mobile-nav__close');
  const nav      = document.getElementById('mobile-nav');
  const overlay  = document.getElementById('mobile-nav-overlay');

  function setNavFocusable(focusable) {
    nav.querySelectorAll('a, button').forEach(el => {
      if (focusable) {
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex', '-1');
      }
    });
  }

  if (toggle && nav) {
    // Nav starts hidden — disable focus on its children
    setNavFocusable(false);

    function openNav() {
      toggleClass(nav, 'is-open', true);
      setAria(nav, 'aria-hidden', 'false');
      setNavFocusable(true);
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
      setNavFocusable(false);
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
    onEscape(() => { if (nav.classList.contains('is-open')) closeNav(); });
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

// ─── Contact form validation ─────────────────────────────────────────────────
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  function getFieldLabel(field) {
    const label = form.querySelector('label[for="' + field.id + '"]');
    return label ? label.textContent.replace('*', '').trim() : 'This field';
  }

  function getErrorMessage(field) {
    const value = field.value.trim();
    if (!value) return getFieldLabel(field) + ' is required.';
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address.';
    }
    if (field.type === 'tel') {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 7) return 'Please enter a valid phone number.';
    }
    return '';
  }

  function showError(field, message) {
    const errorEl = document.getElementById(field.id + '-error');
    const fieldEl = field.closest('.form-field');
    if (errorEl) errorEl.textContent = message;
    if (fieldEl) fieldEl.classList.add('has-error');
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    const errorEl = document.getElementById(field.id + '-error');
    const fieldEl = field.closest('.form-field');
    if (errorEl) errorEl.textContent = '';
    if (fieldEl) fieldEl.classList.remove('has-error');
    field.removeAttribute('aria-invalid');
  }

  form.addEventListener('submit', e => {
    const fields = form.querySelectorAll('.form-input, .form-textarea');
    let firstError = null;
    fields.forEach(field => {
      const message = getErrorMessage(field);
      if (message) {
        showError(field, message);
        if (!firstError) firstError = field;
      } else {
        clearError(field);
      }
    });
    if (firstError) {
      e.preventDefault();
      firstError.focus();
    }
  });

  // Format phone field to (XXX) XXX-XXXX as user types
  const phoneField = form.querySelector('#phone');
  if (phoneField) {
    phoneField.addEventListener('input', () => {
      phoneField.value = formatPhoneNumber(phoneField.value);
    });
  }

  // Clear error on a field as soon as the user corrects it
  form.addEventListener('input', e => {
    const field = e.target.closest('.form-input, .form-textarea');
    if (field && !getErrorMessage(field)) clearError(field);
  });
  form.addEventListener('change', e => {
    const field = e.target.closest('.form-input');
    if (field && !getErrorMessage(field)) clearError(field);
  });
}

// ─── External Links ──────────────────────────────────────────────────────────
function initExternalLinks() {
  const currentHost = location.hostname;
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.classList.contains('social-link')) return;
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

// ─── Announcement bar toggle ─────────────────────────────────────────────────
const ANNOUNCE_COLLAPSED_KEY = 'lc_announce_collapsed';

function initAnnouncementToggle() {
  const bar     = document.getElementById('announcement-bar');
  const btn     = bar && bar.querySelector('.announcement-bar__toggle');
  const content = document.getElementById('announcement-bar-content');
  if (!bar || !btn || !content) return;

  function setCollapsed(collapsed) {
    bar.classList.toggle('is-collapsed', collapsed);
    btn.setAttribute('aria-expanded', String(!collapsed));
    btn.setAttribute('aria-label', collapsed ? 'Expand announcement' : 'Collapse announcement');
    localStorage.setItem(ANNOUNCE_COLLAPSED_KEY, collapsed ? '1' : '0');
  }

  // Restore persisted state before first paint
  if (localStorage.getItem(ANNOUNCE_COLLAPSED_KEY) === '1') setCollapsed(true);

  btn.addEventListener('click', () => setCollapsed(!bar.classList.contains('is-collapsed')));
}

// ─── Footer nav toggle ───────────────────────────────────────────────────────
const FOOTER_NAV_COLLAPSED_KEY = 'lc_footer_nav_collapsed';

function initFooterNavToggle() {
  const wrapper = document.getElementById('footer-nav-content');
  const btn     = document.querySelector('.footer-nav-toggle');
  if (!wrapper || !btn) return;

  function setCollapsed(collapsed) {
    wrapper.classList.toggle('is-collapsed', collapsed);
    btn.classList.toggle('is-collapsed', collapsed);
    btn.setAttribute('aria-expanded', String(!collapsed));
    btn.setAttribute('aria-label', collapsed ? 'Expand footer navigation' : 'Collapse footer navigation');
    localStorage.setItem(FOOTER_NAV_COLLAPSED_KEY, collapsed ? '1' : '0');
  }

  // Restore persisted state before first paint
  if (localStorage.getItem(FOOTER_NAV_COLLAPSED_KEY) === '1') setCollapsed(true);

  btn.addEventListener('click', () => setCollapsed(!wrapper.classList.contains('is-collapsed')));
}

// ─── Exit Modal ──────────────────────────────────────────────────────────────
function initExitModal() {
  const modal = document.getElementById('exit-modal');
  if (!modal) return;

  const panel       = modal.querySelector('.exit-modal__panel');
  const titleEl     = document.getElementById('exit-modal-title');
  const messageEl   = document.getElementById('exit-modal-message');
  const hintEl      = document.getElementById('exit-modal-hint');
  const countdownEl = document.getElementById('exit-modal-countdown');
  const goBtn       = modal.querySelector('.exit-modal__go');
  const cancelBtn   = modal.querySelector('.exit-modal__cancel');

  let timer         = null;
  let pendingAction = null;
  let triggerEl     = null;

  function openModal(config, trigger) {
    triggerEl     = trigger;
    pendingAction = config.action;

    titleEl.textContent   = config.title;
    messageEl.textContent = config.message;

    if (config.hint) {
      hintEl.textContent = config.hint;
      hintEl.hidden = false;
    } else {
      hintEl.textContent = '';
      hintEl.hidden = true;
    }

    if (config.countdown !== false) {
      const label = config.countdownLabel || 'Continuing';
      const secEl = document.createElement('strong');
      secEl.textContent = '5';
      countdownEl.textContent = label + ' in ';
      countdownEl.appendChild(secEl);
      countdownEl.appendChild(document.createTextNode('\u2026'));
      countdownEl.hidden = false;
      let seconds = 5;
      timer = setInterval(() => {
        seconds--;
        secEl.textContent = seconds;
        if (seconds <= 0) {
          clearInterval(timer);
          timer = null;
          doAction();
        }
      }, 1000);
    } else {
      countdownEl.textContent = '';
      countdownEl.hidden = true;
    }

    modal.classList.add('is-visible');
    document.body.classList.add('modal-open');
    cancelBtn.focus();
  }

  function closeModal() {
    if (timer) { clearInterval(timer); timer = null; }
    modal.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
    if (triggerEl) { triggerEl.focus(); triggerEl = null; }
  }

  function doAction() {
    const action = pendingAction;
    closeModal();
    action();
  }

  goBtn.addEventListener('click', doAction);
  cancelBtn.addEventListener('click', closeModal);

  // Click outside panel to dismiss
  modal.addEventListener('click', e => {
    if (!panel.contains(e.target)) closeModal();
  });

  onEscape(() => { if (modal.classList.contains('is-visible')) closeModal(); });

  // Focus trap
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !modal.classList.contains('is-visible')) return;
    const focusable = Array.from(modal.querySelectorAll('button'));
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  // Intercept LinkedIn links
  document.querySelectorAll('a[href*="linkedin.com"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.href;
      openModal({
        title: 'You\'re leaving this site',
        message: 'You\'re being redirected to LinkedIn in a new tab.',
        countdownLabel: 'Taking you there',
        action: () => window.open(href, '_blank', 'noopener noreferrer')
      }, link);
    });
  });

  // Intercept vCard download
  document.querySelectorAll('.social-link--vcard').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.href;
      openModal({
        title: 'Downloading contact card',
        message: 'A .vcf contact file will be saved to your device.',
        hint: 'Open the file to add Laura Cantagallo to your contacts.',
        countdown: false,
        action: () => {
          const a = document.createElement('a');
          a.href = href;
          a.download = 'laura-cantagallo.vcf';
          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
        }
      }, link);
    });
  });
}

// ─── Single Init Function ─────────────────────────────────────────────────--
function initUI() {
  initNavigation();
  initCookieBanner();
  initContactForm();
  initExternalLinks();
  initAnnouncementToggle();
  initFooterNavToggle();
  initExitModal();
}

document.addEventListener('DOMContentLoaded', initUI);

