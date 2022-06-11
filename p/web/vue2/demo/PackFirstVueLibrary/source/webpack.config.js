//  按照实际情况是否安装：vue@2   这里仅是简单的示例，没有使用
//  开发依赖 
//  npm i css-loader less less-loader style-loader vue-loader@15 vue-template-compiler webpack webpack-cli -D
//  执行
//  npm run b
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development', // production|development  // https://segmentfault.com/a/1190000013712229
    entry: "./src/index.js",
    output: {
        //  path和publicPath 这两个根据实际情况自己调一下
        path: path.resolve(__dirname, '../www/lib'),
        publicPath: '/p/web/vue2/demo/PackFirstVueLibrary/www/',
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
            use: ['vue-loader']
        }, {
            test: /\.css$/,
            use: ['css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },]
    },
    devtool: "source-map",
    plugins: [
        new VueLoaderPlugin()
    ]
}