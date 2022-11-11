const { src } = require('gulp')
const helper = require('./gulphelper.js')
const ghPages = require('gulp-gh-pages')
const path = require('path')

function deploy(){
    buildAll(()=>{})
    return src('./dist/**/*')
        .pipe(ghPages())
}

function callGulp(folder, cb){
    const now = process.cwd()
    process.chdir(folder)
    console.log('Changed to Folder: ', folder, process.cwd())
    require(path.join(process.cwd(), 'gulpfile.js')).build(cb)
    process.chdir(now)
}

function buildAll(cb){
    callGulp('./modelViewer/', cb)
}

exports.clean = helper.cleanTask
exports.deploy = deploy
exports.buildAll = buildAll