'use-strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('autoprefixer');
const flexFixes = require('postcss-flexbugs-fixes');

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
    import: 'src/sass/index.pug'
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
      autoprefixer(),
      cssnano(),
      flexFixes()
    ]))
    .pipe(concat('app.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.sass.export))
);

gulp.task('pug', () =>
  gulp.src(paths.pug.import)
    .pipe(pug({ pretty: true }))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./'))
);


gulp.task('build', ['pug', 'sass', 'images']);

gulp.task('watch', () => {
  gulp.watch(paths.pug.import, ['pug']);
  gulp.watch(paths.sass.import, ['sass']);
});
