if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwa-workshop/sw-builder.js')
        .then(function (reg) {
            console.log('service worker registered.' + reg.scope);
        })
        .catch(function (error) {
            console.warn('service worker failed.' + error);
        });
}