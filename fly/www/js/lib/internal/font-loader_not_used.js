/*global define, Image, Promise */
define(function () {

	"use strict";

	return {

		load: function (path) {

			return new Promise(function (resolve, reject) {

				var image = new Image(),
					style = image.style;

				style.position = 'fixed';
				style.top = '0';
				style.left = '0';

				image.onerror = image.onload = function () {
					this.onerror = this.onload = null;
					resolve();
				};

				image.src = path;

			});

		}

	};

});
