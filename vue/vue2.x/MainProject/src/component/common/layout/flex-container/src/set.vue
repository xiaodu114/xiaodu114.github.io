<template>
    <div class="layout-flex-container-set">
        <p>
            <select
                v-model="selectedItem"
                @change="selectedItemChange"
            >
                <option
                    v-for="(itemContainer,index) in config.value"
                    :value="itemContainer"
                    :key="index"
                >
                    {{ index }}
                </option>
            </select>
            <button
                type="button"
                @click="addOneItem"
            >添加一个</button>
            <button
                type="button"
                @click="delSelectedItem"
            >删除一个</button>
        </p>
        <fieldset>
            <legend>容器组件设置</legend>
            <template v-if="selectedItem && selectedItem.containerConfig">
                <formiteminneruse :show-label="1 === 1">
                    <template #label> 外边距 </template>
                    <template #default>
                        <fourdirectioninneruse
                            :key="selectedItem.pos.id"
                            :all-attr.sync="selectedItem.containerConfig.uStyle.margin"
                            :top-attr.sync="selectedItem.containerConfig.uStyle.marginTop"
                            :right-attr.sync="selectedItem.containerConfig.uStyle.marginRight"
                            :bottom-attr.sync="selectedItem.containerConfig.uStyle.marginBottom"
                            :left-attr.sync="selectedItem.containerConfig.uStyle.marginLeft"
                            :units="['pt', 'px','%', 'em']"
                            :default-values="['auto','0','inherit', 'initial', 'unset']"
                        ></fourdirectioninneruse>
                    </template>
                </formiteminneruse>
            </template>
        </fieldset>
        <fieldset>
            <legend>内容组件设置</legend>
            <p>
                <select
                    v-model="selectedContentDisplayType"
                    @change="selectedContentDisplayTypeChange"
                >
                    <option value="displaytext">展示文本</option>
                    <option value="text">单行文本框</option>
                </select>
            </p>
            <div
                class=""
                v-if="selectedItem && selectedItem.contentConfig && selectedItem.contentConfig.setComponentName"
            >
                <component
                    :key="selectedItem.pos.id"
                    :is="selectedItem.contentConfig.setComponentName"
                    :config="selectedItem.contentConfig.props"
                >
                </component>
            </div>
        </fieldset>
    </div>
</template>
<script>
import formiteminneruse from "../../../form/form-item/index.js";
import fourdirectioninneruse from "../../../style/four-direction/index.js";
export default {
    name: "FlexContainerSet",
    props: {
        config: {
            type: Object,
        },
    },
    data() {
        return {
            selectedItem: null,
            selectedContentDisplayType: null,
        };
    },
    components: {
        fourdirectioninneruse,
        formiteminneruse,
    },
    created() {
        this.selectedItem = null;
    },
    methods: {
        addOneItem() {
            if (this.config && Array.isArray(this.config.value)) {
                this.config.value.push({
                    pos: { id: new Date().valueOf() },
                    containerConfig: { uStyle: {} },
                    contentConfig: null,
                });
            }
        },
        delSelectedItem() {
            if (
                Array.isArray(this.config.value) &&
                this.config.value.length &&
                this.selectedItem
            ) {
                var delIndex = [].findIndex.call(
                    this.config.value,
                    (item) => item === this.selectedItem
                );
                if (delIndex >= 0) {
                    this.selectedItem = null;
                    this.config.value.splice(delIndex, 1);
                }
            }
        },
        selectedItemChange() {
            this.selectedContentDisplayType = null;
            if (
                this.selectedItem &&
                this.selectedItem.contentConfig &&
                this.selectedItem.contentConfig.displayType
            ) {
                this.selectedContentDisplayType = this.selectedItem.contentConfig.displayType;
            }
        },
        selectedContentDisplayTypeChange() {
            if (this.selectedItem) {
                var initObj = null;
                switch (this.selectedContentDisplayType) {
                    case "displaytext": {
                        initObj = {
                            displayType: this.selectedContentDisplayType,
                            displayName: "展示文本设置",
                            componentName: "displayText",
                            setComponentName: "displayTextSet",
                            props: {
                                value: "我是文本组件，你想要展示什么……",
                                uStyle: {},
                            },
                        };
                        break;
                    }
                    case "text": {
                        initObj = {
                            displayType: this.selectedContentDisplayType,
                            displayName: "单行文本框",
                            componentName: "elInput",
                            setComponentName: "",
                            props: {
                                value: "",
                                label: "",
                                type: "text",
                                placeholder: "",
                            },
                        };
                        break;
                    }
                }
                Vue.set(this.selectedItem, "contentConfig", initObj);
            }
        },
    },
};
</script>
<style lang="less">
.layout-flex-container-set {
    height: 100%;
    overflow-y: auto;
}
</style>