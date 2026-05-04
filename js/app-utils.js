/* =========================================================
   Exported utility functions (testable, dependency-injectable)
   ========================================================= */

/**
 * Updates the Service Worker status indicator in the DOM.
 * @param {string} text - Status text to display.
 * @param {string} cssClass - CSS class suffix to apply.
 * @param {Document} doc - Document to query (injectable for testing).
 */
export function updateSwStatus(text, cssClass, doc = document) {
  const el = doc.getElementById('swStatus');
  if (el) {
    el.textContent = text;
    el.className = `status-value ${cssClass}`;
  }
}

/**
 * Updates the network status indicator in the DOM.
 * @param {Element|null} el - The element to update.
 * @param {boolean} isOnline - Whether the network is currently online.
 */
export function updateNetworkStatus(el, isOnline) {
  if (!el) return;
  if (isOnline) {
    el.textContent = 'Online';
    el.className = 'status-value status-active';
  } else {
    el.textContent = 'Offline';
    el.className = 'status-value status-inactive';
  }
}

/**
 * Returns true when the user agent indicates an iOS device.
 * @param {string} userAgent - The navigator.userAgent string.
 * @returns {boolean}
 */
export function detectIos(userAgent) {
  return /iphone|ipad|ipod/i.test(userAgent);
}

/**
 * Returns true when the app is running in standalone (installed PWA) mode.
 * @param {boolean|undefined} navigatorStandalone - window.navigator.standalone value.
 * @param {boolean} matchMediaStandalone - Result of matchMedia('(display-mode: standalone)').matches.
 * @returns {boolean}
 */
export function detectStandalone(navigatorStandalone, matchMediaStandalone) {
  return navigatorStandalone === true || matchMediaStandalone === true;
}
