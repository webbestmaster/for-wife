/*global define, window*/
define(['Layer', 'util', 'device'], function (Layer, util, device) {

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

			layer.set('sprite-bg', sprite);
			stage.addChild(sprite);

		},

		addSpriteTown: function () {

			var layer = this,
				stage = layer.get('stage'),
				sprite = new win.PIXI.Sprite.fromFrame('town');

			layer.set('sprite-town', sprite);
			stage.addChild(sprite);

		},

		onResize: function (data) {

			var layer = this,
				width = data.width,
				height = data.height,
				spriteBg = layer.get('sprite-bg'),
				spriteTown = layer.get('sprite-town');

			spriteBg.width = width;
			spriteBg.height = height;

			spriteTown.width = width;
			spriteTown.height = height / 2;

		}





	});

});
