/*global define, window, Promise, PIXI */
define(['Layer', 'util', 'DisplayObject', 'device'], function (Layer, util, DisplayObject, device) {

	"use strict";

	// var win = window;

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

		keys: {
			ITEMS_STATE: {
				FALLING: 'items-state:falling',
				FLYING: 'items-state:flying'

			}
		},

		initialize: function () {

			var layer = this;

			layer.super.prototype.initialize.call(layer, arguments);

			layer.defineItemSize();

			layer.createItems();

		},

		onResize: function () { // onResize: function (data) {

			var layer = this;

			layer.proceedItemsAnimate();
			// layer.moveItemsTo.apply(layer, layer.get('moveItemsTo'));

		},

		defineItemSize: function () {

			var layer = this,
				minSize = Math.min(device.attr.width, device.attr.height),
				size = Math.round(minSize / 15),
				itemsMap = layer.itemsMap,
				itemsMapWidth = itemsMap[0].length,
				itemsMapHeight = itemsMap.length;

			layer.set('squareData', {
				width: size,
				height: size,
				rounding: Math.round(size / 8),
				padding: Math.max(1, size / 25)
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
				stage = layer.get('stage');

			itemsMap.forEach(function (line, lineIndex) {

				line.split('').forEach(function (symbol, symbolIndex) {

					var item,
						graphics;

					if (symbol === ' ') {
						return;
					}

					graphics = layer.createSquareGraphic();

					// graphics.boundsPadding = 0;
					// var texture = graphics.generateTexture();

					// debugger
					// sprite = new win.PIXI.Sprite(graphics);

					item = new DisplayObject(graphics);

					stage.addChild(graphics);

					item.set('itemX', symbolIndex);
					item.set('itemY', lineIndex);

					item.set('delay', util.random(0, 0.8));

					items.push(item);

				});

			});

			layer.set('items', items);

			layer.startFallingItems().then(function () {
				layer.startFlyingItems();
			});

		},

		createSquareGraphic: function () {

			var layer = this,
				squareData = layer.get('squareData'),
				squareWidth = squareData.width,
				squareHeight = squareData.height,
				squarePadding = squareData.padding,
				squareRounding = squareData.rounding,
				graphics = new PIXI.Graphics();

			graphics.boundsPadding = squarePadding;

			graphics.beginFill(0xFFFFFF);

			graphics.drawRoundedRect(
				squarePadding,
				squarePadding,
				squareWidth - squarePadding * 2,
				squareHeight - squarePadding * 2,
				squareRounding
			);

			graphics.endFill();

			return graphics;

		},

		moveItemsTo: function (windowPoint, objectPoint, offsetsArg) {

			var layer = this,
				items = layer.get('items'),
				squareData = layer.get('squareData'),
				squareWidth = squareData.width,
				squareHeight = squareData.height,
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

		},

		moveItemsToAnimate: function (windowPoint, objectPoint, options, offsetsArg) {

			var layer = this,
				items = layer.get('items'),
				squareData = layer.get('squareData'),
				squareWidth = squareData.width,
				squareHeight = squareData.height,
				offsets = offsetsArg || {},
				offsetX = offsets.x || 0,
				offsetY = offsets.y || 0,
				fieldSize = layer.get('fieldSize'),
				fieldOffset = util.getCoordinatesOfPoint(0, 0, fieldSize.width * squareWidth, fieldSize.height * squareHeight, objectPoint),
				fieldOffsetX = fieldOffset.x,
				fieldOffsetY = fieldOffset.y,
				screenOffset = device.getCoordinatesOfPoint(windowPoint),
				screenOffsetX = screenOffset.x,
				screenOffsetY = screenOffset.y,
				mainDelay = options.delay || 0;

			layer.set('moveItemsTo', [windowPoint, objectPoint, {
				x: offsetX,
				y: offsetY
			}]);

			return Promise.all(items.map(function (item) {

				var sprite = item.get('sprite'),
					time = options.time,
					delay = item.get('delay') + mainDelay;

				item.doTween('rotation',
					sprite,
					time,
					{
						rotation: util.decide([-1, 1, 0.5, -0.5, 0]) * Math.PI,
						ease: Back.easeOut.config(1.3),
						delay: delay
					}
				);

				return item.doTween('move',
					sprite.position,
					time,
					{
						x: (item.get('itemX') + 0.5) * squareWidth + offsetX - fieldOffsetX + screenOffsetX,
						y: (item.get('itemY') + 0.5) * squareHeight + offsetY - fieldOffsetY + screenOffsetY,
						ease: Back.easeOut.config(1.05),
						delay: delay
					}
				);

			}));

		},


/*
		moveItemsToAnimate: function (windowPoint, objectPoint, options, offsetsArg) {

			var layer = this,
				items = layer.get('items'),
				squareData = layer.get('squareData'),
				squareWidth = squareData.width,
				squareHeight = squareData.height,
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

				item.moveToAnimate(windowPoint, 5, options, {
					x: (item.get('itemX') + 0.5) * squareWidth + offsetX - fieldOffsetX,
					y: (item.get('itemY') + 0.5) * squareHeight + offsetY - fieldOffsetY
				});

			});

		},
*/

		startFallingItems: function () {

			var layer = this;

			layer.set('itemsState', layer.keys.ITEMS_STATE.FALLING);

			layer.moveItemsTo(2, 8);

			return layer.moveItemsToAnimate(5, 5, {time: 2.3});

		},

		startFlyingItems: function () {

			var layer = this,
				items = layer.get('items'),
				squareData = layer.get('squareData'),
				squareHeight = squareData.height,
				deltaHeight = squareHeight / 3;

			layer.moveItemsTo(5, 5); // needed for onResize in during falling

			layer.set('itemsState', layer.keys.ITEMS_STATE.FLYING);

			items.forEach(function (item) {

				var sprite = item.get('sprite');

				item.doTween('flying', sprite.position, 2, {y: sprite.position.y + deltaHeight, repeat: -1, yoyo: true, ease: Sine.easeInOut});

			});

		},

		proceedItemsAnimate: function () {

			var layer = this;

			layer.get('items').forEach(function (item) {
				item.stopAnimate();
			});

			switch (layer.get('itemsState')) {

				case layer.keys.ITEMS_STATE.FALLING:


					break;

				case layer.keys.ITEMS_STATE.FLYING:

					layer.startFlyingItems();

					break;

				default:

					console.log('hm, I do not know what is happened.'); // remove
					console.log('Love yor life and WRITE CODE!!!');		// remove

			}



		}


	});

});
