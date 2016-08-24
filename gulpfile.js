
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

// for master pages
var hbsmaster = require('gulp-handlebars-master');
var rename = require('gulp-rename');

gulp.task('css', function() {
  gulp.src('css/app.css')
    .pipe(autoprefixer()
    )
    .pipe(gulp.dest('app/css'));
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
  gulp.watch(["css/*.css"], ['css']);
  gulp.watch(["pages/*.hbs"], ['handlebars']);
  gulp.watch(["pages/sections/*.hbs"], ['handlebars']);
});


gulp.task('handlebars', function() {

    var templatedata = {
	  "index" : {
	    "title" : "Home Page"
	  },
    "estructuraHTML5" : {
	    "title" : "Estructura"
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
