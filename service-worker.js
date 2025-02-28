const CACHE_NAME = "to-do-pwa-cache-v1";
const FILES_TO_CACHE = [
  "/todo-app-wtr/",
  "/todo-app-wtr/index.html",
  "/todo-app-wtr/style.css",
  "/todo-app-wtr/app.js",
  "/todo-app-wtr/manifest.json",
  "/todo-app-wtr/icons/icon-128.png",
  "/todo-app-wtr/icons/icon-512.png",
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
