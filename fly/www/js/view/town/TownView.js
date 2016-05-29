/*global define */
define(['util', 'View', 'townViewKeys', 'rendererKeys', 'TownLayer', 'HeartLayer', 'FlyLayer', 'heartLayerKeys'],
	function (util, View, townViewKeys, rendererKeys, TownLayer, HeartLayer, FlyLayer, heartLayerKeys) {

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
				heartLayer = new HeartLayer(),
				flyLayer = new FlyLayer();

			view.publish(rendererKeys.APPEND, townLayer.get('stage'));
			view.set(townViewKeys.LAYER.TOWN, townLayer);

			view.publish(rendererKeys.APPEND, heartLayer.get('stage'));
			view.set(townViewKeys.LAYER.HEART, heartLayer);

			view.publish(rendererKeys.APPEND, flyLayer.get('stage'));
			view.set(townViewKeys.LAYER.FLY, flyLayer);

			view.publish(heartLayerKeys.SHOW.HEART);

		}

	});

});
