/*global define, window, Promise, PIXI */
define(['Layer', 'util', 'DisplayObject', 'device', 'heartLayerKeys', 'flyLayerKeys'], function (Layer, util, DisplayObject, device, heartLayerKeys, flyLayerKeys) {

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
			'    0    '
		],

		initialize: function () {

			var layer = this;

			layer.super.prototype.initialize.call(layer, arguments);

			layer.defineItemSize();

			layer.createItems();

			layer.set('itemsState', heartLayerKeys.ITEMS_STATE.NO_ANIMATE);

			// layer.startFallingItems();

			layer.bindEventListeners();

		},

		onResize: function () { // onResize: function (data) {

			// var layer = this;

			this.proceedItemsAnimate();
			// layer.moveItemsTo.apply(layer, layer.get('moveItemsTo'));

		},

		bindEventListeners: function () {

			var layer = this;

			layer.subscribe(heartLayerKeys.SHOW.HEART, layer.startFallingItems);

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
				itemsMap = layer.itemsMap;

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

					layer.addSprite(graphics);

					item.set('itemX', symbolIndex);
					item.set('itemY', lineIndex);

					item.set('delay', util.random(0, 0.8));

					items.push(item);

				});

			});

			layer.set('items', items);

		},

		stopItemsAnimation: function () {

			this.get('items').forEach(function (item) {
				item.stopAnimate();
			});

		},

/*
		runAnimate: function () {

			var layer = this;

			// layer.stopItemsAnimation();

			layer.startFallingItems().then(function () {
				return layer.startFlyingItems();
			}).then(function () {
				return layer.startMoveOutItems();
			}).then(function () {
				layer.runAnimate();
			});

		},
*/

		createSquareGraphic: function () {

			var layer = this,
				squareData = layer.get('squareData'),
				squareWidth = squareData.width,
				squareHeight = squareData.height,
				squarePadding = squareData.padding,
				squareRounding = squareData.rounding,
				graphics = new PIXI.Graphics();

			graphics.boundsPadding = squarePadding;

			graphics.beginFill(0xEEEEEE);

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

		stopMoveTween: function () {

			this.get('items').forEach(function (item) {
				item.stopTween('move');
				item.stopTween('rotation');
			});

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

			layer.stopMoveTween();

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
				mainDelay = options.delay || 0,
				ease = options.ease || Back.easeOut.config(1.3);

			layer.stopMoveTween();

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
						ease: ease,
						delay: delay
					}
				);

				return item.doTween('move',
					sprite.position,
					time,
					{
						x: (item.get('itemX') + 0.5) * squareWidth + offsetX - fieldOffsetX + screenOffsetX,
						y: (item.get('itemY') + 0.5) * squareHeight + offsetY - fieldOffsetY + screenOffsetY,
						ease: ease,
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

			layer.set('itemsState', heartLayerKeys.ITEMS_STATE.FALLING);

			layer.moveItemsTo(2, 8);

			layer.show();

			Promise.all([
				layer.fadeInItems(1.7),
				layer.moveItemsToAnimate(5, 5, {time: 1.6})
			]).then(function () {
				layer.set('itemsState', heartLayerKeys.ITEMS_STATE.FLYING);
				layer.proceedItemsAnimate();
			});

		},

		startFlyingItems: function () {

			var layer = this,
				items = layer.get('items'),
				squareData = layer.get('squareData'),
				squareHeight = squareData.height,
				deltaHeight = squareHeight / 3;

			layer.moveItemsTo(5, 5); // needed for onResize in during falling

			layer.set('itemsState', heartLayerKeys.ITEMS_STATE.FLYING);

			Promise.all(items.map(function (item) {

				var sprite = item.get('sprite');

				return item.doTween('flying', sprite.position, 1.5, {y: sprite.position.y + deltaHeight, repeat: 3, yoyo: true, ease: Sine.easeInOut});

			})).then(function () {
				layer.set('itemsState', heartLayerKeys.ITEMS_STATE.MOVE_OUT);
				layer.proceedItemsAnimate();
			})

		},

/*
		itemsTweenToStart: function () {

			this.get('items').forEach(function (item) {

				var tweensData = item.get('tween'),
					tween,
					key;

				for (key in tweensData) {
					tween = tweensData[key].tween;
					tween.progress(0);
					tween.play();
				}

			});

		},
*/

		proceedItemsAnimate: function () {

			var layer = this,
				items = layer.get('items');

			layer.stopItemsAnimation();

			switch (layer.get('itemsState')) {

				case heartLayerKeys.ITEMS_STATE.NO_ANIMATE:

					console.log('no any animate'); // remove

					break;

				case heartLayerKeys.ITEMS_STATE.FALLING:

					layer.startFallingItems();

					break;

				case heartLayerKeys.ITEMS_STATE.FLYING:

					layer.startFlyingItems();

					break;

				case heartLayerKeys.ITEMS_STATE.MOVE_OUT:

					layer.startMoveOutItems();

					break;

				default:

					console.log('hm, I do not know what is happened.'); // remove
					console.log('Love yor life and WRITE CODE!!!');		// remove

			}

		},

		startMoveOutItems: function () {

			var layer = this;

			layer.set('itemsState', heartLayerKeys.ITEMS_STATE.MOVE_OUT);

			layer.moveItemsTo(5, 5);

			Promise.all([
				layer.moveItemsToAnimate(8, 2, {time: 1.6, ease: Sine.easeInOut}),
				layer.fadeOutItems(1.7)
			]).then(function () {
				layer.set('itemsState', heartLayerKeys.ITEMS_STATE.NO_ANIMATE);
				layer.publish(flyLayerKeys.SHOW.FLY);
				layer.hide();
			});

		},

		fadeInItems: function (time) {

			return Promise.all(this.get('items').map(function (item) {

				var sprite = item.get('sprite');

				sprite.alpha = 0;

				return item.doTween('fadeIn', sprite, time, {
					alpha: 1,
					ease: Linear.easeNone
				});

			}));

		},

		fadeOutItems: function (time) {

			return Promise.all(this.get('items').map(function (item) {

				var sprite = item.get('sprite');

				sprite.alpha = 1;

				return item.doTween('fadeOut', sprite, time, {
					alpha: 0,
					ease: Linear.easeNone
				});

			}));

		}

	});

});
