define(function (require, exports, module) {
    exports.data1 = "Hi,CMD Module 1";
    exports.data2 = { a: 1 };
    exports.fn1 = function () {
        return "我是来自CMD Module1,现在时间：" + new Date().Format("yyyy-MM-dd hh:mm:ss:S");
    };
    exports.fn2 = function () {
        alert("我是来自CMD Module1,随机数：" + Math.random());
    };
});