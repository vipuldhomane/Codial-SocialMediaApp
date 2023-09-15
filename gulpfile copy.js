const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const path = require("path");
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
const rename = require("gulp-rename");
const minify = require("gulp-minify");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
// import imagemin from "gulp-imagemin";
const del = require("del");
const { log } = require("console");

gulp.task("css", async (done) => {
  gulp
    .src("./assets/**/*.css")
    .pipe(cssnano())
    .pipe(rev())
    .pipe(
      rename(function (path) {
        path.dirname = path.dirname.replace("scss", "css");
      })
    )
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

gulp.task("js", async (done) => {
  gulp
    .src("./assets/**/*.js")
    .pipe(minify())
    .pipe(uglify)
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

gulp.task("images", async (done) => {
  gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
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

// empty the public assets before build
gulp.task("clean:assets", async (done) => {
  del.sync("./public/assets");
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images"),
  async (done) => {
    console.log("building assets");
    done();
  }
);
