<template>
    <div class="layout-flex-container">
        <template>
            <div
                v-if="flexItems.length===0"
                class="flex-container-null"
            >
            </div>
            <div
                class="flex-item"
                v-for="(item,index) of flexItems"
                :key="index"
                :style="item.containerConfig && item.containerConfig.uStyle"
            >
                <component
                    v-if="item.contentConfig"
                    :is="item.contentConfig.componentName"
                    v-bind="item.contentConfig.props"
                    v-model="item.contentConfig.props.value"
                ></component>
                <div
                    class="flex-item-content-null"
                    v-else
                ></div>
            </div>
        </template>
    </div>
</template>
<script>
import { cloneDeep } from "lodash";
export default {
    name: "FlexContainer",
    props: {
        value: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
        mode: {
            type: String,
            default() {
                // DesignTime | RunTime
                return "RunTime";
            },
        },
    },
    data() {
        return {
            flexItems: [],
        };
    },
    watch: {
        value: {
            handler(val, oldVal) {
                this.flexItems = cloneDeep(val);
            },
            deep: true,
            immediate: true,
        },
        "flexItems.length": {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.$emit("input", cloneDeep(this.flexItems));
                }
            },
        },
    },
};
</script>
<style lang="less">
.layout-flex-container {
    width: 100%;
    display: flex;
    > .flex-container-null {
        height: 60px;
    }
    > .flex-item {
        > .flex-item-content-null {
            height: 60px;
        }
    }
}
</style>