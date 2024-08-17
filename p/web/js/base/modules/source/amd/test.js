//  <script src="https://registry.npmmirror.com/requirejs/2.3.7/files/require.js"></script>
const module1Path = "/p/web/js/base/modules/source/amd/module1.js";
const module2Path = "/p/web/js/base/modules/source/amd/module2.js";
const module3Path = "/p/web/js/base/modules/source/amd/module3.js";
const a2bei4UtilsPath = "/p/web/js/base/modules/source/amd/a2bei4-utils.js";
const a2bei4OtherPath = "/p/web/js/base/modules/source/amd/a2bei4-other.js";
const a2bei4OtherConfigPath = "/p/web/js/base/modules/source/amd/a2bei4-other-for-config.js";

function module1Callback(module1) {
    console.log("【模块一】加载完成，接下来是我的主场：");
    console.log(module1);
    console.log(module1.getName());
}
function module2Callback(module2) {
    console.log("【模块二】加载完成，接下来是我的主场：");
    console.log(module2);
    console.log(module2.getName());
}
function module3Callback(module3) {
    console.log("【模块三】加载完成，接下来是我的主场：");
    console.log(module3);
    console.log(module3.getName());
    console.log(module3.getOtherName());
}
function a2bei4UtilsCallback(a2bei4Utils) {
    console.log("【a2bei4Utils】加载完成，接下来是我的主场：");
    console.log(a2bei4Utils);
    console.log(a2bei4Utils.getDataType(null));
    console.log(a2bei4Utils.getGUID());
    console.log(a2bei4Utils.getInRangeInteger(0, 9));
}
function a2bei4OtherCallback(a2bei4Other) {
    console.log("【a2bei4Other】加载完成，接下来是我的主场：");
    console.log(a2bei4Other);
    console.log(a2bei4Other.getZhLetter());
    console.log(a2bei4Other.getEnLetter());
    console.log(a2bei4Other.getRandomZhOrEnStr(10));
}

//  这里列举两种使用方式，可以二选一，这里没有测试项目中是否可以混用
//  使用方式一
//      说明：通过 paths 配置时，路径中不需要带有".js",他会自己添加
requirejs.config({
    paths: {
        module1: module1Path.slice(0, -3),
        module2: module2Path.slice(0, -3),
        a2bei4Utils: a2bei4UtilsPath.slice(0, -3),
        a2bei4Other: a2bei4OtherConfigPath.slice(0, -3),
        //  测试发现，如果 a2bei4Other 的路径还是指向 .../amd/a2bei4-other.js ，该JS内部是通过路径添加的依赖，例如： define([.../amd/a2bei4-utils.js],function(){ }); 此时页面提示加载 .../amd/a2bei4-utils.js 超时
        //  应该使用模块名称添加依赖，例如：define(["a2bei4Utils"],function(){ });
        //a2bei4Other: a2bei4OtherPath.slice(0, -3),
    },
});

requirejs(["module1"], module1Callback);
requirejs(["module2"], module2Callback);
requirejs(["module3"], module3Callback);
requirejs(["a2bei4Utils"], a2bei4UtilsCallback);
requirejs(["a2bei4Other"], a2bei4OtherCallback);

//  使用方式二
//      说明：
// requirejs([module1Path], module1Callback);
// requirejs([module2Path], module2Callback);
// requirejs([a2bei4UtilsPath], a2bei4UtilsCallback);
// requirejs([a2bei4OtherPath], a2bei4OtherCallback);
