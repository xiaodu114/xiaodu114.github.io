//  依赖
//  npm i vue@2
//  开发依赖 
//  npm i copy-webpack-plugin css-loader html-webpack-plugin less less-loader style-loader vue-loader@15 vue-template-compiler webpack webpack-cli -D

const path = require('path');
//const webpack = require("webpack");
const htmlWebPack = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        "app": './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../www')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },]
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
        //  因为要上传到Github中，copy文件夹（弄了一个压缩包保留）已删除，具体的请到输出目录"www"中查看
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/copy',
                to: ''
            },]
        }),
        new htmlWebPack({
            inject: "body",
            template: './src/index.html'
        })
    ]
}