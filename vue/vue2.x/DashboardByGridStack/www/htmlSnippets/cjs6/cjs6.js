module.exports = {
    data: {
        title: "我关注了我的兄弟，CJS5",
        cjs5Msg: "监听中……",
        preText:
`module.exports = {
    data: {
        title: "我关注了我的兄弟，CJS5",
        cjs5Msg: "监听中……",
        preText:""
    },
    methods: {
        createdFn: function () {
            var _this = this;
            if (GlobalEventBus) {
                GlobalEventBus.$on("cjs5-sendEvent-01", function (data) {
                    if (data && data.msg) {
                        _this.cjs5Msg = data.msg;
                    }
                });
            }
        }
    }
} 
`
    },
    methods: {
        createdFn: function () {
            var _this = this;
            if (GlobalEventBus) {
                GlobalEventBus.$on("cjs5-sendEvent-01", function (data) {
                    if (data && data.msg) {
                        _this.cjs5Msg = data.msg;
                    }
                });
            }
        }
    }
} 