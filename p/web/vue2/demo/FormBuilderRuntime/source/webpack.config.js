//  依赖
//  npm i deep-extend vue@2
//  开发依赖 
//  npm i buffer copy-webpack-plugin css-loader html-webpack-plugin less less-loader style-loader vue-loader@15 vue-template-compiler webpack webpack-cli -D

const path = require('path');
const webpack = require("webpack");
//  现在换成 webpack5 之后，编译之后报错了："ReferenceError: Buffer is not defined"
//      依赖 deep-extend 中有一个这样的方法：function isSpecificValue(val) { return (val instanceof Buffer || val instanceof Date || val instanceof RegExp) ? true : false; }
//      之前使用 webpack4 的时候，同样使用 deep-extend 没有报错
//      解决办法：https://viglucci.io/how-to-polyfill-buffer-with-webpack-5
const Buffer = require('buffer/').Buffer;
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
        },
        fallback: {
            buffer: require.resolve('buffer/'),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
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