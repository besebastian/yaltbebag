define(function () {
    'use strict';

    function Notifications() {
    }

    Notifications.prototype.alert = function (message) {
        alert(message);
    };

    Notifications.prototype.log = function (message, icon) {
        var log = document.getElementById('log');
        log.innerHTML = '<li>' + message + ' <i class="icon-' + icon + '"> </i></li>' + log.innerHTML;
    };

    return Notifications;
});
