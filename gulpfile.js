var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    merge = require('merge');

var paths = {
    npm: "./node_modules/",
    lib: "./lib/",
    tsSource: "./scripts/ts/**/*.ts",
    tsOutput: "./scripts/js/**/*.js",
    tsDef: "./scripts/ts/definitions/"
};

var tsProject = ts.createProject({
    declarationFiles: true,
    noExternalResolve: false,
    module: 'AMD',
    removeComments: true
});

gulp.task('ts-compile', function () {
    var tsResult = gulp.src(paths.tsSource)
                    .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.tsDef)),
        tsResult.js.pipe(gulp.dest(paths.tsOutput))
    ]);
});

gulp.task('watch', ['ts-compile'], function () {
    gulp.watch(paths.tsDef, ['ts-compile']);
    gulp.watch(paths.tsSource, ['ts-compile']);
});

gulp.task('default', ['watch']);