define(function (require, exports, module) {
    ("use strict");
    //  下面的两种情况根据实际情况而定

    //  方式一
    const module1 = require("module1");
    const module2 = require("module2");

    //  方式二
    // const module1 = require("/p/web/js/base/modules/source/amd/module1.js");
    // const module2 = require("/p/web/js/base/modules/source/amd/module2.js");

    return {
        name: "模块三",
        getName() {
            return `我是一个AMD模块，我的名字是【模块三】，我依赖【模块一】和【模块二】`;
        },
        getOtherName() {
            return [module1.getName(), module2.getName()];
        },
    };
});
