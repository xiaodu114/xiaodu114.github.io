//  示例一
new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("xiaodu114");
    }, 2000);
}).then(
    function (data) {
        console.log("成功：", data);
    },
    function (error) {
        console.log("失败：", error);
    }
);

//  示例二
new Promise(function (resolve, reject) {
    setTimeout(() => {
        reject("a2bei4");
    }, 2000);
}).then(
    function (data) {
        console.log("成功：", data);
    },
    function (error) {
        console.log("失败：", error);
    }
);
