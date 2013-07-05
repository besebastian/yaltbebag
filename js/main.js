require([
    'jquery',
    'Player',
    'Item',
    'ItemTypes',
    'Notifications'
], function (
    $,
    Player,
    Item,
    ItemTypes,
    Notifications
) {
    'use strict';
    (function () {

        var player;
        var notifications;

        var autoSaveTimer;

        var $player;
        var $resources;
        var $inventory;
        var $actions;

        function init() {
            player          = new Player();
            notifications   = new Notifications();

            autoSaveTimer = 0;

            $player     = $('#player');
            $resources  = $('#resources');
            $inventory  = $('#inventory');
            $actions    = $('#actions');

            uiHandlers();

            setInterval(loop, 1000);
            loop();
        }

        function uiHandlers() {
            var $buttonSave = $('.button-save');
            var $buttonLoad = $('.button-load');
            var $buttonImport = $('.button-import');

            $buttonImport.on('click', function (event) {
                event.preventDefault();
                var data = prompt('Paste save data string');
                if (data !== '') {
                    player.loadLoggedSave(data);
                }
            });

            $buttonSave.on('click', function (event) {
                event.preventDefault();
                autoSaveTimer = 0;
                player.save();
                notifications.log('Game saved');
            });

            $buttonLoad.on('click', function (event) {
                event.preventDefault();
                autoSaveTimer = 0;
                player.load();
                render();
                notifications.log('Game loaded');
            });
        }

        function adventureHandlers() {
            var $actionButtons = $('.action');
            $.each($actionButtons, function () {
                $(this).on('click', function (event) {
                    event.preventDefault();
                    var action = $(this).data('action');
                    player.action(action);
                });
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
            renderResources();
            renderInventory();
            renderPlayer();
            renderActions();
        }

        function renderResources() {
            $resources.html('');
            $resources.append('<li>Maguffinite ore: ' + player.getResources() + '</li>');
        }

        function renderInventory() {
            var items = player.getInventory();
            $inventory.html('');
            items.forEach(function (item) {
                $inventory.append('<li>' + item.name + '</li>');
            });
        }

        function renderPlayer() {
            $player.html('');
            $player.append('<li>Level: ' + player.getLevel() + '</li>');
            $player.append('<li>HP: ' + player.getHp() + '</li>');
            $player.append('<li>XP: ' + player.getXp() + '/' + player.getToLevel() + '</li>');
            $player.append('<li>Cash: ' + player.getCash() + '</li>');
        }

        function renderActions() {
            $actions.html('');
            $actions.append('<li><a href="#" class="action" data-action="adventure">Adventure!</a></li>');
            adventureHandlers();
        }

        init();
    })();
});
