define([
    'Screen'
], function (
    Screen
) {
    'use strict';

    function MainScreen(type) {
        this.type = type;
        Screen.call(this);
    }

    MainScreen.prototype = new Screen();

    MainScreen.prototype.constructor = MainScreen;

    return MainScreen;
});
