var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var out    = require('gulp-out');

gulp.task('concat', function() {

    gulp.src(['./src/**/*.js'])
        .pipe(concat('Headless.js'))
        .pipe(gulp.dest("./dist"));

});

gulp.task('uglify', function() {

    gulp.src(['./dist/Headless.js'])
        .pipe(uglify())
        .pipe(out("./dist/{basename}.min{extension}"));

});

gulp.task('default', [ 'concat', 'uglify' ]);
