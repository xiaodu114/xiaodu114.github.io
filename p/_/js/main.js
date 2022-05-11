(() => {
    let headEle = document.getElementsByTagName("head")[0];

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
     *      // https://unpkg.com/
     *      // https://www.jsdelivr.com/
     *      // https://cdnjs.com/
     */
    [
        "https://cdn.jsdelivr.net/npm/normalize.css/normalize.min.css",
        "/lib/highlight/github.css",
        "/lib/highlight/lang-label.css",
        "/p/_/css/typesetting.css"
    ].forEach((cssPath) => {
        let linkElement = document.createElement("link");
        linkElement.id = "link-css-" + cssPath.slice(cssPath.lastIndexOf("/") + 1);
        linkElement.rel = "stylesheet";
        linkElement.href = cssPath;
        headEle.appendChild(linkElement);
    });

    /**
     *  3、加载依赖的js
     */
    if (!customElements.get("marked-block")) {
        _SyncLoadJS("/lib/_/webComponents.js", (responseText) => {
            let _fn = new Function(responseText);
            _fn();
        });
    }

    if (!window.hljs) {
        /**
         *  highlight.js
         *  官网：https://highlightjs.org/
         *  使用：https://highlightjs.org/usage/
         *      CDN1：https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js
         *      CDN2：https://unpkg.com/@highlightjs/cdn-assets/highlight.min.js
         *  示例：https://highlightjs.org/static/demo/
         */
        _SyncLoadJS("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js", (responseText) => {
            let _fn = new Function("module", "exports", responseText),
                _module = {
                    exports: {}
                };
            _fn(_module, _module.exports);
            window.hljs = _module.exports;
        });
    }

    //  添加 icon
    document.documentElement.appendChild(document.createElement("link-icon"));

    function checkCSSIsLoaded() {
        return new Promise((resolve, reject) => {
            let linkEle = document.getElementById("link-css-typesetting.css");
            if (linkEle) {
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
            } else {
                setTimeout(resolve);
            }
        });
    }

    function checkDOMContentLoaded() {
        return new Promise((resolve, reject) => {
            document.addEventListener("DOMContentLoaded", (event) => {
                resolve();
            });
        });
    }

    Promise.all([checkCSSIsLoaded(), checkDOMContentLoaded()]).then(() => {
        //  添加    回到顶部和自动生成目录组件
        document.querySelector("body>.blog-page").appendChild(document.createElement("back-to-top"));
        document.querySelector("body>.blog-page").appendChild(document.createElement("auto-generate-directory"));

        //  代码高亮相关
        //let fragment = document.createDocumentFragment();
        const myRange = document.createRange();
        document.querySelectorAll("pre[ddz-class='here-need-to-handle-by-highlight']").forEach((block) => {
            let lang = block.getAttribute("ddz-lang").toLowerCase();
            block.replaceWith(myRange.createContextualFragment(
                `<pre class="language-${block.getAttribute("ddz-lang")}"><code class="language-${lang} hljs">${hljs.highlightAuto(lang === "html" ? block.innerHTML.trim() : (block.innerText.trim() || block.textContent.trim()).value}</code></pre>`
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
