requirejs.config({
    deps: ['main'],
    paths: {
        // Classes
        CreatureFactory:    'classes/creatures/CreatureFactory',
        Creature:           'classes/creatures/Creature',
        Player:             'classes/creatures/Player',
        Buttmonster:        'classes/creatures/Buttmonster',
        Testmonster:        'classes/creatures/Testmonster',
        Item:               'classes/items/Item',
        ItemFactory:        'classes/items/ItemFactory',
        Notifications:      'classes/utils/Notifications',
        Cooldown:           'classes/utils/Cooldown',

        // Enumerators
        ItemTypes:          'enum/ItemTypes',
        ItemSuffix:         'enum/ItemSuffix',
        ArmourSlots:        'enum/ArmourSlots',
        WeaponSlots:        'enum/WeaponSlots'
    }
});
