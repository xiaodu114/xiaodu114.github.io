module.exports = {
    data: {
        title: "看我如何获取上下文信息",
        contextInfo: null,
        preText:
`module.exports = {
    data: {
        title: "看我如何获取上下文信息",
        contextInfo: null,
        preText:""
    },
    methods: {
        createdFn: function () {
            if (GlobalStore) {
                if (GlobalStore.contextInfo) {
                    this.contextInfo = JSON.stringify(GlobalStore.contextInfo);
                }
            }
        }
    }
} 
`
    },
    methods: {
        createdFn: function () {
            if (GlobalStore) {
                if (GlobalStore.contextInfo) {
                    this.contextInfo = JSON.stringify(GlobalStore.contextInfo);
                }
            }
        }
    }
} 