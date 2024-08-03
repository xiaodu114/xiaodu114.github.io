//  如果传入的是 {name:"666"} ，错误信息不一样。毕竟是仿造的，先这样吧！
function Promise(executor) {
    if (typeof executor !== "function") throw new TypeError("Promise resolver " + executor + " is not a function");
}
