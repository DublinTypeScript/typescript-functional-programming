"use strict";

var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tsc         = require("gulp-typescript"),
    runSequence = require("run-sequence");

var tsLibProject = tsc.createProject(
    "tsconfig.json", { module : "commonjs", typescript: require("typescript") }
);

gulp.task("build", function() {
    return gulp.src([
        "src/**/*.ts",
        "src/**/*.tsx"
    ])
    .pipe(tsLibProject())
    .on("error", function (err) {
        process.exit(1);
    })
    .js.pipe(gulp.dest("lib/"));
});

gulp.task("bundle", function() {

  var mainJsFilePath = "lib/index.js";
  var outputFolder   = "dist/";
  var outputFileName = "index.js";

  var bundler = browserify({
    debug: true,
    standalone : "inversify"
  });

  return bundler.add(mainJsFilePath)
                .bundle()
                .pipe(source(outputFileName))
                .pipe(buffer())
                .pipe(gulp.dest(outputFolder));
});

gulp.task("default", function (cb) {
  runSequence("build", "bundle", cb);
});
