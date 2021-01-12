// 参考element-ui的使用方式
import FlexContainer from './src/main.vue';
import FlexContainerSet from './src/set.vue';

FlexContainer.install = function (Vue) {
    Vue.component(FlexContainer.name, FlexContainer);
};
FlexContainerSet.install = function (Vue) {
    Vue.component(FlexContainerSet.name, FlexContainerSet);
};

export {
    FlexContainer,
    FlexContainerSet
};