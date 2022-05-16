"use strict";

// Update cache names any time any of the cached files change.
const CACHE_NAME = "steege-list-cache-v01";

//
const FILES_TO_CACHE = ["/", "/dashboard", "/list-detail"];

//
const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(FILES_TO_CACHE));
  self.skipWaiting();
});

//
self.addEventListener("fetch", function (event) {
  // console.log(event);

  // TODO: Try to fetch from network first, then fallback on cached files.

  //
  const response = caches
    .match(event.request)
    .then(function (resp) {
      return resp || fetch(event.request);
    })
    .catch(function (err) {
      console.error(
        "[ServiceWorker] Fetch error for url " + event.request.url + ": " + err
      );
      return false;
    });

  // console.log(event.request.url);
  // console.log(response);

  event.respondWith(response);
});

//
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});
