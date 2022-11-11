const { src, dest, watch  } = require('gulp')
const stylus = require('gulp-stylus')
const cache = require('gulp-cached')
const terser = require('gulp-terser')
const cleanCSS = require('gulp-clean-css')
const download = require('gulp-download2')
const del = require('del')
const fs = require('fs')
const path = require('path')

function getAssets(CONFIG, files){
    files.unshift('README.md')
    files.unshift('ATTRIBUTIONS.md')
    files.unshift('LICENSE')

    const newFiles = files
        .filter(file=>!fs.existsSync(path.join(CONFIG.target, 'shared-assets/', file)))
        .map(file => {
            return {
                url:`https://github.com/google/model-viewer/blob/master/packages/shared-assets/${file}?raw=true`,
                file:file
            }
        })
    if (newFiles.length>0){
        console.log('Downloading Assets  from <Model-Viewer> ...')
        download(newFiles).pipe(dest(path.join(CONFIG.target, 'shared-assets/')))
    }
}

function copyPlugin(CONFIG, folder){
    const base = path.join('..', 'reveal-js-plugins', 'src', folder)
    const destDir = path.join(CONFIG.target, 'plugin', folder)
    console.log('Copy Plugin from', base)

    src(path.join(base, '*.js'))
        .pipe(cache(`plugin-${folder}`))
        .pipe(terser())
        .pipe(dest(destDir))

    src(path.join(base, '*.css'))
        .pipe(cache(`plugin-${folder}`))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest(destDir))

    src(path.join(base, '*.styl'))
        .pipe(cache(`plugin-${folder}`))
        .pipe(stylus())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest(destDir))
}

function copyReveal(CONFIG){
    src('../node_modules/reveal.js/dist/**')
        .pipe(dest(path.join(CONFIG.target, 'libs/reveal.js/')))

    src('../node_modules/reveal.js/plugin/**')
        .pipe(dest(path.join(CONFIG.target, 'plugin/')))
}

function copyModelViewer(CONFIG){
    src('../node_modules/@google/model-viewer/dist/**')
        .pipe(dest(path.join(CONFIG.target, 'libs/model-viewer/')))

    copyPlugin(CONFIG, 'fragmentEvents')
    copyPlugin(CONFIG, 'modelViewer')
}

function copySelf(CONFIG){
    src('*.html')
        .pipe(cache('main'))
        .pipe(dest(CONFIG.target))
    src('css/*.css')
        .pipe(cache('main'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest(path.join(CONFIG.target, 'css/')))

    src(['css/*.styl', '!css/constants.styl'])
        .pipe(cache('main'))
        .pipe(stylus())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest(path.join(CONFIG.target, 'css/')))
}

function watchTask(cb, buildTask){
    watch([
        '../reveal-js-plugins/**/*.js',
        '../reveal-js-plugins/**/*.styl',
        '*.html',
        'css/*.css',
        'css/*.styl'
    ], buildTask)
}

function cleanTask(cb){
    del([ 'dist' ])
    cb()
}

exports.copyPlugin = copyPlugin
exports.copyReveal = copyReveal
exports.copyModelViewer = copyModelViewer
exports.copySelf = copySelf
exports.getAssets = getAssets
exports.watchTask = watchTask
exports.cleanTask = cleanTask