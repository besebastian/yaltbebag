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
        return testmonster;
    };

    return CreatureFactory;
});
