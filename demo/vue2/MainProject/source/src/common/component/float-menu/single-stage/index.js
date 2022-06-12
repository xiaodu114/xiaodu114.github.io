// 参考element-ui的使用方式
import SingleStageFloatMenu from './src/main.vue';

SingleStageFloatMenu.install = function (Vue) {
    Vue.component(SingleStageFloatMenu.name, SingleStageFloatMenu);
};

export default SingleStageFloatMenu;