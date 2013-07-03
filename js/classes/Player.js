define(function () {
    'use strict';

    var saveName = 'webgame-proto';

    function Player() {
        this.resources = 0;
        this.inventory = [];
    }

    Player.prototype.modResources = function (amount) {
        this.resources += amount;
        return this;
    };

    Player.prototype.getResources = function () {
        return this.resources;
    };

    Player.prototype.addInventoryItem = function (item) {
        this.inventory.push(item);
        return this;
    };

    Player.prototype.getInventory = function () {
        return this.inventory;
    };

    Player.prototype.save = function () {
        console.log('Saving Player');
        var data = {
            inventory: this.inventory,
            resources: this.resources
        };
        localStorage.setItem(saveName, btoa(JSON.stringify(data)));
    };

    Player.prototype.load = function () {
        console.log('Loading Player');
        var data = JSON.parse(atob(localStorage.getItem(saveName))) || {
            inventory: [],
            resources: 0
        };
        this.inventory = data.inventory;
        this.resources = data.resources;
    };

    return Player;
});
