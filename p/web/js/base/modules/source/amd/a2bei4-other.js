define(["/p/web/js/base/modules/source/amd/a2bei4-utils.js"], function (a2bei4Utils) {
    ("use strict");
    //  获取依赖
    var { getDataType, getGUID, getInRangeInteger } = a2bei4Utils;

    //  自身模块代码
    function getZhLetter() {
        return String.fromCharCode(getInRangeInteger(parseInt("4E00", 16), parseInt("9FA5", 16)));
    }

    function getEnLetter(type) {
        let num1 = 97,
            num2 = 122;
        switch (type) {
            case "lower": {
                break;
            }
            case "upper": {
                num1 = 65;
                num2 = 90;
                break;
            }
            default: {
                if (Math.random() - 0.5 > 0) {
                    num1 = 65;
                    num2 = 90;
                }
            }
        }
        return String.fromCharCode(getInRangeInteger(num1, num2));
    }

    function getRandomZhOrEnStr(len) {
        len = Number.isInteger(len) && len > 0 ? len : 0;
        let retStr = "";
        for (let i = 0; i < len; i++) {
            retStr += Math.random() - 0.5 > 0 ? getZhLetter() : getEnLetter();
        }
        return retStr;
    }

    return {
        name: "a2bei4-other",
        version: "1.0.0.0",
        getZhLetter,
        getEnLetter,
        getRandomZhOrEnStr,
    };
});
