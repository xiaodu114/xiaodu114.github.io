define(function (require, exports, module) {
    var m1 = require('./module1.js'),
        m2 = require('./module2.js');
    module.exports = {
        data: {
            title: "模块规范：CMD",
            detail: `
我依赖两个模块:cmd-module1、cmd-module2；
😵😵😵😵😵😵😵😵😵和AMD的写法很接近；
AMD是依赖前置，CMD是就近依赖，但是AMD也支持CMD的就近依赖，自己查询……
另外 module.exports ={};和 return {};的作用一样
`,
            m1Obj: m1,
            m2Obj: m2,
            preText: `define(function (require, exports, module) {
    var m1 = require('./module1.js'),
        m2 = require('./module2.js');
    return {
        data: {
            title: "模块规范：CMD",
            detail: "………………………………",
            m1Obj: m1,
            m2Obj: m2,
            preText: ""
        },
        methods: {
            clickModule1Fn1: function () {
                alert(m1.fn1());
            },
            clickModule1Fn2: function () {
                m1.fn2()
            },
            clickModule2Fn1: function () {
                alert("GUID:" + m2.fn1());
            }
        }
    }
});
`
        },
        methods: {
            clickModule1Fn1: function () {
                alert(m1.fn1());
            },
            clickModule1Fn2: function () {
                m1.fn2()
            },
            clickModule2Fn1: function () {
                alert("GUID:" + m2.fn1());
            }
        }
    }
});