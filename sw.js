/* 미누정 게스트 가이드 서비스워커: 오프라인에서도 핵심 정보가 보이도록 캐시한다.
   콘텐츠를 바꾼 뒤 반드시 새로 받게 하려면 VERSION 숫자를 올린다. */
var VERSION = "mj-v13";
var CORE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "data/settings.json",
  "data/ui.json",
  "data/menu.json",
  "data/items.json",
  "data/idle.json",
  "data/welcome.json",
  "data/images.json",
  "data/music.json",
  "icons/icon-192.png",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    // 하나가 실패해도 나머지는 캐시한다
    return Promise.all(CORE.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function put(req, res) {
  if (res && (res.ok || res.type === "opaque")) {
    var copy = res.clone();
    caches.open(VERSION).then(function (c) { c.put(req, copy); });
  }
  return res;
}
/* 페이지와 콘텐츠: 네트워크 우선, 실패하면 캐시 */
function networkFirst(req) {
  return fetch(req).then(function (res) { return put(req, res); }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (r) { return r || caches.match("index.html"); });
  });
}
/* 음원·아이콘·글꼴·라이브러리: 캐시 우선 */
function cacheFirst(req) {
  return caches.match(req).then(function (r) {
    return r || fetch(req).then(function (res) { return put(req, res); });
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  if (req.headers.has("range")) return; // 음원 부분 요청은 브라우저에 맡긴다
  if (/docs\.google\.com/.test(url.host)) return; // 시트는 항상 새로
  if (url.origin === location.origin) {
    if (req.mode === "navigate" || /\.(html|json)$/.test(url.pathname) || url.pathname.slice(-1) === "/") e.respondWith(networkFirst(req));
    else e.respondWith(cacheFirst(req));
    return;
  }
  if (/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com|commons\.wikimedia\.org|upload\.wikimedia\.org/.test(url.host)) e.respondWith(cacheFirst(req));
});
