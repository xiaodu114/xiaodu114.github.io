customElements.define('marked-block',
    class MarkedBlock extends HTMLElement {
        static get defaultTypeObj() {
            return {
                "default": {
                    explain: "提示",
                    sideColor: "#42b983",
                },
                "info": {
                    explain: "信息",
                    sideColor: "#007bff",
                },
                "warning": {
                    explain: "注意",
                    sideColor: "#f4cd00",
                },
                "error": {
                    explain: "错误",
                    sideColor: "#c00",
                },
            }
        };

        static get observedAttributes() {
            return ["explain", "bg-color", "type", "side-color"];
        };

        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: 'open'
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
            <style>
                .ddz-typesetting-markedblock-container {
                    padding:0 20px 0 20px;
                    margin:0 0 20px;
                    border-left-width: 4px;
                    border-left-style: solid;
                    background-color: #f9f9f9;
                    overflow: hidden;
                }
                .ddz-typesetting-markedblock-container>.ddz-typesetting-markedblock-explain{
                    padding:16px 0;
                    font-weight: 600;
                    color: #222;
                    font-size: 16px;
                    line-height: 1.7;
                }
            </style>
            <div class="ddz-typesetting-markedblock-container">
                <div class="ddz-typesetting-markedblock-explain"></div>
                <div class="ddz-typesetting-markedblock-body">
                    <slot><slot>
                </div>
            </div>
            `;
            //#endregion

            //  这里获取不到传入的属性值
            //  可以获取dom结构
            this.containerDom = this.shadowRoot.querySelector(".ddz-typesetting-markedblock-container");
            this.markedblockExplainDom = this.shadowRoot.querySelector(".ddz-typesetting-markedblock-container>.ddz-typesetting-markedblock-explain");
            this.markedblockBodyDom = this.shadowRoot.querySelector(".ddz-typesetting-markedblock-container>.ddz-typesetting-markedblock-body");
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         */
        connectedCallback() {
            let typeValue = this.getAttribute("type"),
                explainValue = this.getAttribute("explain"),
                bgColorValue = this.getAttribute("bg-color"),
                sideColorValue = this.getAttribute("side-color");
            if (typeValue == null) {
                typeValue = "default";
            }
            if (MarkedBlock.defaultTypeObj.hasOwnProperty(typeValue)) {
                this.markedblockExplainDom.innerHTML = MarkedBlock.defaultTypeObj[typeValue].explain;
                this.containerDom.style["border-left-color"] = MarkedBlock.defaultTypeObj[typeValue].sideColor;
            }
            if (explainValue !== null) {
                this.markedblockExplainDom.innerHTML = explainValue;
            }
            if (sideColorValue != null) {
                this.containerDom.style["border-left-color"] = sideColorValue;
            }
            if (bgColorValue != null) {
                this.containerDom.style["background-color"] = bgColorValue;
            }
            if (!this.markedblockExplainDom.innerHTML.trim()) {
                this.markedblockExplainDom.style.display = "none";
            }
        }

        /**
         *  当自定义元素与文档DOM断开连接时被调用
         */
        disconnectedCallback() {
            console.log("disconnectedCallback");
        }

        /**
         *  当自定义元素被移动到新文档时被调用
         */
        adoptedCallback() {
            console.log("adoptedCallback");
        }

        /**
         * 当自定义元素的一个属性被增加、移除或更改时被调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {}

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        //#endregion
    }
);

customElements.define('inline-code',
    class InlineCode extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: 'open'
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
            <style>
                .ddz-typesetting-icode-container {
                    display: inline;
                    color: #476582;
                    padding: .25rem .5rem;
                    margin: 0 0.33rem;
                    font-size: .85em;
                    background-color: rgba(27, 31, 35, .05);
                    border-radius: 3px;
                    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
                }
            </style>
            <div class="ddz-typesetting-icode-container">
                <slot><slot>
            </div>
            `;
            //#endregion
        }
    }
);

customElements.define('back-to-top',
    class BackToTop extends HTMLElement {

        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: 'open'
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
            <style>
                .ddz-typesetting-backtotop-container{
                    display: none;
                    position: fixed;
                    bottom: 15px;
                    right: 15px;
                    background-color: #3cb878;
                    color: #fff;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 5px 10px;
                }

                .ddz-typesetting-backtotop-container>div{
                    display: inline-block;
                }
            </style>
            <div class="ddz-typesetting-backtotop-container" title="\u8fd4\u56de\u9876\u90e8">
                <div class="ddz-typesetting-backtotop-icon">&uarr;</div>
                <div class="ddz-typesetting-backtotop-text"></div>
            </div>
            `;
            //#endregion

            //  这里获取不到传入的属性值
            //  可以获取dom结构
            this.containerDom = this.shadowRoot.querySelector(".ddz-typesetting-backtotop-container");
            this.backtotopTextDom = this.shadowRoot.querySelector(".ddz-typesetting-backtotop-container>.ddz-typesetting-backtotop-text");
            this.monitorEle = null;
            this.scrollEle = null;
            this.handleMonitorEleScroll = this.handleMonitorEleScroll.bind(this);
            this.goBackToTop = this.goBackToTop.bind(this);
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         */
        connectedCallback() {
            let scrollSelectorValue = this.getAttribute("scroll-selector");
            if (scrollSelectorValue == null) {
                this.scrollEle = document.documentElement;
                if (document.documentElement && typeof document.documentElement.scrollTop === "number") {
                    this.scrollEle = document.documentElement;
                } else if (document.body.parentNode && typeof document.body.parentNode.scrollTop === "number") {
                    this.scrollEle = document.body.parentNode;
                }
                this.monitorEle = window;
            } else {
                try {
                    this.monitorEle = document.querySelector(scrollSelectorValue);
                } catch (error) {
                    throw new Error(JSON.stringify(error));
                }
                if (!this.monitorEle) throw new Error(`根据${scrollSelectorValue}未能找到元素！`);
                // this.monitorEle.style.position = "relative";
                this.containerDom.style.position = "sticky";
                this.containerDom.style.left = "100%";
                this.containerDom.style.marginRight = "15px";
                this.scrollEle = this.monitorEle;
            };
            this.monitorEle.addEventListener("scroll", this.handleMonitorEleScroll);
            this.containerDom.addEventListener("click", this.goBackToTop);
        }

        /**
         *  当自定义元素与文档DOM断开连接时被调用
         */
        disconnectedCallback() {
            this.monitorEle.removeEventListener('scroll', this.handleMonitorEleScroll);
            this.containerDom.removeEventListener('click', this.goBackToTop);
            this.monitorEle = null;
            this.scrollEle = null;
        }

        /**
         *  当自定义元素被移动到新文档时被调用
         */
        adoptedCallback() {
            console.log("adoptedCallback");
        }

        /**
         * 当自定义元素的一个属性被增加、移除或更改时被调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {}

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        goBackToTop() {
            if (!this.scrollEle) return;
            this.scrollEle.scrollTop = 0;
        }

        handleMonitorEleScroll(evt) {
            if (!(typeof this.scrollEle.scrollTop === "number" && typeof this.scrollEle.scrollHeight === "number" && typeof this.scrollEle.clientHeight === "number")) return;
            if (this.scrollEle.scrollTop === 0) {
                this.containerDom.style.display = "none";
            } else {
                this.containerDom.style.display = "inline-block";
                this.backtotopTextDom.innerHTML = ((this.scrollEle.scrollTop / (this.scrollEle.scrollHeight - this.scrollEle.clientHeight)) * 100).toFixed(0) + "%";
            }
        }
        //#endregion
    }
);