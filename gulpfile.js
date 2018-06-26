/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css');
 

    
gulp.task('sass', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
});


 
gulp.task('prefix', function () {
    return gulp.src('./www/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function () {
    return browserify({entries: './src/js/main.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('./www/js/'));
});

 

gulp.task('minify', function () {
    gulp.src('./www/js/index.js')
        .pipe(uglify())
        .pipe(gulp.dest('./www/js/'));
});


gulp.task('watch', ['build'], function () {
    gulp.watch('./src/js/*.js', ['build']);

});

gulp.task('default', ['watch']);

gulp.task('minify-css', () => {
    return gulp.src('./www/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./www/css/'));
});