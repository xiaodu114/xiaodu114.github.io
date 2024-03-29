/**
 * 获取数据的类型
 * 例子：
 * getDataType(null);=>"null"
 * getDataType(undefined);=>"undefined"
 * getDataType({});=>"object"
 * getDataType(function(){});=>"function"
 * @param {any} obj 目标数据
 * @returns {string} 返回目标数据类型的小写形式
 */
export const getDataType = function (obj) {
    return Object.prototype.toString
        .call(obj)
        .replace(/^\[object\s(\w+)\]$/, "$1")
        .toLowerCase();
};

//  复制功能相关
//      参考：
//          https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
//          https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
export const copyTextToClipboard = function (text) {
    function copyTextToClipboardByCommandCopy(text) {
        if (!document.execCommand("copy")) return;
        var tempInput = document.createElement("input");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }
    return new Promise((resolve, reject) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(
                () => {
                    resolve();
                },
                function (err) {
                    reject(err);
                }
            );
        } else {
            copyTextToClipboardByCommandCopy(text);
            resolve();
        }
    });
};
