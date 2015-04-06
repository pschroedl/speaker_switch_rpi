var gulp = require('gulp');
var jshint = require('gulp-jshint');
var react = require("gulp-react");
var srcFiles = [
    'src/client/*.js',
    'src/server/*.js',
    'spec/client/*.js',
    'spec/server/*.js',
    'tasks/*.js'
];

gulp.task('lint', function(){
    gulp.src(srcFiles)
        .pipe(react())
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter("default", {verbose: true}))
        .pipe(jshint.reporter('fail'));
});