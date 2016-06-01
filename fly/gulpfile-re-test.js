var gulp = require('gulp'),
	re = require('./my_node_modules/reg-exp-code-cleaner');

gulp.task('default', function () {
	return gulp.start('test-re');
});

gulp.task('test-re', function () {
	return gulp.src('./www/js/main.js')
		.pipe(re({
			re: [
				{
					re: /e/gi,
					replace: '!!!!!!'
				}
			]
		}))
		.pipe(gulp.dest('./dist/www/js'));
});
