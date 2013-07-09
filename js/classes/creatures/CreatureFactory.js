define([
    'Buttmonster',
    'Testmonster'
], function (
    Buttmonster,
    Testmonster
) {
    'use strict';

    function CreatureFactory() {}

    CreatureFactory.prototype.spawnButtmonster = function () {
        var buttmonster = new Buttmonster();
        return buttmonster;
    };

    CreatureFactory.prototype.spawnTestmonster = function () {
        var testmonster = new Testmonster();
        testmonster.modAttack(1).modDefense(1).modHp(5);
        return testmonster;
    };

    return CreatureFactory;
});
