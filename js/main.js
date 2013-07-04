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

        function init() {
            player = new Player();
            player.addInventoryItem(new Item('Flagrant Codpiece', ItemTypes.CODPIECE).modNutrition(100));
            player.addInventoryItem(new Item('FACEGUARD LOL', ItemTypes.ARMOUR));

            autoSaveTimer = 0;

            $player     = $('#player');
            $resources  = $('#resources');
            $inventory  = $('#inventory');

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
        };

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
        }

        function renderResources() {
            $resources.html(player.getResources());
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
        }

        init();
    })();
});
