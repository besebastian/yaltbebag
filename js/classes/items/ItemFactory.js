define([
    'Item',
    'ItemTypes',
    'ItemSuffix'
], function (
    Item,
    ItemTypes,
    ItemSuffix
) {
    'use strict';

    function ItemFactory() {

    }

    ItemFactory.prototype.randomItem = function () {
        return new Item('rand', Math.floor(Math.random() * 4));
    };

    return ItemFactory;
});
