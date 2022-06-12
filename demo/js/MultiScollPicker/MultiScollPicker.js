let MultiScollPicker = (() => {
    function _GetDataType(obj) {
        return Object.prototype.toString
            .call(obj)
            .replace(/^\[object\s(\w+)\]$/, "$1")
            .toLowerCase();
    }

    function _NormalizeWheel(event) {
        //*********************************暂时不知道如果使用者三个参数*********************************
        var PIXEL_STEP = 32;
        var LINE_HEIGHT = 32;
        var PAGE_HEIGHT = 800;

        var sX = 0,
            sY = 0, // spinX, spinY
            pX = 0,
            pY = 0; // pixelX, pixelY
        // Legacy
        if ('detail' in event) {
            sY = event.detail;
        }
        if ('wheelDelta' in event) {
            sY = -event.wheelDelta / 120;
        }
        if ('wheelDeltaY' in event) {
            sY = -event.wheelDeltaY / 120;
        }
        if ('wheelDeltaX' in event) {
            sX = -event.wheelDeltaX / 120;
        }
        // side scrolling on FF with DOMMouseScroll
        if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
            sX = sY;
            sY = 0;
        }
        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;
        if ('deltaY' in event) {
            pY = event.deltaY;
        }
        if ('deltaX' in event) {
            pX = event.deltaX;
        }
        if ((pX || pY) && event.deltaMode) {
            if (event.deltaMode == 1) { // delta in LINE units
                pX *= LINE_HEIGHT;
                pY *= LINE_HEIGHT;
            } else { // delta in PAGE units
                pX *= PAGE_HEIGHT;
                pY *= PAGE_HEIGHT;
            }
        }
        // Fall-back if spin cannot be determined
        if (pX && !sX) {
            sX = (pX < 1) ? -1 : 1;
        }
        if (pY && !sY) {
            sY = (pY < 1) ? -1 : 1;
        }
        return {
            spinX: sX,
            spinY: sY,
            pixelX: pX,
            pixelY: pY
        };
    }

    function _DomElementScrollTo(ele, newScrollTop) {
        if (!ele.scrollTo) {
            ele.scrollTop = newScrollTop;
        } else {
            ele.scrollTo(0, newScrollTop);
        }
    };
    let methodKey_AssembleWholeStructure = Symbol("AssembleWholeStructure");
    let methodKey_UpdateWholeStructureStyle = Symbol("UpdateWholeStructureStyle");
    let methodKey_CreateSpoke = Symbol("CreateSpoke");
    let methodKey_CreateWheel = Symbol("CreateWheel");
    let methodKey_RimWheelEventHandle = Symbol("RimWheelEventHandle");
    let methodKey_SpokeClickEventHandle = Symbol("SpokeClickEventHandle");
    class EventEmitter {
        constructor() {
            this._events = {};
        }

        on(type, fn, context = this) {
            if (!this._events[type]) {
                this._events[type] = [];
            }

            this._events[type].push([fn, context]);
        }

        once(type, fn, context = this) {
            let fired = false;

            function magic() {
                this.off(type, magic);

                if (!fired) {
                    fired = true;
                    fn.apply(context, arguments);
                }
            }

            this.on(type, magic);
        }

        off(type, fn) {
            let _events = this._events[type];
            if (!_events) {
                return;
            }

            let count = _events.length;
            while (count--) {
                if (_events[count][0] === fn) {
                    _events[count][0] = undefined;
                }
            }
        }

        trigger(type) {
            let events = this._events[type];
            if (!events) {
                return;
            }

            let len = events.length;
            let eventsCopy = [...events];
            for (let i = 0; i < len; i++) {
                let event = eventsCopy[i];
                let [fn, context] = event;
                if (fn) {
                    fn.apply(context, [].slice.call(arguments, 1));
                }
            }
        }
    };
    class InnerMultiScollPicker extends EventEmitter {
        container = null;
        constructor(el, option) {
            super();
            this.container = el;
            this.resetWheels(option.wheels);
        }

        _spokeHeight = null;
        get spokeHeight() {
            if (!this._spokeHeight) {
                var retHeight = 32;
                var tempOneSpoke = this.container.querySelector(".wheels-container>.wheel>.rim>.hub>.spoke");
                if (tempOneSpoke) retHeight = tempOneSpoke.clientHeight;
                this._spokeHeight = retHeight;
            }
            return this._spokeHeight;
        }
        _dividingLineBoxHeight = null;
        get dividingLineBoxHeight() {
            if (!this._dividingLineBoxHeight) {
                this._dividingLineBoxHeight = (this.container.clientHeight - this.spokeHeight) / 2;
            }
            return this._dividingLineBoxHeight;
        }


        [methodKey_RimWheelEventHandle] = (event) => {
            event.preventDefault();
            //  每次滚动一行
            var currentRim = event.currentTarget;
            var currentRimSpokeCounter = currentRim.querySelectorAll(".hub>.spoke").length;
            var resultObj = _NormalizeWheel(event);
            var newScrollTop = currentRim.scrollTop + resultObj.spinY * this.spokeHeight;
            if (newScrollTop > (currentRimSpokeCounter - 1) * this.spokeHeight) return;
            _DomElementScrollTo(currentRim, newScrollTop);
            var currentWheelIndex = Number(currentRim.dataset.belongWheelIndex);
            var currentSpokeIndex = newScrollTop / this.spokeHeight;
            this.trigger('picker.change', currentWheelIndex, currentSpokeIndex);
        }

        [methodKey_SpokeClickEventHandle] = (event) => {
            var currentSpokeIndex = event.currentTarget.dataset.spokeIndex;
            var currentSpokeBelongWheelIndex = event.currentTarget.dataset.belongWheelIndex;
            var currentSpokeBelongWheel = event.currentTarget.parentElement.parentElement;
            _DomElementScrollTo(currentSpokeBelongWheel, this.spokeHeight * currentSpokeIndex);
            this.trigger('picker.change', currentSpokeBelongWheelIndex, currentSpokeIndex);
        }

        [methodKey_CreateSpoke] = (spokeConfig) => {
            if (!(_GetDataType(spokeConfig) === "object" &&
                    _GetDataType(spokeConfig.displayText) === "string" &&
                    spokeConfig.displayText.length)) return null;
            //  轮辐
            var spokeDom = document.createElement("div");
            spokeDom.classList.add("spoke");
            spokeDom.innerText = spokeConfig.displayText;
            return spokeDom;
        }

        [methodKey_CreateWheel] = (wheelConfig, wheelIndex) => {
            if (_GetDataType(wheelConfig) !== "object") return null;
            if (!(Array.isArray(wheelConfig.spokes) &&
                    wheelConfig.spokes.length)) return null;
            if (["string", "object"].indexOf(_GetDataType(wheelConfig.spokeDataType)) < 0) {
                throw new Error("只支持字符串和对象类型的数组");
            }
            if (_GetDataType(wheelConfig.spokeDataType) === "object") {
                if (!(_GetDataType(wheelConfig.primaryKey) === "string" && wheelConfig.primaryKey.length)) {
                    throw new Error("spoke数据类型为对象时，必须包含primaryKey属性并且不能为空");
                }
                if (!(_GetDataType(wheelConfig.displayKey) === "string" && wheelConfig.displayKey.length)) {
                    throw new Error("spoke数据类型为对象时，必须包含displayKey属性并且不能为空");
                }
            }

            //  车轮：辋(rim)、毂(hub)、辐(Spoke)
            //      辋是车轮的外圆
            //      毂是车轮中心的原木
            //      辐是车轮辋与毂之间连接的木棍
            var wheelDom = document.createElement("div");
            wheelDom.classList.add("wheel");
            //  轮辋
            var rimDom = document.createElement("div");
            rimDom.classList.add("rim");
            //      读取： rimDom.dataset.belongWheelIndex
            rimDom.setAttribute("data-belong-wheel-index", wheelIndex);
            //  轮毂
            var hubDom = document.createElement("div");
            hubDom.classList.add("hub");

            [].forEach.call(wheelConfig.spokes, (spokeItem, spokeIndex) => {
                var tempSpokeConfig = {};
                switch (wheelConfig.spokeDataType) {
                    case "string": {
                        tempSpokeConfig["primaryKeyValue"] = spokeItem;
                        tempSpokeConfig["displayText"] = spokeItem;
                        break;
                    }
                    case "object": {
                        tempSpokeConfig["primaryKeyValue"] = spokeItem[wheelConfig.primaryKey];
                        tempSpokeConfig["displayText"] = spokeItem[wheelConfig.displayKey];
                        break;
                    }
                }
                if (Object.getOwnPropertyNames(tempSpokeConfig).length) {
                    var tempSpokeDom = this[methodKey_CreateSpoke](tempSpokeConfig);
                    if (tempSpokeDom) {
                        //  读取： tempSpokeDom.dataset.spokeIndex
                        tempSpokeDom.setAttribute("data-spoke-index", spokeIndex);
                        //  读取： tempSpokeDom.dataset.belongWheelIndex
                        tempSpokeDom.setAttribute("data-belong-wheel-index", wheelIndex);
                    }
                    hubDom.appendChild(tempSpokeDom);
                }
            });
            rimDom.appendChild(hubDom);
            wheelDom.appendChild(rimDom);
            return wheelDom;
        }

        [methodKey_AssembleWholeStructure] = (optionWheels) => {
            //  1、验证参数
            if (!(Array.isArray(optionWheels) &&
                    optionWheels.length)) return;
            //  2、组装整体DOM结构
            //      2.1、组装N个轮子
            var fragmentForWheels = document.createDocumentFragment();
            [].forEach.call(optionWheels, (wheel, wheelIndex) => {
                fragmentForWheels.appendChild(this[methodKey_CreateWheel](wheel, wheelIndex));
            });
            //      2.2、组装上下遮盖区域
            var dividingLineBoxTop = document.createElement("div");
            dividingLineBoxTop.classList.add("dividing-line-box", "top");
            var dividingLineBoxBottom = document.createElement("div");
            dividingLineBoxBottom.classList.add("dividing-line-box", "bottom");
            fragmentForWheels.appendChild(dividingLineBoxTop);
            fragmentForWheels.appendChild(dividingLineBoxBottom);
            //      2.3、将DOM片段放入外层容器
            var wheelsContainerDom = document.createElement("div");
            wheelsContainerDom.classList.add("wheels-container");
            wheelsContainerDom.style.opacity = 0;
            wheelsContainerDom.appendChild(fragmentForWheels);
            //  3、将组装完的DOM结构放入到用户传入的元素
            this.container.appendChild(wheelsContainerDom);

            //  4、添加轮子(wheel-rim)滚动事件
            var tempRimDoms = this.container.querySelectorAll(".wheels-container>.wheel>.rim");
            tempRimDoms.forEach((rimDom) => {
                rimDom.addEventListener("wheel", this[methodKey_RimWheelEventHandle], {
                    passive: false
                });
            });
            //  5、添加轮辐(spoke)点击事件
            var tempSpokeDoms = this.container.querySelectorAll(".wheels-container>.wheel>.rim>.hub>.spoke");
            tempSpokeDoms.forEach((spokeDom) => {
                spokeDom.addEventListener("click", this[methodKey_SpokeClickEventHandle], {
                    passive: false
                });
            });
        }

        [methodKey_UpdateWholeStructureStyle] = () => {
            var tempDividingLineBoxHeight = this.dividingLineBoxHeight;
            var tempHubs = this.container.querySelectorAll(".wheels-container>.wheel>.rim>.hub");
            if (tempHubs && tempHubs.length) {
                for (let i = 0; i < tempHubs.length; i++) {
                    tempHubs[i].style.marginTop = tempDividingLineBoxHeight + "px";
                    tempHubs[i].style.marginBottom = tempDividingLineBoxHeight + "px";
                }
            }
            var tempDividingLineBoxs = this.container.querySelectorAll(".wheels-container>.dividing-line-box");
            if (tempDividingLineBoxs && tempDividingLineBoxs.length) {
                for (let i = 0; i < tempDividingLineBoxs.length; i++) {
                    tempDividingLineBoxs[i].style.height = tempDividingLineBoxHeight + "px";
                }
            }
            var tempWheelsContainer = this.container.querySelector(".wheels-container");
            tempWheelsContainer.style.removeProperty("opacity");
        }

        resetWheels = (newWheels) => {
            this.container.innerHTML = "";
            this[methodKey_AssembleWholeStructure](newWheels);
            this[methodKey_UpdateWholeStructureStyle]();

            var tempRimDoms = this.container.querySelectorAll(".wheels-container>.wheel>.rim");
            tempRimDoms.forEach((rimDom, index) => {
                if (newWheels[index] && newWheels[index].hasOwnProperty("selectedIndex")) {
                    _DomElementScrollTo(rimDom, newWheels[index].selectedIndex * 32);
                }
            });
        }
    };
    return InnerMultiScollPicker;
})();