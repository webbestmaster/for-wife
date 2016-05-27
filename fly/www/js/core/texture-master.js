/*global define, window, PIXI, Promise */
define(['log', 'textureSources'], function (log, textureSources) {

	"use strict";

	return {

		// TODO: get resolution from camera
		// resolution: 1,

		loader: null,
		resources: null,

		baseUrl: '', // relative from resolution

		initializeTextures: function () {

			PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

			var textureMaster = this,
				loader = PIXI.loader;

			return new Promise(function (resolve, reject) {

				// loader.baseUrl = master.baseUrl;

				loader.add(textureSources);

				// loader.add();
				// loader.add('src/bg-setting.json');
				// loader.add('src/button.png');

				loader
					.on('progress', function () {
						log('on loading texture progress'); // remove
					})
					.load(function (loader, resources) {

						textureMaster.loader = loader;
						textureMaster.resources = resources;

						resolve();
					});

			});

		}

	};
});
