<template>
    <div>
        <div style="display: flex">
            <span>全</span>
            <numberunitinneruse
                :attr-value.sync="allWidth"
                :default-values="[]"
            ></numberunitinneruse>
            <optioninneruse
                :attr-value.sync="allStyle"
                :options="borderStyles"
            ></optioninneruse>
        </div>
        <div style="display: flex">
            <span>上</span>
            <numberunitinneruse
                :attr-value.sync="topWidth"
                :default-values="[]"
            ></numberunitinneruse>
            <optioninneruse
                :attr-value.sync="topStyle"
                :options="borderStyles"
            ></optioninneruse>
        </div>
        <div style="display: flex">
            <span>右</span>
            <numberunitinneruse
                :attr-value.sync="rightWidth"
                :default-values="[]"
            ></numberunitinneruse>
            <optioninneruse
                :attr-value.sync="rightStyle"
                :options="borderStyles"
            ></optioninneruse>
        </div>
        <div style="display: flex">
            <span>下</span>
            <numberunitinneruse
                :attr-value.sync="bottomWidth"
                :default-values="[]"
            ></numberunitinneruse>
            <optioninneruse
                :attr-value.sync="bottomStyle"
                :options="borderStyles"
            ></optioninneruse>
        </div>
        <div style="display: flex">
            <span>左</span>
            <numberunitinneruse
                :attr-value.sync="leftWidth"
                :default-values="[]"
            ></numberunitinneruse>
            <optioninneruse
                :attr-value.sync="leftStyle"
                :options="borderStyles"
            ></optioninneruse>
        </div>
    </div>
</template>
<script>
import numberunitinneruse from "../../number-unit/index.js";
import optioninneruse from "../../option/index.js";
export default {
    name: "BorderStyleSet",
    props: {
        allBorder: {
            type: String,
        },
        topBorder: {
            type: String,
        },
        rightBorder: {
            type: String,
        },
        bottomBorder: {
            type: String,
        },
        leftBorder: {
            type: String,
        },
    },
    components: {
        numberunitinneruse,
        optioninneruse,
    },
    data() {
        return {
            borderStyles: [
                "none",
                "hidden",
                "dotted",
                "dashed",
                "solid",
                "double",
                "groove",
                "ridge",
                "inset",
                "outset",
            ],
            dataAttrConfig: [
                {
                    key: "allBorder",
                    updateKey: "all-border",
                    attrs: ["allWidth", "allStyle", "allColor"],
                },
                {
                    key: "topBorder",
                    updateKey: "top-border",
                    attrs: ["topWidth", "topStyle", "topColor"],
                },
                {
                    key: "rightBorder",
                    updateKey: "right-border",
                    attrs: ["rightWidth", "rightStyle", "rightColor"],
                },
                {
                    key: "bottomBorder",
                    updateKey: "bottom-border",
                    attrs: ["bottomWidth", "bottomStyle", "bottomColor"],
                },
                {
                    key: "leftBorder",
                    updateKey: "left-border",
                    attrs: ["leftWidth", "leftStyle", "leftColor"],
                },
            ],
            allWidth: null,
            allStyle: null,
            allColor: null,
            topWidth: null,
            topStyle: null,
            topColor: null,
            rightWidth: null,
            rightStyle: null,
            rightColor: null,
            bottomWidth: null,
            bottomStyle: null,
            bottomColor: null,
            leftWidth: null,
            leftStyle: null,
            leftColor: null,
        };
    },
    watch: {
        allWidth: "allBorderChange",
        allStyle: "allBorderChange",
        allColor: "allBorderChange",
        topWidth: "topBorderChange",
        topStyle: "topBorderChange",
        topColor: "topBorderChange",
        rightWidth: "rightBorderChange",
        rightStyle: "rightBorderChange",
        rightColor: "rightBorderChange",
        bottomWidth: "bottomBorderChange",
        bottomStyle: "bottomBorderChange",
        bottomColor: "bottomBorderChange",
        leftWidth: "leftBorderChange",
        leftStyle: "leftBorderChange",
        leftColor: "leftBorderChange",
    },
    methods: {
        handleAllChange(item) {
            var tempBorderArr = [];
            if (this[item.attrs[0]]) {
                tempBorderArr.push(this[item.attrs[0]]);
            }
            if (this[item.attrs[1]]) {
                tempBorderArr.push(this[item.attrs[1]]);
            }
            if (this[item.attrs[2]]) {
                tempBorderArr.push(this[item.attrs[2]]);
            }
            var tempBorderValue = tempBorderArr.join(" ");
            if (tempBorderValue && this[item.key] !== tempBorderValue) {
                if (item.key === "allBorder") {
                    this.dataAttrConfig.forEach((otherItem) => {
                        if (otherItem.key !== item.key) {
                            this[otherItem.attrs[0]] = null;
                            this[otherItem.attrs[1]] = null;
                            this[otherItem.attrs[2]] = null;
                            this.$emit(
                                "update:" + otherItem.updateKey,
                                undefined
                            );
                        }
                    });
                }
                this.$emit("update:" + item.updateKey, tempBorderValue);
            }
        },
        allBorderChange(newValue, oldValue) {
            this.handleAllChange(this.dataAttrConfig[0]);
        },
        topBorderChange(newValue, oldValue) {
            this.handleAllChange(this.dataAttrConfig[1]);
        },
        rightBorderChange(newValue, oldValue) {
            this.handleAllChange(this.dataAttrConfig[2]);
        },
        bottomBorderChange(newValue, oldValue) {
            this.handleAllChange(this.dataAttrConfig[3]);
        },
        leftBorderChange(newValue, oldValue) {
            this.handleAllChange(this.dataAttrConfig[4]);
        },
        handleInit() {
            var tempArr = [];
            this.dataAttrConfig.forEach((item) => {
                if (this[item.key]) {
                    tempArr = this[item.key]
                        .split(" ")
                        .filter((item) => item.length > 0);
                }
                for (var i = 0; i < tempArr.length; i++) {
                    var tempWidthDiv = document
                        .createRange()
                        .createContextualFragment(
                            "<div style='width:" + tempArr[i] + ";'></div>"
                        ).children[0];
                    var tempColorDiv = document
                        .createRange()
                        .createContextualFragment(
                            "<div style='color:" + tempArr[i] + ";'></div>"
                        ).children[0];
                    if (tempWidthDiv.style.width === tempArr[i]) {
                        this[item.attrs[0]] = tempArr[i];
                    } else if (this.borderStyles.indexOf(tempArr[i]) >= 0) {
                        this[item.attrs[1]] = tempArr[i];
                    } else if (tempColorDiv.style.color === tempArr[i]) {
                        this[item.attrs[2]] = tempArr[i];
                    }
                }
                tempArr.length = 0;
            });
        },
    },
    created() {
        this.handleInit();
    },
};
</script>
