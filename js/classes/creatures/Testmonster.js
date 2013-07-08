define([
    'Creature'
], function (
    Creature
) {
    'use strict';

    function Testmonster() {
        Creature.call(this, "Testmonster");
        this.hp = 100;
    }

    Testmonster.prototype = new Creature();

    Testmonster.prototype.constructor = Testmonster;

    return Testmonster;
});
