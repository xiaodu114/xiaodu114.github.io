var path = require('path');
var htmlWebPack = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode: 'development',
    entry: {
        "app": './main.js'
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
    node: { // 解决这个问题： Error: Can't resolve 'fs' 
        fs: 'empty'
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebPack({
            template: './index.html'
        })
    ]
}