'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var ngAnnotate = require('gulp-ng-annotate');
var server = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');

var watcher = gulp.watch(['./src/js/**/*.js', './src/css/*.less', './src/views/**/*.html', './src/*.html'], ['default']);
watcher.on('change', function( event ) {
        console.log('File ' + event.path + ' was ' + event.type + ' at ' + new Date() + ' , running tasks...');
});

gulp.task('compileLess', function(){
  gulp.src('src/css/*.less')
  .pipe(less())
    .pipe(gulp.dest('./public'));
});

gulp.task('concatScripts', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./public'))
});

gulp.task('html', function() {
    gulp.src('./src/views/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./public/views'))
});

gulp.task('index', function() {
    gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./public'))
});

gulp.task('default', ['compileLess', 'concatScripts', 'html', 'index']);