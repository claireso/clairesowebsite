self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.addAll([
      '/',
      'index.html',
      '/favicon.png',
    ]))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request))
  );
});
