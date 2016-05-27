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

			layer.createHelicopters();

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

		createHelicopters: function () {

			var layer = this,
				texture1 = PIXI.Texture.fromFrame('helicopter-1.png'),
				texture2 = PIXI.Texture.fromFrame('helicopter-2.png'),
				moveClip = new PIXI.extras.MovieClip([texture1, texture2]);

			layer.set('moveClip', new DisplayObject(moveClip));
			layer.get('stage').addChild(moveClip);


			layer.get('moveClip').moveToAnimate(5, 5, {
				time: 1,
				repeat: -1,
				ease: Sine.easeInOut,
				yoyo: true
			});

			moveClip.animationSpeed = 0.05;

			moveClip.play();

		}

	});

});
