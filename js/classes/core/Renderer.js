define(function () {
    'use strict';

    var bigFont = '16pt monospace';
    var defaultFont = '13pt monospace';
    var canvas = document.getElementById('viewport');
    var ctx = canvas.getContext('2d');
    var hotspots = [];
    var mouse;

    function Renderer() {
        this.clear();
    }

    Renderer.prototype.clear = function () {
        canvas.width = canvas.width;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    Renderer.prototype.listeners = function (player) {
        canvas.removeEventListener('click', clickListener);
        canvas.addEventListener('click', clickListener, false);

        function clickListener(event) {
            event.preventDefault();
            mouse = getMousePosition(event);
            hotspots.forEach(function (hotspot) {
                if (mouse.x > hotspot.x && mouse.x < hotspot.x + hotspot.width && mouse.y > hotspot.y && mouse.y < hotspot.y + hotspot.height) {
                    player.action(hotspot.name);
                }
            });
        }
    };

    function getMousePosition(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left + 30,
            y: event.clientY - rect.top + 30
        };
    }

    Renderer.prototype.drawActions = function (player) {
        var actions = player.getAvailableActions();
        var y = 10;
        hotspots = [];
        actions.forEach(function (action) {
            ctx.rect(10, y, 200, 30);
            ctx.fillText(action, 20, y + 20);
            ctx.stroke();
            hotspots.push({ name: action, x: 20, y: y + 20, width: 200, height: 30 });
            y += 40;
        });
    };

    Renderer.prototype.drawInventory = function (player) {
        ctx.rect(canvas.width - 200, 210, 190, 190);
        ctx.stroke();
        ctx.font = bigFont;
        ctx.fillText('Inventory', canvas.width - 190, 230);
        ctx.font = defaultFont;
        var revItems = player.getInventory();
        var items = revItems.slice(0).reverse();
        var y = 260;
        items.forEach(function (item) {
            if (y <= 390) {
                ctx.fillText(item.getName() + '(' + item.getType() + ')', canvas.width - 190, y);
                y += 20;
            }
        });
    };

    Renderer.prototype.drawPlayer = function (player) {
        ctx.rect(canvas.width - 200, 10, 190, 190);
        ctx.stroke();
        ctx.font = bigFont;
        ctx.fillText(player.getName(), canvas.width - 190, 30);
        ctx.font = defaultFont;
        ctx.textAlign = 'left';
        ctx.fillText('Res: ' + player.getResources(), canvas.width - 190, 60);
        ctx.fillText('Level: ' + player.getLevel(), canvas.width - 190, 80);
        ctx.fillText('HP: ' + player.getHp(), canvas.width - 190, 100);
        ctx.fillText('XP: ' + player.getXp(), canvas.width - 190, 120);
        ctx.fillText('Cash: ' + player.getCash(), canvas.width - 190, 140);
    };

    return Renderer;
});
