/**
 * 模块名称：a2bei4-other
 * 模块作者：xiaodu114
 */

function getDataType(obj) {
    return Object.prototype.toString
        .call(obj)
        .replace(/^\[object\s(\w+)\]$/, "$1")
        .toLowerCase();
}

function getGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16).toUpperCase();
    });
}

function getInRangeInteger(num1, num2) {
    num1 = Number.isInteger(num1) ? num1 : 0;
    num2 = Number.isInteger(num2) ? num2 : 0;
    if (num1 > num2) [num1, num2] = [num2, num1];
    return Math.round(Math.random() * (num2 - num1)) + num1;
}

//  方式一
// exports.name = "a2bei4-utils";
// exports.version = "1.0.0.0";
// exports.getDataType = getDataType;
// exports.getGUID = getGUID;
// exports.getInRangeInteger = getInRangeInteger;

//  方式二
module.exports = {
    name: "a2bei4-utils",
    version: "1.0.0.0",
    getDataType,
    getGUID,
    getInRangeInteger,
};
