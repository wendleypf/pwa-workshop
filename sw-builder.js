var CACHE_NAME = 'static-v1';
var filesToCache = [
    '/pwa-workshop/',
    '/pwa-workshop/index.html',
    '/pwa-workshop/sw.js',
    '/pwa-workshop/vendor/script.js',
    '/pwa-workshop/vendor/material.orange-blue.min.css',
    '/pwa-workshop/app/app.js',
    '/pwa-workshop/app/app.routes.js',
    '/pwa-workshop/app/task/task.controller.js',
    '/pwa-workshop/app/task/task.service.js',
    '/pwa-workshop/vendor/angular/angular.js',
    '/pwa-workshop/vendor/dialog-polyfill/dialog-polyfill.js',
    '/pwa-workshop/vendor/dialog-polyfill/dialog-polyfill.min.css',
    '/pwa-workshop/vendor/img/android-icon-144x144.png',
    '/pwa-workshop/vendor/img/android-icon-192x192.png',
    '/pwa-workshop/vendor/img/android-icon-36x36.png',
    '/pwa-workshop/vendor/img/android-icon-48x48.png',
    '/pwa-workshop/vendor/img/android-icon-72x72.png',
    '/pwa-workshop/vendor/img/android-icon-96x96.png',
    '/pwa-workshop/vendor/img/favicon-16x16.png',
    '/pwa-workshop/vendor/img/favicon-32x32.png',
    '/pwa-workshop/vendor/img/favicon-96x96.png',
    '/pwa-workshop/vendor/img/favicon.ico',
    '/pwa-workshop/vendor/jquery/jquery-1.12.4.min.js',
    '/pwa-workshop/vendor/mdl/material.css',
    '/pwa-workshop/vendor/mdl/material.js',
    '/pwa-workshop/vendor/mdl-select/getmdl-select.min.css',
    '/pwa-workshop/vendor/mdl-select/getmdl-select.min.js',
    '/pwa-workshop/vendor/mdl-select/getmdl-select.min.js.map'
];

self.addEventListener('install', function (event) {
    console.log('install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(filesToCache);
        }));
});

self.addEventListener('activate', function activator(event) {
    console.log('activate');
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys
                .filter(function (key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('fetch');
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});