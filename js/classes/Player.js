define([
    'Notifications',
    'Item',
    'ItemTypes'
], function (
    Notifications,
    Item,
    ItemTypes
) {
    'use strict';

    var saveName = 'webgame-proto';

    function Player() {
        this.cash = 0;
        this.hp = 10;
        this.xp = 0;
        this.cashRate = 0;
        this.resources = 0;
        this.inventory = [];
        this.resourceRate = 0.45;
        this.armour = {};
        this.weapon = {};
        this.armour.helm = null;
        this.armour.shoulders = null;
        this.armour.chest = null;
        this.armour.legs = null;
        this.armour.boots = null;
        this.armour.hands = null;
        this.weapon.left = null;
        this.weapon.right = null;
        this.notifications = new Notifications();
    }

    Player.prototype.action = function (type) {
        switch (type) {
            case 'adventure':
                this.doAdventure();
                break;
        }
        return this;
    };

    Player.prototype.doAdventure = function () {
        if (Math.floor(Math.random() * 10) % 3 === 0) {
            this.addInventoryItem(new Item("Random Adventure Item", ItemTypes.CODPIECE));
            this.notifications.alert('You found a pointless item!');
        }
        if (Math.floor(Math.random() * 10) % 2 === 0) {
            var amt = Math.ceil(Math.random() * 10)
            this.modCash(amt);
            this.notifications.alert('You found ' + amt + ' cash monies');
        }

    };

    Player.prototype.setResourceRate = function (value) {
        this.resourceRate = value;
    };

    Player.prototype.modResources = function (amount) {
        this.resources += amount;
        return this;
    };

    Player.prototype.getResources = function () {
        return Math.floor(this.resources);
    };

    Player.prototype.getXp = function () {
        return this.xp;
    };

    Player.prototype.modXp = function (amount) {
        this.xp += amount;
        return this;
    };

    Player.prototype.getHp = function () {
        return this.hp;
    };

    Player.prototype.modHp = function (amount) {
        this.hp += amount;
        return this;
    };

    Player.prototype.getCash = function () {
        return this.cash;
    }

    Player.prototype.modCash = function (amount) {
        this.cash += amount;
        return this;
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
            inventory:      this.inventory,
            resources:      this.resources,
            resourceRate:   this.resourceRate,
            armour:         this.armour,
            weapon:         this.weapon,
            cash:           this.cash,
            hp:             this.hp,
            cashRate:       this.cashRate,
            xp:             this.xp
        };
        localStorage.setItem(saveName, btoa(JSON.stringify(data)));
        this.logSave();
    };

    Player.prototype.load = function () {
        var data = JSON.parse(atob(localStorage.getItem(saveName))) || {
            inventory: [],
            resources: 0,
            resourceRate: 0.45,
            armour: {},
            weapon: {},
            cash: 0,
            hp: 10,
            cashRate: 0,
            xp: 0
        };
        this.resourceRate   = data.resourceRate;
        this.inventory      = data.inventory;
        this.resources      = data.resources;
        this.armour         = data.armour;
        this.weapon         = data.weapon;
        this.cash           = data.cash;
        this.hp             = data.hp;
        this.cashRate       = data.cashRate;
        this.xp             = data.xp;
    };

    Player.prototype.update = function () {
        this.resources += this.resourceRate;
        this.cash += this.cashRate;
    };

    Player.prototype.logSave = function () {
        console.log('Saved data: ', localStorage.getItem(saveName));
    };

    Player.prototype.loadLoggedSave = function (saveData) {
        localStorage.setItem(saveName, saveData);
        this.load();
    };

    return Player;
});
