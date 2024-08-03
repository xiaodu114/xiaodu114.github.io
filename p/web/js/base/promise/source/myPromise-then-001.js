function Promise(executor) {
    if (typeof executor !== "function") throw new TypeError("Promise resolver " + executor + " is not a function");

    this.PromiseState = "pending";
    this.PromiseResult = undefined;

    var resolve = function (data) {
        if (this.PromiseState !== "pending") return;
        this.PromiseResult = data;
        this.PromiseState = "fulfilled";
    }.bind(this);

    var reject = function (error) {
        if (this.PromiseState !== "pending") return;
        this.PromiseResult = error;
        this.PromiseState = "rejected";
    }.bind(this);

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    if (this.PromiseState === "fulfilled") {
        onFulfilled(this.PromiseResult);
    }
    if (this.PromiseState === "rejected") {
        onRejected(this.PromiseResult);
    }
};
