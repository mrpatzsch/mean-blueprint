var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('gulp-main-bower-files');
var sass = require('gulp-ruby-sass');
var del = require('del');

var paths = {
  client: './client',
  server: './server',
  bower: './bower_components'
};

function clean() {
  del.sync('public');
  var emptyStream = gulp.src([]).pipe(gulp.dest('/'));
    return emptyStream;
}
