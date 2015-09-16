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
  del.sync(paths.client);
  var emptyStream = gulp.src([]).pipe(gulp.dest('/'));
  return emptyStream;
}

function scripts() {
  return gulp.src(paths.server + '/javascripts/**/*.js')
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.client + '/javascripts'));
}

function bowerScripts() {
  return gulp.src('./bower.json')
    .pipe(bower({
      debugging: true,
      overrides: {
        'bootstrap': {
          main: [
            './dist/js/bootstrap.js'
          ]
        },
        'font-awesome': {
          ignore: true
        },
        'angular-ui-router': {
          main: [
            './release/angular-ui-router.js'
          ]
        }
      }
    }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts'));
}
