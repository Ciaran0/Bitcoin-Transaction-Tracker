var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');

gulp.task('sass', function() {
  gulp.src('public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('compress', function() {
  gulp.src([
    'public/vendor/angular.min.js',
    'public/vendor/*.js',
    'public/app.js',
    'public/services/*.js',
    'public/controllers/*.js',
    'public/filters/*.js',
    'public/directives/*.js'
  ])
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
  gulp.src('public/views/**/*.html')
    .pipe(templateCache({ root: 'views', module: 'MyApp' }))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/*.scss', ['sass']);
  gulp.watch('public/views/**/*.html', ['templates']);
  gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/vendor'], ['compress']);
});

gulp.task('jshint', function() {
    gulp.src([
      'public/app.js',
      'public/controllers/*.js',
      'public/services/*.js',
      'public/filters/*.js',
      'public/directives/*.js',
      'routes/*.js',
      'modals/*.js',
      'server.js'
    ])
        .pipe(jshint())
        //.pipe(jshint.reporter('jshint-stylish'));
        .pipe(jshint.reporter('default'));
});

gulp.task('default', ['sass','compress','templates', 'watch']);
