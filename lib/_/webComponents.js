customElements.define(
    "github-icon-link",
    class GithubIconLink extends HTMLElement {
        //#region 静态方法

        //  可以看一下：https://www.sitepoint.com/javascript-private-class-fields/
        //  该自定义元素支持的属性
        static get supportAttrObj() {
            return {
                url: {
                    value: "https://github.com/xiaodu114/xiaodu114.github.io",
                    update(eleInstance, attrVal) {
                        eleInstance.shadowRoot.querySelector("a").href = attrVal;
                    }
                },
                width: {
                    value: 56,
                    update(eleInstance, attrVal) {
                        eleInstance.shadowRoot.querySelector("a").style.width = `${attrVal}px`;
                    }
                },
                height: {
                    value: 56,
                    update(eleInstance, attrVal) {
                        eleInstance.shadowRoot.querySelector("a").style.height = `${attrVal}px`;
                    }
                },
                color: {
                    value: "#8800d7",
                    update(eleInstance, attrVal) {
                        const svgEle = eleInstance.shadowRoot.querySelector("svg");
                        svgEle.setAttribute("fill", attrVal);
                        svgEle.setAttribute("stroke", attrVal);
                        svgEle.querySelector("#Dribbble-Light-Preview")?.setAttribute("fill", attrVal);
                    }
                }
            };
        }

        static get observedAttributes() {
            return Object.getOwnPropertyNames(this.supportAttrObj);
        }

        //#endregion

        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open" // open | closed
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
            <style>
                .ddz-a-github-icon-link {
                    height: 56px;
                    width: 56px;
                    display: inline-block;
                    overflow: hidden;
                }
            </style>
            <a class="ddz-a-github-icon-link" href="https://github.com/xiaodu114/xiaodu114.github.io" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#8800d7" stroke="#8800d7">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <desc>Created with Sketch.说明：摘自 https://www.svgrepo.com</desc>
                        <defs></defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#8800d7">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path
                                        d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                        id="github-[#142]"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </a>
            `;
            //#endregion

            //  这里获取不到传入的属性值
            //  可以获取dom结构
            this.aEle = this.shadowRoot.querySelector(".ddz-a-github-icon-link");
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
         */
        connectedCallback() {
            // for (const key in this.constructor.supportAttrObj) {
            //     if (Object.prototype.hasOwnProperty.call(this.constructor.supportAttrObj, key)) {
            //         const obj = this.constructor.supportAttrObj[key];
            //         if (this.hasAttribute(key)) {
            //             obj.update(this, this.getAttribute(key));
            //         } else {
            //             this.setAttribute(key, obj.value);
            //         }
            //     }
            // }
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
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {
            if (this.constructor.supportAttrObj.hasOwnProperty(attrName) && newValue) {
                this.constructor.supportAttrObj[attrName].update(this, newValue);
            }
        }

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        //#endregion
    }
);

customElements.define(
    "mark-block",
    class MarkBlock extends HTMLElement {
        //#region 静态方法

        //  可以看一下：https://www.sitepoint.com/javascript-private-class-fields/
        //  该自定义元素支持的属性
        static get supportAttrObj() {
            return {
                "type": {
                    value: "default",
                    update(eleInstance, attrVal) {}
                },
                "explain": {
                    value: "",
                    update(eleInstance, attrVal) {
                        if (attrVal) {
                            eleInstance.markedblockExplainDom.innerHTML = attrVal;
                        } else {
                            eleInstance.markedblockExplainDom.style.display = "none";
                        }
                    }
                },
                "bg-color": {
                    value: "",
                    update(eleInstance, attrVal) {
                        if (!attrVal) return;
                        eleInstance.containerDom.style["background-color"] = attrVal;
                    }
                },
                "side-color": {
                    value: "",
                    update(eleInstance, attrVal) {
                        if (!attrVal) return;
                        eleInstance.containerDom.style["border-left-color"] = attrVal;
                    }
                }
            };
        }

        //  不同的类型对应的默认值
        static get defaultTypeObj() {
            return {
                default: {
                    "explain": "提示",
                    "bg-color": "#f9f9f9",
                    "side-color": "#42b983"
                },
                info: {
                    "explain": "信息",
                    "bg-color": "#f9f9f9",
                    "side-color": "#007bff"
                },
                warning: {
                    "explain": "注意",
                    "bg-color": "#f9f9f9",
                    "side-color": "#f4cd00"
                },
                error: {
                    "explain": "错误",
                    "bg-color": "#f9f9f9",
                    "side-color": "#c00"
                }
            };
        }

        static get observedAttributes() {
            return Object.getOwnPropertyNames(this.supportAttrObj);
        }

        //#endregion

        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open" // open | closed
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
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
         */
        connectedCallback() {
            let userSet_Type = this.hasAttribute("type") && this.constructor.defaultTypeObj.hasOwnProperty(this.getAttribute("type")) ? this.getAttribute("type") : "default",
                customAttrObj = this.constructor.defaultTypeObj[userSet_Type];
            for (const attr in customAttrObj) {
                if (Object.hasOwnProperty.call(customAttrObj, attr)) {
                    if (!this.hasAttribute(attr)) {
                        this.constructor.supportAttrObj[attr].update(this, customAttrObj[attr]);
                    }
                }
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
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {
            if (this.constructor.supportAttrObj.hasOwnProperty(attrName) && newValue) {
                this.constructor.supportAttrObj[attrName].update(this, newValue);
            }
        }

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        //#endregion
    }
);

customElements.define(
    "line-code",
    class LineCode extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open"
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

customElements.define(
    "back-to-top",
    class BackToTop extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open"
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
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
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
            }
            this.monitorEle.addEventListener("scroll", this.handleMonitorEleScroll);
            this.containerDom.addEventListener("click", this.goBackToTop);
        }

        /**
         *  当自定义元素与文档DOM断开连接时被调用
         */
        disconnectedCallback() {
            this.monitorEle.removeEventListener("scroll", this.handleMonitorEleScroll);
            this.containerDom.removeEventListener("click", this.goBackToTop);
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
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
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

customElements.define(
    "single-slider",
    class SingleSlider extends HTMLElement {
        //#region 静态方法

        static get supportAttrObj() {
            return {
                "slider-color": {
                    domName: "containerDom",
                    names: ["background-color"],
                    value: "rgba(255, 255, 255, .1)"
                },
                "slider-height": {
                    domName: "containerDom",
                    names: ["height"],
                    value: "2px"
                },
                "load-color": {
                    domName: "loadDom",
                    names: ["background-color"],
                    value: "rgba(255, 255, 255, .2)"
                },
                "slid-color": {
                    domName: "slidDom",
                    names: ["background-color"],
                    value: "rgba(255, 255, 255, .7)"
                },
                "dot-size": {
                    domName: "handlerDom",
                    names: ["height", "width"],
                    value: "10px"
                },
                "dot-radius": {
                    domName: "handlerDom",
                    names: ["border-radius"],
                    value: "5px"
                },
                "dot-color": {
                    domName: "handlerDom",
                    names: ["background-color"],
                    value: "darkviolet"
                },
                "slid-value": {
                    domName: "slidDom",
                    names: ["width"],
                    value: "0"
                },
                "load-value": {
                    domName: "loadDom",
                    names: ["width"],
                    value: "0"
                }
            };
        }

        static get observedAttributes() {
            return Object.getOwnPropertyNames(this.supportAttrObj);
        }

        //#endregion

        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open"
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
            <style>
                .single-slider-container {
                    position: relative;
                    width: 100%;
                }

                .single-slider-container .slid-progress {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background: rgba(255, 255, 255, .7);
                }

                .single-slider-container .slider-handler-wrapper {
                    position: absolute;
                    top: 0;
                    width: 0;
                    left: 100%;
                }

                .single-slider-container .slider-handler {
                    position: absolute;
                    cursor: pointer;
                }

                .single-slider-container .load-progress {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background: rgba(255, 255, 255, .2);
                }
            </style>
            <div class="single-slider-container">
                <div class="load-progress">
                </div>
                <div class="slid-progress">
                    <div class="slider-handler-wrapper">
                        <div class="slider-handler"></div>
                    </div>
                </div>
            </div>
            `;
            //#endregion

            //  这里获取不到传入的属性值
            //  可以获取dom结构
            this.containerDom = this.shadowRoot.querySelector(".single-slider-container");
            this.loadDom = this.shadowRoot.querySelector(".single-slider-container .load-progress");
            this.slidDom = this.shadowRoot.querySelector(".single-slider-container .slid-progress");
            this.handlerDom = this.shadowRoot.querySelector(".single-slider-container .slider-handler");
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
         */
        connectedCallback() {
            this.privateInstanceInit();
            this.privateHandleSelfEvent();
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
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {
            if (oldValue !== newValue && newValue) {
                if (["dot-radius", "dot-size", "slider-height"].indexOf(attrName) >= 0) {
                    if (!isNaN(Number(newValue))) {
                        newValue += "px";
                    }
                }
                if (["slid-value", "load-value"].indexOf(attrName) >= 0) {
                    if (!isNaN(Number(newValue))) {
                        newValue += "%";
                    }
                }
                let attrDefaultObj = this.constructor.supportAttrObj[attrName];
                let tempObj = {};
                attrDefaultObj.names.forEach((name) => {
                    tempObj[name] = newValue;
                });
                this.privateSetDomStyleByObj(this[attrDefaultObj.domName], tempObj);
                if (["dot-size", "slider-height"].indexOf(attrName) >= 0) {
                    this.privateCorrectDotStyle();
                }
            }
        }

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）

        privateSetDomStyleByObj(dom, obj) {
            if (
                Object.prototype.toString
                    .call(obj)
                    .replace(/^\[object\s(\w+)\]$/, "$1")
                    .toLowerCase() === "object"
            ) {
                for (const attrName in obj) {
                    if (obj.hasOwnProperty(attrName)) {
                        dom.style[attrName] = obj[attrName];
                    }
                }
            }
        }

        privateCorrectDotStyle() {
            let dotSizeValue = this.handlerDom.clientHeight;
            let sliderHeightValue = this.containerDom.clientHeight;
            this.privateSetDomStyleByObj(this.handlerDom, {
                left: 0 - dotSizeValue / 2 + "px",
                top: sliderHeightValue / 2 - dotSizeValue / 2 + "px"
            });
        }

        privateInstanceInit() {
            for (const attrName in this.constructor.supportAttrObj) {
                if (this.constructor.supportAttrObj.hasOwnProperty(attrName)) {
                    let attrDefaultObj = this.constructor.supportAttrObj[attrName];
                    let tempObj = {};
                    attrDefaultObj.names.forEach((name) => {
                        tempObj[name] = this.getAttribute(attrName) || attrDefaultObj.value;
                    });
                    this.privateSetDomStyleByObj(this[attrDefaultObj.domName], tempObj);
                }
            }
            this.privateCorrectDotStyle();
        }

        privateUpdateSlidStyle(slidValue) {
            this.privateSetDomStyleByObj(this.slidDom, {
                width: `${slidValue}%`
            });
        }

        privateHandleSelfEvent() {
            this.handlerDom.addEventListener("mousedown", (mousedownE) => {
                var tempTrackWidth = this.containerDom.clientWidth;
                mousedownE.stopPropagation();
                mousedownE.preventDefault();
                var isRealDrag = true,
                    oldLeftpercent = parseFloat(this.slidDom.style.width || 0),
                    toLeftMaxMoveX = (tempTrackWidth * oldLeftpercent) / 100,
                    startMovePosX = mousedownE.clientX;
                document.onmousemove = (mousemoveE) => {
                    if (isRealDrag) {
                        var tempMoveX = mousemoveE.clientX - startMovePosX + toLeftMaxMoveX;
                        if (tempMoveX > tempTrackWidth) {
                            tempMoveX = tempTrackWidth;
                        } else if (tempMoveX < 0) {
                            tempMoveX = 0;
                        }
                        this.privateUpdateSlidStyle((tempMoveX * 100) / tempTrackWidth);
                        this.dispatchEvent(new InputEvent("input"));
                    }
                };
                document.onmouseup = (mouseupE) => {
                    isRealDrag = false;
                    document.onmousemove = null;
                    document.onmouseup = null;
                    this.dispatchEvent(
                        new CustomEvent("change", {
                            detail: {
                                value: this.value
                            }
                        })
                    );
                };
            });
        }

        //#endregion

        get value() {
            return {
                slidValue: parseFloat(this.slidDom.style.width || 0),
                loadValue: parseFloat(this.loadDom.style.width || 0)
            };
        }
        set value(newValue) {
            var oldValue = this.value;
            var tempSlidValue = 0,
                tempLoadValue = 0;
            if (
                Object.prototype.toString
                    .call(newValue)
                    .replace(/^\[object\s(\w+)\]$/, "$1")
                    .toLowerCase() === "object"
            ) {
                if (Object.hasOwnProperty.call(newValue, "slidValue") && !isNaN(Number(newValue["slidValue"])) && Number(newValue["slidValue"]) > 0) {
                    tempSlidValue = newValue["slidValue"];
                }
                if (Object.hasOwnProperty.call(newValue, "loadValue") && !isNaN(Number(newValue["loadValue"])) && Number(newValue["loadValue"]) > 0) {
                    tempLoadValue = newValue["loadValue"];
                }
            }
            this.privateUpdateSlidStyle(tempSlidValue);
            this.privateSetDomStyleByObj(this.loadDom, {
                width: `${tempLoadValue}%`
            });
            if (newValue.loadValue !== oldValue.loadValue || newValue.slidValue !== oldValue.slidValue) {
                this.dispatchEvent(
                    new CustomEvent("change", {
                        detail: {
                            value: {
                                slidValue: tempSlidValue,
                                loadValue: tempLoadValue
                            }
                        }
                    })
                );
            }
        }
    }
);

customElements.define(
    "scale-clock",
    class ScaleClock extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open"
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
                    <style>
                        .clock-container {
                            position: relative;
                        }

                        .clock-container>.clock-num-60-dial-container,
                        .clock-container>.clock-num-60-dial-container>.clock-num-60-item-base-container,
                        .clock-container>.clock-scale-dial-container,
                        .clock-container>.clock-scale-dial-container>.clock-scale-item-base-container,
                        .clock-container>.clock-num-12-dial-container,
                        .clock-container>.clock-num-12-dial-container>.clock-num-12-item-base-container {
                            height: 0;
                            width: 0;
                            position: absolute;
                        }

                        .clock-container>.clock-num-60-dial-container>.clock-num-60-item-base-container>.num-60-content {
                            position: absolute;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .clock-container>.clock-scale-dial-container>.clock-scale-item-base-container>.scale-content {
                            background-color: black;
                        }

                        .clock-container>.clock-num-12-dial-container>.clock-num-12-item-base-container>.num-12-content {
                            position: absolute;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .clock-container>.clock-center-axis-container {
                            position: absolute;
                            height: 0;
                            width: 0;
                        }

                        .clock-container>.clock-center-axis-container>.clock-center-point {
                            position: absolute;
                            border-radius: 50%;
                            background-color: rebeccapurple;
                        }

                        .hour-hand,
                        .minute-hand,
                        .second-hand {
                            position: absolute;
                            background-color: black;
                        }

                        .hour-hand {
                            z-index: 1;
                        }

                        .minute-hand {
                            z-index: 2;
                        }

                        .second-hand {
                            z-index: 3;
                        }
                    </style>
                    <div class="clock-container">
                        <div class="clock-center-axis-container">
                            <div class="clock-center-point"></div>
                            <div class="hour-hand"></div>
                            <div class="minute-hand"></div>
                            <div class="second-hand"></div>
                        </div>
                        <div class="clock-num-60-dial-container"></div>
                        <div class="clock-scale-dial-container"></div>
                        <div class="clock-num-12-dial-container"></div>
                    </div>
                    `;
            //#endregion

            //  这里获取不到传入的属性值,可以获取dom结构
            this.clockContainerDom = this.shadowRoot.querySelector(".clock-container");
            this.clockCenterAxisContainerDom = this.shadowRoot.querySelector(".clock-center-axis-container");
            this.clockCenterPointDom = this.shadowRoot.querySelector(".clock-center-point");
            this.hourHandDom = this.shadowRoot.querySelector(".hour-hand");
            this.minuteHandDom = this.shadowRoot.querySelector(".minute-hand");
            this.secondHandDom = this.shadowRoot.querySelector(".second-hand");

            //  一些配置项
            this.defaultClockOptions = {
                radius: 60, // 表盘半径
                centerPoint: {
                    size: 10,
                    style: {}
                },
                hourHand: {
                    width: 3,
                    style: {}
                },
                minuteHand: {
                    width: 2,
                    style: {}
                },
                secondHand: {
                    isShow: true,
                    width: 1,
                    style: {}
                },
                scale: {
                    length: 6,
                    bigWidth: 2,
                    smallWidth: 0.8,
                    bigStyle: {},
                    smallStyle: {},
                    numStyle: {}
                },
                num12: {
                    size: 12,
                    style: {},
                    numStyle: {}
                },
                num60: {
                    isShow: true,
                    size: 12,
                    style: {},
                    numStyle: {}
                }
            };
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
         */
        connectedCallback() {
            //#region   读取属性值
            let attrRadius = Number(this.getAttribute("radius"));
            if (!isNaN(attrRadius) && attrRadius > 0) {
                this.defaultClockOptions.radius = attrRadius;
            }

            let attrHourHandWidth = Number(this.getAttribute("hour-hand-width"));
            if (!isNaN(attrHourHandWidth) && attrHourHandWidth > 0) {
                this.defaultClockOptions.hourHand.width = attrHourHandWidth;
            }

            let attrMinuteHandWidth = Number(this.getAttribute("minute-hand-width"));
            if (!isNaN(attrMinuteHandWidth) && attrMinuteHandWidth > 0) {
                this.defaultClockOptions.minuteHand.width = attrMinuteHandWidth;
            }

            let attrSecondHandhide = this.getAttribute("second-hand-hide") === "true";
            this.defaultClockOptions.secondHand.isShow = !attrSecondHandhide;
            let attrSecondHandWidth = Number(this.getAttribute("second-hand-width"));
            if (!isNaN(attrSecondHandWidth) && attrSecondHandWidth > 0) {
                this.defaultClockOptions.secondHand.width = attrSecondHandWidth;
            }

            let attrScaleLength = Number(this.getAttribute("scale-length"));
            if (!isNaN(attrScaleLength) && attrScaleLength > 0) {
                this.defaultClockOptions.scale.length = attrScaleLength;
            }
            let attrScaleBigWidth = Number(this.getAttribute("scale-big-width"));
            if (!isNaN(attrScaleBigWidth) && attrScaleBigWidth > 0) {
                this.defaultClockOptions.scale.bigWidth = attrScaleBigWidth;
            }
            let attrScaleSmallWidth = Number(this.getAttribute("scale-small-width"));
            if (!isNaN(attrScaleSmallWidth) && attrScaleSmallWidth > 0) {
                this.defaultClockOptions.scale.smallWidth = attrScaleSmallWidth;
            }

            let attrNum12Size = Number(this.getAttribute("num12-size"));
            if (!isNaN(attrNum12Size) && attrNum12Size > 0) {
                this.defaultClockOptions.num12.size = attrNum12Size;
            }

            let attrNum60Show = this.getAttribute("num60-show") === "true";
            this.defaultClockOptions.num60.isShow = attrNum60Show;
            let attrNum60Size = Number(this.getAttribute("num60-size"));
            if (!isNaN(attrNum60Size) && attrNum60Size > 0) {
                this.defaultClockOptions.num60.size = attrNum60Size;
            }
            //#endregion

            //  1、钟表最外层容器
            this.clockContainerDom.style.height = this.clockContainerDom.style.width = this.defaultClockOptions.radius * 2 + "px";

            //  2、钟表中心圆点容器（容器中放置：中心圆片、时针、分针、秒针）
            this.clockCenterAxisContainerDom.style.left = this.clockCenterAxisContainerDom.style.top = this.defaultClockOptions.radius + "px";
            //      2.1、钟表中心圆点容器之 中心圆片
            this.clockCenterPointDom.style.height = this.clockCenterPointDom.style.width = this.defaultClockOptions.centerPoint.size + "px";
            this.clockCenterPointDom.style.left = this.clockCenterPointDom.style.top = 0 - this.defaultClockOptions.centerPoint.size / 2 + "px";
            //      2.2、钟表中心圆点容器之 时针
            let hourHandTailLength = this.defaultClockOptions.radius * 0.1,
                hourHandTransformDistance = this.defaultClockOptions.radius - this.defaultClockOptions.num60.size * this.defaultClockOptions.num60.isShow - this.defaultClockOptions.scale.length - this.defaultClockOptions.num12.size;
            this.hourHandDom.style.width = this.defaultClockOptions.hourHand.width + "px";
            this.hourHandDom.style.height = hourHandTransformDistance + hourHandTailLength + "px";
            this.hourHandDom.style.left = 0 - this.defaultClockOptions.hourHand.width / 2 + "px";
            this.hourHandDom.style.bottom = 0 - hourHandTailLength + "px";
            this.hourHandDom.style.transformOrigin = "center " + hourHandTransformDistance + "px";
            //      2.3、钟表中心圆点容器之 分针
            let minuteHandTailLength = this.defaultClockOptions.radius * 0.15,
                minuteHandTransformDistance = this.defaultClockOptions.radius - this.defaultClockOptions.num60.size * this.defaultClockOptions.num60.isShow - this.defaultClockOptions.scale.length;
            this.minuteHandDom.style.width = this.defaultClockOptions.minuteHand.width + "px";
            this.minuteHandDom.style.height = minuteHandTransformDistance + minuteHandTailLength + "px";
            this.minuteHandDom.style.left = 0 - this.defaultClockOptions.minuteHand.width / 2 + "px";
            this.minuteHandDom.style.bottom = 0 - minuteHandTailLength + "px";
            this.minuteHandDom.style.transformOrigin = "center " + minuteHandTransformDistance + "px";
            //      2.4、钟表中心圆点容器之 秒针
            if (this.defaultClockOptions.secondHand.isShow) {
                let secondHandTailLength = this.defaultClockOptions.radius * 0.2,
                    secondHandTransformDistance = this.defaultClockOptions.radius;
                if (this.defaultClockOptions.num60.isShow) {
                    secondHandTransformDistance -= this.defaultClockOptions.num60.size / 2;
                } else {
                    secondHandTransformDistance -= this.defaultClockOptions.scale.length / 2;
                }
                this.secondHandDom.style.width = this.defaultClockOptions.secondHand.width + "px";
                this.secondHandDom.style.height = secondHandTransformDistance + secondHandTailLength + "px";
                this.secondHandDom.style.left = 0 - this.defaultClockOptions.secondHand.width / 2 + "px";
                this.secondHandDom.style.bottom = 0 - secondHandTailLength + "px";
                this.secondHandDom.style.transformOrigin = "center " + secondHandTransformDistance + "px";
            }

            //  3、钟表边缘???盘
            //      3.1、刻度盘
            let clockScaleDialContainerDom = this.clockContainerDom.querySelector(".clock-scale-dial-container"),
                fragmentForClockScales = document.createDocumentFragment();
            clockScaleDialContainerDom.style.left = clockScaleDialContainerDom.style.top = this.defaultClockOptions.radius + "px";
            //      3.2、12数字盘：1-12
            let clockNum12DialContainerDom = this.clockContainerDom.querySelector(".clock-num-12-dial-container"),
                fragmentForClock12Nums = document.createDocumentFragment();
            clockNum12DialContainerDom.style.left = clockNum12DialContainerDom.style.top = this.defaultClockOptions.radius + "px";
            //      3.3、60数字盘：1-60
            let clockNum60DialContainerDom = this.clockContainerDom.querySelector(".clock-num-60-dial-container"),
                fragmentForClock60Nums = document.createDocumentFragment();
            clockNum60DialContainerDom.style.left = clockNum60DialContainerDom.style.top = this.defaultClockOptions.radius + "px";

            for (let index = 1; index <= 60; index++) {
                let needCalcDeg = ((index - 15) * 6 * Math.PI) / 180;
                //  1、组装分秒数字盘（1-60）
                if (this.defaultClockOptions.num60.isShow) {
                    let numItemContentDomFor60 = document.createElement("div");
                    numItemContentDomFor60.classList.add("num-60-content");
                    numItemContentDomFor60.innerHTML = index;
                    numItemContentDomFor60.style.height = numItemContentDomFor60.style.width = this.defaultClockOptions.num60.size + "px";
                    numItemContentDomFor60.style.top = numItemContentDomFor60.style.left = 0 - this.defaultClockOptions.num60.size / 2 + "px";
                    numItemContentDomFor60.style.fontSize = this.defaultClockOptions.num60.size + "px";
                    let numItemDomFor60 = document.createElement("div");
                    numItemDomFor60.classList.add("clock-num-60-item-base-container");
                    numItemDomFor60.style.top = Math.sin(needCalcDeg) * this.defaultClockOptions.radius + "px";
                    numItemDomFor60.style.left = Math.cos(needCalcDeg) * this.defaultClockOptions.radius + "px";
                    numItemDomFor60.appendChild(numItemContentDomFor60);
                    fragmentForClock60Nums.appendChild(numItemDomFor60);
                }

                //  2、组装刻度盘
                let scaleItemContentDom = document.createElement("div"),
                    scaleItemContentHeight = index % 5 === 0 ? this.defaultClockOptions.scale.bigWidth : this.defaultClockOptions.scale.smallWidth;
                scaleItemContentDom.classList.add("scale-content");
                scaleItemContentDom.style.width = this.defaultClockOptions.scale.length + "px";
                scaleItemContentDom.style.height = scaleItemContentHeight + "px";
                scaleItemContentDom.style.marginTop = 0 - scaleItemContentHeight / 2 + "px";
                let scaleItemDom = document.createElement("div");
                scaleItemDom.classList.add("clock-scale-item-base-container");
                scaleItemDom.classList.add(index % 5 === 0 ? "big-scale" : "small-scale");
                scaleItemDom.style.transform = `rotate(${90 + index * 6}deg)`;
                scaleItemDom.style.top = Math.sin(needCalcDeg) * (this.defaultClockOptions.radius - this.defaultClockOptions.num60.size * this.defaultClockOptions.num60.isShow) + "px";
                scaleItemDom.style.left = Math.cos(needCalcDeg) * (this.defaultClockOptions.radius - this.defaultClockOptions.num60.size * this.defaultClockOptions.num60.isShow) + "px";
                scaleItemDom.appendChild(scaleItemContentDom);
                fragmentForClockScales.appendChild(scaleItemDom);

                //  3、组装小时数字盘（1-12）
                if (index % 5 === 0) {
                    let numItemContentDomFor12 = document.createElement("div");
                    numItemContentDomFor12.classList.add("num-12-content");
                    numItemContentDomFor12.innerHTML = index / 5;
                    numItemContentDomFor12.style.height = numItemContentDomFor12.style.width = this.defaultClockOptions.num12.size + "px";
                    numItemContentDomFor12.style.top = numItemContentDomFor12.style.left = 0 - this.defaultClockOptions.num12.size / 2 + "px";
                    numItemContentDomFor12.style.fontSize = this.defaultClockOptions.num12.size + "px";
                    let numItemDom = document.createElement("div");
                    numItemDom.classList.add("clock-num-12-item-base-container");
                    numItemDom.style.top = Math.sin(needCalcDeg) * (this.defaultClockOptions.radius - (this.defaultClockOptions.num60.isShow ? 1 : 2) * this.defaultClockOptions.scale.length - 2 * this.defaultClockOptions.num60.size * this.defaultClockOptions.num60.isShow) + "px";
                    numItemDom.style.left = Math.cos(needCalcDeg) * (this.defaultClockOptions.radius - (this.defaultClockOptions.num60.isShow ? 1 : 2) * this.defaultClockOptions.scale.length - 2 * this.defaultClockOptions.num60.size * this.defaultClockOptions.num60.isShow) + "px";
                    numItemDom.appendChild(numItemContentDomFor12);
                    fragmentForClock12Nums.appendChild(numItemDom);
                }
            }
            clockNum60DialContainerDom.appendChild(fragmentForClock60Nums);
            clockScaleDialContainerDom.appendChild(fragmentForClockScales);
            clockNum12DialContainerDom.appendChild(fragmentForClock12Nums);
            this._CurrentClockStartUp();
        }

        /**
         *  当自定义元素与文档DOM断开连接时被调用
         */
        disconnectedCallback() {}

        /**
         *  当自定义元素被移动到新文档时被调用
         */
        adoptedCallback() {}

        /**
         * 当自定义元素的一个属性被增加、移除或更改时被调用
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {}

        //#endregion

        //#region  公共方法

        updateClockOption(clockPart, attrName, attrValue) {
            switch (clockPart) {
                case "centerPoint": {
                    switch (attrName) {
                        case "size": {
                            if (!isNaN(Number(attrValue))) {
                                this.clockCenterPointDom.style.height = this.clockCenterPointDom.style.width = Number(attrValue) + "px";
                                this.clockCenterPointDom.style.left = this.clockCenterPointDom.style.top = 0 - Number(attrValue) / 2 + "px";
                            }
                            break;
                        }
                        case "style": {
                            this._UpdateEleStyle(this.clockCenterPointDom, attrValue);
                            break;
                        }
                    }
                    break;
                }
                case "hourHand": {
                    switch (attrName) {
                        case "style": {
                            this._UpdateEleStyle(this.hourHandDom, attrValue);
                            break;
                        }
                    }
                    break;
                }
                case "minuteHand": {
                    switch (attrName) {
                        case "style": {
                            this._UpdateEleStyle(this.minuteHandDom, attrValue);
                            break;
                        }
                    }
                    break;
                }
                case "secondHand": {
                    switch (attrName) {
                        case "style": {
                            this._UpdateEleStyle(this.secondHandDom, attrValue);
                            break;
                        }
                    }
                    break;
                }
                case "scale": {
                    switch (attrName) {
                        case "bigStyle": {
                            this._BatchUpdateEleStyle(".clock-container>.clock-scale-dial-container>.clock-scale-item-base-container.big-scale>.scale-content", attrValue);
                            break;
                        }
                        case "smallStyle": {
                            this._BatchUpdateEleStyle(".clock-container>.clock-scale-dial-container>.clock-scale-item-base-container.small-scale>.scale-content", attrValue);
                            break;
                        }
                        case "numStyle": {
                            this._BatchUpdateEleStyleByCustom(".clock-container>.clock-scale-dial-container>.clock-scale-item-base-container>.scale-content", attrValue);
                            break;
                        }
                    }
                    break;
                }
                case "num12": {
                    switch (attrName) {
                        case "style": {
                            this._BatchUpdateEleStyle(".clock-container>.clock-num-12-dial-container>.clock-num-12-item-base-container>.num-12-content", attrValue);
                            break;
                        }
                        case "numStyle": {
                            this._BatchUpdateEleStyleByCustom(".clock-container>.clock-num-12-dial-container>.clock-num-12-item-base-container>.num-12-content", attrValue);
                            break;
                        }
                    }
                    break;
                }
                case "num60": {
                    switch (attrName) {
                        case "style": {
                            this._BatchUpdateEleStyle(".clock-container>.clock-num-60-dial-container>.clock-num-60-item-base-container>.num-60-content", attrValue);
                            break;
                        }
                        case "numStyle": {
                            this._BatchUpdateEleStyleByCustom(".clock-container>.clock-num-60-dial-container>.clock-num-60-item-base-container>.num-60-content", attrValue);
                            break;
                        }
                    }
                    break;
                }
            }
        }
        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        _GetDataType(obj) {
            return Object.prototype.toString
                .call(obj)
                .replace(/^\[object\s(\w+)\]$/, "$1")
                .toLowerCase();
        }

        _BatchUpdateEleStyleByCustom(selectors, eleAndStyleObj) {
            if (this._GetDataType(eleAndStyleObj) === "object" && Object.getOwnPropertyNames(eleAndStyleObj).length) {
                let targetEles = this.shadowRoot.querySelectorAll(selectors);
                if (targetEles.length === 0) return;
                for (const key in eleAndStyleObj) {
                    if (Object.hasOwnProperty.call(eleAndStyleObj, key)) {
                        const numKey = Number(key);
                        if (Number.isInteger(numKey) && numKey >= 1 && numKey <= targetEles.length) {
                        }
                        this._UpdateEleStyle(targetEles[numKey - 1], eleAndStyleObj[key]);
                    }
                }
            }
        }

        _BatchUpdateEleStyle(selectors, styleObj) {
            let targetEles = this.shadowRoot.querySelectorAll(selectors);
            [].forEach.call(targetEles, (targetEle) => {
                this._UpdateEleStyle(targetEle, styleObj);
            });
        }

        _UpdateEleStyle(targetEle, styleObj) {
            if (this._GetDataType(styleObj) === "object") {
                for (const key in styleObj) {
                    if (Object.hasOwnProperty.call(styleObj, key) && Object.hasOwnProperty.call(targetEle.style, key)) {
                        targetEle.style[key] = styleObj[key];
                    }
                }
            }
        }

        _Update3HandPos(currentDateTime) {
            let currentHour = currentDateTime.getHours(),
                currentMinute = currentDateTime.getMinutes(),
                currentSecond = currentDateTime.getSeconds();
            this.defaultClockOptions.secondHand.isShow && (this.secondHandDom.style.transform = `rotate(${currentSecond * 6}deg)`);
            this.minuteHandDom.style.transform = `rotate(${currentMinute * 6 + 0.1 * currentSecond}deg)`;
            this.hourHandDom.style.transform = `rotate(${currentHour * 30 + (currentMinute * 60 + currentSecond) / 120}deg)`;
        }

        _CurrentClockStartUp() {
            // //  第一版使用 setInterval 实现
            // function updateDateTimeToView() {
            //     _Update3HandPos(new Date());
            // }
            // updateDateTimeToView();
            // setInterval(updateDateTimeToView, 1000);

            // //  第二版使用 requestAnimationFrame 实现
            // let rafId = null;
            // (function updateDateTimeToView() {
            //     cancelAnimationFrame(rafId);
            //     /**
            //      *  测试输出 console.log(currentSecond);
            //      *  1秒内会输出60次，即1秒钟调用updateDateTime方法60次，即60FPS
            //      */
            //     _Update3HandPos(new Date());
            //     rafId = requestAnimationFrame(updateDateTimeToView);
            // })();

            //  第三版使用 requestAnimationFrame 实现，并控制刷新率
            let _this = this,
                rafId = null,
                lastExecTime = Date.now() - 1000;
            (function updateDateTimeToView() {
                cancelAnimationFrame(rafId);
                let currentDateTime = new Date();
                if (currentDateTime.valueOf() - lastExecTime > 999) {
                    lastExecTime = currentDateTime.valueOf();
                    _this._Update3HandPos(currentDateTime);
                }
                rafId = requestAnimationFrame(updateDateTimeToView);
            })();
        }
        //#endregion
    }
);

customElements.define(
    "auto-generate-directory",
    class AutoGenerateDirectory extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open"
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
            <style>
                .ddz-auto-generate-directory-items-container{
                    overflow-x: hidden;
                    overflow-y: auto;
                    background: #fff;
                    padding: 10px 10px 10px 15px;
                    position: fixed;
                    top: 64px;
                    box-sizing: border-box;
                }

                .ddz-auto-generate-directory-items-container >a{
                    color: #2c3e50;
                    position: relative;
                    display:block;
                    cursor: pointer;
                    text-decoration: none;
                    line-height: 1.5;
                    margin: 7px 0;
                }

                .ddz-auto-generate-directory-items-container >a.selected{
                    color:#3cb878;
                }

                .ddz-auto-generate-directory-items-container >a.selected::before{
                    content:'';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background-color: #3cb878;
                }

                .ddz-auto-generate-directory-items-container >a:hover{
                    text-decoration: underline;
                }

                .ddz-auto-generate-show-directory-trigger {
                    position: fixed;
                    right: 15px;
                    bottom: 60px;
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #3cb878;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
                }

                .ddz-auto-generate-show-directory-trigger >i {
                    width: 18px;
                    height: 16px;
                    position: relative;
                    display: block;
                    border-top: 2px solid #fff;
                }

                .ddz-auto-generate-show-directory-trigger >i::before {
                    content: "";
                    position: absolute;
                    top: calc(50% - 2px);
                    width: 100%;
                    height: 2px;
                    background-color: #fff;
                }

                .ddz-auto-generate-show-directory-trigger >i::after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    bottom: 0;
                    background-color: #fff;
                }

                .ddz-auto-generate-show-directory-trigger-cover{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 1050;
                    outline: 0;
                    background-color: rgba(0, 0, 0, 0.3);
                }
            </style>
            <div class="ddz-auto-generate-show-directory-trigger" title="点击打开章节目录">
                <i></i>
            </div>
            <div class="ddz-auto-generate-show-directory-trigger-cover"></div>
            <div class="ddz-auto-generate-directory-show-mode">
            </div>
            `;
            //#endregion

            //  这里获取不到传入的属性值
            //  可以获取dom结构
            this.sourceSelector = "";
            this.sourceHDoms = null;
            this.isTriggerMode = false;
            this.triggerDom = this.shadowRoot.querySelector(".ddz-auto-generate-show-directory-trigger");
            this.triggerCoverDom = this.shadowRoot.querySelector(".ddz-auto-generate-show-directory-trigger-cover");
            this.showModeDom = this.shadowRoot.querySelector(".ddz-auto-generate-directory-show-mode");
            //this.containerDom = this.shadowRoot.querySelector(".ddz-auto-generate-directory-items-container");

            this.init = this.init.bind(this);
            this.listenerScrollEvent = this.listenerScrollEvent.bind(this);
            this.listenerTriggerClickEvent = this.listenerTriggerClickEvent.bind(this);
            this.listenerTriggerCoverClickEvent = this.listenerTriggerCoverClickEvent.bind(this);

            if (["interactive", "complete"].indexOf(document.readyState) >= 0) {
                this.init();
            } else {
                document.addEventListener("DOMContentLoaded", this.init);
            }
            this.triggerDom.addEventListener("click", this.listenerTriggerClickEvent);
            this.triggerCoverDom.addEventListener("click", this.listenerTriggerCoverClickEvent);
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
         */
        connectedCallback() {}

        /**
         *  当自定义元素与文档DOM断开连接时被调用
         */
        disconnectedCallback() {
            this.triggerDom.removeEventListener("click", this.listenerTriggerClickEvent);
            this.triggerCoverDom.removeEventListener("click", this.listenerTriggerCoverClickEvent);
            document.removeEventListener("DOMContentLoaded", this.init);
            window.removeEventListener("scroll", this.listenerScrollEvent);
        }

        /**
         *  当自定义元素被移动到新文档时被调用
         */
        adoptedCallback() {}

        /**
         * 当自定义元素的一个属性被增加、移除或更改时被调用
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {}

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        getDirectorySourceHDoms() {
            if (!this.sourceHDoms || !this.sourceHDoms.length) {
                this.sourceHDoms = document.querySelectorAll(["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => this.sourceSelector + ">" + tag).join(","));
            }
            return this.sourceHDoms;
        }

        listenerScrollEvent() {
            let tempSourceHDoms = this.getDirectorySourceHDoms(),
                priority1Dom = null,
                priority2Dom = null;
            if (!tempSourceHDoms.length) return;
            [].forEach.call(this.containerDom.querySelectorAll(".selected") || [], (itemDom) => {
                itemDom.classList.remove("selected");
            });
            [].forEach.call(tempSourceHDoms, (sourceHDom, index) => {
                let posTop = sourceHDom.getBoundingClientRect().top;
                if (posTop >= 0 && posTop <= 5) {
                    priority1Dom = sourceHDom;
                } else if (posTop < 0) {
                    if (priority2Dom) {
                        if (posTop > priority2Dom.getBoundingClientRect().top) {
                            priority2Dom = sourceHDom;
                        }
                    } else {
                        priority2Dom = sourceHDom;
                    }
                }
            });
            // sourceHDom.classList.remove("selected");
            if (priority1Dom) {
                this.containerDom.querySelector(`[href='#${priority1Dom.id}']`)?.classList.add("selected");
            } else if (priority2Dom) {
                this.containerDom.querySelector(`[href='#${priority2Dom.id}']`)?.classList.add("selected");
            }
        }

        listenerTriggerClickEvent() {
            this.triggerCoverDom.style.display = "flex";
        }

        listenerTriggerCoverClickEvent(event) {
            if (event.target.classList.contains("ddz-auto-generate-show-directory-trigger-cover") || (event.target.tagName === "A" && event.target.parentElement.classList.contains("ddz-auto-generate-directory-items-container"))) {
                this.triggerCoverDom.style.display = "none";
            }
        }

        init() {
            //  1、确定查询目录项的筛选器
            this.sourceSelector = this.getAttribute("generate-source-selector");
            if (this.sourceSelector) {
                if (!document.querySelector(this.sourceSelector)) {
                    this.sourceSelector = "body";
                }
            } else if (document.querySelector(".blog-page")) {
                this.sourceSelector = ".blog-page";
            } else {
                this.sourceSelector = "body";
            }
            let tempSourceDom = document.querySelector(this.sourceSelector);
            if (!tempSourceDom) return;
            //  2、查询所有的目录项并组装
            let containerWidth = 321;
            const containerMarginLR = 30,
                viewingAreaWidth = document.documentElement.clientWidth || document.body.clientWidth,
                viewingAreaHeight = document.documentElement.clientHeight || document.body.clientHeight,
                scrollBarWidth = 18 * ((document.documentElement.scrollHeight || document.body.scrollHeight) > viewingAreaHeight);
            if (viewingAreaWidth - containerWidth - 25 < 100) {
                containerWidth = viewingAreaWidth - 25 - 100;
            }
            let tempSourceHDoms = this.getDirectorySourceHDoms();
            if (!this.sourceHDoms || !this.sourceHDoms.length) return;
            let idPrefix = new Date().valueOf() + "_";
            let tempDirectoryItems = document.createDocumentFragment();
            [].forEach.call(tempSourceHDoms, (sourceHDom, index) => {
                sourceHDom.id = idPrefix + index + sourceHDom.tagName;
                let tempDirectoryA = document.createElement("a"),
                    tempLevelH = parseFloat(sourceHDom.tagName.replace("H", ""));
                tempDirectoryA.href = "#" + sourceHDom.id;
                tempDirectoryA.innerHTML = sourceHDom.innerHTML;
                tempDirectoryA.style.paddingLeft = (tempLevelH - 1) * 20 + "px";
                tempDirectoryItems.appendChild(tempDirectoryA);
            });
            this.containerDom = document.createElement("div");
            this.containerDom.style.width = containerWidth + "px";
            this.containerDom.style.maxHeight = viewingAreaHeight - 156 + "px";
            this.containerDom.classList.add("ddz-auto-generate-directory-items-container");
            this.containerDom.appendChild(tempDirectoryItems);

            let tempSourceDomWidth = tempSourceDom.clientWidth;
            if ((viewingAreaWidth - tempSourceDomWidth - scrollBarWidth) / 2 - containerMarginLR > containerWidth) {
                this.containerDom.style.right = ((viewingAreaWidth - tempSourceDomWidth - scrollBarWidth) / 2 - containerWidth) / 2 + "px";
                this.showModeDom.appendChild(this.containerDom);
                window.removeEventListener("scroll", this.listenerScrollEvent);
                window.addEventListener("scroll", this.listenerScrollEvent);
                this.triggerDom.style.display = "none";
                this.triggerCoverDom.style.display = "none";
                this.showModeDom.style.display = "black";
            } else {
                this.isTriggerMode = true;
                this.showModeDom.style.display = "none";
                this.triggerDom.style.display = "flex";
                this.triggerCoverDom.appendChild(this.containerDom);
                this.triggerCoverDom.style.display = "none";
            }
        }
        //#endregion
    }
);

customElements.define(
    "link-icon",
    class LinkIcon extends HTMLElement {
        constructor() {
            super();

            //#region 组件模板
            //#endregion

            //  这里获取不到传入的属性值
            //  可以获取dom结构
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
         */
        connectedCallback() {
            let customRel = this.getAttribute("rel"),
                customType = this.getAttribute("type"),
                customHref = this.getAttribute("href");
            if (!customRel) {
                customRel = "icon";
            }
            if (!customType) {
                customType = "image/x-icon";
            }
            // //  补全路径（相对路径-》绝对路径）
            // var aEle = document.createElement("a");
            // aEle.href = customHref;
            if (!customHref) {
                customHref = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABlCAMAAAAh4a5qAAAAsVBMVEUAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AADtkuLCAAAAOnRSTlMA/IkF1Mxv0S7bvWZCKhTfwOqYMgn18MawWiUboz03DwvYqHZI+eXDt397VVFOIZONYV2eHbKEahes30e8bAAAA3NJREFUWMPNl+l2okAUhBsBWRVBQcRdFDUucY1a7/9ggzoKqI1O7p+pcxJNGr/TS91bLfu/1VtsDKMYGoYxM9Vm7VeMJTKy5cF0Fvwjo4YX8vZF9V8gp5ZTiOU4LV2JRglHK/Ax+Wq2jZXu4ap6Q2S/VqnouxdKv8EIqs19AbH0gFHULHgA3AYjqfwtACgwmqp90CG9CYAiESLugVGVCKkpgMyIClxgToUUAJ27VF8elD4xigChyRkz5c5Wnn0A0YENZ6joxz/K4T3jC/jmDK2c+NdMen/6C2DCGWpN2RnSfzsTlX+6++sM1i8rvL3KNEyJw5isr69hv/2MsMIUgz+PyuxmACV4rDWtmP6Lb5Dx8PZuUC9nG5n29bCnAw6jfl9CTz9l3K39ZB4MgSmP0bm/3SmpTzX7q+yDA37BjKspz0p3w5alR0NFwJLHUNOmVUp/16U4j20esBjvXNSM4yrdS7uQBy+s7nzG6I2351qu+0/PScDwMwYrSUb8v+fC6AC2+CGDbaTqvvL8tJNULfdcEk3tyTOi6wLxdvP9kZXjFl40j8ToXJ8m2sodxXhq6zZg8hnj7G47SpcZkvrY7PKToZIx8Eo6XlzSy+acnR8MerrR/ki7i9Hrq+w2vwmoiZHaOS24Fc4iHQsuYOYx/GKyaq16n5DczFSsz/LUujcaw+okB6EnBTMEhPwU+17dDGqZWc/fcNbby8d0e32dW4vscSrBPWitXj7D2F8nbD1mw2ly+WRVSAqWp/n4mgJP3tzV1+eV9IHW2/iqi3FlWy+ycrc8bxdgH98xRDmIUyDkjA4BLD64E5jlPq/pl6OkA+YeTEX+4ZoY0HofMLqDQ86VQ+gwkkwBCGmIpg34NIQ4BrQujeEArkpDFAGsaYihAHzTEIEH6CIJ0dXI+ynqgBcwklqAYJK/IuBAQxzo394aAFrEQhsBPu1UOy5Qr5EQqg1oZZo9IyBa0jqGBdglEuKoAV6VhChLgNsmI0YmDaEAwpyOmNERDTpiTUPIZMRRihEbEmLXJ+/F0gJGNEQpihELcrG7QxKiGiM8Wo20vRjRISEWLmDTin0tABGt5YQAtCU5zeQjKZa3ACqkaK/5AHxSjnQrALYiqcokciyrEaiXV9MjF+pmBHi0DPgCYJHMKToAlCaj6ARA75IvSi2RERUWqIQ/LuNxuHW2AiYAAAAASUVORK5CYII=`;
            }
            let linkEle = document.createElement("link");
            linkEle.rel = customRel;
            linkEle.type = customType;
            linkEle.href = customHref;
            document.head.appendChild(linkEle);
            //  只设置一次，将其删除
            this.remove();
        }

        /**
         *  当自定义元素与文档DOM断开连接时被调用
         */
        disconnectedCallback() {}

        /**
         *  当自定义元素被移动到新文档时被调用
         */
        adoptedCallback() {}

        /**
         * 当自定义元素的一个属性被增加、移除或更改时被调用
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {}

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        //#endregion
    }
);

customElements.define(
    "mate-set",
    class MateAuthor extends HTMLElement {
        constructor() {
            super();

            //#region 组件模板
            //#endregion

            //  这里获取不到传入的属性值
            //  可以获取dom结构
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
         */
        connectedCallback() {
            let list = [
                { name: "author", content: "xiaodu114" },
                { name: "email", content: "mine_job@126.com" }
            ];
            const fragment = new DocumentFragment();
            list.forEach((item) => {
                let ele = document.createElement("meta");
                ele.name = item.name;
                ele.content = item.content;
                fragment.appendChild(ele);
            });
            document.head.appendChild(fragment);
            //  只设置一次，将其删除
            this.remove();
        }

        /**
         *  当自定义元素与文档DOM断开连接时被调用
         */
        disconnectedCallback() {}

        /**
         *  当自定义元素被移动到新文档时被调用
         */
        adoptedCallback() {}

        /**
         * 当自定义元素的一个属性被增加、移除或更改时被调用
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {}

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        //#endregion
    }
);

customElements.define(
    "my-dialog",
    class MyDialog extends HTMLElement {
        //#region 静态方法

        //  该自定义元素支持的属性
        static get supportAttrObj() {
            return {
                title: {
                    value: "标题",
                    update(eleInstance, attrVal) {
                        if (!attrVal) attrVal = this.value;
                        eleInstance.myDialogTitleDom.innerHTML = attrVal;
                    }
                },
                width: {
                    value: "33rem",
                    update(eleInstance, attrVal) {
                        if (!attrVal) attrVal = this.value;
                        eleInstance.myDialogContentDom.style.width = attrVal;
                    }
                }
            };
        }

        static get observedAttributes() {
            return Object.getOwnPropertyNames(this.supportAttrObj);
        }

        //#endregion

        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open" // open | closed
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
            <style>
                .ddz-my-dialog-mask-layer {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    outline: 0;
                    display: flex;
                    background-color: rgba(0, 0, 0, 0.3);
                    z-index: 1050;
                    visibility: hidden;
                }
                .ddz-my-dialog-mask-layer>.my-dialog-content{
                    display: flex;
                    flex-direction: column;
                    margin: auto;
                    min-width: 360px;
                    background-color: #fff;
                    border-radius: 3px;
                    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
                }
                .ddz-my-dialog-mask-layer>.my-dialog-content .my-dialog-content-header{
                    position: relative;
                    height: 54px;
                    flex-shrink: 0;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                }
                .ddz-my-dialog-mask-layer>.my-dialog-content .my-dialog-content-header>.my-dialog-default-title{
                    color: #4c5161;
                    font-size: 18px;
                }
                .ddz-my-dialog-mask-layer>.my-dialog-content .my-dialog-content-header>.my-dialog-default-close{
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    cursor: pointer;
                    color: #8c8c8c;
                    font-size: 32px;
                    line-height: 1;
                    outline: 0;
                    border: 0;
                    background-color: transparent;
                    padding: 0;
                }
                .ddz-my-dialog-mask-layer>.my-dialog-content .my-dialog-content-header>.my-dialog-default-close:hover{
                    color: #404040;
                }
                .ddz-my-dialog-mask-layer>.my-dialog-content .my-dialog-content-body{
                    flex: 1;
                }
            </style>
            <div class="ddz-my-dialog-mask-layer">
                <div class="my-dialog-content">
                    <slot name="header">
                        <div class="my-dialog-content-header">
                            <span class="my-dialog-default-title">标题</span>
                            <button type="button" class="my-dialog-default-close" title="关闭">&times;</button>
                        </div>
                    </slot>
                    <slot name="body">
                        <div class="my-dialog-content-body">
                            内容
                        </div>
                    </slot>
                    <slot name="footer"></slot>
                </div>
            </div>
            `;
            //#endregion

            this.closed = this.closed.bind(this);
            //  这里获取不到传入的属性值
            //  可以获取dom结构
            this.maskLayerDom = this.shadowRoot.querySelector(".ddz-my-dialog-mask-layer");
            this.myDialogContentDom = this.shadowRoot.querySelector(".ddz-my-dialog-mask-layer>.my-dialog-content");
            this.myDialogTitleDom = this.shadowRoot.querySelector(".ddz-my-dialog-mask-layer>.my-dialog-content .my-dialog-content-header>.my-dialog-default-title");
            this.myDialogCloseDom = this.shadowRoot.querySelector(".ddz-my-dialog-mask-layer>.my-dialog-content .my-dialog-content-header>.my-dialog-default-close");
            this.myDialogCloseDom.addEventListener("click", this.closed);
        }

        //#region  生命周期回调

        /**
         *  当自定义元素第一次被连接到文档DOM时被调用（没有参数）
         *  如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         *      connectedCallback中只是对开始没有设置值的属性设置默认值，如果已设置则跳过
         */
        connectedCallback() {
            for (const attr in this.constructor.supportAttrObj) {
                if (Object.hasOwnProperty.call(this.constructor.supportAttrObj, attr)) {
                    if (!this.hasAttribute(attr)) {
                        this.constructor.supportAttrObj[attr].update(this, this.getAttribute(attr));
                    }
                }
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
         * 如果监听的属性开始就设置了值,则 attributeChangedCallback 早于 connectedCallback 调用
         */
        attributeChangedCallback(attrName, oldValue, newValue) {
            if (this.constructor.supportAttrObj.hasOwnProperty(attrName) && newValue) {
                this.constructor.supportAttrObj[attrName].update(this, newValue);
            }
        }

        //#endregion

        //#region   公共方法

        open() {
            this.maskLayerDom.style.visibility = "visible";
        }

        closed() {
            this.maskLayerDom.style.visibility = "hidden";
        }

        //#endregion

        //#region   私有方法（想弄成私有，但是不知道怎么弄,你当做不能访问就行了）
        //#endregion
    }
);
