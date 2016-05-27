/*global define, window*/
define(['Layer', 'util', 'device', 'DisplayObject', 'displayObjectKeys'], function (Layer, util, device, DisplayObject, displayObjectKeys) {

	"use strict";

	// var win = window;

	function FlyLayer() {

		var layer = this;

		layer.initialize();

	}

	return util.extend(FlyLayer, Layer, {

		initialize: function () {

			var layer = this;

			layer.super.prototype.initialize.call(layer, arguments);

			layer.onResize({
				width: device.attr.width,
				height: device.attr.height
			});

		},

		onResize: function (data) {









		}

	});

});
