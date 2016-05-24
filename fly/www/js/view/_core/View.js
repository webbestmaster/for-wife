/*global define, PIXI */
define(['mediator', 'util'], function (mediator, util) {

	"use strict";

	function View() {

	}

	View.prototype.initialize = function () {

		var view = this;

		mediator.installTo(view);

		view.attr = {};

		// view.layers = {};

	};

	View.prototype.set = util.attrSet;

	View.prototype.get = util.attrGet;

/*
	View.prototype.createLayer = function (name) {

		var view = this,
			layer = new Layer();

		view.layers[name] = layer;

		return layer;

	};
*/

	return View;

});