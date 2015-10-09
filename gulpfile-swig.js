'use strict';

var gulp = require('gulp'),
  path = require('path');

var swig = require('gulp-swig');
var data = require('gulp-data');

var inputDir = './lib',
  outputDir = './static';

// 需要操作的文件
var source = {
  htmlFileDir: path.join(inputDir, 'html/*.tpl')
}

// 输出文件
var output = {
  htmlDir: path.join(outputDir, 'html')
}



var getJsonData = function(file) {
  return require('./lib/json/' + file + '.json');
};

gulp.task('zhTmp', function() {
  return gulp.src(source.htmlFileDir)
    .pipe(data(getJsonData('zh-cn')))
    .pipe(swig())
    .pipe(gulp.dest('zh-cn'));
});
gulp.task('enTmp', function() {
  return gulp.src(source.htmlFileDir)
    .pipe(data(getJsonData('en-us')))
    .pipe(swig())
    .pipe(gulp.dest('en-us'));
});

gulp.task('zhTmp:watch', function() {
  gulp.watch(source.htmlFileDir, ['zhTmp']);
});

// gulp.task('build', [
//   'zhTmp',
//   'enTmp'
// ]);

// gulp.task('watch', [
//   'zhTmp:watch'
// ]);

// gulp.task('default', [
//   'build',
//   'watch'
// ]);
