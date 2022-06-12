<template>
  <div class="ddzcomponent01">
    <div>{{msg}}</div>
    <div>{{prop1}}</div>
  </div>
</template>

<script>
export default {
  name: "ddzcomponent01",
  props: {
    prop1: {
      type: String,
      default: "我是默认值"
    }
  },
  data() {
    return {
      msg: "我会打包成JS，可以直接在浏览器使用哦！编号1"
    };
  }
};
</script>

<style scoped>
.ddzcomponent01 {
  color: lime;
}
</style>

