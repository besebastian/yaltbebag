define([
    'Common',
    'MainScreen',
    'InventoryScreen'
], function (
    Common,
    MainScreen,
    InventoryScreen
) {
    'use strict';

    var bigFont = '16pt monospace';
    var defaultFont = '13pt monospace';
    var canvas = document.getElementById('viewport');
    var ctx = canvas.getContext('2d');
    var hotspots = [];
    var mouse;
    var inSubScreen = false;
    var screen;

    function Renderer() {
        this.clear();
        screen = new MainScreen();
    }

    Renderer.prototype.clear = function () {
        canvas.width = canvas.width;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    };

    Renderer.prototype.draw = function (player) {
        this.drawActions(player);
        this.drawPlayer(player);
    };

    Renderer.prototype.listeners = function (player) {
        canvas.removeEventListener('click', clickListener);
        canvas.addEventListener('click', clickListener, false);

        function clickListener(event) {
            event.preventDefault();
            mouse = new Common().getMousePosition(event, canvas);
            hotspots.forEach(function (hotspot) {
                if (mouse.x > hotspot.x && mouse.x < hotspot.x + hotspot.width && mouse.y > hotspot.y && mouse.y < hotspot.y + hotspot.height) {
                    player.action(hotspot.name);
                }
            });
        }
    };

    Renderer.prototype.drawActions = function (player) {
        var actions = player.getAvailableActions();
        var y = 10;
        hotspots = [];
        actions.forEach(function (action) {
            ctx.beginPath();
            ctx.rect(10, y, 150, 30);
            ctx.fillStyle = '#000000';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
            ctx.fillStyle = '#ffffff';
            ctx.fillText(action, 20, y + 20);
            hotspots.push({ name: action, x: 10, y: y, width: 150, height: 30, hover: false, cooldown: false });
            y += 40;
        });
    };

    Renderer.prototype.drawCombat = function (player, other) {
        // TODO: THIS SHIT
    };

    Renderer.prototype.drawInventory = function (player) {
        ctx.beginPath();
        ctx.rect(canvas.width - 200, 210, 190, 190);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.font = bigFont;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Inventory', canvas.width - 190, 230);
        ctx.font = defaultFont;
        var items = player.getInventory().slice(0).reverse();
        var y = 260;
        items.forEach(function (item) {
            if (y <= 390) {
                ctx.fillText(item.getName() + '(' + item.getType() + ')', canvas.width - 190, y);
                y += 20;
            }
        });
    };

    Renderer.prototype.drawPlayer = function (player) {
        ctx.beginPath();
        ctx.rect(canvas.width - 200, 10, 190, 190);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.font = bigFont;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(player.getName(), canvas.width - 190, 30);
        ctx.font = defaultFont;
        ctx.fillText('Res: ' + player.getResources(), canvas.width - 190, 60);
        ctx.fillText('Level: ' + player.getLevel(), canvas.width - 190, 80);
        ctx.fillText('HP: ' + player.getHp(), canvas.width - 190, 100);
        ctx.fillText('XP: ' + player.getXp() + '/' + player.getToLevel(), canvas.width - 190, 120);
        ctx.fillText('Cash: ' + player.getCash(), canvas.width - 190, 140);
    };

    Renderer.prototype.drawSubscreen = function (subscreen) {
        inSubScreen = true;
    };

    Renderer.prototype.clearSubscreen = function () {
        inSubScreen = false;
    };

    return Renderer;
});
