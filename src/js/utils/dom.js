// DOM utility functions

/**
 * Toggle a class on an element, with optional force boolean.
 */
export function toggleClass(el, className, force) {
  if (!el) return;
  if (typeof force === 'boolean') {
    el.classList.toggle(className, force);
  } else {
    el.classList.toggle(className);
  }
}

/**
 * Set an ARIA attribute on an element.
 */
export function setAria(el, attr, value) {
  if (el) el.setAttribute(attr, value);
}

/**
 * Add a callback for Escape keydown events.
 */
export function onEscape(callback) {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') callback(e);
  });
}

/**
 * Handle Tab key focus trapping within a container.
 * Pass as a keydown handler; does nothing unless key is Tab.
 */
export function handleFocusTrap(container, e, selector = 'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])') {
  if (e.key !== 'Tab') return;
  const focusable = Array.from(container.querySelectorAll(selector)).filter(el => !el.disabled);
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
