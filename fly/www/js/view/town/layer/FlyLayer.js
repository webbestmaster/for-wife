/*global define, window, PIXI */
define(['Layer', 'util', 'device', 'DisplayObject', 'displayObjectKeys'], function (Layer, util, device, DisplayObject, displayObjectKeys) {

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

			layer.showLeftToRight();

/*
			layer.onResize({
				width: device.attr.width,
				height: device.attr.height
			});
*/

		},

/*
		onResize: function (data) {

		},
*/
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
			layer.get('stage').addChild(moveClip);

			helicopter.setScaleBySize(layer.get('scale'));

/*
			helicopter.moveToAnimate(5, 5, {
				time: 4,
				repeat: -1,
				ease: Sine.easeInOut,
				yoyo: true
			});
*/

			moveClip.animationSpeed = .3;

			moveClip.play();

		},

		createBoard: function () {

			var layer = this,
				sprite = new PIXI.Sprite.fromFrame('board.png'),
				board = new DisplayObject(sprite);

			board.setScaleBySize(layer.get('scale'));

			layer.set('board', board);
			layer.get('stage').addChild(sprite);

		},

		showLeftToRight: function () {

			var layer = this,
				helicopter = layer.get('helicopter'),
				board = layer.get('board');

			helicopter.get('sprite').scale.x = -layer.get('scale');

			// set start position

			board.moveTo(4, 2, {
				x: -board.getWidth() / 2
			});
			helicopter.moveTo(4, 8, {
				x: -5.5 * layer.get('scale') - board.getWidth() / 2
			});

			board.moveToAnimate(6, 2, { time: 7 }, {
				x: 5.5 * layer.get('scale') + helicopter.getWidth() / 2,
				ease: Linear.easeNone
			});
			helicopter.moveToAnimate(6, 8, { time: 7 }, {
				x: helicopter.getWidth() / 2,
				ease: Linear.easeNone
			});

			board.doTween('upDown', board.get('sprite'), 1, {
				y: board.get('sprite').position.y - helicopter.getHeight() / 7 * layer.get('scale'),
				yoyo: true,
				repeat: -1,
				ease: Sine.easeInOut
			});
			helicopter.doTween('upDown', helicopter.get('sprite'), 1, {
					y: helicopter.get('sprite').position.y - helicopter.getHeight() / 7 * layer.get('scale'),
					yoyo: true,
					repeat: -1,
					ease: Sine.easeInOut
			});

		}

	});

});
