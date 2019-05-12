export default {
    loadedFormCofig() {
        // 维护记录 二次开发JS
        return new Promise((resolve, reject) => {
            resolve({
                tplConfig: {
                    body: {
                        listItemView: { //列表项展示配置
                            type: "component", // default|html|component
                            componentConfig: { // 如果“type”是component类型时使用该配置
                                name: "maintenancerecordListitemview", // 组件名称可以为空，默认为“user-custom-item-view”
                                vueFilePath: "./TwoDev/MaintenanceRecord/MaintenanceRecordListItemView.vue"
                            }
                        },
                    }
                }
            });
        });
    }
}