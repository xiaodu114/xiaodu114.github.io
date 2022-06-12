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
    //  开发模式下使用
    //mode: 'development',    // production | development  
    //devtool: "source-map",
    //  产品模式下使用
    //      说明：按理说产品模式下应该启用压缩，但是在产品模式下用"copy-webpack-plugin"拷贝的文件也会被压缩（如果被压缩会有一些问题，例如：demo/vue2/DashboardByGridStack/source/src/copy/htmlSnippets/amd3/module1.js   Uncaught (in promise) TypeError: define is not a function）
    mode: 'production',    // production | development  
    optimization: {
        minimize: false
    },
    entry: {
        "app": './src/index.js'
    },
    output: {
        filename: '[name].js',
        //  path 和 publicPath 这两个根据实际情况自己调整一下
        path: path.resolve(__dirname, '../www'),
        publicPath: '/demo/vue2/DashboardByGridStack/www/'
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