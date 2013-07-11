define([
    'Creature'
], function (
    Creature
) {
    'use strict';

    function Testmonster() {
        Creature.call(this, 'Testmonster');
    }

    Testmonster.prototype = new Creature();

    Testmonster.prototype.constructor = Testmonster;

    return Testmonster;
});
