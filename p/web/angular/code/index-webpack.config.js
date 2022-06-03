//  安装依赖
//  yarn add @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/runtime @babel/runtime-corejs3 babel-loader copy-webpack-plugin css-loader html-loader html-webpack-plugin less less-loader mini-css-extract-plugin style-loader webpack webpack-cli -D
//  npm i @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/runtime @babel/runtime-corejs3 babel-loader copy-webpack-plugin css-loader html-loader html-webpack-plugin less less-loader mini-css-extract-plugin style-loader webpack webpack-cli -D

/**
 * 目前已知的问题
 * 1、利用babel将ES6+转ES5时，这里采用的配置是非全局注入方式，这种方式不能抽取core-js代码
 * 2、需要在JS文件引入依赖的less文件，如果依赖多个less文件，则会合并成一个，文件名称和js文件名称相同。需要特别注意！！！
 * 3、html文件中写<script type="text/ng-template"></script>模板的问题。html-loader会忽略其中的内容，如果里面有<img src="../../Common/Images/no-data.png">类似这样的代码，图片是相对源文件路径的，默认不会解析，对应的图片也不能拷贝到响应的目录下。目前有两种处理方式：
 *      1、将模板单独的放在一个html文件中【推荐】  
 *      2、在html中使用绝对路径（例如："/BaseModule/Module1/Common/Images/no-data.png"）并且JS中require一下图片路径，例如：require("../../Common/Images/no-data.png")
 *      3、利用 html-loader 的 preprocessor 自己解析
 * 4、html页面是否"inject"的问题，如果注入，则会在html文件头部添加<head> 依赖的JS和CSS </head>；如果不注入，则需要自己添加依赖的CSS
 */

//  引入安装的依赖
const webpack = require("webpack");
const HtmlWebPack = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//  引入依赖
const path = require("path");
const findHTMLOrJSFile = require("./foreachFolder");
const handleNGTemplate = require("./html-loader-extend");


const PUBLICPATH = "/BaseModule/Module1/";
let srcAbsolutePath = path.join(__dirname, "src");
let multiPageConfig = findHTMLOrJSFile(srcAbsolutePath);
multiPageConfig.push({
    entry: {
        //sourcePath: path.join(__dirname, "src/Common/JS/utils.js").split(path.sep).join("\\\\"),
        sourcePath: path.join(__dirname, "src/Common/JS/utils.js"),
        targetPath: "Common/JS/utils",
    },
});

multiPageConfig.push({
    htmlWebPack: {
        sourcePath: path.join(__dirname, "./index.html"),
        targetPath: "../../index.html",
    },
    entry: {
        sourcePath: path.join(__dirname, "./index.js"),
        targetPath: "../../index",
    },
});

let tempModuleExportsObj = {
    mode: "development", // production | development
    devtool: "source-map",
    entry: {},
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../mySite" + PUBLICPATH),
        publicPath: PUBLICPATH,
    },
    target: ["web", "es5"],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    preprocessor: async (content, loaderContext) => {
                        let page = multiPageConfig.find(
                            (x) =>
                                x?.htmlWebPack?.sourcePath ===
                                loaderContext.resourcePath
                        );
                        return handleNGTemplate(content, loaderContext, {
                            PUBLICPATH: PUBLICPATH,
                            absolutePath: srcAbsolutePath
                        });
                    },
                    sources: {
                        urlFilter: (attribute, value, resourcePath) => {
                            // `attribute` 参数包含一个 HTML 属性的名称。
                            // `value` 参数包含一个 HTML 属性的值。
                            // `resourcePath` 参数包含一个已加载 HTML 文件的路径。
                            if (path.isAbsolute(value)) {
                                return false;
                            }
                            return true;
                        },
                    },
                },
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename(a, b) {
                        // a.asdf => "src/common/images/logo.png"
                        return path
                            .relative(
                                path.join(__dirname, "src"),
                                path.resolve(a.filename)
                            )
                            .split(path.sep)
                            .join("/");
                    },
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env"]],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    corejs: {
                                        version: 3,
                                        proposals: true,
                                    },
                                    useESModules: true,
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {},
    },
    plugins: [
        //  如果一个JS页面 引入了多个less,会合并成一个
        new MiniCssExtractPlugin({
            filename: ({ chunk }) =>
                `${chunk.name.replace("/JS/", "/CSS/")}.css`,
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
            publicPath: PUBLICPATH,
        }),
        //  把一些资源或者不需要编译的JS直接拷贝到对应的目录下
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/Common/Images",
                    to: "Common/Images",
                },
                {
                    from: "./src/Common/JS/other.js",
                    to: "Common/JS/other.js",
                }
            ],
        }),
    ],
    optimization: {
        // 优化项
        splitChunks: {
            //分割代码块
            cacheGroups: {
                "core-js": {
                    // 抽取第三方模块：core-js
                    priority: 100,
                    name: "core-js",
                    test: /[\\/]node_modules[\\/](core-js)[\\/]/,
                    chunks: "initial",
                    minSize: 0,
                    minChunks: 1,
                    filename: "lib/[name]/[name].js",
                },
            },
        },
    },
};
multiPageConfig.forEach((singlePage) => {
    if (singlePage.entry && singlePage.entry.sourcePath) {
        let tempEntryObj = {};
        tempEntryObj[singlePage.entry.targetPath] = singlePage.entry.sourcePath;
        Object.assign(tempModuleExportsObj.entry, tempEntryObj);
    }
    if (singlePage.htmlWebPack && singlePage.htmlWebPack.sourcePath) {
        let tempHtmlWebPackOption = {
            inject: false,
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