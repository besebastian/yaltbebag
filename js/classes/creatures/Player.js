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
        this.modAttack(100).modDefense(100);
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

    Player.prototype.resolveCombat = function (other) {
        this.notifications.log('You are fighting a ' + other.name, 'bug');
        other.modHp(-this.getAttack());
        this.modHp(-other.getAttack());
    };

    Player.prototype.actionAdventure = function () {
        if (Math.floor(Math.random() * 10) % 3 === 0) {
            var name = 'Random Item';
            var type = Math.floor(Math.random() * (Object.keys(ItemTypes).length - 2));
            this.addInventoryItem(new Item(name, type));
            this.notifications.log('' + name + ' found', 'plus');
        }
        if (Math.floor(Math.random() * 10) % 2 === 0) {
            var amt = Math.ceil(Math.random() * 10);
            this.modCash(amt);
            this.notifications.log('You found ' + amt + ' cash monies', 'plus');
        }
        var xpGain = Math.ceil(Math.random() * 6);
        this.notifications.log('You gain ' + xpGain + ' xp', 'plus');
        this.xp += xpGain;
    };

    return Player;
});
