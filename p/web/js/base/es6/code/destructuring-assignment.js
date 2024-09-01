const obj = {
    name: "xiaodu114",
    get homepage() {
        return "https://xiaodu114.github.io/";
    },
    __proto__: {
        boss: "ddz"
    },
    other1: "other1",
    other2: "other2",
    other3: "other3"
};
const arrLen0 = [];
const githubPosts = ["https://xiaodu114.github.io/", "https://xiaodu114.github.io/p/llm/index.html", "https://xiaodu114.github.io/p/linux/ubuntu/index.html", "https://xiaodu114.github.io/p/windows/index.html"];
const githubName = "xiaodu114";

function returnArray() {
    return ["xiaodu114", "du-blog", "duyelang"];
}

function getObjProperty({ name, homepage, defaultValue = "函数：默认值", ...otherAttrs }) {
    console.log("函数内部打印：");
    console.log("name:", name);
    console.log("homepage:", homepage);
    console.log("defaultValue:", defaultValue);
    console.log("otherAttrs:", otherAttrs);
}

const map = new Map([
    ["xiaodu114", "https://xiaodu114.github.io/"],
    ["du-blog", "https://www.cnblogs.com/du-blog"]
]);

//  两种解构模式：绑定模式和赋值模式

//  两种解构模式之赋值模式
const obj1 = {
    name: "",
    homepage: ""
};
({ name: obj1.name, homepage: obj1.homepage } = obj);
console.log("赋值模式测试：--------------------------------------->");
console.log("obj1", obj1);

//  两种解构模式之绑定模式
const { name, homepage: homepageAlias = "主页默认值", defaultValue = "默认是测试", boss, ...otherAttrs } = obj;
console.log("绑定模式测试：--------------------------------------->");
console.log("基本赋值 name:", name);
console.log("别名并且带有默认值 homepageAlias:", homepageAlias);
console.log("默认值 defaultValue:", defaultValue);
console.log("剩余属性 otherAttrs:", otherAttrs);
console.log("查找原型链 boss:", boss);

const [arrItem1 = "数据解构默认值", arrItem2] = arrLen0;
console.log("arrItem1:", arrItem1);
console.log("arrItem2:", arrItem2);

const [post1, post2, ...otherPosts] = githubPosts;
console.log("post1:", post1);
console.log("post2:", post2);
console.log("剩余项 otherPosts:", otherPosts);

const [char1, char2, ...otherChars] = githubName;
console.log("char1:", char1);
console.log("char2:", char2);
console.log("剩余项 otherPosts:", otherChars);

//  函数返回值和解构
const [arrName1, , arrName3, ...{ pop: arrPop, push: arrPush }] = returnArray();
console.log("arrName1:", arrName1);
console.log("arrName3:", arrName3);
console.log("arrPop:", arrPop);
console.log("arrPush:", arrPush);

//  函数参数和解构
getObjProperty(obj);

//  for of 迭代和解构
//  解构基本类型
//  组合数组和对象解构
