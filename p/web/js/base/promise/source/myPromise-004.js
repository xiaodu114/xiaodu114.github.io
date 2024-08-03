//  咱也得安排上，既然你给了我一个方法，那我就马上调用，绝不迟疑
function Promise(executor) {
    if (typeof executor !== "function") throw new TypeError("Promise resolver " + executor + " is not a function");

    this.PromiseState = "pending";
    this.PromiseResult = undefined;

    executor();
}
