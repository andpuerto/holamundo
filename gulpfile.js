'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
//var paths = {
//  scss:'./src/sass/*.scss'
//};

gulp.task('default', function() {

    return gutil.log('Gulp is running!')
});


gulp.task('copyHtml', function() {
    // copy any html files in source/ to public/
    gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

//gulp.task('sass', function () {
//    return gulp.src('./src/sass/**/*.scss')
//        .pipe(sass().on('error', sass.logError))
//        .pipe(gulp.dest('./src/css'));
//});

gulp.task('sass', function () {
    gulp.src('./src/scss/app.scss')
        .pipe(sass({
            includePaths:['scss']
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('browser-sync', function(){
   // browserSync.init(["./src/css/*.css", "./src/js/*.js"], {
    browserSync.init(["./dist/css/*.css", "./dist/js/*.js", "./dist/*.html"], {
        server:{
            //
            baseDir:"./dist"
        }
    });
});

gulp.task('uglify', function(){
   gulp.src('src/js/*.js')
       .pipe(uglify())
       .pipe(gulp.dest('dist/js'));
});


gulp.task('build-css', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', ['sass', 'browser-sync', 'copyHtml', 'uglify'], function(){
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch(["./src/scss/*.scss", "./src/scss/base/*.scss", "./src/scss/sections/*.scss", "./src/scss/style/*.scss"], ['sass']);
    gulp.watch('src/scss/**/*.scss', ['build-css']);
    gulp.watch('src/js/*.js', ['uglify']);
});

//gulp.task('sass:watch', function () {
//    gulp.watch('./src/sass/**/*.scss', ['sass']);
//});