//  在函数调用时使用展开语法
function fn(a, b, c, d, e, f) {
    console.log("a:", a, "b:", b, "c:", c, "d:", d, "e:", e, "f:", f);
}
const args = ["xiaodu114", "du-blog", "duyelang"];
fn.apply(null, args);
fn(...args, 666, ...["a2bei4", 666]);

//  构造字面量数组时使用展开语法  |  连接多个数组
const myTags = ["xiaodu114", ...["du-blog", "duyelang"], ...["a2bei4", "ddz"], 666];
console.log("myTags:", myTags);

//  数组拷贝
//  提示： 实际上，展开语法和 Object.assign() 行为一致，执行的都是浅拷贝 (只遍历一层)。如果想对多维数组进行深拷贝，下面的示例就有些问题了。 - 摘自MDN
const myTags2_0 = [...myTags];
const myTags2_1 = myTags.slice();
console.log("myTags2_0:", myTags2_0);
console.log("myTags2_1:", myTags2_1);

//  构造字面量对象时使用展开语法
//  浅拷贝 (Shallow-cloning，不包含 prototype) 和对象合并，可以使用更简短的展开语法。而不必再使用 Object.assign() 方式。 - 摘自MDN
//  提示: Object.assign() 函数会触发 setters，而展开语法则不会。 - 摘自MDN
const obj1 = {
    csdnName: "duyelang",
    csdnHome: "https://blog.csdn.net/duyelang"
};
const obj2 = {
    cnblogsName: "du-blog",
    cnblogsHome: "https://www.cnblogs.com/du-blog"
};
const obj3 = {
    githubName: "xiaodu114",
    githubHome: "https://xiaodu114.github.io/"
};
const obj = { ...obj1, ...obj2, ...obj3 };
const objCopy = { ...obj };
console.log(obj);
console.log(objCopy);
