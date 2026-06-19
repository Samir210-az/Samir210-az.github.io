// Bu fayl kohne service-worker-i sondurur ki, butun domeni "tutub saxlamasin"
// ve digar alt-sehifelere (mes: /an-rus-dili-platform/) mane olmasin.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))),
      self.registration.unregister()
    ]).then(() => {
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => client.navigate(client.url));
      });
    })
  );
});

self.addEventListener('fetch', () => {});
