requirejs.config({
    deps: ['main'],
    paths: {
        // Classes
        Renderer:           'classes/core/Renderer',
        CreatureFactory:    'classes/creatures/CreatureFactory',
        Creature:           'classes/creatures/Creature',
        Player:             'classes/creatures/Player',
        Buttmonster:        'classes/creatures/Buttmonster',
        Testmonster:        'classes/creatures/Testmonster',
        Item:               'classes/items/Item',
        ItemFactory:        'classes/items/ItemFactory',
        Notifications:      'classes/utils/Notifications',
        Cooldown:           'classes/utils/Cooldown',
        Common:             'classes/utils/Common',

        // Enumerators
        ItemTypes:          'enum/ItemTypes'
    }
});
