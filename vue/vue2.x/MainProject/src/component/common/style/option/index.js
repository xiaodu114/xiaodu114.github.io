// 参考element-ui的使用方式
import OptionTypeStyleSet from './src/main.vue';

OptionTypeStyleSet.install = function (Vue) {
    Vue.component(OptionTypeStyleSet.name, OptionTypeStyleSet);
};

export default OptionTypeStyleSet;