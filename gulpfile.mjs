// import { task, src, dest, series } from "gulp";
// const sass = require("gulp-sass")(require("sass"));
// import path from "path";
// import cssnano from "gulp-cssnano";
// import rev, { manifest } from "gulp-rev";
// import rename from "gulp-rename";
// import minify from "gulp-minify";
// import uglify from "gulp-uglify-es";
// import imagemin from "gulp-imagemin";
// // import imagemin from "gulp-imagemin";
// import { sync } from "del";
// import { log } from "console";

// task("css", async (done) => {
//   src("./assets/**/*.css")
//     .pipe(cssnano())
//     .pipe(rev())
//     .pipe(
//       rename(function (path) {
//         path.dirname = path.dirname.replace("scss", "css");
//       })
//     )
//     .pipe(dest("./public/assets"))
//     .pipe(
//       manifest({
//         cwd: "public",
//         merge: true,
//       })
//     )
//     .pipe(dest("./public/assets"));

//   done();
// });

// task("js", async (done) => {
//   src("./assets/**/*.js")
//     .pipe(minify())
//     .pipe(uglify)
//     .pipe(rev())
//     .pipe(dest("./public/assets"))
//     .pipe(
//       manifest({
//         cwd: "public",
//         merge: true,
//       })
//     )
//     .pipe(dest("./public/assets"));
//   done();
// });

// task("images", async (done) => {
//   src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(dest("./public/assets"))
//     .pipe(
//       manifest({
//         cwd: "public",
//         merge: true,
//       })
//     )
//     .pipe(dest("./public/assets"));
//   done();
// });

// // empty the public assets before build
// task("clean:assets", async (done) => {
//   sync("./public/assets");
//   done();
// });

// task("build", series("clean:assets", "css", "js", "images"), async (done) => {
//   console.log("building assets");
//   done();
// });
import gulp from "gulp";
import cssnano from "gulp-cssnano";
import rev from "gulp-rev";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import terser from "gulp-terser"; // Update the import statement
import imagemin from "gulp-imagemin";
import * as del from "del";

import runSequence from "run-sequence";
const sass = gulpSass(dartSass);

gulp.task("css", function (done) {
  console.log("minifying css...!");
  gulp
    .src("./assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"));

  gulp
    .src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("js", function (done) {
  console.log("minifying js...!");
  gulp
    .src("./assets/**/*.js")
    .pipe(terser()) // Using gulp-terser for JavaScript minification
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("images", function (done) {
  console.log("Compressing images...!");
  gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

// Empty the public assets directory
gulp.task("clean:assets", function (done) {
  del.deleteSync("./public/assets");
  done();
});

// Using gulp.series to run tasks in sequence
gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images", function (done) {
    console.log("Building tasks");
    done();
  })
);
