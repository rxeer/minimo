'use-strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

const paths = {
  sass: {
    import: 'src/sass/**/*.scss',
    export: 'css'
  },
  images: {
    import: 'src/img/**/*.*',
    export: 'img'
  },
  pug: {
    import: 'src/sass/**/*.pug'
  }
};

gulp.task('images', () =>
  gulp.src(paths.images.import)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.export))
);

gulp.task('sass', () =>
  gulp.src(paths.sass.import)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths.sass.export))
);

gulp.task('pug', () =>
  gulp.src(paths.pug.import)
    .pipe(pug())
    .pipe(concat('index.html'))
);

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
