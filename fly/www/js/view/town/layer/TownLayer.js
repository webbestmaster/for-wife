/*global define, window, PIXI*/
define(['Layer', 'util', 'device', 'DisplayObject', 'displayObjectKeys', 'Counter', 'flyLayerKeys'], function (Layer, util, device, DisplayObject, displayObjectKeys, Counter, flyLayerKeys) {

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

			layer.set('fontSize', util.attr.font.size.value);

			layer.addSpriteBg();
			layer.addSpriteTown();
			layer.addSpriteSign();

			layer.bindEventListeners();

			layer.onResize({
				width: device.attr.width,
				height: device.attr.height
			});

		},

		bindEventListeners: function () {

			var layer = this;

			layer.subscribe(flyLayerKeys.SHOW.FLY, function () {
				layer.unsubscribe(flyLayerKeys.SHOW.FLY);
				layer.showTextInputAnimation('For Best Wife\nFrom Husband ♥♥');
			});

		},

		addSpriteBg: function () {

			var layer = this,
				sprite = new win.PIXI.Sprite.fromFrame('bg-red');

			layer.set('do-bg', new DisplayObject(sprite));
			layer.addSprite(sprite);

		},

		addSpriteTown: function () {

			var layer = this,
				sprite = new win.PIXI.Sprite.fromFrame('town');

			layer.set('do-town', new DisplayObject(sprite));
			layer.addSprite(sprite);

		},

		onResize: function (data) {

			var layer = this,
				width = data.width,
				height = data.height,
				doBg = layer.get('do-bg'),
				doTown = layer.get('do-town'),
				townSprite = doTown.get('sprite'),
				townMovingQ = 2;

			doBg.setSize(width, height);
			doBg.moveTo(5, 5); // move to center

			doTown.backgroundFor(4, 9, displayObjectKeys.BACKGROUND.COVER);
			// doTown.setSize(width, height / 2);
			// doTown.moveTo(8, 8); // move to down

			townSprite.width *= townMovingQ;
			townSprite.position.x -= townSprite.width / townMovingQ * 0.5;
			doTown.doTween('town-moving', townSprite.position, 120 / 20.0, {
				x: townSprite.position.x + townSprite.width / townMovingQ, repeat: -1, yoyo: true, ease: Sine.easeInOut
			});

			layer.adjustTextPosition();

		},

		addSpriteSign: function () {

			var layer = this,
				style = {
					// font : 'bold italic 36px Arial',
					font: 'normal normal ' + layer.get('fontSize') + 'px monospace',
					fill: '#FFFFFF',
					stroke: '#222222',
					strokeThickness: 3
					// dropShadow : true,
					// dropShadowColor : '#000000',
					// dropShadowAngle : Math.PI / 6,
					// dropShadowDistance : 6,
					// wordWrap : true,
					// wordWrapWidth : 440
				},
				text = new PIXI.Text('', style),
				doText = new DisplayObject(text);

			layer.set('do-text', doText);

			layer.addSprite(text);

		},

		showTextInputAnimation: function (text) {

			// FIXME: Pilat', Ya ne znau kak eto sdelat' po normal'nomy (((((
			var layer = this,
				doText = layer.get('do-text'),
				counter = new Counter(10, 20);

			doText.doTween('showCursor', {cursor: 0}, 5, {

				cursor: 0, ease: Linear.easeNone, onUpdate: function () {
					// doText.setText( counter.getValue() ? '■' : '|');
					doText.setText(counter.getValue() ? '♥' : ' ');
					layer.adjustTextPosition();
				}

			}).then(function () {

				return doText.doTween('showCursor', {cursor: 0}, 5, {
					cursor: text.length, ease: Linear.easeNone, onUpdate: function () {
						doText.setText(text.substr(0, this.target.cursor) + (counter.getValue() ? '♥' : ' '));
						layer.adjustTextPosition();
					}
				});

			}).then(function () {

				return doText.doTween('showCursor', {cursor: 0}, 2, {

					cursor: 0, ease: Linear.easeNone, onUpdate: function () {
						doText.setText(text + (counter.getValue() ? '♥' : ' '));
						layer.adjustTextPosition();
					}

				});

			}).then(function () {
				doText.setText(text + '♥');
				layer.adjustTextPosition();
			});

		},

		adjustTextPosition: function () {

			this.get('do-text').moveTo(7, 7, {
				x: 10,
				y: -8
			});

		}

	});

});
