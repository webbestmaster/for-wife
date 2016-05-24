/*global define, window */
define(['log', 'Deferred', 'textureSources'],
	function (
			log, // remove
			Deferred,
			textureSources
	) {

		"use strict";

		var win = window;

		return {

			// TODO: get resolution from camera
			// resolution: 1,

			loader: null,
			resources: null,

			baseUrl: '', // relative from resolution

			initializeTextures: function () {

				var textureMaster = this,
					defer = new Deferred(),
					loader = win.PIXI.loader;

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

						defer.resolve();
					});

				return defer.promise();

			}

		};
	}


);
