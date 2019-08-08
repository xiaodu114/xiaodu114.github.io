define(function (require) {
    var m1 = require('./module1.js'),
        m2 = require('./module2.js');
    return {
        data: {
            title: "模块规范：AMD",
            detail: "我依赖两个模块:amd-module1、amd-module2，写法2",
            m1Obj: m1,
            m2Obj: m2,
            preText: `
define(function (require) {
    var m1 = require('./module1.js'),
        m2 = require('./module2.js');
    return {
        data: {
            title: "模块规范：AMD",
            detail: "我依赖两个模块:amd-module1、amd-module2，写法2",
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