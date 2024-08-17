//  1、查看以下这三个是否相等
//      结论：这三个是相等的
console.log(this === exports, this === module.exports);

//  2、看一下这里导出的是什么
//      结论：无论如何修改导出的对象，最终导出的都是 module.exports 的值
exports = { a: 1 };
exports.b = "2";
module.exports.c = 3;
module.exports = { name: "同时使用 exports 和 module.exports 导出", d: 4 };

//  3、这是什么东东
console.log(arguments.callee.toString());
