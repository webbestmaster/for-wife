/*global define */
define(['util', 'View', 'townViewKeys', 'rendererKeys', 'TownLayer'], function (util, View, townViewKeys, rendererKeys, TownLayer) {

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
				townLayer = new TownLayer();

			view.publish(rendererKeys.APPEND, townLayer.get('stage'));
			
			view.set(townViewKeys.LAYER.TOWN, townLayer);

			
			
		}

	});

});
