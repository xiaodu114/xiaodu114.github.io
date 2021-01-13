// 参考element-ui的使用方式
import DisplayText from './src/main.vue';
import DisplayTextSet from './src/set.vue';

DisplayText.install = function (Vue) {
    Vue.component(DisplayText.name, DisplayText);
};
DisplayTextSet.install = function (Vue) {
    Vue.component(DisplayTextSet.name, DisplayTextSet);
};

export {
    DisplayText,
    DisplayTextSet
};