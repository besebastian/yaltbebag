requirejs.config({
    deps: ['main'],
    paths: {
        // Third-party guff
        jquery:     'vendor/jquery',

        // Classes
        CreatureFactory:'classes/creatures/CreatureFactory',
        Creature:       'classes/creatures/Creature',
        Player:         'classes/creatures/Player',
        Buttmonster:    'classes/creatures/Buttmonster',
        Item:           'classes/Item',
        Notifications:  'classes/utils/Notifications',

        // Enumerators
        ItemTypes:      'enum/ItemTypes',
        ArmourSlots:    'enum/ArmourSlots',
        WeaponSlots:    'enum/WeaponSlots'
    }
});
