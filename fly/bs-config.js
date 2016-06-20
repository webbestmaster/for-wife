// https://www.npmjs.com/package/lite-server
module.exports = {
	"port": 8000,
	"files": ["./www/**/*.{html,htm,css,js}"],
	"server": {
		"baseDir": "./www/",
		"middleware": {
			// overrides the second middleware default with new settings
			// 0: null			// 1: function () {
			// 	console.log(2);
			// }

			1: function (request, responce, cd) {
				// console.log(arguments[2]);
				cd();
			}

		}
	}
};
