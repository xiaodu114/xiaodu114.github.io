let obj1 = {
    blog: {
        name: "CSDN",
        url: "https://www.csdn.net/"
    },
    bloggerName: "duyelang",
    blogHomepage: "https://blog.csdn.net/duyelang",
    csdnPosts: [
        {
            title: "Javascript生成GUID",
            url: "https://blog.csdn.net/duyelang/article/details/50359718"
        }
    ],
    get csdnOther() {
        return {
            CSDN: 666
        };
    }
};
let obj2 = {
    blog: {
        name: "博客园",
        url: "https://www.cnblogs.com/"
    },
    bloggerName: "du-blog",
    blogHomepage: "https://www.cnblogs.com/du-blog",
    cnblogsPosts: [
        {
            title: "在ubuntu16.04中初次体验.net core 2.0",
            url: "hhttps://www.cnblogs.com/du-blog/p/7788420.html"
        },
        {
            title: "Snowflake(雪花算法)的JavaScript实现",
            url: "https://www.cnblogs.com/du-blog/p/9250660.html"
        }
    ],
    [Symbol("cnblogs")]: {
        cnblogs: 666
    }
};
let obj3 = {
    blog: {
        name: "GitHub",
        url: "https://github.com/"
    },
    bloggerName: "xiaodu114",
    blogHomepage: "https://github.com/xiaodu114/",
    homepage: "https://xiaodu114.github.io/",
    githubPosts: [
        {
            title: "在ubuntu16.04中初次体验.net core 2.0",
            url: "hhttps://www.cnblogs.com/du-blog/p/7788420.html"
        },
        {
            title: "Snowflake(雪花算法)的JavaScript实现",
            url: "https://www.cnblogs.com/du-blog/p/9250660.html"
        }
    ]
};
Object.defineProperty(obj3, "not-enumerable-1", {
    enumerable: false,
    value: "我是不能被枚举的"
});
let obj = {};
let retObj = Object.assign(obj, obj1, obj2, obj3);
console.log(obj === retObj);
console.log(obj.blog === obj3.blog);
console.log(obj.csdnPosts === obj1.csdnPosts);
console.log(obj.cnblogsPosts === obj2.cnblogsPosts);
console.log(obj.githubPosts === obj3.githubPosts);
console.log(obj.csdnOther === obj1.csdnOther);
console.log(obj.hasOwnProperty("csdnOther"));
console.log(obj1.hasOwnProperty("csdnOther"));
