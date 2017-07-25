const MainModel = require('./../lib/main-model');
const PIXI = require('pixi.js');

import Heart from './heart';

export default class Bear extends MainModel {
    constructor() {
        super();

        const model = this;

        model.initialize();
    }

    initialize() {
        const model = this;

        model.initSprite();
        model.initHearts();
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
            model.showHearts();
        });
    }

    initHearts() {
        const model = this;
        const sprite = model.get('sprite');
        const hearts = [];
        const heartsNumber = 32; // my wife is 32

        for (let ii = 0; ii < heartsNumber; ii += 1) {
            const heart = new Heart();
            const heartSprite = heart.get('sprite');

            heartSprite.renderable = false;
            sprite.addChild(heartSprite);
            hearts.push(heart);
        }

        model.set({hearts});
    }

    showHearts() {
        const model = this;
        const hearts = model.get('hearts');

        hearts.forEach(heart => heart.animate());
    }
}
