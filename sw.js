// CigTracker Service Worker — fonctionne sur n'importe quel sous-chemin
const CACHE = 'cigtracker-v8';

// Le basePath est détecté automatiquement depuis l'URL du SW lui-même
// Ex: /CigTracker/sw.js → basePath = /CigTracker/
const basePath = self.location.pathname.replace('sw.js', '');

const ASSETS = [
  basePath,
  basePath + 'index.html',
  basePath + 'manifest.json',
  basePath + 'icon-192.png',
  basePath + 'icon-512.png',
  basePath + 'screenshot-wide.png',
];

// Install: pre-cache tous les assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: supprimer anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first (offline complet)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

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
          // Offline fallback: retourne index.html pour les navigations
          if (e.request.destination === 'document') {
            return caches.match(basePath + 'index.html');
          }
        });
    })
  );
});

// Mise à jour instantanée
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
