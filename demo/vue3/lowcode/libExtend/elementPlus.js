import { h, toRaw, resolveComponent } from "vue";

const compPropsName = {
    form: {
        compName: "el-form",
        formData: "model"
    },
    formItem: {
        compName: "el-form-item",
        modelKey: "prop",
        validateRule: "rules"
    }
};

const formType2Comp = {
    Text: {
        name: "el-input",
        vModel: {
            value: "modelValue",
            event: "onInput",
            handleChangeValue(value) {
                return value;
            }
        },
        placeholderPrefix: "请输入"
    },
    Textarea: {
        name: "el-input",
        placeholderPrefix: "请输入",
        handleFormItem: function (formItem, dbFormItem) {
            if (!(typeof formItem.control === "object" && formItem.control !== null)) {
                formItem.control = {};
            }
            if (!(typeof formItem.control.props === "object" && formItem.control.props !== null)) {
                formItem.control.props = {};
            }
            formItem.control.props["type"] = "textarea";
        }
    },
    Number: {
        name: "el-input-number",
        vModel: {
            value: "modelValue",
            event: "onInput"
        },
        placeholderPrefix: "请输入"
    },
    Select: {
        name: "el-select",
        vModel: {
            value: "modelValue",
            event: "onChange"
        },
        placeholderPrefix: "请选择",
        handleFormItem: function (formItem, dbFormItem) {
            if (!(typeof formItem.control === "object" && formItem.control !== null)) {
                formItem.control = {};
            }
            if (!(typeof formItem.control.props === "object" && formItem.control.props !== null)) {
                formItem.control.props = {};
            }
            if (dbFormItem.config) {
                if (Array.isArray(dbFormItem.config.options) && dbFormItem.config.options.length > 0) {
                    formItem.control.props["options"] = dbFormItem.config.options;
                    formItem.control.slots = {
                        default: () => {
                            return dbFormItem.config.options.map(({ label, value }) => {
                                return h(toRaw(resolveComponent("el-option")), {
                                    key: value,
                                    label: label,
                                    value: value
                                });
                            });
                        }
                    };
                }
                if (dbFormItem.config.multiple === true) {
                    formItem.control.props["multiple"] = true;
                }
            }
        }
    },
    Date: {
        name: "el-date-picker",
        vModel: {
            value: "modelValue",
            event: "onUpdate:modelValue"
        },
        placeholderPrefix: "请选择",
        handleFormItem: function (formItem, dbFormItem) {
            if (!(typeof formItem.control === "object" && formItem.control !== null)) {
                formItem.control = {};
            }
            if (!(typeof formItem.control.props === "object" && formItem.control.props !== null)) {
                formItem.control.props = {};
            }
            formItem.control.props["type"] = "date";
        }
    }
};

function handleFormConfig(formConfig) {
    const formBind = {},
        formItems = [],
        formData = {},
        formItemIdObj = {},
        formItemCodeObj = {};
    if (formConfig) {
        const { items = [], baseInfo = {} } = formConfig;
        //  处理表单基本信息
        let isShowLabel = false;
        if (baseInfo) {
            isShowLabel = baseInfo.label && !!baseInfo.label.isShow;
            if (isShowLabel) {
                if (baseInfo.layout) {
                    formBind["inline"] = baseInfo.layout === "inline";
                }
                if (baseInfo.label.position) {
                    formBind["label-position"] = baseInfo.label.position;
                }
                if (baseInfo.label.width) {
                    formBind["label-width"] = baseInfo.label.width;
                }
            }
        }
        const { modelKey: modelKeyPropName, validateRule: validateRulesPropName } = compPropsName.formItem;
        // 处理表单项
        if (Array.isArray(items) && items.length > 0) {
            items.forEach((item) => {
                if (!Object.hasOwn(formType2Comp, item.type)) {
                    console.warn(`未找到【${item.type}】对应的组件`);
                    return;
                }
                const typeComp = formType2Comp[item.type];

                const defaultMsg = typeComp.placeholderPrefix + item.title;

                const formItem = {
                    //  表单项：基本信息
                    id: item.id,
                    code: item.code,
                    title: item.title,
                    type: item.type,
                    //  表单项：label
                    label: {
                        props: {
                            label: item.title,
                            [modelKeyPropName]: item.code,
                            [validateRulesPropName]: []
                        }
                    },
                    //  表单项：控件
                    control: {
                        compName: typeComp.name,
                        props: {
                            placeholder: defaultMsg
                        }
                        // formConfig: { items: [] }
                    },
                    //  表单项：行列位置
                    pos: item.pos
                };

                let isHasRequired = false;
                if (typeof item.config === "object" && item.config !== null) {
                    if (item.config.label?.isShow === true) {
                        formItem.label.props["labelCol"] = {
                            style: {}
                        };
                        if (item.config.label.width) {
                            formItem.label.props["labelCol"]["style"]["width"] = item.config.label.width;
                        }
                        if (item.config.label.align) {
                            formItem.label.props["labelCol"]["style"]["textAlign"] = item.config.label.align;
                        }
                    }
                    if (item.config.required === true) {
                        isHasRequired = true;
                        formItem.label.props.required = true;
                        formItem.label.props[validateRulesPropName].push({
                            required: true,
                            message: defaultMsg,
                            trigger: "change"
                        });
                    }
                    if (Array.isArray(item.config.validateRules) && item.config.validateRules.length > 0) {
                        item.config.validateRules.forEach((rule) => {
                            //  等待适配
                            formItem.label.props[validateRulesPropName].push({});
                        });
                    }
                }

                typeof typeComp.handleFormItem === "function" && typeComp.handleFormItem(formItem, item);

                formData[item.code] = null;

                formItemCodeObj[formItem.code] = formItem;
                formItemIdObj[formItem.id] = formItem;
                formItems.push(formItem);
            });
        }
    }

    formBind[compPropsName.form.formData] = formData;

    return {
        formItems,
        formData,
        formBind,
        formItemIdObj,
        formItemCodeObj
    };
}

export { compPropsName, formType2Comp, handleFormConfig };
