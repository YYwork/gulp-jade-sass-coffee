'use strict';

var gulp = require('gulp'),
  path = require('path');

var sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  compass = require('gulp-compass'),
  coffee = require('gulp-coffee');

var gutil = require('gulp-util'),
  clean = require('gulp-clean'),
  gulpSequence = require('gulp-sequence').use(gulp);


var livereload = require('gulp-livereload');

var inputDir = './',
  outputDir = './build';

// 需要操作的文件
var source = {
  sassDir: path.join(inputDir, 'style'),
  jadeDir: path.join(inputDir, 'templates/jade'),
  coffeeDir: path.join(inputDir, 'script/coffee'),
  imagesDir: path.join(inputDir, 'images'),

  sassFileDir: path.join(inputDir, 'style/**/*.scss'),
  coffeeFileDir: path.join(inputDir, 'script/coffee/*.coffee'),
  jadeFileDir: path.join(inputDir, 'templates/jade/**/*.jade'),
  imagesFileDir: path.join(inputDir, 'images/**/*.*'),
  jslibFileDir: path.join(inputDir, 'script/jslib/*.js')
}

// 输出文件
var output = {
  cssDir: path.join(outputDir, 'css'),
  htmlDir: path.join(outputDir, 'html'),
  jsDir: path.join(outputDir, 'js'),
  jslibDir: path.join(outputDir, 'js'),
  imagesDir: path.join(outputDir, 'images')
}

// 清空文件夹
gulp.task('clean', function() {
  gulp.src(outputDir, {
      read: false
    })
    .pipe(clean());
});

//复制 图片 和 公共js
gulp.task('copy:images', function() {
  gulp.src(source.imagesFileDir)
    .pipe(gulp.dest(output.imagesDir));
});
gulp.task('copy:jslib', function() {
  gulp.src(source.jslibFileDir)
    .pipe(gulp.dest(output.jslibDir));
});

gulp.task('copy', ['copy:images', 'copy:jslib']);

// 编译 sass
gulp.task('sass', function() {
  gulp.src(source.sassFileDir)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(output.cssDir));
});

// 编译 compass
gulp.task('compass', function() {
  gulp.src(source.sassFileDir)
    .pipe(compass({
      config_file: './config.rb',
      images: output.imagesDir,
      sass: source.sassDir,
      css: output.cssDir
    }))
    .pipe(gulp.dest(output.cssDir));
});

// 编译 jade
gulp.task('jade', function() {
  gulp.src(source.jadeFileDir)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(output.htmlDir))
});

// 编译 coffee
gulp.task('coffee', function() {
  gulp.src(source.coffeeFileDir)
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(output.jsDir))
});

// watch
gulp.task('compass:watch', function() {
  gulp.watch(source.sassFileDir, ['compass']);
});

gulp.task('jade:watch', function() {
  gulp.watch(source.jadeFileDir, ['jade']);
});

gulp.task('coffee:watch', function() {
  gulp.watch(source.coffeeFileDir, ['coffee']);
});

gulp.task('copy:images:watch', function() {
  gulp.watch(source.imagesFileDir, ['copy:images']);
});
gulp.task('copy:jslib:watch', function() {
  gulp.watch(source.jslibFileDir, ['copy:jslib']);
});


gulp.task('build', [
  'copy',
  'compass',
  'jade',
  'coffee'
]);

gulp.task('watch', [
  'copy:images:watch',
  'copy:jslib:watch',
  'compass:watch',
  'jade:watch',
  'coffee:watch'
]);

gulp.task('default', [
  'build',
  'watch'
]);
