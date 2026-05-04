import {
  updateSwStatus,
  updateNetworkStatus,
  detectIos,
  detectStandalone,
} from './app-utils.js';

/* =========================================================
   Service Worker registration
   ========================================================= */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((reg) => {
        console.log('Service Worker registered:', reg.scope);
        updateSwStatus('Active', 'status-active');
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
        updateSwStatus('Unavailable', 'status-inactive');
      });
  });
} else {
  updateSwStatus('Not Supported', 'status-inactive');
}

/* =========================================================
   PWA install prompt
   ========================================================= */
let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('Install prompt outcome:', outcome);
  deferredPrompt = null;
  installBtn.hidden = true;
});

window.addEventListener('appinstalled', () => {
  console.log('PWA installed successfully');
  installBtn.hidden = true;
  deferredPrompt = null;
});

/* =========================================================
   iOS install banner
   ========================================================= */
const iosBanner = document.getElementById('iosInstallBanner');
const iosCloseBtn = document.getElementById('iosInstallClose');

const isIos = detectIos(navigator.userAgent);
const isStandalone = detectStandalone(
  window.navigator.standalone,
  window.matchMedia('(display-mode: standalone)').matches
);

if (isIos && !isStandalone && iosBanner && iosCloseBtn) {
  iosBanner.hidden = false;
  iosCloseBtn.addEventListener('click', () => {
    iosBanner.hidden = true;
  });
}

/* =========================================================
   Network status
   ========================================================= */
const networkStatusEl = document.getElementById('networkStatus');

function handleNetworkChange() {
  updateNetworkStatus(networkStatusEl, navigator.onLine);
}

window.addEventListener('online', handleNetworkChange);
window.addEventListener('offline', handleNetworkChange);
handleNetworkChange();
