//  示例一
var p1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("xiaodu114");
    }, 2000);
});
p1.then(
    function (data) {
        console.log("成功1：", data);
    },
    function (error) {
        console.log("失败1：", error);
    }
);
p1.then(
    function (data) {
        console.log("成功2：", data);
    },
    function (error) {
        console.log("失败2：", error);
    }
);

//  示例二
var p2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        reject("a2bei4");
    }, 2000);
});
p2.then(
    function (data) {
        console.log("成功1：", data);
    },
    function (error) {
        console.log("失败1：", error);
    }
);
p2.then(
    function (data) {
        console.log("成功2：", data);
    },
    function (error) {
        console.log("失败2：", error);
    }
);

//  示例三
var p3 = new Promise(function (resolve, reject) {
    //  制造异常：访问一个未声明的变量
    console.log(xiaodu114);
});
p3.then(
    function (data) {
        console.log("成功1：", data);
    },
    function (error) {
        console.log("失败1：", error);
    }
);
p3.then(
    function (data) {
        console.log("成功2：", data);
    },
    function (error) {
        console.log("失败2：", error);
    }
);
