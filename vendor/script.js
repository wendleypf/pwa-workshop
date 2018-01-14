(function() {
    'use strict';

    var dialog = document.querySelector('#dialog');

    dialogPolyfill.registerDialog(dialog);
    var dialogButton = document.querySelector('#view-source');
    dialogButton.addEventListener('click', function() {
        dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

}());