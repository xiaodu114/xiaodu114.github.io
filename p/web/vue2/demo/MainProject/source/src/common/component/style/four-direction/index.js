// 参考element-ui的使用方式
import FourDirectionTypeStyleSet from './src/main.vue';

FourDirectionTypeStyleSet.install = function (Vue) {
    Vue.component(FourDirectionTypeStyleSet.name, FourDirectionTypeStyleSet);
};

export default FourDirectionTypeStyleSet;