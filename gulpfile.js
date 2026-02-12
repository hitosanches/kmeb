const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const del = require('del');
const through = require('through2');

// Limpar a pasta dist
function clean() {
  return del(['dist/**/*']);
}

// Minificar CSS
function minifyCSS() {
  return gulp.src('styles.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
}

// Minificar JavaScript
function minifyJS() {
  return gulp.src('script.js')
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
}

// Minificar HTML e atualizar referências para arquivos minificados
function minifyHTML() {
  return gulp.src('index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(through.obj(function (file, enc, cb) {
      if (file.isBuffer()) {
        let content = file.contents.toString();
        // Atualizar referências para arquivos minificados
        content = content.replace(/href="styles\.css"/g, 'href="styles.min.css"');
        content = content.replace(/src="script\.js"/g, 'src="script.min.js"');
        file.contents = Buffer.from(content);
      }
      cb(null, file);
    }))
    .pipe(gulp.dest('dist'));
}

// Tarefa de build completa
const build = gulp.series(clean, gulp.parallel(minifyCSS, minifyJS), minifyHTML);

// Watch para desenvolvimento
function watch() {
  gulp.watch('styles.css', minifyCSS);
  gulp.watch('script.js', minifyJS);
  gulp.watch('index.html', minifyHTML);
}

// Exportar tarefas
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;

