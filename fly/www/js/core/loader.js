/*global define, Promise */
define(['fontLoader', 'textureMaster'],
	function (fontLoader, textureMaster) {

		"use strict";

		return {
			load: function () {

				return Promise.all([
					// fontLoader.load('font/quake.otf'),
					textureMaster.initializeTextures()
				]);

			}
		};
	}
);
