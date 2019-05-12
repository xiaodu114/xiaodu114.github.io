<template>
  <div class="maintenancerecord-singlefile-list-item-view list-item-container">
    <div>我是一个单文件组件，我还不完善</div>
    <div>抱歉现在还不能解析SCRIPT标签并且STYLE标签只支持css</div>
  </div>
</template>
<script>
export default {
  name: "MaintenanceRecordListItemView",
  props: {
    item: {
      type: Object,
      required: true
    },
    formConfig: {
      type: Object,
      required: true
    },
    tpl: {
      type: String
    },
    bindData: {
      type: Object
    }
  },
  data: function() {
    return {
      customTitle: "(自定义组件方式)"
    };
  },
  methods: {
    btn1Click(item) {
      [1, 2, 3].map(item => console.log(item));
      alert("主键ID：" + this.item.id + "您点击的是按钮1");
    },
    btn2Click() {
      alert("主键ID：" + this.item.id + "您点击的是按钮2");
    }
  }
};
</script>
<style>
.maintenancerecord-singlefile-list-item-view.list-item-container {
  background-color: yellow;
}
</style>



