// 参考element-ui的使用方式
import FormItem from './src/main.vue';

FormItem.install = function (Vue) {
    Vue.component(FormItem.name, FormItem);
};

export default FormItem;