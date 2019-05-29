//  1、这里导入需要导出的组件，统一处理
import DDZComponent01 from './src/components/DDZComponent01.vue';
import DDZComponent02 from './src/components/DDZComponent02.vue';
//      1.1、书写Vue插件（保证只引入某一个组件时可用），https://cn.vuejs.org/v2/guide/plugins.html
DDZComponent01.install = function (Vue) {
    Vue.component(DDZComponent01.name, DDZComponent01);
};
DDZComponent02.install = function (Vue) {
    Vue.component(DDZComponent02.name, DDZComponent02);
};

//  2、遍历注册所有的组件（依赖），全局时使用
const components = [
    DDZComponent01,
    DDZComponent02
];
const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    // 这里除了注册组件，还可以做一些其他的东西
    // 你可以在Vue的原型上扩展一些方法
    // eg:element-ui
    //      Vue.prototype.$message = Message;
    //      使用：this.$message({message:"xxxxx",type:"success"});
};

//      可以根据实际情况，是否需要这段代码（CDN引入，便可使用所有组件）
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
//  3、导出类库的版本、组件、Vue插件需要暴露的install方法
export default {
    version: '0.0.1',
    install,
    DDZComponent01,
    DDZComponent02
};

//	4、使用方式
//      4.1、使用部分组件
//	        4.1.1、
//	            import { DDZComponent01 } from '……/ddztestlib01.js';
//	            局部注册：components: { ddzcomponent01: DDZComponent01 },
//	            全局注册：Vue.use(DDZComponent01); //这种写法需要对应的组件暴露install方法
//	        4.1.2、
//	            import * as ddztestlib01 from '……/ddztestlib01.js'; // 这里的书写方式应该和导出的写法有关系
//	            局部注册：components: { ddzcomponent01: ddztestlib01.DDZComponent01 },
//	            全局注册：Vue.use(ddztestlib01.DDZComponent01); //这种写法需要对应的组件暴露install方法
//	    4.2、使用类库中的所有组件
//          4.2.1、
//	            import * as ddztestlib01 from '……/ddztestlib01.js'; // 这里的书写方式应该和导出的写法有关系
//	            Vue.use(ddztestlib01); //这里的使用就是调用对象的install方法
//          4.2.2、cdn方式使用
//              <script src="……/ddztestlib01.js"></script> //如果window.Vue存在，则自动注册全部组件
//      4.3、使用systemjs异步加载（测试版本：SystemJS 3.1.6）
//          加载之后，返回的是该类库的默认导出对象：{default:{version:,install:,……}}。这种加载方式和CDN类似，如果window.Vue存在，则自动注册全部组件。所以如果window.Vue存在，返回的对象意义不大；除非window.Vue不存在。注意：组件注册成功之后在显示
//          代码示例：
//              System.import("……/ddztestlib01.js").then((result) => {
//                   // 成功加载之后，显示组件
//                   // 如果window.Vue存在,并且存在类似上面的install方法，则这里的返回结果没有什么意思
//                   // 至于如何使用，则可以根据具体情况而定，选择自己合适的
//              });
//      4.4、使用requirejs异步加载（测试版本：requirejs 2.3.6）
//          和systemjs类似，只是使用方式不同
//          代码示例：
//              requirejs.config({
//                  paths: {
//                     "ddztestlib01": tempUrl
//                  }
//              });
//              requirejs(["ddztestlib01"], (result) => {
//                  // 成功加载之后，显示组件
//              });
//      4.5、……使用模块加载器加载JS和CDN方式差不多，只是不同的加载器返回的结果不同（有支持UMD，有的不支持）