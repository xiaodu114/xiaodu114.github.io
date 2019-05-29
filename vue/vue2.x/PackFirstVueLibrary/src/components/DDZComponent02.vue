<template>
  <div class="ddzcomponent02">
    <div>{{msg}}</div>
    <div>{{prop1}}</div>
    <div>
      <button
        type="button"
        @click="clickFn1"
      >测试点击事件
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ddzcomponent02",
  props: {
    prop1: {
      type: String,
      default: "我是默认值"
    }
  },
  data() {
    return {
      msg: "我会打包成JS，可以直接在浏览器使用哦！编号2"
    };
  },
  methods: {
    clickFn1() {
      alert("组件：ddzcomponent02，点击事件");
    }
  }
};
</script>

<style lang="less" scoped>
.ddzcomponent02 {
  color: lightcoral;
}
</style>


