'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
// var concatCss    = require('gulp-concat-css');
var less         = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

// less plugins
// var LessPluginCleanCSS      = require('less-plugin-clean-css');
var LessPluginAutoPrefix    = require('less-plugin-autoprefix');
// var cleancss    = new LessPluginCleanCSS({ advanced: true });
var autoprefix  = new LessPluginAutoPrefix({browsers: ["last 2 versions", "> 1%", "ie 9"]});

function stylesGulp() {
	return gulp.src('app/styles/*.less')
	    .pipe(less({
	        // plugins: global.isProd ? [cleancss, autoprefix] : []
	        plugins: [autoprefix]
	    }))
	    .on('error', handleErrors)
	    .pipe(sourcemaps.init())
	    .pipe(cleanCSS())
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('dist/css'))
	    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
}

module.exports = stylesGulp;


// var config       = require('../config');
// var gulp         = require('gulp');
// var gulpif       = require('gulp-if');

// var sass = require("gulp-sass");
// var sourcemaps = require('gulp-sourcemaps');
// var plumber = require('gulp-plumber');
// var cssGlobbing = require('gulp-css-globbing');
// var eyeglass = require("eyeglass");
// var autoprefixer = require('gulp-autoprefixer');
// var browserSync = require('browser-sync').create();
// var notify = require("gulp-notify");


// var sassOptions = {
//     outputStyle: 'compact',
//     sourceComments: 'false',
// //    outputStyle: 'uncompressed',
// //    outputStyle: 'compressed',    
//     eyeglass: {}
// };

// function stylesGulp() {

//     var stream = gulp.src(['app/sass/*.scss'])
//         .pipe(sourcemaps.init())
//         .pipe(plumber())
//         .pipe(cssGlobbing({
//             extensions: ['.scss']
//         }))
//         .pipe(sass(eyeglass(sassOptions)).on("error", sass.logError))
//         .pipe(autoprefixer({
//             browsers: ['last 4 versions'],
//             cascade: false
//         }))
//         .pipe(sourcemaps.write("."))
//         .pipe(gulp.dest('build/css'))
//         .pipe(browserSync.stream({
//             match: '**/*.css'
//         }))
//         .pipe(notify("Scss compiled!"));

//     return stream;
// }

// function stylesGulpNoMaps() {

//     var stream = gulp.src(['app/sass/*.scss'])
//         .pipe(plumber())
//         .pipe(cssGlobbing({
//             extensions: ['.scss']
//         }))
//         .pipe(sass(eyeglass(sassOptions)).on("error", sass.logError))
//         .pipe(autoprefixer({
//             browsers: ['last 4 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('build/css'))
//         .pipe(browserSync.stream({
//             match: '**/*.css'
//         }))
//         .pipe(notify("Scss compiled!"));

//     return stream;
// }


// // Minifier:  https://github.com/scniro/gulp-clean-css
// var gulp = require('gulp');
// var cleanCSS = require('gulp-clean-css');

// function minifyCss() {
//     return gulp.src('build/css/*.css')
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(gulp.dest('build/css'));  
// };

// //module.exports = stylesGulp;
// //module.exports = stylesGulpNoMaps;

// function copy(){
//     gulp.src(['build/css/**/'])
// 	    .pipe(gulp.dest(config.dist + '/css'));    
// }

// var runSequence = require('run-sequence');

// gulp.task('create-css', stylesGulpNoMaps);
// gulp.task('minify-css', minifyCss);
// gulp.task('copy', copy);

// module.exports = runSequence('create-css','minify-css','copy');

