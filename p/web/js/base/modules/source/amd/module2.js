define(function (require, exports, module) {
    console.log("模块二内部测试，", "module.exports 和 exports 是否相等：", module.exports === exports);
    exports.name = "模块二";
    exports.getName = () => {
        return `我是一个AMD模块，我的名字是【模块二】，我没有任何依赖哦！`;
    };
});
