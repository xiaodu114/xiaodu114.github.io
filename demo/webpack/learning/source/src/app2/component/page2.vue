<template>
  <div class="app2-page2-comp-container">
    <img src="../images/app2page2.png">
    <h2>应用2-》页面2 私有组件</h2>
    <h3>GUID:{{guid}}</h3>
  </div>
</template>
<script>
import * as utils from "../../common/js/utils.js";
export default {
  name: "app2page2",
  data() {
    return {
      guid: utils.getGUID(),
    };
  },
};
</script>
<style lang="less">
/*! page2.vue  应用2页面2组件样式 */
/**************** 应用2页面2组件样式    开始 ****************/
.app2-page2-comp-container {
  border: 8px solid cornflowerblue;
  padding: 10px;
}
/**************** 应用2页面2组件样式    结束 ****************/
</style>