const CACHE_NAME = "version-1";
const urlToCache = ["index.html", "offline.html"];
const self = this;
// Install the SW
self.addEventListener("install", function (event) {
  // Wait for the caches to done loading
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlToCache);
    })
  );
});

// Listen for the request
self.addEventListener("fetch", function (event) {
  // Responding the events
  event.respondWith(
    // Check if the request is in the cache
    // Matching all the request in the caches
    caches
      .match(event.request)
      // For all the request the data from the caches
      .then(() =>
        fetch(event.request).catch((err) => caches.match("offline.html"))
      )
  );
});

// Activate the service worker
self.addEventListener("activate", function (event) {
  // Here we remove all the previous caches and activated the new ones.
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map(
          (cacheName) =>
            !cacheWhitelist.includes(cacheName) && caches.delete(cacheName)
        )
      );
    })
  );
});
