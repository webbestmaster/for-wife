/*global define, createjs, Promise */
define(['log', 'soundSources'], function (log, soundSources) {

	"use strict";

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


	return {

		initializeSounds: function () {

			var registerSound = this.registerSound;

			return Promise.all(soundSources.map(function (data) {
				return registerSound(data.path, data.id);
			}));

		},

		registerSound: function (path, soundId) {

			return new Promise(function (resolve, reject) {
				createjs.Sound.on('fileload', resolve);
				createjs.Sound.registerSound(path, soundId);
			});


		}


	};
});
