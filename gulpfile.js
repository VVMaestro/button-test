var gulp = require('gulp'),
  del = require('del'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber');


var paths = {
  dirs: {
    build: './build'
  },
  html: {
    src: './src/pages/*.html',
    dest: './build',
    watch: ['./src/pages/*.html']
  },
  css: {
    src: './src/styles/style.scss',
    dest: './build/css',
    watch: ['./src/blocks/**/*.scss', './src/styles/**/*.scss', './src/styles/*.scss']
  }
};

gulp.task('clean', function () {
  return del(paths.dirs.build);
});

gulp.task('styles', function () {
  return gulp.src(paths.css.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function () {
  return gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dirs.build))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: paths.dirs.build
    },
    reloadOnRestart: true
  });
  gulp.watch(paths.html.watch, gulp.parallel('html'));
  gulp.watch(paths.css.watch, gulp.parallel('styles'));
});

gulp.task('build', gulp.series(
  'clean',
  'html',
  'styles'
));

gulp.task('dev', gulp.series(
  'build', 'server'
));