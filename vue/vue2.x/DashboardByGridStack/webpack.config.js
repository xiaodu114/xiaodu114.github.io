var path = require('path');
//var webpack = require("webpack");
var htmlWebPack = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode: 'development',
    entry: {
        "app": './index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './www')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, ]
    },
    devtool: "source-map",
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        //  https://blog.csdn.net/farmwang/article/details/84571126
        //  https://segmentfault.com/a/1190000015700211
        //  https://webpack.docschina.org/plugins/provide-plugin/
        // new webpack.ProvidePlugin({
        //     'window.System': path.resolve(__dirname, './node_modules/systemjs/dist/system-production.js')
        // }),
        new VueLoaderPlugin(),
        new htmlWebPack({
            template: './index.html'
        })
    ]
}