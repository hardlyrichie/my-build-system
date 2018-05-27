import gulp from 'gulp';
import pump from 'pump';
import uglify from 'gulp-uglify';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import del from 'del';
import browserSync from 'browser-sync';
import log from 'gulplog';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpif from 'gulp-if';

let buildType; // Development v. production builds

const server = browserSync.create();

const paths = {
  html: {
    src: 'public/index.html',
    dest: 'public',
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'public',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'public',
  },
};


// ---------Setup browserify--------------
// Based off Javascript Browserify, Watchify gulp recipe:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
const customOpts = {
  entries: 'src/js/index.js',
  debug: true,
};
const opts = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));
b.transform(babelify, { presets: ['env'] });
b.on('update', gulp.series(scripts, reload)); // on any updates watchify runs scripts task and reload page
b.on('log', log.info);

export const clean = () => del(['public/*.css', 'public/*.js', 'public/maps']);

export function styles(cb) {
  console.log('Starting style tasks');

  pump(
    [
      gulp.src('src/scss/styles.scss'),
      sourcemaps.init(),
      autoprefixer(),
      gulpif(buildType === 'production', sass({ outputStyle: 'compressed' }), sass({ outputStyle: 'expanded' })),
      gulpif(buildType === 'development', sourcemaps.write('maps')),
      gulp.dest(paths.styles.dest),
    ],
    cb,
  );
}

export function scripts(cb) {
  console.log('Starting scripts tasks');

  pump(
    [
      b.bundle(),
      source('main.js'),
      buffer(),
      sourcemaps.init({ loadMaps: true }), // load map from browserify
      gulpif(buildType === 'production', uglify()),
      gulpif(buildType === 'development', sourcemaps.write('maps')),
      gulp.dest(paths.scripts.dest),
    ],
    cb,
  );
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './public/',
    },
  });
  done();
}

export function watch() {
  console.log('Starting watch task');

  gulp.watch(paths.html.src, reload);
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
}

const production = gulp.series(clean, (done) => {
  console.log('//------STARTING PRODUCTION BUILD------//');

  buildType = 'production';
  done();
}, styles, scripts, serve, watch);

// Production build
export { production };

// Development build
export default gulp.series(clean, (done) => {
  console.log('//------STARTING DEVELOPMENT BUILD------//');

  buildType = 'development';
  done();
}, styles, scripts, serve, watch);
