/*global define, Promise */
define(['textureMaster', 'soundMaster'],
	function (textureMaster, soundMaster) {

		"use strict";

		return {
			load: function () {

				return Promise.all([
					// fontLoader.load('font/quake.otf'),
					soundMaster.initializeSounds(),

					textureMaster.initializeTextures()
				]);

			}
		};
	}
);
