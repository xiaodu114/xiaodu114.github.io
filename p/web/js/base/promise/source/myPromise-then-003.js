function Promise(executor) {
    if (typeof executor !== "function") throw new TypeError("Promise resolver " + executor + " is not a function");

    this.PromiseState = "pending";
    this.PromiseResult = undefined;
    this.callback = null;

    var resolve = function (data) {
        if (this.PromiseState !== "pending") return;
        this.PromiseResult = data;
        this.PromiseState = "fulfilled";

        if (this.callback && this.callback.onFulfilled) {
            this.callback.onFulfilled(this.PromiseResult);
        }
    }.bind(this);

    var reject = function (error) {
        if (this.PromiseState !== "pending") return;
        this.PromiseResult = error;
        this.PromiseState = "rejected";

        if (this.callback && this.callback.onRejected) {
            this.callback.onRejected(this.PromiseResult);
        }
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
    if (this.PromiseState === "pending") {
        this.callback = {
            onFulfilled: onFulfilled,
            onRejected: onRejected
        };
    }
    return new Promise(function (resolve, reject) {});
};
