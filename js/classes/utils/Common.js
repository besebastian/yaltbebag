define(function () {
    'use strict';

    function Common() { }

    Common.prototype.getMousePosition = function (event, canvas) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    return Common;
});
