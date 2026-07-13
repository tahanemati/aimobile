'use strict'
/* ============================
   PWA SERVICES WORKER REGISTER
=============================*/

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('service-worker.js').then(function (registration) {
        console.log('Service worker registration succeeded:', registration);
    }, /*CATCH*/ function (error) {
        console.log('Service worker registration failed:', error);
    });
} else {
    console.log('Service workers are not supported.');
}