const { src, dest} = require('gulp')
const helper = require('../gulphelper.js')
const path = require('path')

const CONFIG = {
    target: path.join(process.cwd(), '../dist/modelViewer/')
}

function buildTask(cb) {
    console.log(process.cwd())
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
exports.watch = (cb) => {
    buildTask(cb)
    helper.watchTask(cb, buildTask)
}
