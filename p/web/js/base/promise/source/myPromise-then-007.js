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
            item.onFulfilled();
        });
    }.bind(this);

    var reject = function (error) {
        if (this.PromiseState !== "pending") return;
        this.PromiseResult = error;
        this.PromiseState = "rejected";

        this.subs.forEach(function (item) {
            item.onRejected();
        });
    }.bind(this);

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function")
        onFulfilled = function (data) {
            return data;
        };
    if (typeof onRejected !== "function")
        onRejected = function (error) {
            throw error;
        };
    return new Promise(
        function (resolve, reject) {
            function fn(callback) {
                setTimeout(
                    function () {
                        try {
                            var ret = callback(this.PromiseResult);
                            if (ret instanceof Promise) {
                                ret.then(resolve, reject);
                            } else {
                                resolve(ret);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    }.bind(this)
                );
            }
            if (this.PromiseState === "fulfilled") {
                fn.call(this, onFulfilled);
            }
            if (this.PromiseState === "rejected") {
                fn.call(this, onRejected);
            }
            if (this.PromiseState === "pending") {
                this.subs.push({
                    onFulfilled: fn.bind(this, onFulfilled),
                    onRejected: fn.bind(this, onRejected)
                });
            }
        }.bind(this)
    );
};
