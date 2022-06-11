define(function (require, exports, module) {
    return {
        data1: "Hi,AMD Module 2",
        data2: { a: 2 },
        fn1: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16).toUpperCase();
            });
        }
    }
});