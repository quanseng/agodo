
var gulp = require('gulp');
var zip = require('gulp-zip');

var paths = {
    html: 'src',
    android: 'android',
    ios: 'ios',
    data: 'data',
    public: 'assets',
    backup: 'backup',
}

//Create backup zip file
gulp.task('backup', function () {
    Date.prototype.yyyymmdd = function() {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.getDate().toString();
        var hh  = this.getHours().toString();
        return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]) + '-' + hh;
    };
    var date = new Date();
    var filename =  'agodo-source-'+ date.yyyymmdd() + '.zip';
    return gulp.src([
            paths.html + '/**/*.*',
            paths.android + '/**/*.*',
            paths.ios + '/**/*.*',
            paths.data + '/**/*.*',
            'gulpfile.js',
            'package.json',
            'index.js',
            'metro.config.js',
            'babel.config.js',
            'app.json',
            'App.js',
            '.prettierrc.js'
        ], {base: './'})
        .pipe(zip(filename))
        .pipe(gulp.dest(paths.backup))
});

