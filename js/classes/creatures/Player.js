define([
    'Creature',
    'CreatureFactory',
    'ItemFactory'
], function (
    Creature,
    CreatureFactory,
    ItemFactory
) {
    'use strict';

    var creatureFactory = new CreatureFactory();
    var itemFactory = new ItemFactory();

    function Player(name) {
        Creature.call(this, name);
        this.modAttack(100).modDefense(100);
        this.firstSave();
    }

    Player.prototype = new Creature();

    Player.prototype.constructor = Player;

    Player.prototype.action = function (type) {
        switch (type) {
        case 'adventure':
            this.actionAdventure();
            break;
        case 'fight':
            this.actionFight();
            break;
        }
        return this;
    };

    Player.prototype.actionFight = function () {
        var other = creatureFactory.spawnTestmonster();
        this.resolveCombat(other);
    };

    Player.prototype.actionAdventure = function () {
        if (Math.floor(Math.random() * 10) % 3 === 0) {
            var item = itemFactory.randomItem();
            this.addInventoryItem(item);
            this.notifications.log('' + item.getName() + ' found', 'plus');
        }
        if (Math.floor(Math.random() * 10) % 2 === 0) {
            var amt = Math.ceil(Math.random() * 10);
            this.modCash(amt);
            this.notifications.log('You found ' + amt + ' cash', 'plus');
        }
        var xpGain = Math.ceil(Math.random() * 6);
        this.notifications.log('You gain ' + xpGain + ' xp', 'plus');
        this.xp += xpGain;
    };

    return Player;
});
