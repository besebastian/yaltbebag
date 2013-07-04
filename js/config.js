requirejs.config({
    deps: ['main'],
    paths: {
        jquery:     'vendor/jquery',

        // Classes
        Player:         'classes/Player',
        Item:           'classes/Item',
        Notifications:  'classes/Notifications',

        // Enumerators
        ItemTypes:      'enum/ItemTypes',
        ArmourSlots:    'enum/ArmourSlots',
        WeaponSlots:    'enum/WeaponSlots'
    },
    shims: {
        jquery: {
            exports: 'jQuery'
        },
        Player: {
            deps: ['jquery'],
            exports: 'Player'
        }
    }
});
