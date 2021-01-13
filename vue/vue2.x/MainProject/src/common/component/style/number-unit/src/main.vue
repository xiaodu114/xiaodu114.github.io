<template>
    <div class="number-unit-type-style-set-container">
        <div class="number-unit-number">
            <input
                type="text"
                v-model="numberModel"
                @change="numberUnitModelChange"
            >
        </div>
        <div class="number-unit-unit">
            <select
                v-model="unitModel"
                @change="numberUnitModelChange"
            >
                <option
                    disabled
                    value=""
                ></option>
                <option
                    v-for="unit in selfUnits"
                    :key="unit"
                >
                    {{ unit }}
                </option>
            </select>
        </div>
    </div>
</template>
<script>
export default {
    name: "NumberUnitTypeStyleSet",
    props: {
        attrValue: {
            type: String,
        },
        defaultValues: {
            type: Array,
            default() {
                return ["auto", "inherit", "initial", "unset"];
            },
        },
        units: {
            type: Array,
            default() {
                return ["pt", "px", "em", "%"];
            },
        },
        unitRequire: {
            type: Boolean,
            default() {
                return true;
            },
        },
    },
    data() {
        return {
            numberModel: null,
            unitModel: null,
        };
    },
    computed: {
        selfUnits() {
            var temp = [];
            if (
                Array.isArray(this.defaultValues) &&
                this.defaultValues.length
            ) {
                temp = temp.concat(this.defaultValues);
            }
            if (Array.isArray(this.units) && this.units.length) {
                temp = temp.concat(this.units);
            }
            return temp;
        },
    },
    watch: {
        attrValue: {
            handler: function (newValue, oldValue) {
                if (
                    Array.isArray(this.defaultValues) &&
                    this.defaultValues.indexOf(this.attrValue) >= 0
                ) {
                    this.numberModel = this.attrValue;
                    this.unitModel = null;
                } else {
                    var tempNumber = parseFloat(this.attrValue);
                    if (!isNaN(tempNumber)) {
                        var tempUnit = this.attrValue.slice(
                            tempNumber.toString().length
                        );
                        if (
                            Array.isArray(this.units) &&
                            this.units.indexOf(tempUnit) >= 0
                        ) {
                            this.numberModel = tempNumber;
                            this.unitModel = tempUnit;
                        } else {
                            this.numberModel = this.attrValue;
                            this.unitModel = null;
                        }
                    } else {
                        this.numberModel = this.attrValue;
                        this.unitModel = null;
                    }
                }
            },
            immediate: true,
        },
    },
    created() {},
    methods: {
        numberUnitModelChange() {
            var needUpdate = false;
            if (
                Array.isArray(this.defaultValues) &&
                this.defaultValues.indexOf(this.unitModel) >= 0
            ) {
                this.numberModel = this.unitModel;
                this.unitModel = null;
                needUpdate = true;
            } else {
                if (
                    Array.isArray(this.defaultValues) &&
                    this.defaultValues.indexOf(this.numberModel) >= 0
                ) {
                    this.numberModel = null;
                }
                needUpdate =
                    this.numberModel &&
                    ((this.unitRequire && this.unitModel) || !this.unitRequire);
            }
            if (needUpdate) {
                this.$emit(
                    "update:attr-value",
                    this.numberModel + (this.unitModel || "")
                );
            }
        },
    },
};
</script>
<style lang="less">
.number-unit-type-style-set-container {
    display: flex;
    overflow: hidden;

    > .number-unit-number {
        flex: 1;
        > input {
            width: 100%;
        }
    }
    > .number-unit-number {
        flex-shrink: 0;
    }
}
</style>