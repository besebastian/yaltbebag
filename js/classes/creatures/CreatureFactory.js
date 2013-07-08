define([
    'Buttmonster'
], function (
    Buttmonster
) {
    'use strict';

    function CreatureFactory() {}

    CreatureFactory.prototype.spawnButtmonster = function () {
        var buttmonster = new Buttmonster();
        return buttmonster;
    };

    return CreatureFactory;
});
