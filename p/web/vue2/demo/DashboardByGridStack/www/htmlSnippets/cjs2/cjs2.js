var KVModel = require('./KVModelCommonjs.js').KVModel;
var m1 = require('./module1.js');
module.exports = {
    data: {
        title: "模块规范：CommonJS",
        detail: "我依赖一个实体类KVModel，还有一个模块module1",
        tempKVModel: new KVModel({
            Key: "微笑",
            Value: "😄😄😄😄😄😄"
        }),
        preText: `var KVModel = require('./KVModelCommonjs.js').KVModel;
var m1 = require('./module1.js');
module.exports = {
    data: {
        title: "模块规范：CommonJS",
        detail: "我依赖一个实体类KVModel，还有一个模块module1",
        tempKVModel: new KVModel({ Key: "微笑", Value: "😄😄😄😄😄😄" }),
        preText:""
    },
    methods: {
        clickModule1Fn1: function () {
            alert(m1.data1);
            m1.fn1();
        }
    }
}
`
    },
    methods: {
        clickModule1Fn1: function () {
            alert(m1.data1);
            m1.fn1();
        }
    }
}