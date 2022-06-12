<template>
  <div class="app1-page1-comp-container">
    <img src="../images/app1pag1.png">
    <h2>应用1-》页面1 私有组件</h2>
    <h3>GUID:{{guid}}</h3>
  </div>
</template>
<script>
import * as utils from "../../common/js/utils.js";
export default {
  name: "app1page1",
  data() {
    return {
      guid: utils.getGUID(),
    };
  },
};
</script>
<style lang="less">
/*! page1.vue  应用1页面1组件样式 */
/**************** 应用1页面1组件样式    开始 ****************/
.app1-page1-comp-container {
  border: 8px solid rebeccapurple;
  padding: 10px;
}
/**************** 应用1页面1组件样式    结束 ****************/
</style>