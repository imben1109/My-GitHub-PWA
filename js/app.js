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
   Network status
   ========================================================= */
const networkStatusEl = document.getElementById('networkStatus');

function updateNetworkStatus() {
  if (navigator.onLine) {
    networkStatusEl.textContent = 'Online';
    networkStatusEl.className = 'status-value status-active';
  } else {
    networkStatusEl.textContent = 'Offline';
    networkStatusEl.className = 'status-value status-inactive';
  }
}

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

/* =========================================================
   Helpers
   ========================================================= */
function updateSwStatus(text, cssClass) {
  const el = document.getElementById('swStatus');
  if (el) {
    el.textContent = text;
    el.className = `status-value ${cssClass}`;
  }
}
