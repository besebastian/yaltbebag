define(function () {
    function Notifications() {
    }

    Notifications.prototype.alert = function (message) {
        alert(message);
    };

    Notifications.prototype.log = function (message) {
        var log = document.getElementById('log');
        log.innerHTML = message + '\n' + log.innerHTML;
    };

    return Notifications;
});
