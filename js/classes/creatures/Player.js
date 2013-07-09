define([
    'Creature',
    'CreatureFactory',
    'ItemTypes',
    'Item'
], function (
    Creature,
    CreatureFactory,
    ItemTypes,
    Item
) {
    'use strict';

    var creatureFactory = new CreatureFactory();

    function Player(name) {
        Creature.call(this, name);
    }

    Player.prototype = new Creature();

    Player.prototype.constructor = Player;

    Player.prototype.action = function (type) {
        switch (type) {
            case 'adventure':
                this.doAdventure();
                break;
            case 'fight':
                this.doFight();
                break;
        }
        return this;
    };

    Player.prototype.doFight = function () {
        var other = creatureFactory.spawnButtmonster();
        this.notifications.log('A wild ' + other.name + ' appears! [!]');
    };

    Player.prototype.doAdventure = function () {
        if (Math.floor(Math.random() * 10) % 3 === 0) {
            var name = 'Random Item';
            var type = Math.floor(Math.random() * (Object.keys(ItemTypes).length - 2));
            this.addInventoryItem(new Item(name, type));
            this.notifications.log('' + name + ' found [+]');
        }
        if (Math.floor(Math.random() * 10) % 2 === 0) {
            var amt = Math.ceil(Math.random() * 10);
            this.modCash(amt);
            this.notifications.log('You found ' + amt + ' cash monies [+]');
        }
        var xpGain = Math.ceil(Math.random() * 6);
        this.notifications.log('You gain ' + xpGain + ' xp [+]');
        this.xp += xpGain;
    };

    return Player;
});
