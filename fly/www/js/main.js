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
		textureMaster: 'core/texture-master',
		textureSources: 'core/texture-sources',
		soundMaster: 'core/sound-master',
		soundSources: 'core/sound-sources',

		// rendering
		renderer: 'core/renderer',
		rendererKeys: 'core/renderer-keys',

		// objects/helpers
		DisplayObject: 'core/DisplayObject',
		displayObjectKeys: 'core/display-object-keys',

		// view's core
		View: 'view/_core/View',
		Layer: 'view/_core/Layer',

		// other views
		TownView: 'view/town/TownView',
		// TownView's objects
		townViewKeys: 'view/town/town-view-keys',
		TownLayer: 'view/town/layer/TownLayer',
		HeartLayer: 'view/town/layer/HeartLayer',
		heartLayerKeys: 'view/town/layer/heartLayerKeys',
		FlyLayer: 'view/town/layer/FlyLayer',
		flyLayerKeys: 'view/town/layer/flyLayerKeys'

		/*
		 // init libs
		 // EasePack: 'lib/EasePack',
		 // init service
		 // core
		 // requireAsset: 'services/require-asset',
		 textureMaster: 'core/texture-master',
		 textureSources: 'core/texture-sources',
		 DisplayObject: 'core/display-object',
		 BaseView: 'core/base-view',
		 baseViewKeys: 'core/base-view-keys',
		 Button: 'core/button',
		 loader: 'core/loader',
		 camera: 'core/camera',
		 cameraKeys: 'core/camera-keys',
		 uiManager: 'core/ui-manager',
		 uiManagerKeys: 'core/ui-manager-keys',
		 CollisionManager: 'core/collision-manager',
		 collisionManagerKeys: 'core/collision-manager-keys',
		 // views
		 TitleView: 'view/title/view',
		 SettingView: 'view/setting/view',

		 // game
		 GameModel: 'game/game-model',
		 GameView: 'game/game-view',
		 gameKeys: 'game/game-keys',
		 gameConfig: 'game/game-config',
		 gameState: 'game/game-state',
		 Factory: 'factory/factory',
		 factoryKeys: 'factory/factory-keys',
		 objectKeys: 'factory/object-keys',
		 constructorMap: 'factory/constructor-map',

		 // game objects
		 GameObject: 'objects/core/game-object',
		 gameObjectKeys: 'objects/core/game-object-keys',
		 LifeBar: 'objects/core/life-bar',
		 // gameObjectHelper: 'objects/game-object-helper',
		 Aircraft: 'objects/aircraft',
		 Bullet: 'objects/bullet',
		 JuniorMissile: 'objects/junior-missile',
		 Cross: 'objects/cross'
		 */

	}

});


// define(function (require, exports, module) {
define([
			'libLoad',
			'loader',
			'device',
			'renderer',
			'TownView',
			'util'
		],
		function (
			libLoad,
			loader,
			device,
			renderer,
			TownView,
			util
		) {

			util.initialize();

			device.initialize();

			loader
				.load()
				.then(function () {

					//createjs.Sound.play("test-sound");

					renderer.initialize();
					new TownView();
				});













/*
			createjs.Sound.on("fileload", loadHandler);
			createjs.Sound.registerSound("sound/Humm.mp3", "sound");
			function loadHandler(event) {
				console.log('load');

				// This is fired for each sound that is registered.
				var instance = createjs.Sound.play("sound");  // play using id.  Could also use full sourcepath or event.src.
				instance.on("complete", function () {
					console.log('asdsa');
				});
				instance.volume = 0.5;
			}

*/










/*
			// gameObjectHelper.initialize();
			camera.initialize();
			uiManager.initialize();

			gameState.initialize();

			loader
				.load()
				.done(function () {
					renderer.initialize();
					mediator.publish('show:TitleView');
				});
*/


});
