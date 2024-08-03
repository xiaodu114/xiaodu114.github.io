//  示例 1
function executor1(resolve, reject) {
    resolve("xiaodu114");
    resolve("a2bei4");
}
new Promise(executor1);
//  示例 2
function executor2(resolve, reject) {
    reject("a2bei4");
    reject("du-blog");
}
new Promise(executor2);
//  示例 3
function executor3(resolve, reject) {
    resolve("xiaodu114");
    reject("a2bei4");
}
new Promise(executor3);
//  示例 4
function executor4(resolve, reject) {
    reject("a2bei4");
    resolve("xiaodu114");
}
new Promise(executor4);
