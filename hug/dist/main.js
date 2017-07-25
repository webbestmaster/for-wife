webpackJsonp([0],{

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(90);


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _screen = __webpack_require__(39);

var _screen2 = _interopRequireDefault(_screen);

var _bear = __webpack_require__(92);

var _bear2 = _interopRequireDefault(_bear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PIXI = __webpack_require__(21);

// init helpers
var screen = new _screen2.default();

// init renderer
var pixiApp = new PIXI.Application(screen.get('width'), screen.get('height'), {
    backgroundColor: 0xffffff
});

pixiApp.stop();

document.body.appendChild(pixiApp.view);
// add bear

PIXI.loader.add('./assets/hug.json').load(function () {
    pixiApp.ticker.add(function (delta) {
        var bear = new _bear2.default();
        var bearSprite = bear.get('sprite');

        pixiApp.stage.addChild(bearSprite);

        function onScreenResize() {
            var _screen$getAllAttribu = screen.getAllAttributes(),
                width = _screen$getAllAttribu.width,
                height = _screen$getAllAttribu.height;

            pixiApp.renderer.resize(width, height);
            bearSprite.position.set(Math.round(width / 2), Math.round(height / 2));
        }

        onScreenResize();

        screen.onChange('resize', onScreenResize);

        pixiApp.start();
    });
});

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainModel = __webpack_require__(20);
var PIXI = __webpack_require__(21);

var Bear = function (_MainModel) {
    _inherits(Bear, _MainModel);

    function Bear() {
        _classCallCheck(this, Bear);

        var _this = _possibleConstructorReturn(this, (Bear.__proto__ || Object.getPrototypeOf(Bear)).call(this));

        var model = _this;

        model.initialize();
        return _this;
    }

    _createClass(Bear, [{
        key: 'initialize',
        value: function initialize() {
            var model = this;

            model.initSprite();
            model.bindEventListeners();
        }
    }, {
        key: 'initSprite',
        value: function initSprite() {
            var model = this;
            var textures = [];
            var i = 0;

            // hug sprite
            for (; i <= 75; i += 1) {
                textures.push(PIXI.Texture.fromFrame('hug-' + i + '.png'));
            }

            var sprite = new PIXI.extras.AnimatedSprite(textures);

            sprite.anchor.set(0.5, 0.5);

            sprite.play();

            model.set({ sprite: sprite });
        }
    }, {
        key: 'bindEventListeners',
        value: function bindEventListeners() {
            var model = this;
            var sprite = model.get('sprite');

            sprite.interactive = true;
            sprite.buttonMode = true;

            sprite.on('pointerdown', function () {
                sprite.gotoAndPlay(0);
            });
        }
    }]);

    return Bear;
}(MainModel);

exports.default = Bear;

/***/ })

},[195]);
//# sourceMappingURL=main.js.map