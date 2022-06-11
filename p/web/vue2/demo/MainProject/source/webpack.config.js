//  依赖 
//  npm i @babel/runtime @babel/runtime-corejs3 element-ui lodash vue@2
//  开发依赖 
//  npm i @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-loader clean-webpack-plugin copy-webpack-plugin css-loader file-loader html-loader html-webpack-plugin less less-loader mini-css-extract-plugin style-loader vue-loader@15 vue-template-compiler webpack webpack-cli -D

const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPack = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

let multiPageConfig = [{
    entry: {
        // key中以'/'分割，最后一项是文件的名称，前面的都是目录
        targetPath: "demo/component/float-menu/single-stage/js/index",
        sourcePath: "./src/demo/component/float-menu/single-stage/js/index.js"
    },
    htmlWebPack: {
        sourcePath: './src/demo/component/float-menu/single-stage/index.html',
        targetPath: `demo/component/float-menu/single-stage/index.html`
    }
},
{
    entry: {
        targetPath: "demo/component/layout/wordtable/js/index",
        sourcePath: "./src/demo/component/layout/wordtable/js/index.js"
    },
    htmlWebPack: {
        sourcePath: './src/demo/component/layout/wordtable/index.html',
        targetPath: `demo/component/layout/wordtable/index.html`
    }
}
];

let tempModuleExportsObj = {
    mode: 'production', // production | development
    //devtool: "source-map",
    entry: {},
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../www'),
        //publicPath: '/'
        //  为了可以在github上可以浏览，这里做下面的修改
        publicPath: '/p/web/vue2/demo/MainProject/www/'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    //  第二种方式
                    //      dependencies: @babel/runtime @babel/runtime-corejs3
                    //      devDependencies: @babel/plugin-transform-runtime  @babel/preset-env
                    presets: [
                        ["@babel/preset-env"]
                    ],
                    plugins: [
                        ['@babel/plugin-transform-runtime', {
                            corejs: {
                                version: 3,
                                proposals: true
                            },
                            useESModules: true
                        }]
                    ]
                }
            }
        },
        //  记得以前是这样实现的
        // {
        //     test: /\.(jpg|jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/,
        //     loader: 'file-loader',
        //     options: {
        //         // 如果不设置 vue文件中引入的图片会出现这样的错误<img src="[object Module]">
        //         esModule: false,
        //         name(file) {
        //             //  项目中引用了element-ui库，该类库中有包含字体文件
        //             //  这里使用 path.relative(path.join(__dirname, "src"), file).split(path.sep).join("/") 得到的路径为绝对路径(盘符的根目录开始，例如：F:\)
        //             //  你的项目目录 + \node_modules\element-ui\lib\theme-chalk\fonts\element-icons.ttf
        //             //  所以这里加上如下判断，当然如果你的好多node_modules包中都包含字体文件或者图片等，可能就需要换种写法了
        //             if (/[\\/]node_modules[\\/](element-ui)[\\/]/gi.test(file)) {
        //                 return path.join("lib/element-ui", path.basename(file)).split(path.sep).join("/");
        //             } else {
        //                 return path.relative(path.join(__dirname, "src"), file).split(path.sep).join("/");
        //             }
        //         }
        //     }
        // },
        {
            test: /\.(jpg|jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
                filename(a, b) {
                    // a.filename 的值，例如： 'node_modules/element-ui/lib/theme-chalk/fonts/element-icons.woff'
                    if (/node_modules[\\/](element-ui)[\\/]/gi.test(a.filename)) {
                        return path.join("lib/element-ui", path.basename(a.filename)).split(path.sep).join("/");
                    }
                    else {
                        return path.relative(path.join(__dirname, "src"), path.resolve(a.filename)).split(path.sep).join("/");
                    }
                }
            }
        }]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    optimization: { // 优化项
        splitChunks: { //分割代码块
            cacheGroups: { // 缓存
                // commons: { // 公共的代码
                //     name: "common", // 抽离出来的模块名
                //     chunks: 'initial', // 初始化，从入口文件开始抽离
                //     minSize: 0, // 如果这个代码大于0字节
                //     minChunks: 2, // 这个代码引用多少次才需要抽离
                //     filename: 'common/js/[name].js'
                // },
                'self-common': { // 自己整理的通用方法
                    name: "common/js/common", // 以'/'分割，最后一项是文件的名称，前面的都是目录
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                    filename: '[name].js'
                },
                lodash: { // 抽取第三方模块：lodash
                    priority: 99,
                    name: 'lodash',
                    test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1,
                    filename: 'lib/[name]/[name].js'
                },
                vue: { // 抽取第三方模块：vue
                    priority: 98,
                    name: 'vue',
                    test: /[\\/]node_modules[\\/](vue)[\\/]/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1,
                    filename: 'lib/[name]/[name].js'
                },
                elementui: { // 抽取第三方模块：element-ui
                    priority: 88,
                    name: 'lib/element-ui/element-ui',
                    test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1,
                    filename: '[name].js'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/**/*.json',
                //to: 'mock'
                to({
                    context,
                    absoluteFilename
                }) {
                    return Promise.resolve(path.relative(path.join(context, "src"), absoluteFilename).split(path.sep).join("/"));
                },
            },]
        }),
        new MiniCssExtractPlugin({
            filename: ({
                chunk
            }) => `${chunk.name.replace('/js/', '/css/')}.css`,
        }),
        new VueLoaderPlugin()
    ]
};

multiPageConfig.forEach((singlePage) => {
    if (singlePage.entry && singlePage.entry.sourcePath) {
        let tempEntryObj = {};
        tempEntryObj[singlePage.entry.targetPath] = singlePage.entry.sourcePath;
        Object.assign(tempModuleExportsObj.entry, tempEntryObj);
    }
    if (singlePage.htmlWebPack && singlePage.htmlWebPack.sourcePath) {
        let tempHtmlWebPackOption = {
            inject: true, // true | false | 'body'
            hash: true, //开启hash  ?[hash]
            chunks: [], //页面要引入的包
        };
        if (singlePage.entry && singlePage.entry.sourcePath) {
            tempHtmlWebPackOption.chunks.push(singlePage.entry.targetPath);
        }
        Object.assign(tempHtmlWebPackOption, {
            template: singlePage.htmlWebPack.sourcePath,
            filename: singlePage.htmlWebPack.targetPath,
        });
        tempModuleExportsObj.plugins.push(
            new HtmlWebPack(tempHtmlWebPackOption)
        );
    }
});
module.exports = tempModuleExportsObj;