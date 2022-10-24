const { src, dest, watch } = require ('gulp');

const 
    bs = require('browser-sync').create(),
    concat = require('gulp-concat'),
    sass = require('gulp-sass')(require('sass'))

let watchedCss = "styles.scss"

browsersyncServe = () => {
    bs.init({
        notify : false,
        server : '.'
    });
}
exports.browsersyncServe = browsersyncServe;

browsersyncReload = (done = () => {}) => {
    bs.reload();
    done();
}
exports.browsersyncReload = browsersyncReload;

copyCss = () => {
    return src(watchedCss)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat("styles.css")) 
    .pipe(dest("."));
}
watchHtml = () => {
    watch("index.html", browsersyncReload());
}
watchCss = () => {
    watch(watchedCss, browsersyncReload());
}
watchJs = () => {
    watch("functions.js", browsersyncReload());
}
defaultFunction = () => {
    copyCss();
    browsersyncServe();
    watchHtml();
    watchCss();
    watchJs();
}
exports.default = defaultFunction;