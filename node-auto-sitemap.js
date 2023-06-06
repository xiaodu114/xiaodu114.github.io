const path = require("path");
const fs = require("fs");

/**
 * 获取文件内容
 * @param {String}  filePath    文件路径
 * @returns {String}    文件文本内容
 */
function getFileContent(filePath) {
    try {
        return fs.readFileSync(filePath, "utf8");
    } catch (err) {
        console.error(err);
    }
}

/**
 * 获取HTML页面的标题
 * @param {String} filePath 文件路径
 * @returns {String}    标题
 */
function getHtmlPageTitle(filePath) {
    let content = getFileContent(filePath);
    if (!content) return;

    //  试试这个： /<title[^>]*>([^<]+)<\/title>/
    let matchResult = content.match(new RegExp("<title[^>]*>(.*?)</title>"), "gi");

    let title = null;
    if (Array.isArray(matchResult) && matchResult.length) {
        title = matchResult[1] ?? matchResult[0];
    }
    return title;
}

/**
 * 指定目录返回目录树的JSON结构
 * @param {String} rootPath     需要遍历的根目录
 * @param {Function} verifyFn   验证方法
 * @param {Array} targetArr     返回的目标数组
 * @returns
 */
function handler(rootPath, verifyFn, targetArr) {
    if (!Array.isArray(targetArr)) targetArr = [];
    let isFunction = typeof verifyFn === "function";
    function getShortPath(inputPath) {
        return (path.sep + path.relative(__dirname, inputPath)).replace(/\\/gi, "/");
    }
    fs.readdirSync(rootPath).forEach((item) => {
        let branch = {
            name: item,
            path: path.join(rootPath, item).replace(/\\/gi, "/"),
            shortPath: ""
        };
        branch.shortPath = getShortPath(branch.path);
        let stat = fs.statSync(branch.path);
        let isPush = (isFunction && verifyFn(branch)) || !isFunction;
        if (stat.isDirectory()) {
            branch.isDir = true;
            branch.children = handler(branch.path, verifyFn);
            if (Array.isArray(branch.children) && branch.children.length && isPush) {
                targetArr.push(branch);
            }
        } else if (stat.isFile() && path.extname(item)?.toLowerCase() === ".html") {
            if (isPush) {
                branch.isFile = true;
                branch.latestModifyTime = stat.mtime;
                branch.hyperlink = {
                    href: branch.shortPath,
                    title: getHtmlPageTitle(branch.path)
                };
                targetArr.push(branch);
            }
        }
    });
    return targetArr;
}

/**
 * 生成HTML片段
 * @param {Array} treeNodes
 * @param {Number} level
 * @returns
 */
function generateHTMLSnippet(treeNodes, level) {
    if (!(Array.isArray(treeNodes) && treeNodes.length)) return;
    if (![1, 2, 3, 4, 5, 6].includes(level)) level = 1;
    let htmlStr = "";
    let dirNodes = [],
        fileNodes = [];
    [].forEach.call(treeNodes, (item) => {
        if (item.isDir) {
            dirNodes.push(item);
        } else if (item.isFile) {
            fileNodes.push(item);
        }
    });
    if (fileNodes.length) {
        htmlStr += "<ul>";
        fileNodes.forEach((item) => {
            htmlStr += `<li>
                            <a href="${item.hyperlink.href}" target="_blank">${item.hyperlink.title}</a>
                        </li>
                        `;
        });
        htmlStr += "</ul>";
    }
    dirNodes.forEach((item) => {
        if (Array.isArray(item.children) && item.children.length) {
            htmlStr += `<h${level}>${item.name}</h${level}>`;
            htmlStr += generateHTMLSnippet(item.children, level + 1);
        }
    });

    return htmlStr;
}

/**
 * 添加导航到主页
 * @param {Object} obj
 */
function addNavToHomePage(obj) {
    let tplPath = "./index-template.html";
    let homePath = "./index.html";
    let content = getFileContent(tplPath);
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            content = content.replace(key, obj[key]);
        }
    }
    fs.writeFile(homePath, content, (err) => {
        console.error(JSON.stringify(err));
    });
}

