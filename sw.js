/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

const PRECACHE = 'precache-v5';
const RUNTIME = 'runtime-v5';
const HOSTNAME_WHITELIST = [
  self.location.hostname,
  'nabang1010.github.io',
  'nabang1010.com'
];

const isWhitelistedRequest = (request) => {
  const url = new URL(request.url);
  return HOSTNAME_WHITELIST.indexOf(url.hostname) > -1;
};

const isNavigationRequest = (request) => {
  const accept = request.headers.get('accept') || '';
  return request.mode === 'navigate' || (request.method === 'GET' && accept.includes('text/html'));
};

const endWithExtension = (request) => Boolean(new URL(request.url).pathname.match(/\.\w+$/));

const shouldRedirect = (request) => {
  const url = new URL(request.url);
  return isNavigationRequest(request) && !url.pathname.endsWith('/') && !endWithExtension(request);
};

const getRedirectUrl = (request) => {
  const url = new URL(request.url);
  url.pathname += '/';
  return url.href;
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.add('offline.html'))
      .then(() => self.skipWaiting())
      .catch((error) => console.log(error))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => ![PRECACHE, RUNTIME].includes(key))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || !isWhitelistedRequest(request)) return;

  if (shouldRedirect(request)) {
    event.respondWith(Response.redirect(getRedirectUrl(request)));
    return;
  }

  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('offline.html')))
    );
    return;
  }

  const networkResponse = fetch(request);

  event.waitUntil(
    Promise.all([networkResponse.then((response) => response.clone()), caches.open(RUNTIME)])
      .then(([response, cache]) => {
        if (response.ok) {
          return cache.put(request, response);
        }
        return null;
      })
      .catch(() => {})
  );

  event.respondWith(
    caches.match(request).then((cached) => cached || networkResponse)
  );
});
