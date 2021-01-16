import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import wordtableComponent from '../../../../../common/component/layout/wordtable/index.js';

import {
    FlexContainer,
    FlexContainerSet
} from '../../../../../common/component/layout/flex-container/index.js';
import {
    DisplayText,
    DisplayTextSet
} from '../../../../../common/component/other/display-text/index.js';
Vue.use(FlexContainer);
Vue.use(FlexContainerSet);
Vue.use(DisplayText);
Vue.use(DisplayTextSet);

var myVueApp = new Vue({
    el: "#wordTableDemo",
    data() {
        return {
            wordTableMode: "runtime", // designtime | runtime
            wordTableLayoutMode: "height", // auto | height
            wordTableCells: [],
            wordTableCellContentObj: {},
            isShowSelectFormItemControlDialog: false,
            tempSelectedItemObj: {
                posId: "",
                type: ""
            },
            controlSet: {
                isOpen: false,
                title: "",
                cellId: "",
            }
        }
    },
    watch: {
        "wordTableCells.length": {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    //  ！！！这里需要注意wordTableCellContentObj包含的可能要比wordTableCells多 ！！！
                    [].forEach.call(this.wordTableCells, (cellItem) => {
                        if (!this.wordTableCellContentObj.hasOwnProperty(cellItem.id)) {
                            var tempBusinessObj = {
                                pos: Object.assign({}, cellItem),
                                containerConfig: null,
                                contentConfig: null
                            };
                            Vue.set(this.wordTableCellContentObj, cellItem.id, tempBusinessObj);
                        }
                    });
                }
            },
        },
    },
    components: {
        wordtable: wordtableComponent
    },
    methods: {
        getComponentInitConfig() {
            var retObj = {
                displayType: this.tempSelectedItemObj.type,
                displayName: "",
                componentName: "",
                setComponentName: "",
                props: {
                    value: null,
                    label: {
                        show: true,
                        text: "",
                        direction: "left"
                    },
                },
            };
            switch (this.tempSelectedItemObj.type) {
                case "display-text": {
                    retObj.displayName = "展示文本";
                    retObj.componentName = "DisplayText";
                    retObj.setComponentName = "DisplayTextSet";
                    retObj.props.value = "我是文本组件，你想要展示什么……";
                    retObj.props.label.show = false;
                    retObj.props.uStyle = {};
                    break;
                }
                case "flex-container": {
                    retObj = {
                        displayType: this.tempSelectedItemObj.type,
                        displayName: "flex水平容器",
                        componentName: "FlexContainer",
                        setComponentName: "FlexContainerSet",
                        props: {
                            value: []
                        },
                    };
                    break;
                }
                case "text": {
                    retObj.displayName = "单行文本框";
                    retObj.componentName = "elInput";
                    retObj.setComponentName = "";
                    retObj.props.value = "";
                    retObj.props.label = "文本框";
                    retObj.props["type"] = "text";
                    retObj.props["placeholder"] = "请输入文本";
                    break;
                }
                case "number": {
                    retObj.displayName = "";
                    retObj.componentName = "elInput";
                    retObj.setComponentName = "";
                    retObj.props.value = "";
                    retObj.props.label = "数值";
                    retObj.props["type"] = "number";
                    retObj.props["placeholder"] = "请输入数字";
                    break;
                }
                case "email": {
                    retObj.displayName = "";
                    retObj.componentName = "elInput";
                    retObj.setComponentName = "";
                    retObj.props.value = "";
                    retObj.props.label = "邮箱";
                    retObj.props["type"] = "email";
                    retObj.props["placeholder"] = "请输入邮箱";
                    break;
                }
                case "textarea": {
                    retObj.displayName = "";
                    retObj.componentName = "elInput";
                    retObj.setComponentName = "";
                    retObj.props.value = "";
                    retObj.props.label = "多行文本框";
                    retObj.props["type"] = "textarea";
                    retObj.props["placeholder"] = "请输入";
                    break;
                }
                case "counter": {
                    retObj.displayName = "";
                    retObj.componentName = "elInputNumber";
                    retObj.setComponentName = "";
                    retObj.props.value = "";
                    retObj.props.label = "计数器";
                    retObj.props["min"] = 0;
                    retObj.props["max"] = 10;
                    retObj.props["step"] = 2;
                    break;
                }
                case "switch": {
                    retObj.displayName = "";
                    retObj.componentName = "elSwitch";
                    retObj.setComponentName = "";
                    retObj.props.value = "";
                    retObj.props.label = "开关";
                    retObj.props["active-color"] = "#13ce66";
                    retObj.props["inactive-color"] = "#ff4949";
                    break;
                }
                case "timeselect": {
                    retObj.displayName = "";
                    retObj.componentName = "elTimeSelect";
                    retObj.setComponentName = "";
                    retObj.props.value = "";
                    retObj.props.label = "时间";
                    retObj.props["placeholder"] = "请选择时间";
                    retObj.props["picker-options"] = {
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                    };
                    break;
                }
                case "datepicker": {
                    retObj.displayName = "";
                    retObj.componentName = "elDatePicker";
                    retObj.setComponentName = "";
                    retObj.props.value = "";
                    retObj.props.label = "日期";
                    retObj.props["type"] = "date";
                    retObj.props["placeholder"] = "请选择日期";
                    break;
                }
            }
            return retObj;
        },
        openDialogToSelectControl(posId) {
            this.tempSelectedItemObj.posId = posId;
            this.tempSelectedItemObj.type = "";
            if (this.wordTableCellContentObj.hasOwnProperty(posId) &&
                this.wordTableCellContentObj[posId].contentConfig &&
                Object.hasOwnProperty.call(this.wordTableCellContentObj[posId].contentConfig, "displayType") &&
                this.wordTableCellContentObj[posId].contentConfig.displayType) {
                this.tempSelectedItemObj.type = this.wordTableCellContentObj[posId].contentConfig.displayType;
            }
            this.isShowSelectFormItemControlDialog = true;
        },
        cancalToselectOneControlToCell() {
            this.tempSelectedItemObj.posId = "";
            this.tempSelectedItemObj.type = "";
            this.isShowSelectFormItemControlDialog = false;
        },
        selectOneControlToCell() {
            if (this.tempSelectedItemObj.posId &&
                this.wordTableCellContentObj.hasOwnProperty(this.tempSelectedItemObj.posId)) {
                var initObj = this.getComponentInitConfig();
                Vue.set(this.wordTableCellContentObj[this.tempSelectedItemObj.posId], "containerConfig", {});
                Vue.set(this.wordTableCellContentObj[this.tempSelectedItemObj.posId], "contentConfig", initObj);
            }
            this.cancalToselectOneControlToCell();
        },
        openControlSetting(cell) {
            if (!(this.wordTableCellContentObj.hasOwnProperty(cell.id) &&
                    this.wordTableCellContentObj[cell.id].contentConfig &&
                    this.wordTableCellContentObj[cell.id].contentConfig.componentName)) {
                alert("请选择控件");
                return;
            }
            this.controlSet.title = this.wordTableCellContentObj[cell.id].contentConfig.displayName + "设置";
            this.controlSet.isOpen = true;
            this.controlSet.cellId = cell.id;
        },
        toggleWordTableMode(mode) {
            this.wordTableMode = mode;
        },
        getTableCellConfig() {
            let realValidConfig = {};
            this.wordTableCells.forEach(cell => {
                if (this.wordTableCellContentObj.hasOwnProperty(cell.id)) {
                    realValidConfig[cell.id] = this.wordTableCellContentObj[cell.id];
                }
            });
            console.log(JSON.stringify(realValidConfig));
        },
        selectJSONFileUpload(event) {
            if (!event.target.files.length) return;
            const fileReader = new FileReader();
            fileReader.readAsText(event.target.files[0]);
            fileReader.onerror = (error) => {
                alert(JSON.stringify(error));
            };
            fileReader.onload = () => {
                try {
                    this.wordTableCellContentObj = JSON.parse(fileReader.result);
                    this.wordTableCells = [];
                    for (const key in this.wordTableCellContentObj) {
                        if (this.wordTableCellContentObj.hasOwnProperty(key)) {
                            this.wordTableCells.push(this.wordTableCellContentObj[key].pos);
                        }
                    }
                } catch (error) {
                    alert(JSON.stringify(error));
                }
            };
        }
    },
    created() {
        //  这里的路径是html相对于crf.json文件的路径，即在html页面引入JSON文件的相对路径
        //      如果按照本js的相对路径(../mock/crf.json)写最后请求的路径为
        //      域名或者IP:端口/demo/component/layout/mock/crf.json 
        fetch("./mock/crf.json").then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(responseData => {
            this.wordTableCellContentObj = responseData;
            for (const key in this.wordTableCellContentObj) {
                if (this.wordTableCellContentObj.hasOwnProperty(key)) {
                    this.wordTableCells.push(this.wordTableCellContentObj[key].pos);
                }
            }
        });
    },
});