/**
 * 获取需要添加到站点地图的节点
 * @param {Array} treeNodes 所有的节点
 * @param {Array} outputArr 需要添加到站点地图的节点
 * @returns
 */
function findSitemapPages(treeNodes, outputArr) {
    if (!(Array.isArray(treeNodes) && treeNodes.length)) return;
    if (!Array.isArray(outputArr)) outputArr = [];

    [].forEach.call(treeNodes, (item) => {
        if (item.isDir) {
            findSitemapPages(item.children, outputArr);
        } else if (item.isFile) {
            outputArr.push(item);
        }
    });
    return outputArr;
}

/**
 * 生成站点地图
 * @param {Array} treeNodes 需要添加到站点地图的节点
 * @param {Object} options 配置项
 * @returns
 */
function generateSitemapXML(treeNodes, options) {
    if (!Array.isArray(treeNodes)) treeNodes = [];

    let siteName = "https://xiaodu114.github.io";
    treeNodes.unshift({
        shortPath: "/",
        priority: "1.0",
        latestModifyTime: new Date()
    });

    let prefix = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    `;
    let suffix = "</urlset>";
    let xmlLines = [prefix];
    [].forEach.call(treeNodes, (item) => {
        xmlLines.push("  <url>");
        xmlLines.push(`    <loc>${siteName + item.shortPath}</loc>`);
        xmlLines.push(`    <lastmod>${item.latestModifyTime.toISOString()}</lastmod>`);
        //  这里的权重，过后需要研究一下
        xmlLines.push(`    <priority>${item.priority ? item.priority : 0.8}</priority>`);
        xmlLines.push("  </url>");
    });
    xmlLines.push(suffix);
    fs.writeFile("sitemap.xml", xmlLines.join("\r\n"), (err) => {
        console.error(JSON.stringify(err));
    });
}

const root_p = path.join(__dirname, "p");
const excludePaths_p = ["/p/_", "/p/0", "/p/web/js/a2bei4", "/p/web/problem/crossDomain/cookie1.html", "/p/web/problem/crossDomain/documentDomain1.html", "/p/web/problem/crossDomain/locationHash0.html", "/p/web/problem/crossDomain/locationHash1.html", "/p/web/problem/crossDomain/postMessage1.html", "/p/web/problem/crossDomain/windowName0.html", "/p/web/problem/crossDomain/windowName1.html", "/p/web/problem/sameOrigin/index-vue.html", "/p/web/vue3/0introduction/code"];
const root_demo = path.join(__dirname, "demo");
const excludePaths_demo = ["/demo/angular1/angularjs-music", "/demo/angular1/angularjs-music-table/tabletr.html", "/demo/angular1/angularjs-music-table/translate3d.html", "/demo/angular1/angularjs-music-table", "/demo/angular1/angularjs-table/tpl", "/demo/js/Drag-and-Drop", "/demo/js/VideojsPlayer/index-unpkg.html", "/demo/js/VideojsPlayer/index-iframe.html", "/demo/vue2", "/demo/webpack"];
//  获取需要添加主页的页面：博客目录
let treeNodes_p = handler(root_p, (branch) => {
    return !excludePaths_p.includes(branch.shortPath);
});
//  获取需要添加主页的页面：代码实例目录
let treeNodes_demo = handler(root_demo, (branch) => {
    return !excludePaths_demo.includes(branch.shortPath);
});

//  将某些页面添加到主页
addNavToHomePage({
    "<!-- xiaodu114-placeholder-p -->": generateHTMLSnippet(treeNodes_p, 3),
    "<!-- xiaodu114-placeholder-demo -->": generateHTMLSnippet(treeNodes_demo, 3)
});

//  自动生成站点地图
let sitemapPages_p = findSitemapPages(treeNodes_p);
let sitemapPages_demo = findSitemapPages(treeNodes_demo);
generateSitemapXML([...sitemapPages_p, ...sitemapPages_demo]);
