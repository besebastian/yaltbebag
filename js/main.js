require([
    'jquery',
    'Player',
    'Item',
    'ItemTypes'
], function (
    $,
    Player,
    Item,
    ItemTypes
) {
    'use strict';
    (function () {

        var player;
        var testItem;

        var autoSaveTimer;

        var $player;
        var $resources;
        var $inventory;
        var $actions;

        function init() {
            player = new Player();

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
                $inventory.append('<li><a href="#">' + item.name + '</a></li>');
            });
        }

        function renderPlayer() {
            $player.html('');
            $player.append('<li>HP: ' + player.getHp() + '</li>');
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
