requirejs.config({
    deps: ['main'],
    paths: {
        // Classes
        CreatureFactory:'classes/creatures/CreatureFactory',
        Creature:       'classes/creatures/Creature',
        Player:         'classes/creatures/Player',
        Buttmonster:    'classes/creatures/Buttmonster',
        Testmonster:    'classes/creatures/Testmonster',
        Item:           'classes/Item',
        Notifications:  'classes/utils/Notifications',

        // Enumerators
        ItemTypes:      'enum/ItemTypes',
        ArmourSlots:    'enum/ArmourSlots',
        WeaponSlots:    'enum/WeaponSlots'
    }
});
