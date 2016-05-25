var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();

gulp.task('vendorTask', function() {
  gulp.src(mainBowerFiles('**/*.css'))
  .pipe(gulp.dest('./src/assets/'));

  gulp.src(mainBowerFiles('**/*.js'))
  .pipe(gulp.dest('./src/assets/'));
});

gulp.task('injectAssets', function() {
  var injectSrc = gulp.src(['./src/assets/*.css', './src/assets/*.js'], {read: false});
  var injectOptions = {
    ignorePath: '/src',
    addRootSlash: false
  };
  return gulp.src('./src/*.html')
  .pipe(inject(injectSrc, injectOptions))
  .pipe(gulp.dest('./src'));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './src/'
        }
    });
});
