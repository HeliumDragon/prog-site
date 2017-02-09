// var cacheName = 'githubUserPWA';
// var dataCacheName = 'githubUser-v1';
// var filesToCache = [
//   '/prog-site/',
//   '/prog-site/index.html',
//   '/prog-site/styles.bundle.css',
//   '/prog-site/inline.bundle.js',
//   '/prog-site/vendor.bundle.js',
//   '/prog-site/main.bundle.js',
//   '/prog-site/assets/images/ic_add_white_24px.svg',
//   '/prog-site/assets/images/ic_refresh_white_24px.svg',
//   '/prog-site/assets/images/icons/icon-32x32.png',
//   '/prog-site/assets/images/icons/icon-128x128.png',
//   '/prog-site/assets/images/icons/icon-144x144.png',
//   '/prog-site/assets/images/icons/icon-152x152.png',
//   '/prog-site/assets/images/icons/icon-192x192.png',
//   '/prog-site/assets/images/icons/icon-256x256.png'
// ];
//
// self.addEventListener('install', function(e) {
//   console.log('[ServiceWorker] Install');
//   e.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       console.log('[ServiceWorker] Caching app shell');
//       return cache.addAll(filesToCache);
//     })
//   );
// });
//
// self.addEventListener('activate', function(e) {
//   console.log('[ServiceWorker] Activate');
//   e.waitUntil(
//     caches.keys().then(function(keyList) {
//       return Promise.all(keyList.map(function(key) {
//         if (key !== cacheName && key !== dataCacheName) {
//           console.log('[ServiceWorker] Removing old cache', key);
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
//   return self.clients.claim();
// });
//
// self.addEventListener('fetch', function(e) {
//   console.log('[Service Worker] Fetch', e.request.url);
//   var dataUrl = 'https://api.github.com/users/';
//   if (e.request.url.indexOf(dataUrl) > -1) {
//     /*
//      * When the request URL contains dataUrl, the app is asking for fresh
//      * data. In this case, the service worker always goes to the
//      * network and then caches the response. This is called the "Cache then
//      * network" strategy:
//      * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
//      */
//     e.respondWith(
//       caches.open(dataCacheName).then(function(cache) {
//         return fetch(e.request).then(function(response){
//           cache.put(e.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     /*
//      * The app is asking for app shell files. In this scenario the app uses the
//      * "Cache, falling back to the network" offline strategy:
//      * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
//      */
//     e.respondWith(
//       caches.match(e.request).then(function(response) {
//         return response || fetch(e.request);
//       })
//     );
//   }
// });
