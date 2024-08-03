//  示例一
var p1 = new Promise(function (resolve, reject) {
    resolve("xiaodu114");
});
p1.then(
    function (data) {
        console.log("成功：", data);
    },
    function (error) {
        console.log("失败：", error);
    }
);

//  示例二
var p2 = new Promise(function (resolve, reject) {
    reject("a2bei4");
});
p2.then(
    function (data) {
        console.log("成功：", data);
    },
    function (error) {
        console.log("失败：", error);
    }
);
