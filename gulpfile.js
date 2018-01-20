const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default', [], function() {
  console.log("Concat JS files...")
  gulp
  .src("src/**.js")
  .pipe(concat('jason.js'))
  .pipe(gulp.dest('dist'));

  console.log("copying css from src to dest...")
  gulp
  .src("src/**.css")
  .pipe(gulp.dest('dist'))
});
