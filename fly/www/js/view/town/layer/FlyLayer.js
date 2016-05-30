/*global define, window, PIXI */
define(['Layer', 'util', 'device', 'DisplayObject', /*'displayObjectKeys', */ 'flyLayerKeys', 'heartLayerKeys'], function (Layer, util, device, DisplayObject, flyLayerKeys, heartLayerKeys /*, displayObjectKeys*/) {

	"use strict";

	// var win = window;

	function FlyLayer() {

		var layer = this;

		layer.initialize();

	}

	return util.extend(FlyLayer, Layer, {

		initialize: function () {

			var layer = this;

			layer.super.prototype.initialize.call(layer, arguments);

			layer.defineScale();

			layer.createHelicopter();
			layer.createBoard();

			layer.bindEventListeners();

			layer.set('flyDirection', false);
			layer.set('flyState', flyLayerKeys.FLY_STATE.NO_ANIMATE);

			// layer.onResize({
			// 	width: device.attr.width,
			// 	height: device.attr.height
			// });

			layer.hide();

		},

		onResize: function () {

			this.proceedItemsAnimate();

		},

		proceedItemsAnimate: function () {

			var layer = this,
				items = layer.get('items');

			layer.stopFlyAnimation();

			switch (layer.get('flyState')) {

				case flyLayerKeys.FLY_STATE.FLYING:

					layer.showFly();

					break;

				case flyLayerKeys.FLY_STATE.NO_ANIMATE:

					console.log('no any fly animate'); // remove

					break;

				default:

					console.log('FLY - hm, I do not know what is happened.'); // remove
					console.log('Love yor life and WRITE CODE!!!');		// remove

			}


			// layer.stopFlyAnimation();
		},

		stopFlyAnimation: function () {

			var layer = this;
			layer.get('board').stopAnimate();
			layer.get('helicopter').stopAnimate();

		},

		bindEventListeners: function () {

			var layer = this;

			layer.subscribe(flyLayerKeys.SHOW.FLY, layer.showFly);

		},

		defineScale: function () {

			var minSize = Math.min(device.attr.width, device.attr.height);

			this.set('scale', Math.round(minSize / 60));

		},

		createHelicopter: function () {

			var layer = this,
				texture1 = PIXI.Texture.fromFrame('helicopter-1.png'),
				texture2 = PIXI.Texture.fromFrame('helicopter-2.png'),
				moveClip = new PIXI.extras.MovieClip([texture1, texture2]),
				helicopter = new DisplayObject(moveClip);

			layer.set('helicopter', helicopter);
			layer.addSprite(moveClip);

			helicopter.setScaleBySize(layer.get('scale'));

			moveClip.animationSpeed = 0.5;

			moveClip.play();
			
		},

		createBoard: function () {

			var layer = this,
				sprite = new PIXI.Sprite.fromFrame('board.png'),
				board = new DisplayObject(sprite);

			board.setScaleBySize(layer.get('scale'));

			layer.set('board', board);
			layer.addSprite(sprite);

		},

		showFly: function () {

			// TODO: refactor this hit :(

			var layer = this,
				helicopter = layer.get('helicopter'),
				board = layer.get('board'),
				flyDirection = layer.get('flyDirection'),
				helicopterSprite = helicopter.get('sprite'),
				boardSprite = board.get('sprite'),
				boardWidth = board.getWidth(),
				helicopterWidth = helicopter.getWidth(),
				layerScale = layer.get('scale');

			layer.show();

			layer.set('flyState', flyLayerKeys.FLY_STATE.FLYING);

			if (flyDirection) {
				helicopterSprite.scale.x = -Math.abs(helicopterSprite.scale.x);

				// set start position
				board.moveTo(4, 2, {
					x: -boardWidth / 2
				});
				helicopter.moveTo(4, 8, {
					x: -5.5 * layerScale - boardWidth / 2
				});

				board.moveToAnimate(6, 2, {time: 7, ease: Linear.easeNone}, {
					x: 5.5 * layerScale + helicopterWidth / 2
				});
				helicopter.moveToAnimate(6, 8,
					{
						time: 7,
						ease: Linear.easeNone,
						onComplete: function () {
							layer.set('flyDirection', !flyDirection);
							layer.set('flyState', flyLayerKeys.FLY_STATE.NO_ANIMATE);
							layer.publish(heartLayerKeys.SHOW.HEART);
							layer.hide();
						}
					},
					{x: helicopterWidth / 2}
				);

			} else {

				helicopterSprite.scale.x = Math.abs(helicopterSprite.scale.x);

				// set start position
				board.moveTo(6, 2, {
					x: boardWidth / 2
				});
				helicopter.moveTo(6, 8, {
					x: 4.5 * layerScale + boardWidth / 2
				});

				board.moveToAnimate(4, 2, {time: 7, ease: Linear.easeNone}, {
					x: -4.5 * layerScale - helicopterWidth / 2
				});
				helicopter.moveToAnimate(4, 8,
					{
						time: 7,
						ease: Linear.easeNone,
						onComplete: function () {
							layer.set('flyDirection', !flyDirection);
							layer.set('flyState', flyLayerKeys.FLY_STATE.NO_ANIMATE);
							layer.publish(heartLayerKeys.SHOW.HEART);
							layer.hide();
						}
					},
					{x: -helicopterWidth / 2}
				);

			}

			board.doTween('upDown', boardSprite, 1, {
				y: boardSprite.position.y - layer.get('scale') * 5,
				yoyo: true,
				repeat: -1,
				ease: Sine.easeInOut
			});

			helicopter.doTween('upDown', helicopterSprite, 1, {
				y: helicopterSprite.position.y - layer.get('scale') * 5,
				yoyo: true,
				repeat: -1,
				ease: Sine.easeInOut
			});

		}

	});

});
