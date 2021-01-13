import Vue from "vue";
import SingleStageFloatMenu from '../../../../../common/component/float-menu/single-stage/index.js';

var myVueApp = new Vue({
    el: "#singleStageFloatMenuDemo",
    data() {
        return {
            msg: "浮动菜单-单级:右键测试",
            isShowContextmenu: false,
            contextmenuPosConfig: null,
            allContextmenuItems: [{
                    text: "在左侧插入列",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemInsertColumnFormLeft",
                    judgeAvailableMethod: "judgeIsShowInsertColumnFormLeft"
                },
                {
                    text: "在右侧插入列",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemInsertColumnFormRight",
                    judgeAvailableMethod: "judgeIsShowInsertColumnFormRight"
                },
                {
                    text: "在上方插入行",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemInsertRowFormTop",
                    judgeAvailableMethod: "judgeIsShowInsertRowFormTop"
                },
                {
                    text: "在下方插入行",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemInsertRowFormBottom",
                    judgeAvailableMethod: "judgeIsShowInsertRowFormBottom"
                },
                {
                    text: "删除单元格-整行",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemDeleteCellWholeRow",
                    judgeAvailableMethod: "judgeIsShowDeleteCellWholeRowColumn"
                },
                {
                    text: "删除单元格-整列",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemDeleteCellWholeColumn",
                    judgeAvailableMethod: "judgeIsShowDeleteCellWholeRowColumn"
                },
                {
                    text: "合并单元格",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemMergeCell",
                    judgeAvailableMethod: "judgeIsShowMergeCell"
                },
                {
                    text: "拆分单元格",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemSplitCell",
                    judgeAvailableMethod: "judgeIsShowSplitCell"
                }
            ],
            clickItemMsg: ""
        }
    },
    components: {
        ss: SingleStageFloatMenu
    },
    methods: {
        divRightClickFn(event) {
            this.isShowContextmenu = false;
            this.$nextTick(() => {
                this.isShowContextmenu = true;
                this.contextmenuPosConfig = {
                    pageX: event.pageX,
                    pageY: event.pageY,
                    margin: 10
                };
            });
        },
        contextmenuItemClickFn(item, event) {
            this.clickItemMsg = "你点击的是：" + item.text;
            this.isShowContextmenu = false;
        }
    }
});