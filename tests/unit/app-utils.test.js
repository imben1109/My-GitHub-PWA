import { describe, it, expect, beforeEach } from 'vitest';
import {
  updateSwStatus,
  updateNetworkStatus,
  detectIos,
  detectStandalone,
} from '../../js/app-utils.js';

describe('updateSwStatus', () => {
  it('sets text and class on the swStatus element', () => {
    document.body.innerHTML = '<span id="swStatus"></span>';
    updateSwStatus('Active', 'status-active');
    const el = document.getElementById('swStatus');
    expect(el.textContent).toBe('Active');
    expect(el.className).toBe('status-value status-active');
  });

  it('sets text and class for unavailable status', () => {
    document.body.innerHTML = '<span id="swStatus"></span>';
    updateSwStatus('Unavailable', 'status-inactive');
    const el = document.getElementById('swStatus');
    expect(el.textContent).toBe('Unavailable');
    expect(el.className).toBe('status-value status-inactive');
  });

  it('sets text and class for not-supported status', () => {
    document.body.innerHTML = '<span id="swStatus"></span>';
    updateSwStatus('Not Supported', 'status-inactive');
    const el = document.getElementById('swStatus');
    expect(el.textContent).toBe('Not Supported');
    expect(el.className).toBe('status-value status-inactive');
  });

  it('does nothing when swStatus element is absent', () => {
    document.body.innerHTML = '';
    expect(() => updateSwStatus('Active', 'status-active')).not.toThrow();
  });
});

describe('updateNetworkStatus', () => {
  let el;

  beforeEach(() => {
    document.body.innerHTML = '<span id="networkStatus"></span>';
    el = document.getElementById('networkStatus');
  });

  it('marks the element as Online when online', () => {
    updateNetworkStatus(el, true);
    expect(el.textContent).toBe('Online');
    expect(el.className).toBe('status-value status-active');
  });

  it('marks the element as Offline when offline', () => {
    updateNetworkStatus(el, false);
    expect(el.textContent).toBe('Offline');
    expect(el.className).toBe('status-value status-inactive');
  });

  it('does nothing when element is null', () => {
    expect(() => updateNetworkStatus(null, true)).not.toThrow();
  });
});

describe('detectIos', () => {
  it('returns true for an iPhone user agent', () => {
    expect(
      detectIos('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15')
    ).toBe(true);
  });

  it('returns true for an iPad user agent', () => {
    expect(
      detectIos('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15')
    ).toBe(true);
  });

  it('returns true for an iPod user agent', () => {
    expect(
      detectIos('Mozilla/5.0 (iPod touch; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15')
    ).toBe(true);
  });

  it('returns false for an Android user agent', () => {
    expect(
      detectIos('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0')
    ).toBe(false);
  });

  it('returns false for a desktop Chrome user agent', () => {
    expect(
      detectIos('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0')
    ).toBe(false);
  });

  it('returns false for a desktop Safari user agent', () => {
    expect(
      detectIos('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 Safari/605.1.15')
    ).toBe(false);
  });
});

describe('detectStandalone', () => {
  it('returns true when navigator.standalone is true (iOS PWA)', () => {
    expect(detectStandalone(true, false)).toBe(true);
  });

  it('returns true when display-mode is standalone (Android/desktop PWA)', () => {
    expect(detectStandalone(false, true)).toBe(true);
  });

  it('returns true when both flags are true', () => {
    expect(detectStandalone(true, true)).toBe(true);
  });

  it('returns false when running in a normal browser tab', () => {
    expect(detectStandalone(false, false)).toBe(false);
  });

  it('returns false when navigator.standalone is undefined (non-iOS)', () => {
    expect(detectStandalone(undefined, false)).toBe(false);
  });
});
