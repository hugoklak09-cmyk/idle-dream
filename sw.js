// Idle Dream : garde le jeu en cache pour qu'il marche sans réseau. Change VER à chaque nouvelle version.
const VER = 'idle-dream-v23', FILES = ['./', 'index.html', 'game.js', 'style.css', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'lf/f.css'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VER).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { if (e.request.method !== 'GET') return; e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(VER).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request))); });
