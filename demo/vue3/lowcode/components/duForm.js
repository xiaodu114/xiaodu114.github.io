import { ref, h, computed, resolveComponent, isReactive } from "vue";

import getUILibExtend from "../libExtend/index.js";

const { compPropsName, formType2Comp } = getUILibExtend();

function getComponentBind(item, formModel, valueChangeHandler) {
    const bind = {};
    const typeComp = formType2Comp[item.type];

    let vModelValue = "modelValue";
    let vModelEvents = ["onInput"]; //  oninput 也可以，但是需要使用 event.target.value 取值
    if (typeComp && typeComp.vModel) {
        if (typeComp.vModel.value) {
            vModelValue = typeComp.vModel.value;
        }
        if (typeof typeComp.vModel.event === "string" && typeComp.vModel.event.length > 0) {
            vModelEvents = [typeComp.vModel.event];
        } else if (Array.isArray(typeComp.vModel.event) && typeComp.vModel.event.length > 0) {
            vModelEvents = typeComp.vModel.event;
        }
    }

    function vModelEventHandler(value) {
        const newValue = typeof typeComp?.vModel?.handleChangeValue === "function" ? typeComp.vModel.handleChangeValue(value) : value;
        formModel[item.code] = newValue;

        if (typeof valueChangeHandler === "function") {
            valueChangeHandler(item.code, newValue, formModel);
        }
    }

    bind[vModelValue] = formModel[item.code];
    vModelEvents.forEach((vModelEvent) => {
        bind[vModelEvent] = vModelEventHandler;
    });

    if (item.control && typeof item.control.props === "object" && item.control.props !== null) {
        Object.assign(bind, item.control.props);
    }

    return bind;
}

const DuForm = {
    name: "DuForm",
    props: {
        isGird: {
            type: Boolean,
            default: () => true
        },
        formBind: {
            type: Object,
            default: () => ({})
        },
        formItems: {
            type: Array,
            default: () => []
        },
        formExtend: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ["du-form-value-change"],
    setup(props, { slots, attrs, expose, emit }) {
        const formId = props.formBind["du-form-id"];
        const formRef = ref(null);
        const localFormModel = props.formBind[compPropsName.form.formData];
        console.log(isReactive(localFormModel));

        function afterFieldValueChange(code, value, formModel) {
            let isTriggerChange = false;
            if (props.formExtend?.listenChange?.isOpen) {
                if (Array.isArray(props.formExtend.listenChange.codes)) {
                    if (props.formExtend.listenChange.codes.includes(code)) {
                        isTriggerChange = true;
                    }
                } else {
                    isTriggerChange = true;
                }
            }
            if (isTriggerChange) {
                emit("du-form-value-change", {
                    code,
                    value,
                    formId,
                    formModel,
                    formItemBindings,
                    componentBindings
                });
            }
        }

        const rows = computed(() => {
            const retArr = [];
            const maxRow = Math.max(...props.formItems.map((item) => item.pos.endRow));
            const maxCol = Math.max(...props.formItems.map((item) => item.pos.endCol));
            const weakMap = new WeakMap();
            for (let row = 1; row <= maxRow; row++) {
                const tr = [];
                for (let col = 1; col <= maxCol; col++) {
                    const formItem = props.formItems.find((item) => row >= item.pos.startRow && row <= item.pos.endRow && col >= item.pos.startCol && col <= item.pos.endCol);
                    if (formItem && !weakMap.has(formItem)) {
                        tr.push({
                            startRow: formItem.pos.startRow,
                            startCol: formItem.pos.startCol,
                            rowspan: formItem.pos.endRow - formItem.pos.startRow,
                            colspan: formItem.pos.endCol - formItem.pos.startCol,
                            formItem: formItem
                        });
                        weakMap.set(formItem, 1);
                    }
                }
                retArr.push(tr);
            }
            return retArr;
        });

        const formItemBindings = computed(() => {
            const obj = {};
            props.formItems.forEach((item) => {
                obj[item.id] = item.label.props || {};
            });
            return obj;
        });

        const componentBindings = computed(() => {
            const obj = {};
            props.formItems.forEach((item) => {
                obj[item.id] = getComponentBind(item, localFormModel, afterFieldValueChange);
            });
            return obj;
        });

        function resetForm() {
            if (!formRef) return;
            formRef.value.resetFields();
        }

        function validateForm() {
            if (!formRef) return;
            return new Promise((resolve, reject) => {
                formRef.value.validate((valid, fields) => {
                    resolve({ valid, fields });
                });
            });
        }

        expose({
            validateForm,
            resetForm
        });

        // 就像在 <script setup> 中一样使用组合式 API
        // render(_ctx, _cache, props, setupRet, $data, $options){}
        return (a, b, c, d, e, f) => {
            let children = null;
            if (props.isGird) {
                const trs = rows.value.map((tr, trIndex) => {
                    const tds = tr.map((td, tdIndex) => {
                        const formItem = td.formItem;
                        const slotName = `form-item-${formItem.id}`;
                        const slotProps = {
                            model: localFormModel,
                            formItem
                        };
                        return h(
                            "td",
                            {
                                rowspan: td.rowspan,
                                colspan: td.colspan
                            },
                            [slots[slotName] ? slots[slotName](slotProps) : h(resolveComponent(compPropsName.formItem.compName), formItemBindings.value[formItem.id], [h(resolveComponent(formItem.control.compName), componentBindings.value[formItem.id], formItem.control.slots && Object.keys(formItem.control.slots).length > 0 ? formItem.control.slots : null)])]
                        );
                    });
                    return h("tr", null, tds);
                });
                children = h("table", { class: "form-layout-table" }, h("tbody", null, trs));
            } else {
                children = props.formItems.map((formItem) => {
                    const slotName = `form-item-${formItem.id}`;
                    const slotProps = {
                        model: localFormModel,
                        formItem
                    };
                    return slots[slotName] ? slots[slotName](slotProps) : h(resolveComponent(compPropsName.formItem.compName), formItemBindings.value[formItem.id], [h(resolveComponent(formItem.control.compName), componentBindings.value[formItem.id], formItem.control.slots && Object.keys(formItem.control.slots).length > 0 ? formItem.control.slots : null)]);
                });
            }

            return h(resolveComponent(compPropsName.form.compName), { ...props.formBind, ref: formRef }, children);
        };
    }
};

export default DuForm;
