define([
    'Screen'
], function (
    Screen
) {
    'use strict';

    function InventoryScreen(type) {
        this.type = type;
        Screen.call(this);
    }

    InventoryScreen.prototype = new Screen();

    InventoryScreen.prototype.constructor = InventoryScreen;

    return InventoryScreen;
});
