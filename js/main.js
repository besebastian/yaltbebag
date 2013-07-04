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

            $buttonSave.on('click', function (event) {
                event.preventDefault();
                autoSaveTimer = 0;
                player.save();
            });

            $buttonLoad.on('click', function (event) {
                event.preventDefault();
                autoSaveTimer = 0;
                player.load();
                render();
            });
        }

        function itemHandlers() {
            var $itemButtons = $('.item');
            $.each($itemButtons, function () {
                $(this).on('click', function (event) {
                    event.preventDefault();
                    notifications.alert('lol does nothing');
                });
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
            $resources.append('<li>resources(lolwat?): ' + player.getResources() + '</li>');
        }

        function renderInventory() {
            var items = player.getInventory();
            $inventory.html('');
            items.forEach(function (item) {
                $inventory.append('<li><a href="#" class="item">' + item.name + '</a></li>');
            });
            itemHandlers();
        }

        function renderPlayer() {
            $player.html('');
            $player.append('<li>HP: ' + player.getHp() + '</li>');
            $player.append('<li>XP: ' + player.getXp() + '</li>');
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
