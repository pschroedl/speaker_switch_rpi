var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var livereload = require('gulp-livereload');

var path = {
  HTML : 'src/client/index.html',
  HTML_DEST : 'public/',
  OUT : 'src.js',
  DEST_BUILD : 'public/js/',
  ENTRY_POINT : './src/client/index.js'
};

gulp.task('watch-browserify', function() {
    var bundler = browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true, // Include Source maps
        cache: {}, // Requirements of watchify
        packageCache: {},
        fullPaths: true 
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () {
        var updateStart = Date.now();
        console.log('Rebuilding JS');
        watcher.bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_BUILD))
        .pipe(livereload())
        .on('end', function () { 
            livereload.listen();
            console.log('Done in', (Date.now() - updateStart) + 'ms');
         });
    })
    .bundle() // Create the initial bundle
    .pipe(source('src.js'))
    .pipe(gulp.dest(path.DEST_BUILD));
});



gulp.task('watch', ['watch-browserify']);
