module.exports = {
    data: {
        title: "我是CJS8，我也关注了我的长辈",
        detail: "这里在钩子函数destroyed中没有销毁了事件监听。",
        mainPageMsg: "监听中……",
        preText: `module.exports = {
    data: {
        title: "我是CJS8，我也关注了我的长辈",
        detail:"这里在钩子函数destroyed中没有销毁了事件监听。",
        mainPageMsg: "监听中……",
        preText:""
    },
    methods: {
        createdFn: function () {
            if (GlobalEventBus) {
                GlobalEventBus.$on("mainpage-broadcast-event-01", this.mainpageBroadcastEvent01Handle);
            }
        },
        beforeDestroyFn: function () {
            console.log("组件销毁前执行:CommonJS组件8,我在这里没有销毁了事件监听");
        },
        destroyedFn: function () {
            console.log("组件销毁时执行:CommonJS组件8");
        },
        mainpageBroadcastEvent01Handle: function (data) {
            console.log("我是CJS8，该组件删除之后我还在监听，不信你试试……");
            if (data && data.msg) {
                this.mainPageMsg = data.msg;
            }
        }
    }
} 
`
    },
    methods: {
        createdFn: function () {
            if (GlobalEventBus) {
                GlobalEventBus.$on("mainpage-broadcast-event-01", this.mainpageBroadcastEvent01Handle);
            }
        },
        beforeDestroyFn: function () {
            console.log("组件销毁前执行:CommonJS组件8,我在这里没有销毁了事件监听");
        },
        destroyedFn: function () {
            console.log("组件销毁时执行:CommonJS组件8");
        },
        mainpageBroadcastEvent01Handle: function (data) {
            console.log("我是CJS8，该组件删除之后我还在监听，不信你试试……");
            if (data && data.msg) {
                this.mainPageMsg = data.msg;
            }
        }
    }
}