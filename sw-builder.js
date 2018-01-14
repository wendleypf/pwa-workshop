var CACHE_NAME = 'static-v1';
var filesToCache = [
    '/index.html',
    '/sw.js',
    'vendor/script.js',
    '/vendor/material.orange-blue.min.css',
    '/app/app.js',
    '/app/app.routes.js',
    '/app/task/task.controller.js',
    '/app/task/task.service.js',
    '/vendor/angular/angular.js',
    '/vendor/dialog-polyfill/dialog-polyfill.js',
    '/vendor/dialog-polyfill/dialog-polyfill.min.css',
    '/vendor/img/android-icon-144x144.png',
    '/vendor/img/android-icon-192x192.png',
    '/vendor/img/android-icon-36x36.png',
    '/vendor/img/android-icon-48x48.png',
    '/vendor/img/android-icon-72x72.png',
    '/vendor/img/android-icon-96x96.png',
    '/vendor/img/favicon-16x16.png',
    '/vendor/img/favicon-32x32.png',
    '/vendor/img/favicon-96x96.png',
    '/vendor/img/favicon.ico',
    '/vendor/jquery/jquery-1.12.4.min.js',
    '/vendor/mdl/material.css',
    '/vendor/mdl/material.js',
    '/vendor/mdl-select/getmdl-select.min.css',
    '/vendor/mdl-select/getmdl-select.min.js',
    '/vendor/mdl-select/getmdl-select.min.js.map'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(filesToCache);
        }));
});

self.addEventListener('activate', function activator(event) {
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
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});