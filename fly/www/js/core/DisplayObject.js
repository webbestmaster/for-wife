/*global PIXI, TweenMax, Back, Promise, define */
define(['util', 'device', 'displayObjectKeys'], function (util, device, displayObjectKeys) {

	/*
	 define(['device', 'mediator', 'camera', 'cameraKeys', 'uiManagerKeys'],
	 function (device, mediator, camera, cameraKeys, uiManagerKeys) {
	 */

	"use strict";

	function DisplayObject(sprite) {

		var disObj = this;

		disObj.initialize(sprite);

	}

	DisplayObject.prototype.initialize = function (sprite) {

		var disObj = this;

		disObj.attr = {
			sprite: sprite,
			tween: {}
		};

		disObj.setAnchorToCenter();

		// disObj.bindEventListeners();

	};

	DisplayObject.prototype.set = util.attrSet;
	DisplayObject.prototype.get = util.attrGet;

/*
	DisplayObject.prototype.bindEventListeners = function () {

		var disObj = this;

		mediator.installTo(disObj);

		disObj.subscribe(deviceKeys.RESIZE, disObj.onResize);

	};

	DisplayObject.prototype.onResize = function () {

		var obj = this,
			moveTo = obj.get('moveTo');

		// TweenMax.killTweensOf(obj.sprite);

		obj.moveTo.apply(obj, moveTo);
		// obj.setSize.apply(obj, obj.attr.setSize);

		// mediator.publish(uiManagerKeys.UPDATE_SPRITE, obj.sprite);

	};
*/


	 DisplayObject.prototype.setAnchor = function (x, y) {
		 this.attr.sprite.anchor.set(x, y);
	 };


	DisplayObject.prototype.setAnchorToCenter = function () {
		// this.setAnchor(0.5, 0.5);

		this.attr.sprite.anchor.set(0.5, 0.5);

	};

	DisplayObject.prototype.moveTo = function (windowPoint, objectPoint, offsetsArg) {

		var disObj = this,
			offsets = offsetsArg || {},
			offsetX = offsets.x || 0,
			offsetY = offsets.y || 0,
			xy1 = device.getCoordinatesOfPoint(windowPoint),
			xy2 = disObj.getCoordinatesOfPoint(objectPoint),
			spritePosition = disObj.get('sprite').position;

		disObj.set('moveTo', [windowPoint, objectPoint, {
			x: offsetX,
			y: offsetY
		}]);

		spritePosition.x += xy1.x - xy2.x + offsetX;
		spritePosition.y += xy1.y - xy2.y + offsetY;

	};

/*
	DisplayObject.prototype.moveToXY = function (xy) {

		this.get('sprite').position.set(xy.x, xy.y);

	};
*/

/*
	DisplayObject.prototype.getCoordinatesForPoint = function (windowPoint, objectPoint) {

		var disObj = this,
			bounds = disObj.getBounds(),
			disObjXY = util.getCoordinatesOfPoint(0, 0, bounds.width, bounds.height, objectPoint),
			screenXY = device.getCoordinatesOfPoint(windowPoint);

		return {
			x: screenXY.x - disObjXY.x,
			y: screenXY.y - disObjXY.y
		};

	};
*/

	DisplayObject.prototype.getCoordinatesOfPoint = function (point) {

		var bounds = this.getBounds(),
			coordinates = {
				x: 0,
				y: 0
			};

		switch (point) {
			case 1 :
				coordinates.x = bounds.x;
				coordinates.y = bounds.y;
				break;
			case 2 :
				coordinates.x = bounds.x + bounds.width / 2;
				coordinates.y = bounds.y;
				break;
			case 3 :
				coordinates.x = bounds.x + bounds.width;
				coordinates.y = bounds.y;
				break;
			case 4 :
				coordinates.x = bounds.x;
				coordinates.y = bounds.y + bounds.height / 2;
				break;
			case 5 :
				coordinates.x = bounds.x + bounds.width / 2;
				coordinates.y = bounds.y + bounds.height / 2;
				break;
			case 6 :
				coordinates.x = bounds.x + bounds.width;
				coordinates.y = bounds.y + bounds.height / 2;
				break;
			case 7 :
				coordinates.x = bounds.x;
				coordinates.y = bounds.y + bounds.height;
				break;
			case 8 :
				coordinates.x = bounds.x + bounds.width / 2;
				coordinates.y = bounds.y + bounds.height;
				break;
			case 9 :
				coordinates.x = bounds.x + bounds.width;
				coordinates.y = bounds.y + bounds.height;
				break;
		}

		return coordinates;

	};

	DisplayObject.prototype.getBounds = function () {

		var sprite = this.attr.sprite;

		sprite.updateTransform();

		return sprite.getBounds();

	};

	DisplayObject.prototype.setWidth = function (width) {
		this.attr.sprite.width = width;
	};

	DisplayObject.prototype.setHeight = function (height) {
		this.attr.sprite.height = height;
	};

	DisplayObject.prototype.setSize = function (width, height) {
		this.setWidth(width);
		this.setHeight(height);
	};

	DisplayObject.prototype.moveToAnimate = function (windowPoint, objectPoint, optionsArg, offsetsArg) {

		var disObj = this,
			options = typeof optionsArg === 'number' ? {time: optionsArg} : (optionsArg || {}),
			offsets = offsetsArg || {},
			offsetX = offsets.x || 0,
			offsetY = offsets.y || 0,
			sprite = disObj.get('sprite'),
			xy1 = device.getCoordinatesOfPoint(windowPoint),
			xy2 = disObj.getCoordinatesOfPoint(objectPoint),
			tweenId = options.tweenId || displayObjectKeys.TWEEN.DEFAULT_ID,
			cfg = {
				x: sprite.x - xy2.x + xy1.x + offsetX,
				y: sprite.y - xy2.y + xy1.y + offsetY
			},
			tween;

		if (options.delay) {
			cfg.delay = options.delay;
		}

		if (options.ease) {
			cfg.ease = options.ease;
		}

		if (options.onComplete) {
			cfg.onComplete = options.onComplete;
		}

		// disObj.stopAnimate(displayObjectKeys);

		tween = new TweenMax(sprite.position, options.time, cfg);

		disObj.setTween(tweenId, {
			tween: tween,
			time: options.time,
			cfg: cfg
		});

	};

	DisplayObject.prototype.setTween = function (tweenId, params) {

		var disObj = this,
			tween = disObj.get('tween');

		disObj.stopTween(tweenId);

		tween[tweenId] = params;

	};

	DisplayObject.prototype.getTween = function (tweenId) {

		return this.get('tween')[tweenId];

	};

	DisplayObject.prototype.stopAnimate = function (tweenId) {

		return tweenId ? this.stopTween(tweenId) : this.stopAllTween();

	};

	DisplayObject.prototype.stopTween = function (tweenId) {

		var disObj = this,
			tweenData = disObj.getTween(tweenId),
			tween;

		// if no any data
		if (!tweenData) {
			return;
		}

		// if tween is stopped
		if (!tweenData.tween) {
			return;
		}

		tween = tweenData.tween;
		tween.progress(1);
		tween.kill();

		tweenData.tween = null;
		tweenData.time = 0;
		tweenData.cfg = null;

		tweenData.promise.resolve();
		tweenData.promise = null;

	};

	DisplayObject.prototype.stopAllTween = function () {

		var disObj = this,
			tween = disObj.get('tween'),
			tweenId;

		for (tweenId in tween) {
			if (tween.hasOwnProperty(tweenId)) {
				disObj.stopTween(tweenId);
			}
		}

	};

	DisplayObject.prototype.doTween = function (tweenId, object, time, cfg) {

		var disObj = this;

		return new Promise(function (resolve, reject) {

			var onComplete = cfg.onComplete;

			if (onComplete) {
				cfg.onComplete = function () {
					onComplete();
					resolve();
				};
			} else {
				cfg.onComplete = resolve;
			}

			disObj.setTween(tweenId || displayObjectKeys.TWEEN.DEFAULT_ID, {
				tween: new TweenMax(object, time, cfg),
				time: time,
				cfg: cfg,
				promise: {
					resolve: resolve,
					reject: reject
				}
			});

		});

	};

	DisplayObject.prototype.setOffsetPosition = function (point1, point2, offsetPosition) {

		var disObj = this,
			sprite = disObj.get('sprite'),
			width = sprite.width,
			height = sprite.height,
			unitTypeX = offsetPosition.unitTypeX,
			unitTypeY = offsetPosition.unitTypeY,
			offsetX = offsetPosition.x,
			offsetY = offsetPosition.y,
			xy1 = device.getCoordinatesOfPoint(point1),
			xy2 = device.getCoordinatesOfPoint(point2),
			x1 = xy1.x,
			y1 = xy1.y,
			x2 = xy2.x,
			y2 = xy2.y,
			boundWidth = x2 - x1,
			boundHeight = y2 - y1;

		switch (unitTypeX) {
			case displayObjectKeys.UNIT.TYPE.UNIT:
				offsetX = width * offsetX;
				break;
			case displayObjectKeys.UNIT.TYPE.PERCENT:
				offsetX = width * offsetX / 100;
				break;
			case displayObjectKeys.UNIT.TYPE.PX:
				break;
			default:
				console.log('--- unknown unit type - x');
		}

		switch (unitTypeY) {
			case displayObjectKeys.UNIT.TYPE.UNIT:
				offsetY = height * offsetY;
				break;
			case displayObjectKeys.UNIT.TYPE.PERCENT:
				offsetY = height * offsetY / 100;
				break;
			case displayObjectKeys.UNIT.TYPE.PX:
				break;
			default:
				console.log('--- unknown unit type - y');
		}

		sprite.position.x = boundWidth / 2 + x1 + offsetX;
		sprite.position.y = boundHeight / 2 + y1 + offsetY;

	};

	DisplayObject.prototype.backgroundFor = function (point1, point2, type, offsetPositionArg) {

		var disObj = this,
			offsetPosition = offsetPositionArg || {},
			unitTypeX = offsetPosition.unitTypeX || displayObjectKeys.UNIT.TYPE.DEFAULT,
			unitTypeY = offsetPosition.unitTypeY || displayObjectKeys.UNIT.TYPE.DEFAULT,
			positionX = offsetPosition.x || 0,
			positionY = offsetPosition.y || 0;

		offsetPosition = {
			unitTypeX: unitTypeX,
			unitTypeY: unitTypeY,
			x: positionX,
			y: positionY
		};

		switch (type) {
			case displayObjectKeys.BACKGROUND.CONTAIN:
				disObj.backgroundContainFor(point1, point2);
				break;
			case displayObjectKeys.BACKGROUND.COVER:
				disObj.backgroundCoverFor(point1, point2);
				break;
			default:
				console.log('--- unknown background type');
		}

		disObj.setOffsetPosition(point1, point2, offsetPosition);

	};

	DisplayObject.prototype.backgroundCoverFor = function (point1, point2) {

		var disObj = this,
			sprite = disObj.get('sprite'),
			texture = sprite.texture,
			textureWidth = texture.width,
			textureHeight = texture.height,
			textureQ = textureWidth / textureHeight,
			xy1 = device.getCoordinatesOfPoint(point1),
			xy2 = device.getCoordinatesOfPoint(point2),
			x1 = xy1.x,
			y1 = xy1.y,
			x2 = xy2.x,
			y2 = xy2.y,
			boundWidth = x2 - x1,
			boundHeight = y2 - y1,
			boundsQ = boundWidth / boundHeight;

		if ( boundsQ < textureQ ) {
			sprite.height = boundHeight;
			sprite.width = boundHeight / textureHeight * textureWidth;
		} else {
			sprite.width = boundWidth;
			sprite.height = boundWidth / textureWidth * textureHeight;
		}

	};

	DisplayObject.prototype.backgroundContainFor = function (point1, point2) {

		var disObj = this,
			x = bounds.x,
			y = bounds.y,
			width = bounds.width,
			height = bounds.height;


	};

/*
	DisplayObject.prototype.pauseTween = function (name) {

	};

	DisplayObject.prototype.startTween = function (name, params) {


	};
*/












	/*
	 DisplayObject.prototype.mainInitialize = function () {

	 var obj = this;

	 obj.attr = {
	 moveTo: [],
	 setSize: []
	 };

	 obj.mainBindEventListeners();

	 };

	 DisplayObject.prototype.mainBindEventListeners = function () {

	 var obj = this;

	 mediator.installTo(obj);

	 obj.subscribe(cameraKeys.BOUNDS_UPDATED, obj.onMainResize);

	 };

	 DisplayObject.prototype.mainDestroy = function () {

	 var obj = this;

	 obj.unsubscribe();

	 TweenMax.killTweensOf(obj.attr);
	 TweenMax.killTweensOf(obj.sprite);

	 obj.textures = null;

	 mediator.publish(uiManagerKeys.REMOVE_SPRITE, obj.sprite);

	 obj.sprite.destroy();

	 mediator.uninstallFrom(obj);

	 obj.attr = null;

	 };

	 DisplayObject.prototype.onMainResize = function () {

	 var obj = this;

	 TweenMax.killTweensOf(obj.sprite);

	 obj.moveTo.apply(obj, obj.attr.moveTo);
	 obj.setSize.apply(obj, obj.attr.setSize);

	 mediator.publish(uiManagerKeys.UPDATE_SPRITE, obj.sprite);

	 };

	 DisplayObject.prototype.linkToUIManager = function () {

	 var obj = this,
	 sprite = obj.sprite;

	 obj.publish(uiManagerKeys.APPEND_SPRITE, sprite);

	 };

	 DisplayObject.prototype.set = function (keyOrObject, valueOrIsDeep, isDeep) {

	 if (typeof keyOrObject === 'string') {
	 if (isDeep) {
	 // used - key, value
	 if (!this.attr[keyOrObject]) {
	 this.attr[keyOrObject] = {};
	 }
	 util.deepExtend(valueOrIsDeep, this.attr[keyOrObject]);
	 } else {
	 // used - key, value, true
	 this.attr[keyOrObject] = valueOrIsDeep;
	 }
	 return this;
	 }

	 // keyOrObject = object
	 // valueOrIsDeep = isDeep
	 if (valueOrIsDeep) {
	 util.deepExtend(keyOrObject, this.attr);
	 } else {
	 util.extend(keyOrObject, this.attr);
	 }

	 return this;

	 };

	 DisplayObject.prototype.get = function (key) {
	 return this.attr[key];
	 };

	 DisplayObject.prototype.setSize = function (width, height, unit) {

	 var obj = this,
	 sprite = obj.sprite,
	 q;

	 obj.set('setSize', [width, height, unit]);

	 if (unit === cameraKeys.REM) {
	 width = width === -1 ? -1 : camera.remToPixel(width);
	 height = height === -1 ? -1 : camera.remToPixel(height);
	 }

	 if (width === -1) {
	 q = sprite.height / height;
	 sprite.height = height;
	 sprite.width = Math.round(sprite.width / q);
	 return this;
	 }

	 if (height === -1) {
	 q = sprite.width / width;
	 sprite.width = width;
	 sprite.height = Math.round(sprite.height / q);
	 return this;
	 }

	 sprite.width = width;
	 sprite.height = height;

	 return this;

	 };

	 DisplayObject.prototype.setAnchor = function (x, y) {
	 this.sprite.anchor.x = x;
	 this.sprite.anchor.y = y;
	 };

	 DisplayObject.prototype.moveTo = function (windowPoint, objectPoint, leftOffset, topOffset, unit) {

	 leftOffset = leftOffset || 0;
	 topOffset = topOffset || 0;

	 var obj = this,
	 xy1 = device.getCoordinatesOfPoint(windowPoint),
	 xy2 = obj.getCoordinatesOfPoint(objectPoint);

	 obj.set('moveTo', [windowPoint, objectPoint, leftOffset, topOffset, unit]);

	 if (unit === cameraKeys.REM) {
	 leftOffset = camera.remToPixel(leftOffset);
	 topOffset = camera.remToPixel(topOffset);
	 }

	 obj.sprite.x += xy1.x - xy2.x + leftOffset;
	 obj.sprite.y += xy1.y - xy2.y + topOffset;

	 };

	 DisplayObject.prototype.moveToAnimate = function (windowPoint, objectPoint, options, leftOffset, topOffset, unit) {

	 leftOffset = leftOffset || 0;
	 topOffset = topOffset || 0;

	 if (typeof options === 'number') {
	 options = {time: options};
	 }

	 this.set('moveTo', [windowPoint, objectPoint, leftOffset, topOffset, unit]);

	 if (unit === cameraKeys.REM) {
	 leftOffset = camera.remToPixel(leftOffset);
	 topOffset = camera.remToPixel(topOffset);
	 }

	 var obj = this,
	 sprite = obj.sprite,
	 xy1 = device.getCoordinatesOfPoint(windowPoint),
	 xy2 = obj.getCoordinatesOfPoint(objectPoint),
	 cfg = {
	 x: sprite.x - xy2.x + xy1.x + leftOffset,
	 y: sprite.y - xy2.y + xy1.y + topOffset,
	 delay: options.delay || 0,
	 // onComplete: options.onComplete,
	 onComplete: function () {

	 if (options.onComplete) {
	 options.onComplete();
	 }

	 mediator.publish(uiManagerKeys.UPDATE_SPRITE, obj.sprite);

	 },
	 ease: options.ease || Back.easeOut
	 };

	 TweenMax.killTweensOf(sprite);
	 TweenMax.to(sprite, options.time, cfg);

	 };

	 //////
	 // helpers
	 //////



	 //////
	 // debug
	 //////
	 DisplayObject.prototype.showSpriteDebug = function (sprite) {

	 sprite.updateTransform();

	 var bounds = sprite.getBounds(),
	 graphic = new PIXI.Graphics();

	 graphic.beginFill(0xFF0000, 0.5);
	 graphic.drawRect(-bounds.width * sprite.anchor.x, -bounds.height * sprite.anchor.y, bounds.width, bounds.height);
	 graphic.endFill();
	 sprite.addChild(graphic);

	 };

	 DisplayObject.prototype.showDebug = function () {

	 this.showSpriteDebug(this.sprite);

	 };
	 */
	return DisplayObject;

});

