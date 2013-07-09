define(function () {
    'use strict';

    function Cooldown(element, length) {
        this.element = element;
        this.element.setAttribute('disabled', 'true');
        this.timer = setTimeout(function () {
            element.removeAttribute('disabled');
        }, length);
    }

    return Cooldown;
});
