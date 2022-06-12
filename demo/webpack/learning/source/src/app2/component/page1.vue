<template>
  <div class="app2-page1-comp-container">
    <img src="../images/app2page1.png">
    <h2>应用2-》页面1 私有组件</h2>
    <h3>GUID:{{guid}}</h3>
  </div>
</template>
<script>
import * as utils from "../../common/js/utils.js";
export default {
  name: "app2page1",
  data() {
    return {
      guid: utils.getGUID(),
    };
  },
};
</script>
<style lang="less">
/*! page1.vue  应用2页面1组件样式 */
/**************** 应用2页面1组件样式    开始 ****************/
.app2-page1-comp-container {
  border: 16px solid cadetblue;
  padding: 10px;
}
/**************** 应用2页面1组件样式    结束 ****************/
</style>