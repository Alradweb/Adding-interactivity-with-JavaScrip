const HtmlWebpackPlugin = require('html-webpack-plugin')
const ncp = require('ncp').ncp
ncp.limit = 16

const options = {
    filter(name) {
        return name.indexOf('index.html') === -1
    },
    clobber: false
}

class MyCopyPlugin {
    constructor(param) {
        this.src = param.src
        this.dest = param.dest
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('MyCopyPlugin', (compilation) => {

            function copy(data, cb, src, dest) {
                ncp(src, dest, options, function (err) {
                    if (err) {
                        return console.error(err)
                    }
                    console.log('MyCopyPlugin worked.')
                    cb(null, data)
                })
            }

            // Static Plugin interface |compilation |HOOK NAME | register listener
            HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
                'MyCopyPlugin',
                (data, cb) => copy(data, cb, this.src, this.dest)
            )
        })
    }
}

module.exports = MyCopyPlugin