define([
    'ItemTypes'
], function (
    ItemTypes
) {
    'use strict';

    function Item(name, type) {
        this.name = name || 'HERP DERP NO NAME';
        this.type = type || ItemTypes.UNKNOWN;
        this.power = 0;
        this.defense = 0;
        this.nutrition = 0;
    }

    Item.prototype.modPower = function (amount) {
        this.power += amount;
        return this;
    };

    Item.prototype.modDefense = function (amount) {
        this.defense += amount;
        return this;
    };

    Item.prototype.modNutrition = function (amount) {
        this.nutrition += amount;
        return this;
    };

    Item.prototype.getName = function () {
        return this.name;
    };

    Item.prototype.getType = function () {
        return this.type;
    };

    return Item;
});
