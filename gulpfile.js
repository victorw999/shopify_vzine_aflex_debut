// Gulp plugin setup
var gulp = require('gulp');
var watch = require('gulp-watch'); // Watches single files
var gulpShopify = require('gulp-shopify-upload');
var config = require('./config.json'); // Grabs your API credentials

// Compiles SCSS files
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify       = require("gulp-notify"); // Notifies of errors
var neat         = require('node-neat').includePaths; //// Includes the Bourbon Neat libraries

// Concats your JS files
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

// compile SASS to liquid tags REF: https://bit.ly/2SQJC4s
var concat = require('gulp-concat');
var replace = require('gulp-replace');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({ // Send error to notification center with gulp-notify
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('sass', function () {
  gulp.src('./lib/scss/*.{sass,scss}')
    .pipe(sass({includePaths: neat, outputStyle: 'compressed'}))
    .on('error', handleErrors)
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(concat('theme_vicmod_liquid.css.liquid'))  // change the file name to be a liquid file
    .pipe(replace('"{{', '{{'))        // remove the extra set of quotations used for escaping the liquid string
    .pipe(replace('}}"', '}}'))
    .pipe(gulp.dest('./assets'));
});

gulp.task('shopifywatch', function() {  // example template: https://www.npmjs.com/package/gulp-shopify-upload
  return watch('./+(assets|config|layout|locales|sections|snippets|templates|)/**')
  .pipe(gulpShopify(
    config.shopify_api_key,
    config.shopify_api_password,
    config.shopify_url,
    config.theme_id));
});

// old watch b4 add js compiling
// gulp.task('watch', function () {
//   gulp.watch('./lib/scss/**/*.{sass,scss}', ['sass']);
// });
gulp.task('watch', function () {
  gulp.watch('./lib/scss/**/*.{sass,scss}', ['sass']);
  gulp.watch('./lib/js/**/*.js', ['browserify']);

  var watcher = watchify(browserify({
    entries: ['./lib/js/app.js'],    // Specify the entry point of your app
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function() {
    watcher.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./assets/'))
  })
});

// Concats your JS files
gulp.task('browserify', function() {
  return browserify('./lib/js/app.js')
      .bundle()
      .on('error', handleErrors)
      .pipe(source('bundle.js'))   //Pass desired output filename to vinyl-source-stream
      .pipe(gulp.dest('./assets/'));    // Start piping stream to tasks!
});

// Default gulp action when gulp is run
gulp.task('default', [
  'sass', 'shopifywatch', 'watch'
]);
