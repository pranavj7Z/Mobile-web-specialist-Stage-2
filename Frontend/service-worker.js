var staticCacheName = 'v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
       return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/main.js',
	'/service-worker.js',
	'/js/app.js',
        '/js/dbhelper.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/1_md.jpg',
        '/img/1_sm.jpg',
        '/img/2.jpg',
        '/img/2_md.jpg',
        '/img/2_sm.jpg',
        '/img/3.jpg',
        '/img/3_md.jpg',
        '/img/3_sm.jpg',
        '/img/4.jpg',
        '/img/4_md.jpg',
        '/img/4_sm.jpg',
        '/img/5.jpg',
        '/img/5_md.jpg',
        '/img/5_sm.jpg',
        '/img/6.jpg',
        '/img/6_md.jpg',
        '/img/6_sm.jpg',
        '/img/7.jpg',
        '/img/7_md.jpg',
        '/img/7_sm.jpg',
        '/img/8.jpg',
        '/img/8_md.jpg',
        '/img/8_sm.jpg',
        '/img/9.jpg',
        '/img/9_md.jpg',
        '/img/9_sm.jpg',
        '/img/10.jpg',
        '/img/10_md.jpg',
        '/img/10_sm.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (staticCacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request, {ignoreSearch: true}).then(function(response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
   
        let responseClone = response.clone();
        
        caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function(err) {
            console.log('ServiceWorker Error Fetching & Caching Data', err);
      });
    }
  }));
});
