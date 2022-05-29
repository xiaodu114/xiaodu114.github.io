(() => {

    //#region 方法区

    /**
     * 同步请求一个文件
     * @param {*} url       请求地址
     * @param {*} callback　成功回调
     */
    function _SyncLoadJS(url, callback) {
        //  https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
        //  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.error(`HTTP 响应代码：${xhr.status}。${url}加载失败！`);
            }
        };
        xhr.send(null);
    }

    /**
     * 使用 fetch 请求（Get 方式）一个文本
     * @param {String} url 
     * @returns 
     */
    function _FetchGetText(url) {
        return fetch(url).then(response => {
            if (response.ok) {
                return response.text();
            } else {
                console.error(`异常---> 响应状态码：${response.status} ；响应状态信息：${response.statusText}`);
            }
        }, error => { console.error(`异常---> ${JSON.stringify(error)}`); })
    }

    /**
     * 解析 CommonJS 规范的字符串形式的代码
     * @param {String} code 
     * @returns 
     */
    function _HandleStrCodeCommonjs(code) {
        let _module = {
            exports: {}
        };
        (new Function("module", "exports", code))(_module, _module.exports);
        return _module.exports.hasOwnProperty("default") ? _module.exports.default : _module.exports;
    }

    function checkHighlightResponse(url) {
        return new Promise((resolve, reject) => {
            _FetchGetText(url).then((textCode) => {
                if (textCode) {
                    resolve(textCode);
                }
                else {
                    reject();
                }
            }, () => {
                reject();
            });
        });
    }

    function loadHighlight() {
        return Promise.any([
            checkHighlightResponse("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"),
            checkHighlightResponse("https://fastly.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"),
            checkHighlightResponse("https://unpkg.com/@highlightjs/cdn-assets/highlight.min.js"),
            checkHighlightResponse("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js")
        ]).then(firstData => {
            if (firstData) {
                window.hljs = _HandleStrCodeCommonjs(firstData);
            }
            return;
        });
    }

    function checkCSSIsLoaded() {
        return new Promise((resolve, reject) => {
            let linkEle = document.getElementById("link-css-typesetting.css");
            if (linkEle) {
                if (linkEle.getAttribute("is-loaded") === "true") {
                    resolve();
                }
                else {
                    if (linkEle.readyState) {
                        linkEle.onreadystatechange = () => {
                            if (["loaded", "complete"].indexOf(linkEle.readyState) >= 0) {
                                linkEle.onreadystatechange = null;
                                resolve();
                            }
                        };
                    } else {
                        linkEle.onload = () => {
                            linkEle.onload = null;
                            resolve();
                        };
                    }
                }
            } else {
                setTimeout(resolve);
            }
        });
    }

    function checkDOMContentLoaded() {
        return new Promise((resolve, reject) => {
            if (["interactive", "complete"].indexOf(document.readyState) >= 0) {
                resolve();
            }
            else {
                document.addEventListener("DOMContentLoaded", (event) => {
                    resolve();
                });
            }
        });
    }

    //#endregion

    let headEle = document.getElementsByTagName("head")[0];

    /**
     * 1、在加载完样式之前， 将页面设置成透明
     */
    let tempStyleEle = document.createElement("style");
    tempStyleEle.innerHTML = `
                .blog-page {
                    opacity: 0.01;
                }
            `;
    headEle.appendChild(tempStyleEle);

    /**
     *  2、添加依赖的css
     *      //https://cdn.jsdelivr.net/npm/normalize.css/normalize.min.css
     */
    [
        "/lib/highlight/github.css",
        "/lib/highlight/lang-label.css",
        "/p/_/css/typesetting.css"
    ].forEach((cssPath) => {
        let linkElement = document.createElement("link");
        linkElement.id = "link-css-" + cssPath.slice(cssPath.lastIndexOf("/") + 1);
        linkElement.rel = "stylesheet";
        linkElement.href = cssPath;
        linkElement.addEventListener("load", () => {
            linkElement.setAttribute("is-loaded", "true");
        });
        headEle.appendChild(linkElement);
    });

    /**
     *  3、加载依赖的js
     */
    if (!customElements.get("mark-block")) {
        _SyncLoadJS("/lib/_/webComponents.js", (responseText) => {
            let _fn = new Function(responseText);
            _fn();
        });
    }

    //  添加 icon
    document.documentElement.appendChild(document.createElement("link-icon"));

    Promise.all([loadHighlight(), checkCSSIsLoaded(), checkDOMContentLoaded()]).then(() => {
        //  添加    回到顶部和自动生成目录组件
        document.querySelector("body>.blog-page").appendChild(document.createElement("back-to-top"));
        document.querySelector("body>.blog-page").appendChild(document.createElement("auto-generate-directory"));

        //  代码高亮相关
        //let fragment = document.createDocumentFragment();
        const myRange = document.createRange();
        document.querySelectorAll("pre[ddz-class='here-need-to-handle-by-highlight']").forEach((block) => {
            let lang = block.getAttribute("ddz-lang").toLowerCase();
            block.replaceWith(myRange.createContextualFragment(
                `<pre class="language-${block.getAttribute("ddz-lang")}"><code class="language-${lang} hljs">${hljs.highlightAuto(lang === "html" ? block.innerHTML.trim() : (block.innerText.trim() || block.textContent.trim())).value}</code></pre>`
            ));
        });
        document.querySelectorAll("[ddz-class='here-need-to-handle-by-highlight-and-replace-one']").forEach(
            (block) => {
                document.getElementById(block.getAttribute("ddz-replaceid")).replaceWith(myRange
                    .createContextualFragment(
                        `<pre class="language-${block.getAttribute("ddz-lang")}"><code class="language-${block.getAttribute("ddz-lang")} hljs">${hljs.highlightAuto(block.innerHTML).value}</code></pre>`
                    ));
            });
        document.querySelectorAll("[ddz-class='here-need-to-handle-by-highlight-and-request-html']")
            .forEach((block) => {
                fetch(block.getAttribute("data-url")).then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                }).then(responseData => {
                    block.replaceWith(myRange.createContextualFragment(
                        `<pre class="language-${block.getAttribute("ddz-lang")}"><code class="language-${block.getAttribute("ddz-lang")} hljs">${hljs.highlightAuto(responseData.trim()).value}</code></pre>`
                    ));
                });
            });
    });
})();
