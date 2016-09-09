
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var scss = require('postcss-scss');
var nested = require('postcss-nested');
var postcss = require('gulp-postcss');

// for master pages
var hbsmaster = require('gulp-handlebars-master');
var rename = require('gulp-rename');

gulp.task('css1', function() {
  gulp.src('scss/app.scss')
  .pipe(autoprefixer()
  )
  .pipe(sass({
    includePaths: ['scss']
  }))
  .pipe(gulp.dest('app/css'));
});

gulp.task('css', function() {
  gulp.src('scss/app.scss')
    .pipe(autoprefixer()
    )
    .pipe(sass({
      includePaths: ['scss']
    }))
    .pipe(gulp.dest('app/css/'));
});


// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['css'], function() {
  browserSync.init(["app/css/*.css", "app/js/*.js", "./app/*.html"], {
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('watch', ['css','handlebars', 'serve'], function() {
  gulp.watch(["scss/*.scss"], ['css']);
  gulp.watch(["pages/*.hbs"], ['handlebars']);
  gulp.watch(["pages/sections/*.hbs"], ['handlebars']);
});


gulp.task('handlebars', function() {
    var templatedata = {
	  "index" : {
	    "title" : "Home Page"
	  },
    "navexample" : {
	    "title" : "Ejemplo de Navegacion"
	  },
    "colores" : {
	    "title" : "Colores"
	  },
    };
    gulp.src('./pages/sections/*.hbs')
	  .pipe( hbsmaster('./pages/master.hbs', templatedata, {}))
	  .pipe( rename( function(path){
	    path.extname = '.html';
	  }))
	  .pipe(gulp.dest('./app'));
});
