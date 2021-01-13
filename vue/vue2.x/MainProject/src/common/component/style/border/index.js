// 参考element-ui的使用方式
import BorderStyleSet from './src/main.vue';

BorderStyleSet.install = function (Vue) {
    Vue.component(BorderStyleSet.name, BorderStyleSet);
};

export default BorderStyleSet;