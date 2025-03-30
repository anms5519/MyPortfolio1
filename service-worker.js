// service-worker.js - A basic PWA service worker
const CACHE_NAME = 'legendary-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.css',              // your main stylesheet
  '/legendary-upgrades.css',// our legendary upgrades CSS
  '/legendary-upgrades.js', // our legendary upgrades JS
  // add other assets like images, additional styles, etc.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
