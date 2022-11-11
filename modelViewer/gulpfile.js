const { src, dest} = require('gulp')
const helper = require('../gulphelper.js')

const CONFIG = {
    target: '../dist/modelViewer/'
}

function buildTask(cb) {
    helper.copyReveal(CONFIG)
    helper.copyModelViewer(CONFIG)
    helper.copySelf(CONFIG)
    helper.getAssets(CONFIG, [
        'models/Astronaut.glb',
        'models/NeilArmstrong.glb',
        'models/NeilArmstrong.webp',
        'environments/moon_1k.hdr'
    ])
    cb()
}


exports.build = buildTask
exports.clean = (cb) => {helper.cleanTask(CONFIG, cb)
exports.watch = (cb) => {
    buildTask(cb)
    helper.watchTask(cb, buildTask)
}
