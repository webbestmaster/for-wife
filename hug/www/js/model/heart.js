const MainModel = require('./../lib/main-model');
const PIXI = require('pixi.js');
const gsap = require('gsap');
const {TimelineLite, Power2, Power3, Power4, Elastic} = gsap;

import {getSize} from './screen';

export default class Heart extends MainModel {
    constructor() {
        super();

        const model = this;

        model.initialize();
    }

    initialize() {
        const model = this;

        model.set('tl', new TimelineLite());
        model.initSprite();
    }

    initSprite() {
        const model = this;

        // heart sprite - begin
        const sprite = PIXI.Sprite.fromFrame('heart.png');

        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5, 0.5);
        // heart sprite - end

        model.set({sprite});
    }

    animate() {
        const model = this;
        const sprite = model.get('sprite');
        const prevTl = model.get('tl');
        const {width, height} = getSize();

        prevTl.stop();
        prevTl.remove();

        sprite.renderable = true;

        const tl = new TimelineLite({
            onComplete: () => tl.remove()
        });

        model.set({tl});

        const animationTime = 4;
        const endScale = 0.75;
        const ease = Power4.easeOut;

        tl.fromTo(
            sprite.position,
            animationTime,
            {
                x: 0,
                y: 0
            },
            {
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                ease
            },
            0);

        tl.fromTo(
            sprite.scale,
            animationTime,
            {
                x: 0,
                y: 0
            },
            {
                x: endScale,
                y: endScale,
                ease
            },
            0);

        tl.fromTo(
            sprite,
            animationTime,
            {
                alpha: 1
            },
            {
                alpha: 0,
                ease
            },
            0);
    }
}
