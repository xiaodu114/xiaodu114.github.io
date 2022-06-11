/**
 *获取数据的类型
 * @param {any} obj 目标数据
 * @returns {string} 返回目标数据类型的小写形式,eg:array|function|promise
 */
export const getDataType = function (obj) {
    return Object.prototype.toString
        .call(obj)
        .replace(/^\[object\s(\w+)\]$/, "$1")
        .toLowerCase();
}

/**
 *获取一个GUID
 * @returns {string} 返回一个GUID, eg:AEFC9ABC-1396-494B-AB96-C35CA3C9F92F
 */
export const getGUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    });
}

/**
 * 向Head标签中添加Style样式
 * @param {String} text 样式内容
 * @param {String} selector  document.querySelector 选择器
 */
export const addStyleTagToHead = function (text, selector) {
    var tempStyleElement = document.createElement("style");
    tempStyleElement.type = "text/css";
    tempStyleElement.innerHTML = text;
    if (!document.querySelector(selector)) {
        document.getElementsByTagName("head")[0].appendChild(tempStyleElement);
    }
}

/**
 * 分析文本中template、script、style标签中的内容
 * @param {*} fileText 文件内容
 * @returns {Object} 
 */
export const analysisFileText = function (fileText) {
    var tempRetObj = {
        template: {
            attrObj: {},
            text: null
        },
        script: {
            attrObj: {},
            text: null
        },
        style: {
            attrObj: {},
            text: null
        }
    };
    if (fileText) {
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = fileText;
        if (tempDiv.children.length) {
            [].map.call(tempDiv.children, tempDivCh => {
                var tempAttrObj = {};
                if (tempDivCh.attributes && tempDivCh.attributes.length) {
                    [].map.call(tempDivCh.attributes, (mapItem) => {
                        tempAttrObj[mapItem.nodeName] = mapItem.nodeValue;
                    });
                }
                if (tempDivCh.innerHTML.trim()) {
                    if (tempDivCh.tagName === "TEMPLATE") {
                        tempRetObj.template.attrObj = tempAttrObj;
                        tempRetObj.template.text = tempDivCh.innerHTML.trim();
                    }
                    if (tempDivCh.tagName === "SCRIPT") {
                        tempRetObj.script.attrObj = tempAttrObj;
                        tempRetObj.script.text = tempDivCh.innerHTML.trim();
                    }
                    if (tempDivCh.tagName === "STYLE") {
                        tempRetObj.style.attrObj = tempAttrObj;
                        tempRetObj.style.text = tempDivCh.innerHTML.trim();
                    }
                }
            });
        }
    }
    return tempRetObj;
}