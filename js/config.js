requirejs.config({
    deps: ['main'],
    paths: {
        jquery:     'vendor/jquery',

        // Classes
        Player:     'classes/Player',
        Item:       'classes/Item',

        // Enumerators
        ItemTypes:  'enum/ItemTypes'
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
