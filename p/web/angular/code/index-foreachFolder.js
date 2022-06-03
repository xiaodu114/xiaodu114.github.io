const fs = require("fs");
const path = require("path");

function findHTMLOrJSFile(absolutePath){
    let multiPageConfig = [],templateHtmlPaths=[];
    fs.readdirSync(absolutePath).forEach(function (nameLV0) {
        if (nameLV0 === "PC") {
            let pcFolderPath = path.join(absolutePath, nameLV0);
            fs.readdirSync(pcFolderPath).forEach(function (nameLV1) {
                let htmlFolderPath = path.join(pcFolderPath, nameLV1);
                let statHTML = fs.statSync(htmlFolderPath);
                let htmlArray = [];
                if (statHTML.isDirectory()) {
                    fs.readdirSync(htmlFolderPath).forEach(function (nameLV2) {
                        let needPath = path.join(htmlFolderPath, nameLV2);
                        let needStat = fs.statSync(needPath);
                        if (needStat.isDirectory() && nameLV2 === "Template") {
                            fs.readdirSync(needPath).forEach(function (
                                templatePath
                            ) {
                                templateHtmlPaths.push(
                                    path.join(needPath, templatePath)
                                );
                            });
                        } else {
                            if (
                                needStat.isFile() &&
                                path.extname(nameLV2)?.toLowerCase() === ".html"
                            ) {
                                htmlArray.push(needPath);
                            }
                        }
                    });
                }
                let jsFolderPath = path.join(htmlFolderPath, "JS");
                let statJS = fs.statSync(jsFolderPath);
                let jsArray = [];
                if (statJS.isDirectory()) {
                    fs.readdirSync(jsFolderPath).forEach(function (nameLV3) {
                        let needPath = path.join(jsFolderPath, nameLV3);
                        let needStat = fs.statSync(needPath);
                        if (
                            needStat.isFile() &&
                            path.extname(nameLV3)?.toLowerCase() === ".js"
                        ) {
                            jsArray.push(needPath);
                        }
                    });
                }
                htmlArray.forEach((htmlAllPath) => {
                    let jsFileIndex = jsArray.findIndex(
                        (x) =>
                            path.basename(htmlAllPath, ".html") ===
                            path.basename(x, ".js")
                    );
                    let pageConfig = {
                        htmlWebPack: {
                            sourcePath: htmlAllPath,
                            targetPath: path.relative(absolutePath, htmlAllPath),
                        },
                    };
                    if (jsFileIndex >= 0) {
                        let jsRelativePath = path.relative(
                            absolutePath,
                            jsArray[jsFileIndex]
                        );
                        jsRelativePath = jsRelativePath.slice(
                            0,
                            0 - path.extname(jsRelativePath).length
                        );
                        pageConfig.entry = {
                            sourcePath: jsArray[jsFileIndex],
                            targetPath: jsRelativePath.split(path.sep).join("/"),
                        };
                        jsArray.splice(jsFileIndex, 1);
                    }
                    multiPageConfig.push(pageConfig);
                });
                if (jsArray.length) {
                    jsArray.forEach((jsPath) => {
                        let jsRelativePath = path.relative(absolutePath, jsPath);
                        jsRelativePath = jsRelativePath.slice(
                            0,
                            0 - path.extname(jsRelativePath).length
                        );
                        multiPageConfig.push({
                            entry: {
                                sourcePath: jsPath,
                                targetPath: jsRelativePath
                                    .split(path.sep)
                                    .join("/"),
                            },
                        });
                    });
                }
            });
        }
    });
    templateHtmlPaths.forEach(function (templateHtmlPath) {
        multiPageConfig.push({
            htmlWebPack: {
                sourcePath: templateHtmlPath,
                targetPath: path.relative(absolutePath, templateHtmlPath),
            },
        });
    });
    return multiPageConfig;
}

module.exports = findHTMLOrJSFile;