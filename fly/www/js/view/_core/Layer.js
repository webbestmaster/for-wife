/*global window */
/*global define */
define(['util', 'mediator', 'deviceKeys'],function (util, mediator, deviceKeys) {

	"use strict";

	var win = window;

	function Layer() {

	}

	Layer.prototype.initialize = function () {

		var layer = this;

		mediator.installTo(layer);

		layer.attr = {
			stage: new win.PIXI.Container()
		};

		layer.super.prototype.bindEventListeners.call(layer, arguments);

	};

	Layer.prototype.bindEventListeners = function () {

		var layer = this;

		layer.subscribe(deviceKeys.RESIZE, layer.onResize);

	};

	Layer.prototype.onResize = function () {



	};

	Layer.prototype.show = function () {
		this.get('stage').visible = true;
	};

	Layer.prototype.hide = function () {
		this.get('stage').visible = false;
	};

	Layer.prototype.set = util.attrSet;

	Layer.prototype.get = util.attrGet;

	return Layer;

});