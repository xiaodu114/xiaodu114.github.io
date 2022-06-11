module.exports = {
    data: {
        title: "测试组件的生命周期",
        createdData: "",
        beforeMountData: "",
        mountedData: "",
        beforeUpdateData: "虽然我想在钩子函数beforeUpdate中赋值，但是最好不要这样，至少data中的属性每次修改都会触发该钩子函数，如果在beforeUpdate方法中给我一个随机数……欧呦，你的页面会崩溃的",
        updatedData: "同上"
    },
    methods: {
        // 模拟生命周期方法
        createdFn: function () {
            this.createdData = "我是在钩子函数created中赋值的";
        },
        beforeMountFn: function () {
            this.beforeMountData = "我是在钩子函数beforeMount中赋值的";
        },
        mountedFn: function () {
            this.mountedData = "我是在钩子函数mounted中赋值的";
        },
        beforeUpdateFn: function () {
            console.log("模拟钩子函数beforeUpdate：" + Math.random());
        },
        updatedFn: function () {
            console.log("模拟钩子函数updated：" + Math.random());
        },
        beforeDestroyFn: function () {
            console.log("组件销毁前执行");
        },
        destroyedFn: function () {
            console.log("组件销毁时执行");
        },
        // 自定义方法
        clickFn1() {
            this.title = "测试组件的生命周期" + Math.random();
        }
    }
}