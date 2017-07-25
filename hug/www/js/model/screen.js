const MainModel = require('./../lib/main-model');

export default class Screen extends MainModel {
    constructor() {
        super();

        const screen = this;

        screen.set(getSize());
        screen.initialize();
    }

    initialize() {
        const screen = this;

        screen.bindEventListeners();
    }

    bindEventListeners() {
        const screen = this;

        window.addEventListener('resize', () => {
            screen.set(getSize());
            screen.trigger('resize');
        }, false);
    }
}

function getSize() {
    const docElem = document.documentElement;

    return {
        width: docElem.clientWidth,
        height: docElem.clientHeight
    };
}
