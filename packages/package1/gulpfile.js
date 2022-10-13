const { src, dest, watch, series } = require ('gulp');

const
    del = require ('gulp-clean'),
    bs = require('browser-sync').create(),
    concat = require('gulp-concat'),
    terser = require('gulp-terser'),
    sass = require('gulp-sass')(require('sass')),
    print = require('gulp-print').default;

browsersyncServe = () => {
    bs.init({
        notify : false,
        server : './public'
    });
}

browsersyncReload = (done) => {
    bs.reload();
    done();
}

copyJs = () => {
    return src('js/*.js')
    .pipe(concat('functions.min.js')) 
    .pipe(terser({
        toplevel: true
    }))
    .pipe(dest('public'));
}
exports.copyJs = copyJs;
copyCss = () => {
    return src('*.scss')
    .pipe(src('*.css'))
    .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
    .pipe(concat('style.min.css')) 
    .pipe(dest('public'));
}
exports.copyCss = copyCss;
copyHtml = () => {
    return src('*.html')
    .pipe(dest('./public'));
}
exports.copyHtml = copyHtml;

watchCss = () => {
    watch(['*.scss', '*.css'], series(copyCss,browsersyncReload));
}
watchHtml = () => {
    watch('*.html', series(copyHtml,browsersyncReload));
}
watchJs = () => {
    watch('js/*.js', series(copyJs,browsersyncReload));
}

delPublicFolder = () => {
    return src('public', {read:false, allowEmpty:true})
    .pipe(del())
    .pipe(print());
}
exports.del = delPublicFolder;

defaultFunction = () => {
    copyHtml();
    copyCss();
    copyJs();
    browsersyncServe();
    watchHtml();
    watchCss();
    watchJs();
}
exports.default = defaultFunction;