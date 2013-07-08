define([
    'Creature'
], function (
    Creature
) {
    'use strict';

    function Buttmonster() {
        Creature.call(this, "Buttmonster");
        this.hp = 100;
    }

    Buttmonster.prototype = new Creature();

    Buttmonster.prototype.constructor = Buttmonster;

    return Buttmonster;
});
