<template>
    <div
        class="form-item-container"
        :direction="direction"
    >
        <div
            class="label-area"
            v-if="showLabel"
        >
            <slot name="label"></slot>
        </div>
        <div class="main-area">
            <div class="control-container">
                <slot></slot>
            </div>
            <div class="tips">
                <slot name="tips"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "FormItem",
    props: {
        showLabel: {
            type: Boolean,
        },
        direction: {
            type: String,
        },
    },
};
</script>
<style lang="less" scoped>
.form-item-container {
    display: flex;
    height: auto;
    margin-bottom: 24px;
    padding-left: 15px;
    padding-right: 15px;

    > .label-area {
        width: 150px;
        padding-top: 8px;
    }

    > .main-area {
        flex: 1;
        position: relative;
    }

    &[direction="left"] {
        flex-direction: row;
        > .label-area {
            flex-shrink: 0;
        }
    }

    &[direction="right"] {
        > .label-area {
            text-align: right;
            padding-right: 20px;
        }
    }

    &[direction="top"] {
        flex-direction: column;
        > .label-area {
            padding-top: 0;
            padding-bottom: 8px;
        }
    }
}
</style>