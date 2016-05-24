/*global define, console, XMLHttpRequest, window */
define(function () {

	"use strict";

	var	gOldOnError,
		slice = Array.prototype.slice,
		logger = {
			remoteLog: false,
			xhr: new XMLHttpRequest(),
			log: function () {
				console.log.apply(console, arguments);
			},
			sendToServer: function () {

				if (!this.remoteLog) {
					return;
				}

				var loggerObject = this,
					xhr = loggerObject.xhr,
					args = slice.call(arguments).map(function (arg) {
						return (arg && typeof arg === 'object') ? JSON.stringify(arg) : String(arg);
					}).join(' ');

				xhr.open('POST', ' - log: ' + args, false);

				// xhr.send(args);
				xhr.send();

			}

		};

	function log() {
		logger.sendToServer.apply(logger, arguments);
		return logger.log.apply(logger, arguments);
	}

	gOldOnError = window.onerror;

	window.onerror = function (errorMsg, url, lineNumber) {

		// alert(JSON.stringify(arguments));

		log.apply(null, arguments);

		if (gOldOnError) {
			return gOldOnError(errorMsg, url, lineNumber);
		}

	};

	return log;

});
