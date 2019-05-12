<template>
  <div class="maintenancerecord-singlefile-list-item-view list-item-container">
    <div class="title">
      {{this.item.title}}
      <span>{{this.customTitle}}</span>
    </div>
    <div class="subtitle">
      <div class="left">
        <div class="item-label">{{this.formConfig['1557302039598'].label.text}}：</div>
        <div class="item-value">{{this.item['1557302039598']}}</div>
      </div>
      <div class="right">
        <div class="item-label">{{this.formConfig['1557302039599'].label.text}}：</div>
        <div class="item-value">{{this.item['1557302039599']}}</div>
      </div>
    </div>
    <div class="subtitle">
      <div class="left">
        <button
          type="button"
          @click="btn1Click();"
        >按钮1</button>
      </div>
      <div class="right">
        <button
          type="button"
          @click="btn2Click();"
        >按钮2</button>
      </div>
    </div>
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
  background-color: lightgreen;
}
</style>



