// 参考element-ui的使用方式
import NumberUnitTypeStyleSet from './src/main.vue';

NumberUnitTypeStyleSet.install = function (Vue) {
    Vue.component(NumberUnitTypeStyleSet.name, NumberUnitTypeStyleSet);
};

export default NumberUnitTypeStyleSet;