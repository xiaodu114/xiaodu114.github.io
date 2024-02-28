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
        return fetch(url).then(
            (response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    console.error(`异常---> 响应状态码：${response.status} ；响应状态信息：${response.statusText}`);
                }
            },
            (error) => {
                console.error(`异常---> ${JSON.stringify(error)}`);
            }
        );
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
        new Function("module", "exports", code)(_module, _module.exports);
        return _module.exports.hasOwnProperty("default") ? _module.exports.default : _module.exports;
    }

    function checkHighlightResponse(url) {
        return new Promise((resolve, reject) => {
            _FetchGetText(url).then(
                (textCode) => {
                    if (textCode) {
                        resolve(textCode);
                    } else {
                        reject();
                    }
                },
                () => {
                    reject();
                }
            );
        });
    }

    function loadHighlight() {
        return Promise.any([checkHighlightResponse("/lib/highlight/highlight.min.js"), checkHighlightResponse("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"), checkHighlightResponse("https://fastly.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"), checkHighlightResponse("https://unpkg.com/@highlightjs/cdn-assets/highlight.min.js"), checkHighlightResponse("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js")]).then((firstData) => {
            if (firstData) {
                window.hljs = _HandleStrCodeCommonjs(firstData);
            }
            return;
        });
    }

    function loadUtilsJS() {
        return new Promise((resolve, reject) => {
            import("/lib/_/utils.js").then((module) => {
                window.pUtils = module;
                resolve();
            }),
                () => {
                    resolve();
                };
        });
    }

    function checkCSSIsLoaded() {
        return new Promise((resolve, reject) => {
            let linkEle = document.getElementById("link-css-typesetting.css");
            if (linkEle) {
                if (linkEle.getAttribute("is-loaded") === "true") {
                    resolve();
                } else {
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
            } else {
                document.addEventListener("DOMContentLoaded", (event) => {
                    resolve();
                });
            }
        });
    }

    //#endregion

    //  图标来自    https://tabler.io/icons
    let svgCopyStr = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path>
                    <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path>
                </svg>`;

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
    ["/lib/highlight/github.css", "/lib/highlight/lang-label.css", "/p/_/css/typesetting.css"].forEach((cssPath) => {
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

    Promise.all([loadHighlight(), loadUtilsJS(), checkCSSIsLoaded(), checkDOMContentLoaded()]).then(() => {
        //  添加    回到顶部和自动生成目录组件
        document.querySelector("body>.blog-page").appendChild(document.createElement("back-to-top"));
        document.querySelector("body>.blog-page").appendChild(document.createElement("auto-generate-directory"));

        //  代码高亮相关
        //let fragment = document.createDocumentFragment();
        const myRange = document.createRange();

        function getHightLightPreEle(lang, code) {
            let preEle = myRange.createContextualFragment(`<pre class="language-${lang}"><code class="language-${lang} hljs">${hljs.highlightAuto(code).value}</code><span class="copy-icon-box" title="复制代码">${svgCopyStr}</span><span class="copied-msg-box">已复制</span></pre>`).firstElementChild;
            preEle.setAttribute("data-code", code);
            return preEle;
        }

        function addCopyIcon(ele) {
            let copyBoxEle = ele.querySelector('pre[class*="language-"] > .copy-icon-box');
            let copiedMsgEle = ele.querySelector('pre[class*="language-"] > .copied-msg-box');
            if (!copyBoxEle) return;
            copyBoxEle.addEventListener("click", (evt) => {
                let strCode = evt.currentTarget.closest('pre[class*="language-"]')?.getAttribute("data-code")?.trim();
                if (strCode && window.pUtils) {
                    pUtils.copyTextToClipboard(strCode).then(() => {
                        copiedMsgEle.style.visibility = "visible";
                        setTimeout(() => {
                            copiedMsgEle.style.visibility = "hidden";
                        }, 3000);
                    });
                }
            });
        }

        document.querySelectorAll("pre[ddz-class='here-need-to-handle-by-highlight']").forEach((block) => {
            let lang = block.getAttribute("ddz-lang").toLowerCase();
            let preEle = getHightLightPreEle(lang, lang === "html" ? block.innerHTML.trim() : block.innerText.trim() || block.textContent.trim());
            block.replaceWith(preEle);
            addCopyIcon(preEle);
        });
        document.querySelectorAll("[ddz-class='here-need-to-handle-by-highlight-and-replace-one']").forEach((block) => {
            let preEle = getHightLightPreEle(block.getAttribute("ddz-lang"), block.innerHTML);
            document.getElementById(block.getAttribute("ddz-replaceid")).replaceWith(preEle);
            addCopyIcon(preEle);
        });
        document.querySelectorAll("[ddz-class='here-need-to-handle-by-highlight-and-request-html']").forEach((block) => {
            fetch(block.getAttribute("data-url"))
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    }
                })
                .then((responseData) => {
                    let preEle = getHightLightPreEle(block.getAttribute("ddz-lang"), responseData.trim());
                    block.replaceWith(preEle);
                    addCopyIcon(preEle);
                });
        });
    });
})();
