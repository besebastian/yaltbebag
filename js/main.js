require([
    'Player',
    'Notifications',
    'Cooldown'
], function (
    Player,
    Notifications,
    Cooldown
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
            player          = new Player('Geoff');
            notifications   = new Notifications();

            autoSaveTimer = 0;

            $player     = document.getElementById('player');
            $resources  = document.getElementById('resources');
            $inventory  = document.getElementById('inventory');
            $actions    = document.getElementById('actions');

            uiHandlers();

            player.firstSave();
            setInterval(loop, 1000);
            loop();
            renderActions();
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

        function adventureHandlers() {
            var $actionButtons = Array.prototype.slice.call(document.getElementsByClassName('action'));
            $actionButtons.forEach(function (action) {
                action.removeEventListener('click');
                action.addEventListener('click', function (event) {
                    event.preventDefault();
                    var actionName = action.getAttribute('data-action');
                    player.action(actionName);
                    $actionButtons.forEach(function (a) {
                        var cooldown = a.getAttribute('data-cooldown');
                        new Cooldown(a, cooldown);
                    });
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
        }

        function renderResources() {
            $resources.innerHTML = '';
            $resources.innerHTML += '<li>Maguffinite ore: ' + player.getResources() + '</li>';
        }

        function renderInventory() {
            var items = player.getInventory();
            $inventory.innerHTML = '';
            items.forEach(function (item) {
                $inventory.innerHTML += '<li data-type="' + item.getType() + '">' + item.getName() + '</li>';
            });
        }

        function renderPlayer() {
            $player.innerHTML = '';
            $player.innerHTML += '<li>Name: ' + player.getName() + '</li>';
            $player.innerHTML += '<li>Level: ' + player.getLevel() + '</li>';
            $player.innerHTML += '<li>HP: ' + player.getHp() + '</li>';
            $player.innerHTML += '<li>XP: ' + player.getXp() + '/' + player.getToLevel() + '</li>';
            $player.innerHTML += '<li>Cash: ' + player.getCash() + '</li>';
        }

        function renderActions() {
            $actions.innerHTML = '';
            $actions.innerHTML += '<li><a href="#" class="action" data-action="adventure" data-cooldown="15">Adventure!</a></li>';
            $actions.innerHTML += '<li><a href="#" class="action" data-action="fight" data-cooldown="10">Fight!</a></li>';
            adventureHandlers();
        }

        init();
    })();
});
