//  示例一
var p1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log("我返回的是 xiaodu114 ，你们收到了吗？");
        resolve("xiaodu114");
    }, 2000);
});
var p1_1 = p1.then(function (data) {
    console.log("new Promise 成功回调，第一个 then ：", data);
});
var p1_2 = p1.then(function (data) {
    console.log("new Promise 成功回调，第二个 then ：", data);
    return 666;
});
var p1_3 = p1.then(function (data) {
    console.log("new Promise 成功回调，第三个 then ：", data);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(888);
        }, 2000);
    });
});
var p1_4 = p1.then(function (data) {
    console.log("new Promise 成功回调，第四个 then ：", data);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(-666);
        }, 2000);
    });
});
var p1_5 = p1.then(function (data) {
    console.log("new Promise 成功回调，第五个 then ：", data);
    throw "new Promise 成功回调，第五个 then 中抛出了异常";
});
var p1_6 = p1.then();
console.log(p1_1);
console.log(p1_2);
console.log(p1_3);
console.log(p1_4);
console.log(p1_5);
console.log(p1_6);

//  示例二
var p2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log("不好意思，弄错了，弄成 du-blog 了");
        reject("du-blog");
    }, 2000);
});
var p2_1 = p2.then(undefined, function (error) {
    console.log("new Promise 失败回调，第一个 then ：", error);
});
var p2_2 = p2.then(undefined, function (error) {
    console.log("new Promise 失败回调，第二个 then ：", error);
    return 666;
});
var p2_3 = p2.then(undefined, function (error) {
    console.log("new Promise 失败回调，第三个 then ：", error);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(888);
        }, 2000);
    });
});
var p2_4 = p2.then(undefined, function (error) {
    console.log("new Promise 失败回调，第四个 then ：", error);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(-666);
        }, 2000);
    });
});
var p2_5 = p2.then(undefined, function (error) {
    console.log("new Promise 失败回调，第五个 then ：", error);
    throw "new Promise 失败回调，第五个 then 中抛出了异常";
});
var p2_6 = p2.then();
console.log(p2_1);
console.log(p2_2);
console.log(p2_3);
console.log(p2_4);
console.log(p2_5);
console.log(p2_6);
