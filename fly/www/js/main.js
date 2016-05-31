/*global define, requirejs, createjs */
requirejs.config({

	baseUrl: './js/',

	paths: {
		// load libs
		libLoad: 'lib/lib-load',
		// external libs
		// Deferred: 'lib/external/deferred',
		es5Sham: 'lib/external/es5-sham',
		es5Shim: 'lib/external/es5-shim',

		FPSMeter: 'lib/external/fpsmeter',
		PIXI: 'lib/external/pixi',
		TweenMax: 'lib/external/TweenMax',
		promise: 'lib/external/promise',
		sound: 'lib/external/sound',
		// internal libs
		EndlessArray: 'lib/internal/endless-array',
		// fontLoader: 'lib/internal/font-loader',
		util: 'lib/internal/util',
		Counter: 'lib/internal/Counter',

		// init services, all services are internal
		log: 'services/log',
		device: 'services/device',
		deviceKeys: 'services/device-keys',
		mediator: 'services/mediator',

		// core
		// sources
		loader: 'core/loader',
		textureMaster: 'core/texture/texture-master',
		textureSources: 'core/texture/texture-sources',
		soundMaster: 'core/sound/sound-master',
		soundSources: 'core/sound/sound-sources',

		// rendering
		renderer: 'core/renderer/renderer',
		rendererKeys: 'core/renderer/renderer-keys',

		// objects/helpers
		DisplayObject: 'core/display-object/DisplayObject',
		displayObjectKeys: 'core/display-object/display-object-keys',

		// view's core
		View: 'view/view-core/View',
		Layer: 'view/view-core/Layer',

		// other views
		TownView: 'view/town/TownView',
		// TownView's objects
		townViewKeys: 'view/town/town-view-keys',
		TownLayer: 'view/town/layer/TownLayer',
		HeartLayer: 'view/town/layer/HeartLayer',
		heartLayerKeys: 'view/town/layer/heartLayerKeys',
		FlyLayer: 'view/town/layer/FlyLayer',
		flyLayerKeys: 'view/town/layer/flyLayerKeys'

	}

});

define(['libLoad', 'loader', 'device', 'renderer', 'TownView', 'util'],
	function (libLoad, loader, device, renderer, TownView, util) {

		util.initialize();

		device.initialize();

		loader
			.load()
			.then(function () {

				createjs.Sound.play("test-sound");

				renderer.initialize();
				new TownView();
			});

	}

);
