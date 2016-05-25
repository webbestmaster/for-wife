/*global define, window*/
define(['Layer', 'util', 'DisplayObject', 'device'], function (Layer, util, DisplayObject, device) {

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
			'    0   0'
		],

		initialize: function () {

			var layer = this;

			layer.super.prototype.initialize.call(layer, arguments);

			layer.defineItemSize();

			layer.createItems();

		},

		onResize: function () { // onResize: function (data) {

			var layer = this;

			layer.moveItemsTo.apply(layer, layer.get('moveItemsTo'));

		},

		defineItemSize: function () {

			var layer = this,
				itemWidth = 40,
				itemHeight = 40,
				itemsMap = layer.itemsMap,
				itemsMapWidth = itemsMap[0].length,
				itemsMapHeight = itemsMap.length;

			layer.set('squareSize', {
				width: itemWidth,
				height: itemHeight
			});

			layer.set('fieldSize', {
				width: itemsMapWidth,
				height: itemsMapHeight
			});

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

					items.push(item);

				});
			});

			layer.set('items', items);

			layer.moveItemsTo(5, 5);

		},

		moveItemsTo: function (windowPoint, objectPoint, offsetsArg) {

			var layer = this,
				items = layer.get('items'),
				squareSize = layer.get('squareSize'),
				squareWidth = squareSize.width,
				squareHeight = squareSize.height,
				offsets = offsetsArg || {},
				offsetX = offsets.x || 0,
				offsetY = offsets.y || 0,
				fieldSize = layer.get('fieldSize'),
				fieldOffset = util.getCoordinatesOfPoint(0, 0, fieldSize.width * squareWidth, fieldSize.height * squareHeight, objectPoint),
				fieldOffsetX = fieldOffset.x,
				fieldOffsetY = fieldOffset.y;

			layer.set('moveItemsTo', [windowPoint, objectPoint, {
				x: offsetX,
				y: offsetY
			}]);

			items.forEach(function (item) {

				item.moveTo(windowPoint, 5, {
					x: (item.get('itemX') + 0.5) * squareWidth + offsetX - fieldOffsetX,
					y: (item.get('itemY') + 0.5) * squareHeight + offsetY - fieldOffsetY
				});

			});

		}


	});

});
