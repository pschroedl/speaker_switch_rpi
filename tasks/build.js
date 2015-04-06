var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

var path = {
  JS : 'src.js',
  DEST_BUILD : 'public/js/',
  ENTRY_POINT : './src/client/index.js'
};

gulp.task('build', function() {
    browserify({
        entries : [path.ENTRY_POINT],
        transform : [reactify]
    })
    .bundle()
    .pipe(source(path.JS))
    .pipe(gulp.dest(path.DEST_BUILD));
});
