module.exports = {
    data: {
        title: "看我如何和我的兄弟聊天",
        preText: 
`module.exports = {
    data: {
        title: "看我如何和我的兄弟聊天",
        preText:""
    },
    methods: {
        sendMsgToCjs6: function () {
            if (GlobalEventBus) {
                GlobalEventBus.$emit("cjs5-sendEvent-01", {
                    msg: "我是cjs5，朋友们有时间吗？一起聚聚？" + Math.random()
                });
            }
        }
    }
} 
`
    },
    methods: {
        sendMsgToCjs6: function () {
            if (GlobalEventBus) {
                GlobalEventBus.$emit("cjs5-sendEvent-01", {
                    msg: "我是cjs5，朋友们有时间吗？一起聚聚？" + Math.random()
                });
            }
        }
    }
} 