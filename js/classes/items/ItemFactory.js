define([
    'Item',
    'ItemTypes'
], function (
    Item,
    ItemTypes
) {
    'use strict';

    function ItemFactory() {

    }

    ItemFactory.prototype.randomItem = function () {
        return new Item('Random', ItemTypes[Math.floor(Math.random() * ItemTypes.length)]);
    };

    return ItemFactory;
});
