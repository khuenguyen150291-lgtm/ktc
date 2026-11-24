// KTC – chỉ lưu sẵn vỏ giao diện để mở nhanh; số liệu luôn lấy mới từ máy xử lý.
const BAN = 'ktc-v0.7.8';
const VO = ['./', 'index.html', 'manifest.webmanifest', 'logo.png', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(BAN).then(c => c.addAll(VO))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== BAN).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // không đụng tới dữ liệu
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(BAN).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
