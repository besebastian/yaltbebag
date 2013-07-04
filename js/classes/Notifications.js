define([
    'jquery'
], function (
    $
) {
    function Notifications() {
        this.messageBox = $('#messageBox');
    }

    Notifications.prototype.alert = function (message) {
        alert(message);
    };

    return Notifications;
});
