function Promise(executor) {
    if (typeof executor !== "function") throw new TypeError("Promise resolver " + executor + " is not a function");

    this.PromiseState = "pending";
    this.PromiseResult = undefined;
    this.subs = [];

    var resolve = function (data) {
        if (this.PromiseState !== "pending") return;
        this.PromiseResult = data;
        this.PromiseState = "fulfilled";

        this.subs.forEach(function (item) {
            item.onFulfilled(data);
        });
    }.bind(this);

    var reject = function (error) {
        if (this.PromiseState !== "pending") return;
        this.PromiseResult = error;
        this.PromiseState = "rejected";

        this.subs.forEach(function (item) {
            item.onRejected(error);
        });
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
        this.subs.push({
            onFulfilled: onFulfilled,
            onRejected: onRejected
        });
    }
    return new Promise(function (resolve, reject) {});
};
