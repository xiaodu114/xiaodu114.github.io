//  成功示例 1
function executor1(resolve, reject) {
    resolve();
}
new Promise(executor1);
//  成功示例 2
function executor2(resolve, reject) {
    resolve("xiaodu114", true, { name: "a2bei4" });
}
new Promise(executor2);
//  失败示例 1
function executor3(resolve, reject) {
    reject();
}
new Promise(executor3);
//  失败示例 2
function executor4(resolve, reject) {
    reject("a2bei4", false, { name: "xiaodu114" });
}
new Promise(executor4);
