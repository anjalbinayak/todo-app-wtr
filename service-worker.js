const CACHE_NAME = "to-do-pwa-cache-v1";
const FILES_TO_CACHE = [
  "/YOUR-REPOSITORY-NAME/",
  "/YOUR-REPOSITORY-NAME /index.html",
  "/YOUR-REPOSITORY-NAME /style.css",
  "/YOUR-REPOSITORY-NAME /app.js",
  "/YOUR-REPOSITORY-NAME /manifest.json",
  "/YOUR-REPOSITORY-NAME /icons/icon-128.png",
  "/YOUR-REPOSITORY-NAME /icons/icon-512.png",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
