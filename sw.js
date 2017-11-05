const CURRENT_CACHE = 'claireso-static-v3';

const expectedCaches = [
  CURRENT_CACHE,
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CURRENT_CACHE)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/favicon.png',
        'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js',
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  // remove old caches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!/^claireso-/.test(cacheName)) {
            return;
          }
          if (expectedCaches.indexOf(cacheName) == -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request).then(response => {
        return caches.open(CURRENT_CACHE).then(cache => cache.put(event.request, response.clone()).then(() => response));
      })
    )
  );
});
