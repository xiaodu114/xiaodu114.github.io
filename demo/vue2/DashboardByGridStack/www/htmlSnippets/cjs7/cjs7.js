module.exports = {
    data: {
        title: "我是CJS7，我关注了我的长辈",
        detail: `这里在钩子函数destroyed中销毁了事件监听。<br/>
注意：千万不要全局注销即GlobalEventBus.$off("mainpage-broadcast-event-01");采用这种方式也会销毁其他组件的监听<br/>
请记住一定要销毁，并且销毁你自己的GlobalEventBus.$off("mainpage-broadcast-event-01", this.mainpageBroadcastEvent01Handle);
`,
        mainPageMsg: "监听中……",
        preText: `module.exports = {
    data: {
        title: "我是CJS7，我关注了我的长辈",
        detail:"这里在钩子函数destroyed中销毁了事件监听。< br />
        注意：千万不要全局注销即GlobalEventBus.$off("mainpage-broadcast-event-01"); 采用这种方式也会销毁其他组件的监听<br/>
    请记住一定要销毁，并且销毁你自己的GlobalEventBus.$off("mainpage-broadcast-event-01", this.mainpageBroadcastEvent01Handle);",
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
            console.log("组件销毁前执行:CommonJS组件7");
        },
        destroyedFn: function () {
            GlobalEventBus.$off("mainpage-broadcast-event-01", this.mainpageBroadcastEvent01Handle);
            console.log("组件销毁时执行:CommonJS组件7,我在这里销毁了事件监听");
        },
        mainpageBroadcastEvent01Handle: function (data) {
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
            console.log("组件销毁前执行:CommonJS组件7");
        },
        destroyedFn: function () {
            GlobalEventBus.$off("mainpage-broadcast-event-01", this.mainpageBroadcastEvent01Handle);
            console.log("组件销毁时执行:CommonJS组件7,我在这里销毁了事件监听");
        },
        mainpageBroadcastEvent01Handle: function (data) {
            if (data && data.msg) {
                this.mainPageMsg = data.msg;
            }
        }
    }
}