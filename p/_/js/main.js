customElements.define('p-dependence',
    class LoadPDependence extends HTMLElement {

        constructor() {
            super();

            this.attachShadow({
                mode: 'open' // open | closed
            });

            this._ErrorMgs = [];

            let headEle = document.getElementsByTagName("head")[0];
            let tempStyleEle = document.createElement("style");
            tempStyleEle.innerHTML = `
                .blog-page {
                    opacity: 0.01;
                }
            `;
            headEle.appendChild(tempStyleEle);

            /**
             *  1、博客依赖的css
             */
            [
                "/lib/normalize/normalize.css",
                "/lib/highlight/github.css",
                "/lib/highlight/lang-label.css",
                "/p/_/css/typesetting.css"
            ].forEach((cssPath) => {
                let linkElement = document.createElement("link");
                linkElement.rel = "stylesheet";
                linkElement.href = cssPath;
                headEle.appendChild(linkElement);
            });

            if (!customElements.get("marked-block")) {
                this._SyncLoadJS("/lib/_/webComponents.js", (xhr) => {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        let _fn = new Function(xhr.responseText);
                        _fn();
                    } else {
                        this._ErrorMgs.push(`HTTP 响应代码：${xhr.status}。webComponents.js加载失败！`);
                    }
                });
            }

            /**
             *  2、博客依赖的js
             *      2.1、highlight.js
             *          官网：https://highlightjs.org/
             *          使用：https://highlightjs.org/usage/
             *              CDN1：https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js
             *              CDN2：https://unpkg.com/@highlightjs/cdn-assets/highlight.min.js
             *          示例：https://highlightjs.org/static/demo/
             */
            if (!window.hljs) {
                //  https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
                //  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
                this._SyncLoadJS("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js", (xhr) => {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        let _fn = new Function("module", "exports", xhr.responseText),
                            _module = {
                                exports: {}
                            };
                        _fn(_module, _module.exports);
                        window.hljs = _module.exports;
                    } else {
                        this._ErrorMgs.push(`HTTP 响应代码：${xhr.status}。highlight.js加载失败！`);
                    }
                });
            }
        }

        _SyncLoadJS(url, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.onreadystatechange = () => {
                callback(xhr);
            };
            xhr.send(null);
        }

        connectedCallback() {
            //let fragment = document.createDocumentFragment();
            let range = document.createRange();
            if (Array.isArray(this._ErrorMgs) && this._ErrorMgs.length) {
                this._ErrorMgs.forEach((msg) => {
                    this.shadowRoot.appendChild(range.createContextualFragment(`<p>${msg}</p>`));
                });
            }
        }
    }
);
document.documentElement.appendChild(document.createElement("p-dependence"));
document.documentElement.appendChild(document.createElement("link-icon"));

document.addEventListener('DOMContentLoaded', (event) => {

    document.querySelector("body>.blog-page").appendChild(document.createElement("back-to-top"));
    document.querySelector("body>.blog-page").appendChild(document.createElement("auto-generate-directory"));

    const myRange = document.createRange();
    document.querySelectorAll("pre[ddz-class='here-need-to-handle-by-highlight']").forEach((block) => {
        let lang = block.getAttribute("ddz-lang").toLowerCase();
        block.replaceWith(myRange.createContextualFragment(
            `<pre class="language-${block.getAttribute("ddz-lang")}"><code class="language-${lang} hljs">${hljs.highlightAuto(lang==="html"?block.innerHTML.trim():block.innerText.trim()).value}</code></pre>`
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