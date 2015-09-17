var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('gulp-main-bower-files');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');


var paths = {
  client: './client',
  server: './server',
  bower: './bower_components',
  build: './build'
};

gulp.task('build', gulp.series(
  clean,
  gulp.parallel(scripts, bowerScripts, styles, bowerStyles, icons)
));

// The default task (called when you run `gulp` from cli)
gulp.task('default', gulp.series('build'));

function clean() {
  del.sync(paths.client);
  var emptyStream = gulp.src([]).pipe(gulp.dest('/'));
  return emptyStream;
}

function scripts() {
  return gulp.src(paths.build + '/javascripts/**/*.js')
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
    .pipe(uglify())
    .pipe(gulp.dest(paths.client + '/javascripts'));
}

function styles(){
  return sass(paths.build + '/stylesheets/**/*', {style: 'compressed'})
    .on('error', sass.logError)
    .pipe(concat('all.css'))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
          }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.client + '/styles'));
}

function bowerStyles(){
  return gulp.src([paths.bower + '/bootstrap/dist/css/bootstrap.css', paths.bower + '/font-awesome/css/font-awesome.css'])
  .pipe(concat('vendor.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest(paths.client + '/styles'));
}

function icons(){
  return gulp.src(paths.bower + '/font-awesome/fonts/*')
    .pipe(gulp.dest(paths.client + '/fonts'));
}
