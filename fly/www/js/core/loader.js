/*global define, Promise */
define(['textureMaster'],
	function (textureMaster) {

		"use strict";

		return {
			load: function () {

				return Promise.all([
					textureMaster.initializeTextures()
				]);

			}
		};
	}
);
