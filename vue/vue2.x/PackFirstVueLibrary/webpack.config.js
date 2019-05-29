var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode: 'development', // production|development  // https://segmentfault.com/a/1190000013712229
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'ddztestlib01.js',
        library: 'ddztestlib01',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        // globalObject: `(typeof self !== 'undefined' ? self : this)`, // https://stackoverflow.com/questions/49111086/webpack-4-universal-library-target
        globalObject: 'typeof self !== \'undefined\' ? self : this' // element-ui 写法
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            loader: 'css-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }]
    },
    devtool: "source-map",
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}