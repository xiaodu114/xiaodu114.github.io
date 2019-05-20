import Vue from 'vue';
import listItemView from './Components/listItemView.vue';
import './CSS/index.less';
import deepExtend from 'deep-extend';
var myApp = new Vue({
    el: "#myApp",
    data() {
        return {
            formItemsObj: {}, // 表单项配置对象形式
            twoDevObj: null,
            showItems: [],
            // 二次开发可以重写以下配置
            tplConfig: null,
            // 演示时使用
            selectedModel: null,
            showModels: [{
                    name: "车辆基本信息",
                    code: "CarInfo",
                    formConfigPath: "./FormConfigData/CarInfo.json",
                    titleFieldId: "1548245360015"
                },
                {
                    name: "出车记录-内联模板",
                    code: "DispatchRecord",
                    formConfigPath: "./FormConfigData/DispatchRecord.json",
                    titleFieldId: "1557302467935"
                },
                {
                    name: "出车记录-html文件",
                    code: "DispatchRecord",
                    formConfigPath: "./FormConfigData/DispatchRecord-html.json",
                    titleFieldId: "1557302467935"
                },
                {
                    name: "维护记录-内联",
                    code: "MaintenanceRecord",
                    formConfigPath: "./FormConfigData/MaintenanceRecord.json",
                    titleFieldId: "1557302039597"
                },
                {
                    name: "维护记录-单文件组件",
                    code: "MaintenanceRecord",
                    formConfigPath: "./FormConfigData/MaintenanceRecord-singlefile.json",
                    titleFieldId: "1557302039597"
                },
            ]
        }
    },
    methods: {
        /**
         * 演示使用，切换配置
         */
        selectedModelChanged() {
            this.showItems = [];
            this.initTplConfig();
            this.tplConfig.header.title = this.selectedModel.name;
            this.getFormConfig();
        },
        /**
         * 默认列表项点击事件
         * @param { Object } item 实例数据对象
         */
        listItemClickFn(item) {
            alert("列表项默认点击事件,我会跳转到详情页面……");
        },
        /**
         * 获取列表数据源
         */
        getListData() {
            // 模拟发送API请求
            fetch("./FormData/InstanceData.json").then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((datas) => {
                if (Array.isArray(datas) && datas.length) {
                    var tempCarInfos = datas.filter(tr => tr.TableCode === this.selectedModel.code);
                    var tempTrs = [];
                    if (tempCarInfos.length) {
                        tempCarInfos.map((tr) => {
                            var tempTr = {};
                            for (const key in tr) {
                                if (tr.hasOwnProperty(key)) {
                                    if (key === "formItems") {
                                        [].map.call(tr.formItems, (field) => {
                                            tempTr[field.key] = field.value;
                                        });
                                    } else {
                                        tempTr[key] = tr[key];
                                    }
                                }
                            }
                            tempTr.title = tempTr[this.selectedModel.titleFieldId];
                            tempTrs.push(tempTr);
                        });
                    }
                    this.showItems = tempTrs;
                }
            });
        },
        handleGetFormConfigBehindLogic() {
            this.getListData();
        },
        /**
         * 注册二次开发列表项组件
         */
        registerTwoDevListItemViewComponent() {
            return new Promise((resolve, reject) => {
                //  第一版——这个应该是走不通的
                // Vue.component(this.tplConfig.body.listItemView.componentConfig.name, () =>
                //     import ( /* webpackIgnore: true */ url));
                if (this.tplConfig.body.listItemView.componentConfig.vueFilePath) {
                    //  第三版——二次开发返回.vue文件的路径，在这里请求，解析并注册组件
                    //  这里几个问题需要解决
                    //  0、去服务器请求一个vue文件（这里用的是IIS），开始请求报404，发现没有对应的MIME类型,添加上就可以了🙂🙂🙂🙂🙂🙂
                    //      0.1、.vue -> text/plain
                    //  1、解析文件中Script标签下的内容（可能是ES6+又可能是TS……）,尝试了好几种方式，也查了好多资料😢😢😢😢😢😢
                    //      1.1、eval 
                    //      1.2、new Function()
                    //      1.3、@babel/core之transform
                    //      1.4、@babel/parser
                    //      1.5、acorn
                    //      1.6、UglifyJS
                    //          1.6.1、https://github.com/mishoo/UglifyJS2/
                    //          1.6.2、https://www.uglifyjs.net/
                    //      道路相当坎坷，最后简单实现了以下；先用babal转一下，在使用new Function()
                    //      参考网址：https://github.com/amio/require-cjs-string          
                    //  2、解析文件中Style标签下的内容（可能是less又可能是scss……）😢😢😢😢😢😢
                    //      2.1、将非css转为css
                    //      2.2、scope未实现
                    //  3、如果上面个的两种都解决了，还有性能的问题……😢😢😢😢😢😢
                    //      也就是说编译.vue文件做的所有事情需要在浏览器环境进行一遍。说来惭愧其实看了一点vue-loader是怎么处理.vue文件的，
                    //  了解之后看看有没有对应的浏览器版本，很遗憾没看懂😢😢😢😢😢😢
                    fetch(this.tplConfig.body.listItemView.componentConfig.vueFilePath).then((response) => {
                        if (response.ok) {
                            return response.text();
                        }
                    }).then((data) => {
                        var tempTemplateDomStr = "",
                            tempComponentScriptStr = "";
                        if (data) {
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = data;
                            if (tempDiv.children.length) {
                                [].map.call(tempDiv.children, (tempDivCh) => {
                                    if (tempDivCh.tagName === "TEMPLATE") {
                                        tempTemplateDomStr = tempDivCh.innerHTML;
                                    }
                                    if (tempDivCh.tagName === "SCRIPT") {
                                        tempComponentScriptStr = tempDivCh.innerHTML;
                                    }
                                    if (tempDivCh.tagName === "STYLE") {
                                        var tempStyleLang = tempDivCh.getAttribute("lang");
                                        if (tempStyleLang === null || tempStyleLang === "css") {
                                            if (tempDivCh.innerHTML) {
                                                var tempStyleElement = document.createElement("style");
                                                tempStyleElement.type = "text/css";
                                                tempStyleElement.innerHTML = tempDivCh.innerHTML;
                                                document.getElementsByTagName("head")[0].appendChild(tempStyleElement);
                                            }
                                        }

                                    }
                                });
                            }
                        }
                        if (Babel && tempComponentScriptStr) {
                            var output = Babel.transform(tempComponentScriptStr, {
                                presets: ['es2015']
                            }).code;
                            var _fn = new Function('module', 'exports', output);
                            var _module = {
                                exports: {}
                            };
                            _fn(_module, _module.exports);
                            var tempComponentOption = {};
                            if (tempTemplateDomStr) {
                                tempComponentOption = {
                                    template: tempTemplateDomStr
                                };
                            }
                            if (getDataType(tempComponentOption) === "object") {
                                tempComponentOption = deepExtend({}, _module.exports.default, tempComponentOption);
                            }
                            Vue.component(this.tplConfig.body.listItemView.componentConfig.name, tempComponentOption);
                        } else if (tempTemplateDomStr) {
                            Vue.component(this.tplConfig.body.listItemView.componentConfig.name, () => {
                                return new Promise((resolve, reject) => {
                                    resolve({
                                        template: tempTemplateDomStr
                                    });
                                });
                            });
                        }
                        resolve({});
                    }, (error) => {
                        console.log("请求单文件组件失败：" + JSON.stringify(error));
                    });
                } else if (getDataType(this.tplConfig.body.listItemView.componentConfig.option) === "object") {
                    //  第二版
                    var tempDefaultComponentProps = {
                            item: {
                                type: Object,
                                required: true
                            },
                            formConfig: {
                                type: Object,
                                required: true
                            }
                        },
                        tempCustomComponentPropsType = getDataType(this.tplConfig.body.listItemView.componentConfig.option.props);
                    if (tempCustomComponentPropsType === "object") {
                        deepExtend(this.tplConfig.body.listItemView.componentConfig.option.props, tempDefaultComponentProps);
                    } else if (tempCustomComponentPropsType === "array") {} else {
                        this.tplConfig.body.listItemView.componentConfig.option.props = tempDefaultComponentProps;
                    }
                    Vue.component(this.tplConfig.body.listItemView.componentConfig.name, () => {
                        return new Promise((resolve, reject) => {
                            resolve(this.tplConfig.body.listItemView.componentConfig.option);
                        });
                    });
                    resolve({});
                }
            });
        },
        /**
         * 处理二次开发的相关逻辑
         */
        handleTwoDevLogic() {
            if (this.twoDevObj && getDataType(this.twoDevObj.loadedFormCofig) === "function") {
                //调用二次开发方法：loadedFormCofig；
                //表单配置加载完成时调用，即二次开发中可以访问表单配置（可以修改）
                var retloadedFormCofig = this.twoDevObj.loadedFormCofig(this, {});
                if (getDataType(retloadedFormCofig) === "promise") {
                    retloadedFormCofig.then((data) => {
                        var tempAllPromises = [];
                        if (data) {
                            if (getDataType(data.tplConfig) === "object") {
                                //二次开发返回的配置覆盖默认配置
                                deepExtend(this.tplConfig, data.tplConfig);
                                switch (this.tplConfig.body.listItemView.type) {
                                    case "component": //自定义列表项视图——组件方式
                                        {
                                            if (this.tplConfig.body.listItemView.componentConfig.name === "list-item-view") {
                                                this.tplConfig.body.listItemView.componentConfig.name = "user-custom-item-view";
                                            }
                                            tempAllPromises.push(this.registerTwoDevListItemViewComponent());
                                            break;
                                        }
                                    case "html": //自定义列表项视图——传入Html模板（内置的列表组件支持）
                                        {
                                            break;
                                        }
                                    case "default": //采用列表项默认视图
                                    default:
                                        {
                                            break;
                                        }
                                }
                            }
                        }
                        if (tempAllPromises.length) {
                            Promise.all(tempAllPromises).then((retAll) => {
                                this.handleGetFormConfigBehindLogic();
                            }, (error) => {
                                alert(JSON.stringify(error));
                            });
                        } else {
                            this.handleGetFormConfigBehindLogic();
                        }
                    }, (error) => {
                        console.log(JSON.stringify(error));
                        this.handleGetFormConfigBehindLogic();
                    });
                } else {
                    this.handleGetFormConfigBehindLogic();
                }
            } else {
                this.handleGetFormConfigBehindLogic();
            }
        },
        /**
         * 获取二次开发require模块
         * @param {Array} jsPathArr 
         */
        getRequirejsTwoDevModule(jsPathArr) {
            return new Promise((resolve, reject) => {
                if (Array.isArray(jsPathArr) && jsPathArr.length) {
                    requirejs(jsPathArr, (modules) => {
                        if (Array.isArray(modules) && modules.length) {
                            resolve(modules[0]);
                        } else if (getDataType(modules) === "object") {
                            resolve(modules);
                        } else {
                            resolve(null);
                        }
                    }, (error) => {
                        console.log(JSON.stringify(error));
                        resolve(null);
                    });
                } else {
                    resolve(null);
                }
            });
        },
        /**
         * 获取二次开发ES6模块（建议）
         * @param {Array} jsPathArr 
         */
        getES6TwoDevModule(jsPathArr) {
            return new Promise((resolve, reject) => {
                if (Array.isArray(jsPathArr) && jsPathArr.length) {
                    var tempPromiseArr = jsPathArr.map(path =>
                        import ( /* webpackIgnore: true */ path));
                    Promise.all(tempPromiseArr).then((modules) => {
                        if (Array.isArray(modules) && modules.length) {
                            if (getDataType(modules[0]) === "module" && getDataType(modules[0].default) === "object") {
                                resolve(modules[0].default);
                            }
                        } else {
                            resolve(null);
                        }
                    }, (error) => {
                        console.log(JSON.stringify(error));
                        resolve(null);
                    });
                } else {
                    resolve(null);
                }
            });
        },
        getTwoDevJSFromConfig(formConfig) {
            if (formConfig.extandConfig &&
                formConfig.extandConfig.list &&
                formConfig.extandConfig.list.mobile &&
                Array.isArray(formConfig.extandConfig.list.mobile.js)) {
                return formConfig.extandConfig.list.mobile.js;
            }
            return [];
        },
        /**
         * 获取表单配置
         */
        getFormConfig() {
            // 模拟在数据库中读取表单的配置
            fetch(this.selectedModel.formConfigPath).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((formConfig) => {
                if (formConfig) {
                    if (Array.isArray(formConfig.formItems) && formConfig.formItems.length) {
                        [].map.call(formConfig.formItems, (field) => {
                            this.formItemsObj[field.id] = field;
                        });
                    } else {
                        console.error("该表单配置中不存在表单项！");
                        return false;
                    }
                    // 处理二次开发
                    var tempTwoDevJSArr = this.getTwoDevJSFromConfig(formConfig);
                    this.getES6TwoDevModule(tempTwoDevJSArr).then((retTwoDevObj) => {
                        this.twoDevObj = retTwoDevObj;
                        this.handleTwoDevLogic();
                    });
                } else {
                    console.error("获取表单配置信息失败！");
                }
            });
        },
        initTplConfig() {
            this.tplConfig = {
                pageTpl: "", // 整个列表页面完全重写
                header: {
                    tpl: "", // 重写页面的页头部分
                    title: "", // 如果tpl传入，则该属性不起作用
                },
                body: {
                    toolbar: {
                        tpl: "", //重写页面的工具条部分
                        leftTpl: "", //重写页面的工具条的左侧部分
                        rightTpl: "" //重写页面的工具条的右侧部分
                    },
                    listItemView: { //列表项展示配置
                        type: "default", // default|html|component
                        htmlConfig: { // 如果“type”是html类型时使用该配置
                            isNeedItemClick: true,
                            tpl: "", // 如果为空，使用默认模板
                            bindData: {} // 将此对象中的属性、方法绑定到组件的this上
                        },
                        componentConfig: { // 如果“type”是component类型时使用该配置
                            name: "list-item-view", // 组件名称可以为空，默认为“user-custom-item-view”,
                            vueFilePath: "", //如果是但文件组件，这里是.vue文件的路径
                            option: null // 和上面的二选一，这里是组件的配置选型
                        }
                    },
                },
                footer: {
                    tpl: "" // 重写页面的页尾部分
                }
            }
        }
    },
    components: {
        listItemView
    },
    beforeCreate() {},
    created() {
        this.selectedModel = this.showModels[0];
        this.initTplConfig();
        this.tplConfig.header.title = this.selectedModel.name;
        this.getFormConfig();
    }
});