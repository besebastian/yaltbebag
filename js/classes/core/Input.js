define([
    'InventoryScreen'
], function (
    InventoryScreen
) {
    'use strict';

    function Input(renderer) {
        this.listeners();
        this.renderer = renderer;
    }

    Input.prototype.listeners = function () {
        window.addEventListener('keypress', this.handleKeys, false);
    };

    Input.prototype.handleKeys = function (event) {
        switch (event.which) {
            case 105: // i
                this.renderer.drawSubscreen(new InventoryScreen('inventory'));
                break;
        };
    };

    return Input;
});
