<template>
    <div>
        <select
            v-model="optionModel"
            @change="optionModelChange"
        >
            <option
                disabled
                value=""
            ></option>
            <option
                v-for="item in options"
                :key="item"
            >
                {{ item }}
            </option>
        </select>

    </div>
</template>
<script>
export default {
    name: "OptionTypeStyleSet",
    props: {
        attrValue: {
            type: String,
        },
        options: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            optionModel: null,
        };
    },
    watch: {
        attrValue: {
            handler: function (newValue, oldValue) {
                if (
                    Array.isArray(this.options) &&
                    this.options.indexOf(this.attrValue) >= 0
                ) {
                    this.optionModel = this.attrValue;
                } else {
                    this.optionModel = null;
                }
            },
            immediate: true,
        },
    },
    created() {},
    methods: {
        optionModelChange() {
            this.$emit("update:attr-value", this.optionModel);
        },
    },
};
</script>