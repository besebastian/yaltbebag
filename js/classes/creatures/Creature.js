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

    var SAVE_NAME = 'webgame-proto';

    function Creature(name) {
        this.name = name;
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
        this.defense = 0;
        this.attack = 0;
    }

    Creature.prototype.getDefense = function () {
        return this.defense;
    };

    Creature.prototype.modDefense = function (amount) {
        this.defense += amount;
        return this;
    };

    Creature.prototype.getAttack = function () {
        return this.attack;
    };

    Creature.prototype.modAttack = function (amount) {
        this.attack += amount;
        return this;
    };

    Creature.prototype.getName = function () {
        return this.name;
    }

    Creature.prototype.getLevel = function () {
        return this.level;
    };

    Creature.prototype.getToLevel = function () {
        return this.toLevel;
    }

    Creature.prototype.levelUp = function () {
        this.level++;
        this.xp = (this.xp > this.toLevel) ? this.xp - this.toLevel: 0;
        this.xpModifier = this.getXpModifier();
        this.toLevel = this.xpModifier + (5 * this.level);
        return this;
    };

    Creature.prototype.getXpModifier = function () {
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

    Creature.prototype.setResourceRate = function (value) {
        this.resourceRate = value;
    };

    Creature.prototype.modResources = function (amount) {
        this.resources += amount;
        return this;
    };

    Creature.prototype.getResources = function () {
        return Math.floor(this.resources);
    };

    Creature.prototype.getXp = function () {
        return this.xp;
    };

    Creature.prototype.modXp = function (amount) {
        this.xp += amount;
        return this;
    };

    Creature.prototype.getHp = function () {
        return this.hp;
    };

    Creature.prototype.modHp = function (amount) {
        this.hp += amount;
        return this;
    };

    Creature.prototype.getCash = function () {
        return this.cash;
    }

    Creature.prototype.modCash = function (amount) {
        this.cash += amount;
        return this;
    };

    Creature.prototype.addInventoryItem = function (item) {
        this.inventory.push(item);
        return this;
    };

    Creature.prototype.getInventory = function () {
        return this.inventory;
    };

    Creature.prototype.save = function () {
        localStorage.setItem(SAVE_NAME, btoa(JSON.stringify(this)));
    };

    Creature.prototype.load = function () {
        var data = JSON.parse(atob(localStorage.getItem(SAVE_NAME)));
        this.name           = data.name;
        this.level          = data.level;
        this.toLevel        = data.toLevel;
        this.resourceRate   = data.resourceRate;
        this.inventory      = this.parseInventory(data.inventory);
        this.resources      = data.resources;
        this.armour         = data.armour;
        this.weapon         = data.weapon;
        this.cash           = data.cash;
        this.hp             = data.hp;
        this.cashRate       = data.cashRate;
        this.xp             = data.xp;
        this.xpModifier     = data.xpModifier;
        this.attack         = data.attack;
        this.defense        = data.defense;
    };

    Creature.prototype.parseInventory = function (inv) {
        var inventory = [];
        inv.forEach(function (item) {
            var i = new Item(item.name, item.type);
            i.modDefense(item.defense)
             .modPower(item.power)
             .modNutrition(item.nutrition);
            inventory.push(i);
        });
        return inventory;
    };

    Creature.prototype.update = function () {
        this.resources += this.resourceRate;
        this.cash += this.cashRate;
        if (this.xp >= this.toLevel) this.levelUp();
    };

    Creature.prototype.loadLoggedSave = function (saveData) {
        localStorage.setItem(SAVE_NAME, saveData);
        this.load();
    };

    Creature.prototype.getSavedData = function () {
        return localStorage.getItem(SAVE_NAME);
    };

    Creature.prototype.firstSave = function () {
        if (localStorage.getItem(SAVE_NAME) === null) this.save();
    };

    return Creature;
});

