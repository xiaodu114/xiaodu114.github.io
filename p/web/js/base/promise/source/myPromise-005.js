//  咱也得安排上，你给了我一个方法，那我就给你两个
function Promise(executor) {
    if (typeof executor !== "function") throw new TypeError("Promise resolver " + executor + " is not a function");

    this.PromiseState = "pending";
    this.PromiseResult = undefined;

    function resolve() {}
    function reject() {}

    executor(resolve, reject);
}
