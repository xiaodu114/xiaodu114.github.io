import { ref, reactive } from "vue";

import getUILibExtend from "../../libExtend/index.js";

const demo1_FormConfig = {
    baseInfo: {
        label: {
            isShow: true,
            position: "top", //  left | right | top
        }
    },
    items: [
        {
            id: "1",
            code: "simpleText",
            title: "单行文本框",
            type: "Text"
        },
        {
            id: "2",
            code: "multiText",
            title: "多行文本框",
            type: "Textarea"
        },
        {
            id: "3",
            code: "number",
            title: "数字",
            type: "Number"
        },
        {
            id: "4",
            code: "simpleSelect",
            title: "单选下拉框",
            type: "Select",
            config: {
                options: [
                    {
                        value: 1,
                        label: "选项一"
                    },
                    {
                        value: 2,
                        label: "选项二"
                    },
                    {
                        value: 3,
                        label: "选项三"
                    }
                ]
            }
        },
        {
            id: "5",
            code: "multiSelect",
            title: "多选下拉框",
            type: "Select",
            config: {
                multiple: true,
                options: [
                    {
                        value: 1,
                        label: "项一"
                    },
                    {
                        value: 2,
                        label: "项二"
                    },
                    {
                        value: 3,
                        label: "项三"
                    }
                ]
            }
        },
        {
            id: "6",
            code: "date",
            title: "日期",
            type: "Date"
        }
    ]
};

export default {
    name: "form-demo1",
    template: `
    <div style="height: 100%; overflow: hidden; display: flex; flex-direction: column; padding: 1rem;">
        <h2>表单：示例一</h2>
        <div style="flex:1; overflow-y: auto; display: flex; gap: 1rem;">
            <du-form style="flex:1;" ref="duFormRef" :is-gird="false" :form-bind="formBind" :form-items="formItems"></du-form>
            <pre style="width: 345px; flex-shrink: 0;">{{formBind.model}}</pre>
        </div>
    </div>
    `,
    setup(props, { slots, attrs, expose, emit }) {
        const { handleFormConfig } = getUILibExtend();
        const formObj = handleFormConfig(demo1_FormConfig);
        formObj.formBind.model = reactive(formObj.formBind.model);
        const duFormRef = ref(null);

        return {
            duFormRef,
            formBind: formObj.formBind,
            formItems: formObj.formItems
        };
    }
};
