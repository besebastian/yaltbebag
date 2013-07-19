define([
    'InventoryScreen',
    'Notifications'
], function (
    InventoryScreen,
    Notifications
) {
    'use strict';

    var notifications = new Notifications();

    function Input(renderer, player) {
        this.renderer = renderer;
        this.listeners(player);
    }

    Input.prototype.listeners = function (player) {
        window.addEventListener('keypress', this.handleKeys, false);
        var buttonSave = document.getElementsByClassName('button-save')[0];
        var buttonLoad = document.getElementsByClassName('button-load')[0];
        var buttonImport = document.getElementsByClassName('button-import')[0];
        var buttonExport = document.getElementsByClassName('button-export')[0];

        buttonImport.addEventListener('click', function (event) {
            event.preventDefault();
            var data = prompt('Paste save data string');
            if (data !== '') {
                player.loadLoggedSave(data);
            }
        });

        buttonExport.addEventListener('click', function (event) {
            event.preventDefault();
            var data = player.getSavedData();
            if (data !== null) {
                prompt('Copy the following', data);
            } else {
                alert('No saved data present');
            }
        });

        buttonSave.addEventListener('click', function (event) {
            event.preventDefault();
            player.save();
            notifications.log('Game saved', 'save');
        });

        buttonLoad.addEventListener('click', function (event) {
            event.preventDefault();
            player.load();
            notifications.log('Game loaded', 'upload-alt');
        });
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
