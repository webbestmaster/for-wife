/*global define, window*/
define(['Layer', 'util', 'device', 'DisplayObject'], function (Layer, util, device, DisplayObject) {

	"use strict";

	var win = window;

	function TownLayer() {

		var layer = this;

		layer.initialize();

	}

	return util.extend(TownLayer, Layer, {

		initialize: function () {

			var layer = this;

			layer.super.prototype.initialize.call(layer, arguments);

			layer.addSpriteBg();
			layer.addSpriteTown();

			layer.onResize({
				width: device.attr.width,
				height: device.attr.height
			});

		},

		addSpriteBg: function () {

			var layer = this,
				stage = layer.get('stage'),
				sprite = new win.PIXI.Sprite.fromFrame('bg');

			layer.set('do-bg', new DisplayObject(sprite));
			stage.addChild(sprite);

		},

		addSpriteTown: function () {

			var layer = this,
				stage = layer.get('stage'),
				sprite = new win.PIXI.Sprite.fromFrame('town');

			layer.set('do-town', new DisplayObject(sprite));
			stage.addChild(sprite);

		},

		onResize: function (data) {

			var layer = this,
				width = data.width,
				height = data.height,
				doBg = layer.get('do-bg'),
				doTown = layer.get('do-town');

			doBg.setSize(width, height);
			doBg.moveTo(5, 5); // move to center

			doTown.setSize(width, height / 2);
			doTown.moveTo(8, 8); // move to down

		}

	});

});
