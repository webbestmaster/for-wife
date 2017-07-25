const MainModel = require('./../lib/main-model');
const PIXI = require('pixi.js');

export default class Bear extends MainModel {
    constructor() {
        super();

        const model = this;

        model.initialize();
    }

    initialize() {
        const model = this;

        model.initSprite();
        model.bindEventListeners();
    }

    initSprite() {
        const model = this;

        // hug sprite - begin
        const textures = [];

        for (let ii = 0; ii <= 75; ii += 1) {
            textures.push(PIXI.Texture.fromFrame('hug-' + ii + '.png'));
        }

        const sprite = new PIXI.extras.AnimatedSprite(textures);

        sprite.loop = false;
        sprite.animationSpeed = 0.5;
        sprite.anchor.set(0.5, 0.5);
        // hug sprite - end

        model.set({sprite});
    }

    bindEventListeners() {
        const model = this;
        const sprite = model.get('sprite');

        sprite.interactive = true;
        sprite.buttonMode = true;

        sprite.on('pointerdown', () => {
            sprite.gotoAndPlay(0);
        });
    }
}
