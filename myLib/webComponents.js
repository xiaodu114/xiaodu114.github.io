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

customElements.define('single-slider',
    class SingleSlider extends HTMLElement {
        //  可以看一下：
        //  https://www.sitepoint.com/javascript-private-class-fields/
        static get selfDefaultAttrObj() {
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
            }
        };

        static get observedAttributes() {
            return Object.getOwnPropertyNames(this.selfDefaultAttrObj);
        };

        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: 'open'
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
                let attrDefaultObj = SingleSlider.selfDefaultAttrObj[attrName];
                let tempObj = {};
                attrDefaultObj.names.forEach(name => {
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
            if (Object.prototype.toString.call(obj).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase() === "object") {
                for (const attrName in obj) {
                    if (obj.hasOwnProperty(attrName)) {
                        dom.style[attrName] = obj[attrName];
                    }
                }
            }
        };

        privateCorrectDotStyle() {
            let dotSizeValue = this.handlerDom.clientHeight;
            let sliderHeightValue = this.containerDom.clientHeight;
            this.privateSetDomStyleByObj(this.handlerDom, {
                "left": (0 - dotSizeValue / 2) + "px",
                "top": (sliderHeightValue / 2 - dotSizeValue / 2) + "px"
            });
        }

        privateInstanceInit() {
            for (const attrName in SingleSlider.selfDefaultAttrObj) {
                if (SingleSlider.selfDefaultAttrObj.hasOwnProperty(attrName)) {
                    let attrDefaultObj = SingleSlider.selfDefaultAttrObj[attrName];
                    let tempObj = {};
                    attrDefaultObj.names.forEach(name => {
                        tempObj[name] = this.getAttribute(attrName) || attrDefaultObj.value;
                    });
                    this.privateSetDomStyleByObj(this[attrDefaultObj.domName], tempObj);
                }
            }
            this.privateCorrectDotStyle();
        }

        privateUpdateSlidStyle(slidValue) {
            this.privateSetDomStyleByObj(this.slidDom, {
                "width": `${slidValue}%`
            });
        }

        privateHandleSelfEvent() {
            var tempTrackWidth = this.containerDom.clientWidth;
            this.handlerDom.addEventListener("mousedown", (mousedownE) => {
                mousedownE.stopPropagation();
                mousedownE.preventDefault();
                var isRealDrag = true,
                    oldLeftpercent = parseFloat(this.slidDom.style.width || 0),
                    toLeftMaxMoveX = tempTrackWidth * oldLeftpercent / 100,
                    startMovePosX = mousedownE.clientX;
                document.onmousemove = (mousemoveE) => {
                    if (isRealDrag) {
                        var tempMoveX = mousemoveE.clientX - startMovePosX + toLeftMaxMoveX;
                        if (tempMoveX > tempTrackWidth) {
                            tempMoveX = tempTrackWidth;
                        } else if (tempMoveX < 0) {
                            tempMoveX = 0;
                        }
                        this.privateUpdateSlidStyle(tempMoveX * 100 / tempTrackWidth);
                        this.dispatchEvent(new InputEvent('input'));
                    }
                };
                document.onmouseup = (mouseupE) => {
                    isRealDrag = false;
                    document.onmousemove = null;
                    document.onmouseup = null;
                    this.dispatchEvent(new CustomEvent('change', {
                        detail: {
                            value: this.value
                        }
                    }));
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
            if (Object.prototype.toString.call(newValue).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase() === "object") {
                if (Object.hasOwnProperty.call(newValue, "slidValue") && !isNaN(Number(newValue["slidValue"])) && Number(newValue["slidValue"]) > 0) {
                    tempSlidValue = newValue["slidValue"];
                }
                if (Object.hasOwnProperty.call(newValue, "loadValue") && !isNaN(Number(newValue["loadValue"])) && Number(newValue["loadValue"]) > 0) {
                    tempLoadValue = newValue["loadValue"];
                }
            }
            this.privateUpdateSlidStyle(tempSlidValue);
            this.privateSetDomStyleByObj(this.loadDom, {
                "width": `${tempLoadValue}%`
            });
            if (newValue.loadValue !== oldValue.loadValue || newValue.slidValue !== oldValue.slidValue) {
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        value: {
                            slidValue: tempSlidValue,
                            loadValue: tempLoadValue
                        }
                    }
                }));
            }
        }
    }
);