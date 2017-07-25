import Screen from './model/screen';
import Bear from './model/bear';

const PIXI = require('pixi.js');

// init helpers
const screen = new Screen();

// init renderer
const pixiApp = new PIXI.Application(screen.get('width'), screen.get('height'), {
    backgroundColor: 0xf6fcff
});

document.body.appendChild(pixiApp.view);
// add bear

PIXI.loader
    .add('./assets/hug.json')
    .load(() => {
        const bear = new Bear();
        const bearSprite = bear.get('sprite');

        pixiApp.stage.addChild(bearSprite);

        function onScreenResize() {
            const {width, height} = screen.getAllAttributes();

            pixiApp.renderer.resize(width, height);
            bearSprite.position.set(Math.round(width / 2), Math.round(height / 2));
        }

        onScreenResize();

        screen.onChange('resize', onScreenResize);


        pixiApp.ticker.add(delta => {


        });
    });

