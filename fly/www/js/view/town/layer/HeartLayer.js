/*global define, window*/
define(['Layer', 'util', 'DisplayObject'], function (Layer, util, DisplayObject) {

	"use strict";

	var win = window;

	function HeartLayer() {

		var layer = this;

		layer.initialize();

	}

	return util.extend(HeartLayer, Layer, {

		itemsMap: [
			' 00   00 ',
			'0000 0000',
			'000000000',
			'000000000',
			' 0000000 ',
			'  00000  ',
			'   000   ',
			'    0    '
		],

		initialize: function () {

			var layer = this;

			layer.super.prototype.initialize.call(layer, arguments);

			layer.defineItemSize();

			layer.createItems();

		},

		defineItemSize: function () {

			var layer = this,
				squareSize = {
					width: 40,
					height: 40
				};

			layer.set('squareSize', squareSize);

			return squareSize;

		},

		createItems: function () {

			var layer = this,
				items = [],
				itemsMap = layer.itemsMap,
				squareSize = layer.get('squareSize'),
				stage = layer.get('stage'),
				squareWidth = squareSize.width,
				squareHeight = squareSize.height;

			itemsMap.forEach(function (line, lineIndex) {
				line.split('').forEach(function (symbol, symbolIndex) {

					var item,
						sprite;

					if (symbol === ' ') {
						return;
					}

					sprite = new win.PIXI.Sprite.fromFrame('square');

					item = new DisplayObject(sprite);

					stage.addChild(sprite);

					item.set('itemX', symbolIndex);
					item.set('itemY', lineIndex);

					item.setSize(squareWidth, squareHeight);

					item.moveTo(1, 1, {
						x: symbolIndex * squareWidth,
						y: lineIndex * squareHeight
					});

					items.push(item);

				});
			});

			layer.set('items', items);

		}


	});

});
