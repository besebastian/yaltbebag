require([
    'Renderer',
    'Player',
    'Notifications',
    'Cooldown',
    'Input'
], function (
    Renderer,
    Player,
    Notifications,
    Cooldown,
    Input
) {
    'use strict';
    (function () {

        var player;
        var notifications;
        var renderer;
        var input;

        var autoSaveTimer;

        var $player;
        var $resources;
        var $inventory;
        var $actions;

        function init() {
            player          = new Player('Geoff');
            notifications   = new Notifications();
            renderer        = new Renderer();
            input           = new Input(renderer);

            autoSaveTimer = 0;

            $player     = document.getElementById('player');
            $resources  = document.getElementById('resources');
            $inventory  = document.getElementById('inventory');
            $actions    = document.getElementById('actions');

            uiHandlers();

            player.firstSave();
            setInterval(loop, 1000);
            loop();
            renderer.listeners(player);
        }

        function uiHandlers() {
            var $buttonSave = document.getElementsByClassName('button-save')[0];
            var $buttonLoad = document.getElementsByClassName('button-load')[0];
            var $buttonImport = document.getElementsByClassName('button-import')[0];
            var $buttonExport = document.getElementsByClassName('button-export')[0];

            $buttonImport.addEventListener('click', function (event) {
                event.preventDefault();
                var data = prompt('Paste save data string');
                if (data !== '') {
                    player.loadLoggedSave(data);
                }
            });

            $buttonExport.addEventListener('click', function (event) {
                event.preventDefault();
                var data = player.getSavedData();
                if (data !== null) {
                    prompt('Copy the following', data);
                } else {
                    alert('No saved data present');
                }
            });

            $buttonSave.addEventListener('click', function (event) {
                event.preventDefault();
                autoSaveTimer = 0;
                player.save();
                notifications.log('Game saved', 'save');
            });

            $buttonLoad.addEventListener('click', function (event) {
                event.preventDefault();
                autoSaveTimer = 0;
                player.load();
                render();
                notifications.log('Game loaded', 'upload-alt');
            });
        }

        function loop() {
            autoSaveTimer++;
            if (autoSaveTimer === 100) {
                autoSaveTimer = 0;
                player.save();
                notifications.log('Autosaving');
            }
            update();
            render();
        }

        function update() {
            player.update();
        }

        function render() {
            renderer.clear();
            renderer.drawPlayer(player);
            renderer.drawActions(player);
        }

        init();
    })();
});
