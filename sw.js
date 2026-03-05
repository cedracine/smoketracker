// SmokeTracker Service Worker — offline-first PWA
const CACHE = 'smoketracker-v6';

const basePath = self.location.pathname.replace('sw.js', '');

// Only same-origin assets — cross-origin (fonts) must NOT be in precache
// addAll fails the entire install if any URL throws, including CORS errors
const ASSETS = [
  basePath,
  basePath + 'index.html',
  basePath + 'manifest.json',
  basePath + 'icon-192.png',
  basePath + 'icon-512.png',
  basePath + 'icon-512-maskable.png',
];

// Install: pre-cache local assets only
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for same-origin, network passthrough for cross-origin (fonts etc.)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Let cross-origin requests pass through untouched
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return response;
        })
        .catch(() => {
          if (e.request.destination === 'document') {
            return caches.match(basePath + 'index.html');
          }
        });
    })
  );
});

// Instant update
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
