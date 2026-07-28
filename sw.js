/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

const PRECACHE = 'precache-v2';
const RUNTIME = 'runtime-v2';
const HOSTNAME_WHITELIST = [
  self.location.hostname,
  'nabang1010.github.io',
  'nabang1010.com'
];

const isWhitelistedRequest = (request) => {
  const url = new URL(request.url);
  return HOSTNAME_WHITELIST.indexOf(url.hostname) > -1;
};

const getFixedUrl = (request) => {
  const url = new URL(request.url);
  url.protocol = self.location.protocol;
  url.search += (url.search ? '&' : '?') + 'cache-bust=' + Date.now();
  return url.href;
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

  const cached = caches.match(request);
  const fetched = fetch(getFixedUrl(request), { cache: 'no-store' });
  const fetchedCopy = fetched.then((response) => response.clone());

  event.respondWith(
    Promise.race([fetched.catch(() => cached), cached])
      .then((response) => response || fetched)
      .catch(() => caches.match('offline.html'))
  );

  event.waitUntil(
    Promise.all([fetchedCopy, caches.open(RUNTIME)])
      .then(([response, cache]) => {
        if (response.ok) {
          return cache.put(request, response);
        }
        return null;
      })
      .catch(() => {})
  );
});
