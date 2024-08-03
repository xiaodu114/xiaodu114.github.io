function Promise(executor) {
    if (typeof executor !== "function") throw new TypeError("Promise resolver " + executor + " is not a function");

    this.PromiseState = "pending";
    this.PromiseResult = undefined;

    var resolve = function (data) {
        this.PromiseResult = data;
        this.PromiseState = "fulfilled";
    }.bind(this);

    var reject = function (error) {
        this.PromiseResult = error;
        this.PromiseState = "rejected";
    }.bind(this);

    executor(resolve, reject);
}
