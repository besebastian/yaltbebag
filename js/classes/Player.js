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
        this.level = 1;
        this.xpModifier = this.getXpModifier();
        this.toLevel = this.xpModifier + (5 * this.level);
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

    Player.prototype.getLevel = function () {
        return this.level;
    };

    Player.prototype.getToLevel = function () {
        return this.toLevel;
    }

    Player.prototype.levelUp = function () {
        this.level++;
        this.xp = (this.xp > this.toLevel) ? this.xp - this.toLevel: 0;
        this.xpModifier = this.getXpModifier();
        this.toLevel = this.xpModifier + (5 * this.level);
        return this;
    };

    Player.prototype.getXpModifier = function () {
        if (this.level < 10) {
            return 45;
        } else if (this.level >= 10 && this.level <= 19) {
            return 235;
        } else if (this.level >= 20 && this.level <= 29) {
            return 580;
        } else if (this.level >= 30) {
            return 1878;
        } else {
            return 2432;
        }
    };

    Player.prototype.doAdventure = function () {
        if (Math.floor(Math.random() * 10) % 3 === 0) {
            var name = "Random Item";
            var type = Math.floor(Math.random() * (Object.keys(ItemTypes).length - 2));
            this.addInventoryItem(new Item(name, type));
            this.notifications.log('' + name + ' found +');
        }
        if (Math.floor(Math.random() * 10) % 2 === 0) {
            var amt = Math.ceil(Math.random() * 10);
            this.modCash(amt);
            this.notifications.log('You found ' + amt + ' cash monies +');
        }
        var xpGain = Math.ceil(Math.random() * 20);
        this.notifications.log('You gain ' + xpGain + ' xp +');
        this.xp += xpGain;
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
            level:          this.level,
            toLevel:        this.toLevel,
            inventory:      this.inventory,
            resources:      this.resources,
            resourceRate:   this.resourceRate,
            armour:         this.armour,
            weapon:         this.weapon,
            cash:           this.cash,
            hp:             this.hp,
            cashRate:       this.cashRate,
            xp:             this.xp,
            xpModifier:     this.xpModifier
        };
        localStorage.setItem(saveName, btoa(JSON.stringify(data)));
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
            xp: 0,
            level: 1,
            xpModifier: 45,
            toLevel: 45 + (5 * 1)
        };
        this.level          = data.level;
        this.toLevel        = data.toLevel;
        this.resourceRate   = data.resourceRate;
        this.inventory      = data.inventory;
        this.resources      = data.resources;
        this.armour         = data.armour;
        this.weapon         = data.weapon;
        this.cash           = data.cash;
        this.hp             = data.hp;
        this.cashRate       = data.cashRate;
        this.xp             = data.xp;
        this.xpModifier     = data.xpModifier;
    };

    Player.prototype.update = function () {
        this.resources += this.resourceRate;
        this.cash += this.cashRate;
        if (this.xp >= this.toLevel) this.levelUp();
    };

    Player.prototype.loadLoggedSave = function (saveData) {
        localStorage.setItem(saveName, saveData);
        this.load();
    };

    Player.prototype.getSavedData = function () {
        return localStorage.getItem(saveName);
    };

    return Player;
});
