customElements.define('single-slider',
    class SingleSlider extends HTMLElement {
        //可以看一下：
        //  https://www.sitepoint.com/javascript-private-class-fields/
        static get selfDefaultAttrObj() {
            return {
                "slider-color": {
                    domName: "containerDom",
                    names: ["background-color"],
                    value: "rgba(0, 0, 0, .1)"
                },
                "slider-height": {
                    domName: "containerDom",
                    names: ["height"],
                    value: "10px"
                },
                "load-color": {
                    domName: "loadDom",
                    names: ["background-color"],
                    value: "rgba(0, 0, 0, .2)"
                },
                "slid-color": {
                    domName: "slidDom",
                    names: ["background-color"],
                    value: "rgba(0, 0, 0, .4)"
                },
                "dot-size": {
                    domName: "handlerDom",
                    names: ["height", "width"],
                    value: "20px"
                },
                "dot-radius": {
                    domName: "handlerDom",
                    names: ["border-radius"],
                    value: "15px"
                },
                "dot-color": {
                    domName: "handlerDom",
                    names: ["background-color"],
                    value: "darkviolet"
                }
            }
        };

        static get observedAttributes() {
            return Object.getOwnPropertyNames(this.selfDefaultAttrObj);
        };

        constructor() {
            super();
            let template = document.getElementById('WebComponents-SingleSlider-templete');
            let templateContent = template.content;
            const shadowRoot = this.attachShadow({
                    mode: 'open'
                })
                .appendChild(templateContent.cloneNode(true));
            //  这里获取不到传入的属性值
            //  可以获取dom结构
            this.containerDom = this.shadowRoot.querySelector(".single-slider-container");
            this.loadDom = this.shadowRoot.querySelector(".single-slider-container>.load-progress");
            this.slidDom = this.shadowRoot.querySelector(".single-slider-container>.slid-progress");
            this.handlerDom = this.shadowRoot.querySelector(".single-slider-container>.slider-handler-wrapper>.slider-handler");
            this.handlerWrapperDom = this.shadowRoot.querySelector(".single-slider-container>.slider-handler-wrapper");
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
                switch (attrName) {
                    case "slider-color":
                    case "load-color":
                    case "slid-color":
                    case "dot-radius":
                    case "dot-color": {
                        let attrDefaultObj = SingleSlider.selfDefaultAttrObj[attrName];
                        let tempObj = {};
                        attrDefaultObj.names.forEach(name => {
                            tempObj[name] = newValue;
                        });
                        this.privateSetDomStyleByObj(this[attrDefaultObj.domName], tempObj);
                        break;
                    }
                    case "dot-size":
                    case "slider-height": {
                        let attrDefaultObj = SingleSlider.selfDefaultAttrObj[attrName];
                        let tempObj = {};
                        attrDefaultObj.names.forEach(name => {
                            tempObj[name] = newValue;
                        });
                        this.privateSetDomStyleByObj(this[attrDefaultObj.domName], tempObj);
                        this.privateCorrectDotStyle();
                        break;
                    }
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

        privateUpdateSliderStyle(slidValue, loadValue) {
            this.handlerWrapperDom.style.left = `${slidValue}%`;
            this.slidDom.style.width = `${slidValue}%`;
            this.loadDom.style.width = `${loadValue}%`;
        }

        privateHandleSelfEvent() {
            var tempTrackWidth = this.containerDom.clientWidth;
            this.handlerDom.addEventListener("mousedown", (mousedownE) => {
                mousedownE.stopPropagation();
                mousedownE.preventDefault();
                var isRealDrag = true,
                    oldLeftpercent = parseFloat(this.handlerWrapperDom.style.left || 0),
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
                        this.privateUpdateSliderStyle(tempMoveX * 100 / tempTrackWidth, this.value.loadValue);
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
                slidValue: parseFloat(this.handlerWrapperDom.style.left || 0),
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
            this.privateUpdateSliderStyle(tempSlidValue, tempLoadValue);
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