const CACHE_NAME = 'noche-de-confesiones-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/controller.js',
  '/js/model.js',
  '/js/view.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en caché, lo devolvemos. Si no, lo buscamos en la red.
        return response || fetch(event.request);
      })
  );
});