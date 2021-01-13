<template>
    <div>
        <div style="display: flex">
            <span>全</span>
            <numberunitinneruse
                :attr-value.sync="allAttrThis"
                :units="units"
                :default-values="defaultValues"
            ></numberunitinneruse>
        </div>
        <div style="display: flex">
            <span>上</span>
            <numberunitinneruse
                :attr-value.sync="topAttrThis"
                :units="units"
                :default-values="defaultValues"
            ></numberunitinneruse>
        </div>
        <div style="display: flex">
            <span>右</span>
            <numberunitinneruse
                :attr-value.sync="rightAttrThis"
                :units="units"
                :default-values="defaultValues"
            ></numberunitinneruse>
        </div>
        <div style="display: flex">
            <span>下</span>
            <numberunitinneruse
                :attr-value.sync="bottomAttrThis"
                :units="units"
                :default-values="defaultValues"
            ></numberunitinneruse>
        </div>
        <div style="display: flex">
            <span>左</span>
            <numberunitinneruse
                :attr-value.sync="leftAttrThis"
                :units="units"
                :default-values="defaultValues"
            ></numberunitinneruse>
        </div>
    </div>
</template>
<script>
import numberunitinneruse from "../../number-unit/index.js";
export default {
    name: "FourDirectionTypeStyleSet",
    props: {
        allAttr: {
            type: String,
        },
        topAttr: {
            type: String,
        },
        rightAttr: {
            type: String,
        },
        bottomAttr: {
            type: String,
        },
        leftAttr: {
            type: String,
        },
        units: {
            type: Array,
            default() {
                return ["pt", "px", "em", "%"];
            },
        },
        defaultValues: {
            type: Array,
            default() {
                return ["auto", "inherit", "initial", "unset"];
            },
        },
    },
    components: {
        numberunitinneruse,
    },
    data() {
        return {
            allAttrThis: undefined,
            topAttrThis: undefined,
            rightAttrThis: undefined,
            bottomAttrThis: undefined,
            leftAttrThis: undefined,
        };
    },
    watch: {
        allAttrThis: {
            handler: function (val, oldVal) {
                this.topAttrThis = undefined;
                this.rightAttrThis = undefined;
                this.bottomAttrThis = undefined;
                this.leftAttrThis = undefined;
                this.$nextTick(() => {
                    this.$emit("update:all-attr", val);
                });
            },
            //immediate: true,
        },
        topAttrThis: {
            handler: function (val, oldVal) {
                this.$emit("update:top-attr", val);
            },
            //immediate: true,
        },
        rightAttrThis: {
            handler: function (val, oldVal) {
                this.$emit("update:right-attr", val);
            },
            //immediate: true,
        },
        bottomAttrThis: {
            handler: function (val, oldVal) {
                this.$emit("update:bottom-attr", val);
            },
            //immediate: true,
        },
        leftAttrThis: {
            handler: function (val, oldVal) {
                this.$emit("update:left-attr", val);
            },
            //immediate: true,
        },
    },
    methods: {},
    created() {
        this.allAttrThis = this.allAttr;
        this.topAttrThis = this.topAttr;
        this.rightAttrThis = this.rightAttr;
        this.bottomAttrThis = this.bottomAttr;
        this.leftAttrThis = this.leftAttr;
    },
};
</script>
