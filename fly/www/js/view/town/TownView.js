/*global define */
define(['util', 'View', 'townViewKeys', 'rendererKeys', 'TownLayer', 'HeartLayer'], function (util, View, townViewKeys, rendererKeys, TownLayer, HeartLayer) {

	"use strict";

	function TownView() {

		var view = this;

		view.initialize();

	}

	return util.extend(TownView, View, {

		initialize: function () {

			var view = this;

			view.super.prototype.initialize.apply(view, arguments);

			view.initializeLayers();

		},

		initializeLayers: function () {

			// we have 3 layers
			// town
			// heart
			// fly

			var view = this,
				townLayer = new TownLayer(),
				heartLayer = new HeartLayer();

			view.publish(rendererKeys.APPEND, townLayer.get('stage'));
			view.set(townViewKeys.LAYER.TOWN, townLayer);

			view.publish(rendererKeys.APPEND, heartLayer.get('stage'));
			view.set(townViewKeys.LAYER.HEART, heartLayer);

		}

	});

});
