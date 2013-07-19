requirejs.config({
    deps: ['main'],
    paths: {
        // Classes
        Renderer:           'classes/core/Renderer',
        Input:              'classes/core/Input',
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

        // Screens
        Screen:             'classes/screens/Screen',
        MainScreen:         'classes/screens/MainScreen',
        InventoryScreen:    'classes/screens/InventoryScreen',

        // Enumerators
        ItemTypes:          'enum/ItemTypes'
    }
});
