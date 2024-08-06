//	第一个
async function async1() {
    console.log("AAAA");
    async2();
    console.log("BBBB");
}
async function async2() {
    console.log("CCCC");
}
console.log("DDDD");
setTimeout(function () {
    console.log("FFFF");
}, 0);
async1();
new Promise(function (resolve) {
    console.log("GGGG");
    resolve();
}).then(function () {
    console.log("HHHH");
});
console.log("IIII");

//	第二个
async function async1() {
    console.log("AAAA");
    await async2();
    console.log("BBBB");
}
async function async2() {
    console.log("CCCC");
}
console.log("DDDD");
setTimeout(function () {
    console.log("FFFF");
}, 0);
async1();
new Promise(function (resolve) {
    console.log("GGGG");
    resolve();
}).then(function () {
    console.log("HHHH");
});
console.log("IIII");
