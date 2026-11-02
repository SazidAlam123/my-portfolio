/* Conservative service worker for Sajid Alam's website.
   - Same-origin GET requests only; third-party requests are never touched.
   - HTML pages: network-first, falling back to cache when offline.
   - Static assets (img/icons/favicons): stale-while-revalidate.
   Bump CACHE_VERSION on each deploy that changes cached files. */
const CACHE_PREFIX = 'sajidalam-site-';
const CACHE_VERSION = 'v1';
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;

const PRECACHE = [
  '/',
  '/index.html',
  '/portfolio.html',
  '/privacy.html',
  '/terms.html',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon.png',
  '/favicon-48.png',
  '/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/img/sajid-alam-freelance-data-entry-expert.webp',
  '/img/peblo-logo.webp',
  '/img/fiverr-level-2-seller-badge.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Add each URL separately so one failure does not abort installation.
      Promise.all(PRECACHE.map((url) =>
        cache.add(new Request(url, { cache: 'reload' })).catch(() => {})
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

function isStaticAsset(url) {
  return url.pathname.startsWith('/img/') ||
         url.pathname.startsWith('/icons/') ||
         /^\/(favicon|apple-touch-icon)/.test(url.pathname) ||
         url.pathname === '/preview.jpg';
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never intercept third parties
  if (url.pathname === '/service-worker.js') return;

  // HTML pages: network-first, cache fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then((hit) => hit || caches.match('/index.html'))
      )
    );
    return;
  }

  // Static assets: stale-while-revalidate
  if (isStaticAsset(url) || url.pathname === '/manifest.webmanifest') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req).then((hit) => {
          const refresh = fetch(req).then((res) => {
            if (res && res.status === 200 && res.type === 'basic') cache.put(req, res.clone());
            return res;
          }).catch(() => hit);
          return hit || refresh;
        })
      )
    );
  }
  // Everything else falls through to the network untouched.
});
