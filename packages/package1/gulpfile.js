const { src, dest, watch, series } = require ('gulp');

const
    del = require ('gulp-clean'),
    bs = require('browser-sync').create(),
    concat = require('gulp-concat'),
    terser = require('gulp-terser'),
    sass = require('gulp-sass')(require('sass')),
    print = require('gulp-print').default;

//empty path or folder : "./"
let publicFolderName = "public";
let privateFolderName = "src";

let watchedHtml = [
    privateFolderName + "/*.html",
    privateFolderName + "/**/*.html"
];

let watchedCss = [
    privateFolderName + "/assets/css/*.scss",
    privateFolderName + "/assets/css/**/*.scss",
    privateFolderName + "/assets/css/*.css",
    privateFolderName + "/assets/css/**/*.css",
];
let publicCssFolderPath = publicFolderName + "/assets/css";
let minCssName = "style.min.css";

let watchedJs = [
    privateFolderName + "/assets/js/*.js",
    privateFolderName + "/assets/js/**/*.js",
];
let publicJsFolderPath = publicFolderName + "/assets/js";
let minJsName = "functions.min.js";

let watchedImg = [
    privateFolderName + "/assets/img/*",
    privateFolderName + "/assets/img/**/*"
]
let publicImgFolderPath = publicFolderName + "/assets/img";

browsersyncServe = () => {
    bs.init({
        notify : false,
        server : './'+publicFolderName
    });
}
exports.browsersyncServe = browsersyncServe;

browsersyncReload = (done) => {
    bs.reload();
    done();
}

copyHtml = () => {
    return src(watchedHtml)
    .pipe(dest(publicFolderName));
}
exports.copyHtml = copyHtml;
watchHtml = () => {
    watch(watchedHtml, series(copyHtml,browsersyncReload));
}

copyCss = () => {
    return src(watchedCss)
    .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
    .pipe(concat(minCssName)) 
    .pipe(dest(publicCssFolderPath));
}
exports.copyCss = copyCss;
watchCss = () => {
    watch(watchedCss, series(copyCss,browsersyncReload));
}

copyJs = () => {
    return src(watchedJs)
    .pipe(concat(minJsName)) 
    .pipe(terser({
        toplevel: true
    }))
    .pipe(dest(publicJsFolderPath));
}
exports.copyJs = copyJs;
watchJs = () => {
    watch(watchedJs, series(copyJs,browsersyncReload));
}

copyImg = () => {
    return src(watchedImg)
    .pipe(dest(publicImgFolderPath));
}
exports.copyImg = copyImg;
watchImg = () => {
    watch(watchedImg, series(this.copyImg, browsersyncReload));
}

//Did you forget to signal async completion?
//Tenter avec series(a, b)
copy = () => {
    copyHtml();
    copyCss();
    copyJs();
    copyImg();
}
exports.copy = copy;

delPublicFolder = () => {
    return src(publicFolderName, {read:false, allowEmpty:true})
    .pipe(del())
    .pipe(print());
}
exports.del = delPublicFolder;

// Todo : on gulp update : restart gulp
// watchGulpFile = () => {
//     watch("gulpfile.js", series());
// }

defaultFunction = () => {
    copyHtml();
    copyCss();
    copyJs();
    copyImg();
    browsersyncServe();
    watchHtml();
    watchCss();
    watchJs();
}
exports.default = defaultFunction;