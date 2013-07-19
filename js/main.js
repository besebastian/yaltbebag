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

        function init() {
            player          = new Player('Geoff');
            notifications   = new Notifications();
            renderer        = new Renderer();
            input           = new Input(renderer, player);

            autoSaveTimer = 0;

            setInterval(loop, 1000);
            loop();
            renderer.listeners(player);
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
            renderer.draw(player);
        }

        init();
    })();
});
