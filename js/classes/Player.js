define(function () {
    'use strict';

    var saveName = 'webgame-proto';

    function Player() {
        this.resources = 0;
        this.inventory = [];
        this.resourceModifier = 0.45;
    }

    Player.prototype.modResources = function (amount) {
        this.resources += amount;
        return this;
    };

    Player.prototype.getResources = function () {
        return Math.floor(this.resources);
    };

    Player.prototype.addInventoryItem = function (item) {
        this.inventory.push(item);
        return this;
    };

    Player.prototype.getInventory = function () {
        return this.inventory;
    };

    Player.prototype.save = function () {
        var data = {
            inventory: this.inventory,
            resources: this.resources,
            resourceModifier: this.resourceModifier
        };
        localStorage.setItem(saveName, btoa(JSON.stringify(data)));
    };

    Player.prototype.update = function () {
        this.resources += this.resourceModifier;
    };

    Player.prototype.load = function () {
        var data = JSON.parse(atob(localStorage.getItem(saveName))) || {
            inventory: [],
            resources: 0,
            resourceModifier: 0.45
        };
        this.resourceModifier = data.resourceModifier;
        this.inventory = data.inventory;
        this.resources = data.resources;
    };

    return Player;
});
