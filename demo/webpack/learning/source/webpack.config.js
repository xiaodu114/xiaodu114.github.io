/**
 * __dirname：当前模块的目录名，这里即 webpack.config.js所在的目录
 * 1、path相关(nodejs官方文档->api->path)
 *  参考链接：https://nodejs.org/zh-cn/docs/
 * 2、output、[path]|[name]|[ext]……相关
 *  参考链接：https://webpack.js.org/configuration/output/
 * 3、loader
 *      3.1、html-loader
 *          可以帮助处理html页面的图片等路径
 *      3.2、file-loader
 *          参考链接：https://www.npmjs.com/package/file-loader
 *      3.3、babel-loader
 *          参考链接：
 *              https://www.npmjs.com/package/babel-loader
 *              https://zhuanlan.zhihu.com/p/131566326
 *              https://segmentfault.com/a/1190000021188054
 *              https://segmentfault.com/a/1190000023804288
 *              https://cloud.tencent.com/developer/article/1718170
 *          第一种方式：@babel/preset-env(devDependencies) + core-js + regenerator-runtime
 *              说明：这里测试了一下，安装regenerator-runtime和不安装生成的代码一样
 *          第二种方式：@babel/plugin-transform-runtime(devDependencies) + @babel/runtime + @babel/runtime-corejs3
 *              说明：这种方式也需要 @babel/preset-env，如果不安装，let、箭头函数都没有转换
 * 4、插件(mini-css-extract-plugin)：抽取css
 *  参考链接：https://www.npmjs.com/package/mini-css-extract-plugin
 */

//  依赖 
//  npm i @babel/runtime @babel/runtime-corejs3 vue@2
//  开发依赖 
//  npm i @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-loader clean-webpack-plugin copy-webpack-plugin css-loader html-loader html-webpack-plugin less less-loader mini-css-extract-plugin style-loader vue-loader@15 vue-template-compiler webpack webpack-cli -D


const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPack = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

let multiPageConfig = [{
    entry: {
        sourcePath: "./src/app1/js/page1.js",
        targetPath: "app1/js/page1",
    },
    htmlWebPack: {
        sourcePath: './src/app1/page1.html',
        targetPath: 'app1/page1.html'
    }
},
{
    entry: {
        sourcePath: "./src/app1/js/page2.js",
        targetPath: "app1/js/page2",
    },
    htmlWebPack: {
        sourcePath: './src/app1/page2.html',
        targetPath: 'app1/page2.html'
    }
},
{
    entry: {
        sourcePath: "./src/app2/js/page1.js",
        targetPath: "app2/js/page1",
    },
    htmlWebPack: {
        sourcePath: './src/app2/page1.html',
        targetPath: 'app2/page1.html'
    }
},
{
    entry: {
        sourcePath: "./src/app2/js/page2.js",
        targetPath: "app2/js/page2",
    },
    htmlWebPack: {
        sourcePath: './src/app2/page2.html',
        targetPath: 'app2/page2.html'
    }
},
];

let tempModuleExportsObj = {
    //  开发模式下使用
    //mode: 'development',    // production | development
    //devtool: "source-map",
    //  产品模式下使用
    mode: 'production',    // production | development  
    entry: {},
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../www'),
        //publicPath: '/'
        //  为了可以在github上可以浏览，这里做下面的修改
        publicPath: '/demo/webpack/learning/www/'
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
                    // //  第一种方式
                    // //      dependencies: core-js regenerator-runtime
                    // //      devDependencies: @babel/preset-env
                    // presets: [
                    //     ["@babel/preset-env", {
                    //         modules: false,
                    //         useBuiltIns: "usage",
                    //         corejs: {
                    //             version: 3,
                    //             proposals: true,
                    //         },
                    //         targets: {
                    //             //chrome: "80"
                    //             ie: 8
                    //         }
                    //     }]
                    // ],
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
        //      demo/vue2/MainProject/source/webpack.config.js   这里也有类似的配置
        // {
        //     test: /\.(jpg|jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/,
        //     loader: 'file-loader',
        //     options: {
        //         esModule: false, // 如果不设置 vue文件中引入的图片会出现这样的错误<img src="[object Module]">
        //         name(file) {
        //             return path.relative(path.join(__dirname, "src"), file).split(path.sep).join("/");
        //         }
        //     }
        // },
        {
            test: /\.(jpg|jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
                filename(a, b) {
                    // a.filename 的值，例如： 'node_modules/element-ui/lib/theme-chalk/fonts/element-icons.woff'
                    return path.relative(path.join(__dirname, "src"), path.resolve(a.filename)).split(path.sep).join("/");
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
                //     name: "common", 
                //     chunks: 'initial', 
                //     minSize: 0, 
                //     minChunks: 2, // 这个代码引用多少次才需要抽离
                //     filename: 'common/js/[name].js'
                // },
                'self-commons': { // 自己整理的通用方法
                    name: "common/js/commons", // 以'/'分割，最后一项是文件的名称，前面的都是目录
                    test: /[\\/]src[\\/](common)[\\/]/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1,
                    filename: '[name].js'
                },
                vue: { // 抽取第三方模块：vue
                    priority: 1,
                    name: 'vue',
                    test: /[\\/]node_modules[\\/](vue)[\\/]/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1,
                    filename: 'lib/[name]/[name].js'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/mock',
                to: 'mock'
            },]
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: ({
                chunk
            }) => `${chunk.name.replace('/js/', '/css/')}.css`,
        })
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