importScripts('/serviceworker-cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('ck101-reader').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       'css/font-awesome.min.css',
       'fonts/fontawesome-webfont.eot',
       'fonts/fontawesome-webfont.svg',
       'fonts/fontawesome-webfont.ttf',
       'fonts/fontawesome-webfont.woff',
       'fonts/fontawesome-webfont.woff2',
       'fonts/FontAwesome.otf',
       'fonts/fontawesome-webfont.eot?v=4.7.0',
       'fonts/fontawesome-webfont.svg?v=4.7.0',
       'fonts/fontawesome-webfont.ttf?v=4.7.0',
       'fonts/fontawesome-webfont.woff?v=4.7.0',
       'fonts/fontawesome-webfont.woff2?v=4.7.0',
       'fonts/FontAwesome.otf?v=4.7.0',
       'https://fonts.googleapis.com/css?family=Noto+Sans',
       '/js/compiled/app.js'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || new Response("Nothing in the cache for this request");
    })
  );
});