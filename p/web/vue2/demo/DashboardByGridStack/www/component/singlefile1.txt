<template>
  <div class="singlefile1">
    <div>{{msg}}</div>
    <div>
      抱歉现在还不能解析SCRIPT标签并且STYLE标签只支持css
      <hr>
    </div>
    <div>
      <div>这里接收主页面的上下文：</div>
      <pre>{{mainPageContextInfo}}</pre>
      <hr>
    </div>
    <div>
      <div>这里接收主页面的广播：</div>
      <div>{{mainPageBroadcast}}</div>
      <hr>
    </div>
    <div>
      <div>这里接收兄弟页面的事件：</div>
      <div>{{brotherPageBroadcast}}</div>
      <hr>
    </div>
  </div>
</template>
<script>
export default {
  name: "singlefile1",
  props: {},
  data: function() {
    return {
      msg: "自我介绍：我是一个单文件组件,编号1",
      mainPageContextInfo: null,
      mainPageBroadcast: "正在监听……",
      brotherPageBroadcast: "正在监听……"
    };
  },
  methods: {
    btn1Click: function() {
      alert("组件内部点击事件");
    }
  },
  created: function() {
    if (GlobalStore) {
      if (GlobalStore.contextInfo) {
        this.mainPageContextInfo = JSON.stringify(GlobalStore.contextInfo);
      }
    }
    var _this = this;
    if (GlobalEventBus) {
      GlobalEventBus.$on("mainpage-broadcast-event-01", function(data) {
        if (data && data.msg) {
          _this.mainPageBroadcast = data.msg;
        }
      });
      GlobalEventBus.$on("iframe1-sendEvent-1", function(data) {
        if (data && data.msg) {
          _this.brotherPageBroadcast = data.msg;
        }
      });
    }
  }
};
</script>
<style>
.singlefile1 {
  color: yellowgreen;
  height: 100%;
  overflow-y: auto;
}
</style>